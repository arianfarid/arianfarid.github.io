---
id: "2"
title: "Simple Key-Value Store Built in Golang"
description: "An append-only log, built with zero dependencies in Golang, and how I integrate it into my workflow with Hammerspoon."
date: "2025-12-13"
categories:
  - "Golang"
  - "Cache"
  - "Store"
  - "Automation"
tags:
  - Golang
  - Algorithms
  - Cache
  - Store 
  - Hammerspoon
listed: true
draft: false
search: true
---

The aim of this post is to share a personal tool I recently developed, called KV-Store. Rather tahmn reaching for Redis or a heavier dependency, I wanted something local and purpose-built.

KV-store is an append-only store. It is a small package, roughly ~200 lines of code, but it enables me to store certain data that I frequently use in my workflow.

In this article I will briefly review the architecture of the store, and how I use it in my personal work.

## Background

Key-value stores are a powerful data storage paradigm. The key data structure that underlies key-value stores are "hash tables", or associative arrays.

Hash tables are useful, because data lookup is fast (retrieval of a single value is `O(1)`). 

## Application Architecture

KV-Store builds two binaries:
- **`kvd`** - The local, lightweight daemon that exposes a simple command-based protocol over a UNIX socket.
- **`kv`** - A simple CLI that sends commands to the daemon. 

This separation allows us to keep the daemon alive, and the CLI stays lightweight.

### The Store Struct

The data structure underpinning the in-memory store is a `struct` that contains a pointer to the backing log file, plus a map of key-value pairs. 
Each operation (`GET`, `PUT`, `DELETE`, `LIST`) is implemented as a method on this struct.

```go
type Store struct {
	kvFile *os.File
	index map[string]string
}

func (s Store) Put(key string, value string) string {
	_,err := s.kvFile.WriteString(key+`\t`+value+"\n")
	if err != nil {
		return Err + ": " + err.Error()
	}
	s.index[key] = value

	return Ok
}

func (s Store) Get(key string) string {
	out, ok := s.index[key]
	if !ok {
		return NotFound
	}
	return Value + " " + out
}

func (s Store) Delete(key string) string {
	_, ok := s.index[key]
	if !ok {
		return NotFound
	}
	s.Put(key, Tombstone)
	delete(s.index, key)
	return Ok
}
func (s Store) List() []string {
	keys := make([]string, 0, len(s.index))
	for k:=range s.index {
		keys = append(keys, k)
	}
	return keys
}
var store Store
```

This design keeps lookups fast, while using the append-only log as durable storage.

### Booting the Daemon

On boot, the daemon parses the key-value log file. 
Each line of the log file has the form:
```
key<TAB>value\n
```
The parser assigns the keys/values to a `map` (i.e. a hash map) in memory. When a "tombstone" is encountered, the key is removed from the index.

Note: For simplicity, this uses bufio.Scanner; values are assumed to be reasonably small.

```go
func boot(opts Opts) {	
	keysPath := opts.getValuesPath()	
	keysFile, err := os.OpenFile(keysPath, os.O_RDWR|os.O_APPEND|os.O_CREATE, 0666)
	if err != nil {
		fmt.Println("ERROR: ", err)
	}
	store.index = make(map[string]string)
	store.kvFile = keysFile
	
	scanner := bufio.NewScanner(keysFile)
	for scanner.Scan() {
		row := scanner.Text()
		l := strings.Split(row, `\t`)
		k := l[0]
		v := l[1]
		if v == Tombstone {
			delete(store.index, k)
			continue
		}
		store.index[k] = v
	}
}
```

### Handling Requests

Once the daemon is running, it accepts requests concurrently. Each client connection is handled as a goroutine.

```go
go handleConnection(conn)
```

The `handleConnection` goroutine is passed the connection. First, it grabs the arguments, and maps the request to the appropriate store method.

Note: For my usage patterns, concurrent writes are rare; a mutex could be added if needed.

```go
func handleConnection(c net.Conn) {
	
	defer c.Close()
	reader := bufio.NewReader(c)
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			return
		}
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		args := strings.SplitN(line, " ", 3)

		mainArg := args[0]
		
		var output string
		switch mainArg {
		case commands["GET"]:
			
			key := args[1]
			if len(key) < 1 {
				output = Err + ": Must provide valid key"
			}
			output = store.Get(key)
		case commands["PUT"]:
			key := args[1]
			if len(key) < 1 {
				output = Err + ": Must provide valid key"
			}
			val := args[2]
			output = store.Put(key, val)
		case commands["DELETE"]:
			key := args[1]
			if len(key) < 1 {
				output = Err + ": Must provide valid key"
			}
			output = store.Delete(key)
		case commands["LIST"]:
			keys := store.List()
			if len(keys) == 0 {
				c.Write([]byte("EMPTY\n"))
				continue
			}
			output = strings.Join(keys, " ") + "\n"
		default: 
			output = Err + ": Must provide valid arguments"
		}
		c.Write([]byte(output + "\n"))
	}
}
```

### Structured Response

Structured responses are returned for each command. 

```bash
> kv GET test
# OK response, gets value
VALUE test data
# No key (or key was deleted)
NOTFOUND
# Error path
ERROR: Example error
```

Putting and deleting keys 

```bash
> kv PUT test new data
# OK response
OK
> kv DELETE test
OK
```

This keeps the CLI simple, and makes downstream scripting straightforward.

## The CLI

The CLI is a thin wrapper around the UNIX socket. It serves as an entry point to our main application, and forwards our arguments to the socket and prints whatever response it receives.

```go
func main() {
	if len(os.Args) < 2 {
		fmt.Println("ERROR: No command provided, or too few arguments")
		os.Exit(1)
	}	 

	conn, err := net.Dial("unix", SocketPath)
	if err != nil {
		fmt.Println("ERROR: cannot connect to daemon:", err)
		os.Exit(1)
	}
	defer conn.Close()

	cmd := strings.Join(os.Args[1:], " ") + "\n"
	_, err = conn.Write([]byte(cmd))
	if err != nil {
		fmt.Println("ERROR: write failed:", err)
		os.Exit(1)
	}

	resp, err := bufio.NewReader(conn).ReadString('\n')
	if err != nil {
		fmt.Println("ERROR: read failed:", err)
		os.Exit(1)
	}
	fmt.Println(strings.TrimSpace(resp))
}
```

## Building, and Running the Application

I prefer to build the binaries local to my project:

```bash
go build -o ./bin/kvd ./cmd/main.go
go build -o ./bin/kv ./cmd/kv/main.go
```

Spin up the daemon:
```bash
./bin/kvd
```

The store is live! We're now able to interact via the kv CLI

```bash
./bin/kv PUT test 123 #OK
```

We can verify the persistence:

```bash
cat keystore_values.kv
test\t123
```

## How I integrate into my workflow

I use kv-store as a "named clipboard history". 

I use similar tools with Raycast, which contains a clipboard history. I'm unable to "name" them though (e.g. ps = https://arianfarid.me), and pinning a bunch of my frequent pastes takes up too much space, makes them less accessible. 
I also experimented with Raycast's snippets. They're close to what I want, but not as flexible as I wanted. I often need quick access to things like API tokens, session keys, today's date, and other frequently updated data. These are values that change a lot, and don't necessarily need to live in my snippets.

Ultimately, building a tool that fit my exact needs was the direction I took. Plus, it was a great exercise in designing a simple store, and working with Go!

### A Quick Hammerspoon Script

Hammerspoon is an automation tool for macOS. Hammerspoon allows us to easily bind keyboard shortcuts to Lua scripts,
In this case, we use it to create a lightweight command palette that lets us search our key–value store interactively.

As we type, the chooser filters available keys. Selecting one will retrieve the associated value from the KV daemon and pastes it directly at the cursor.

```lua
local function getAllKeys()
    local result = hs.execute("/Users/arian/Code/kvstore/bin/kv LIST")
    result = result:gsub("^KEYS%s*", ""):gsub("%s+$", "")
    if result == "EMPTY" then return {} end

    local keys = {}
    for key in result:gmatch("%S+") do
        table.insert(keys, key)
    end
    return keys
end

local function textInput(prompt, callback)
    local chooser = hs.chooser.new(function(choice)
        if not choice then return end
        callback(choice.text)
    end)

    chooser:placeholderText(prompt)
    chooser:searchSubText(false)

    local choices = {}
    local keys = getAllKeys()
    for _, k in ipairs(keys) do
        table.insert(choices, { text = k })
    end
    chooser:choices(choices)
    chooser:searchSubText(false)
    chooser:rows(1)
    chooser:width(45)

    chooser:show()
end


hs.hotkey.bind({"cmd", "shift"}, "K", function()
    textInput("Enter key...", function(key)
        if key == "" then return end

        local result = hs.execute("/Users/arian/Code/kvstore/bin/kv GET " .. key)
        local trimmed = result:gsub("%s+$", "")
        local value = trimmed:match("^VALUE%s+(.+)$")

        if value then
            hs.pasteboard.setContents(value)
            hs.eventtap.keyStrokes(value)
        elseif trimmed == "NOTFOUND" then
            hs.alert.show("Key not found: " .. key)
        else
            hs.alert.show("Error: " .. trimmed)
        end
    end)
end)

```

#### How It Works

First, we define a helper function (getAllKeys) that calls the LIST command on the KV daemon and parses the returned keys into a Lua table.

Next, textInput creates an hs.chooser instance, populates it with available keys, and displays a filtered list as the user types. This gives us a lightweight, Raycast-like command palette without leaving the keyboard.

Finally, we bind the script to ⌘ + Shift + K. When triggered, the chooser appears, the selected key is resolved via the KV daemon, and the resulting value is automatically copied to the clipboard and typed at the cursor position.

## Conclusion

Overall, this has been a nice addition to improve my workflow. It's small, simple, and does exactly what I need without adding unnecessary complexity or overhead.
Building kv-store was also a great exercise in designing a minimal log-structured system and integrating it into real-world automation with Hammerspoon.
Check out the source code on my [Github](https://github.com/arianfarid/kvstore)

### Future improvements

In the future, I plan to add a `compaction` to remove intermediate or tombstoned keys. 

To reduce the memory footprint of the daemon, I also plan to store the byte offsets of the values.

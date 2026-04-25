import { onMounted } from 'vue'

const schedules: Record<string, (month: number) => boolean> = {
  christmas: (m) => m === 11,
}

const loaders: Record<string, () => Promise<unknown>> = {
  christmas: () => import('./christmas.css'),
}

const bodyClasses: Record<string, string> = {
  christmas: 'xmas',
}

// Classic C7/C9 incandescent yuletide colours
const XMAS_BULB_COLORS = ['#cc0000', '#00802b', '#0047ab', '#ffbf00', '#e85d04']

function injectChristmasLights() {
  if (document.querySelector('.xmas-lights')) return

  const strip = document.createElement('div')
  strip.className = 'xmas-lights'

  const count = Math.ceil(window.innerWidth / 45)
  for (let i = 0; i < count; i++) {
    const bulb = document.createElement('span')
    bulb.className = 'xmas-bulb'
    const color = XMAS_BULB_COLORS[i % XMAS_BULB_COLORS.length]
    bulb.style.setProperty('--bulb-color', color)
    bulb.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`
    strip.appendChild(bulb)
  }

  document.body.appendChild(strip)
}

const setup: Record<string, () => void> = {
  christmas: () => {
    document.body.classList.add('xmas')
    injectChristmasLights()
  },
}

async function activate(name: string) {
  await loaders[name]()
  setup[name]()
}

export function useHoliday() {
  onMounted(async () => {
    const param = new URLSearchParams(window.location.search).get('holiday')

    if (param && param in loaders) {
      await activate(param)
      return
    }

    const month = new Date().getMonth()
    for (const [name, isActive] of Object.entries(schedules)) {
      if (isActive(month)) {
        await activate(name)
        return
      }
    }
  })
}

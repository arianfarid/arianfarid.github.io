<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { onMounted, ref } from 'vue'

const { frontmatter } = useData()

const { Layout, Content } = DefaultTheme

function formatDate(date) {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

function estimateReadingTime(text) {
    const wordsPerMinute = 200 // Average reading speed
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return {
        minutes,
        text: `${minutes} min read`,
    }
}
const readingTime = ref()
onMounted(async () => {
    const content = document.querySelector('.vp-doc')?.textContent || ''
    readingTime.value = estimateReadingTime(content)
})
</script>

<template>
    <Layout>
        <template #doc-before>
            <center>
                <h1 class="vph">{{ frontmatter.title }}</h1>
                <div v-if="!frontmatter.hideFrontMeta" class="meta">
                    <span class="meta-item"  v-if="frontmatter.date">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        {{ formatDate(frontmatter.date) }}
                    </span>
                    <span class="meta-item" v-if="readingTime">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {{ readingTime.text }}
                    </span>
                </div>
            </center>
        <!-- </template>
        <template #doc-before> -->
            <div class="tags" v-if="frontmatter.tags?.length">
                <span class="tags-item">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg> -->
                    Tags:
                    <template v-for="(tag, index) in frontmatter.tags" :key="tag">
                        <Badge class="tag-badge" style="white-space: nowrap;">{{ tag }}</Badge>{{ index == frontmatter.tags.length - 1 ? '' : ', ' }}
                    </template>
                </span>
            </div>
        </template>
    </Layout>
</template>

<style scoped>
.vph {
    margin: 48px 0 16px;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.25;
    text-align: center;
}

.meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
    font-weight: 600;
    gap: 1rem;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    text-align: center;
}

/* Smaller screens: stack vertically */
@media (max-width: 600px) {
    .meta {
        /* flex-direction: column; */
        align-items: flex-start;
    }

    .meta-item {
        justify-content: flex-start;
    }
}

.meta-item svg {
    width: 1rem;
    height: 1rem;
}

.tags {
    /* display: flex;
    justify-content: flex-start;
    flex-wrap: wrap; */
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
    font-weight: 600;
    gap: 1rem;
    line-height: 32px;
}

.tags-item {
    /* display: flex; */
    /* align-items: center; */
    gap: 0.25rem;
    text-align: center;
}

.tags-item svg {
    width: 1rem;
    height: 1rem;
}

</style>
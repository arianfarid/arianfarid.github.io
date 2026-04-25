import { onMounted } from 'vue'

export function useGrain() {
    onMounted(() => {
        const root = document.documentElement
        const setPos = (x: number, y: number) => {
            root.style.setProperty('--grain-x', `${x}px`)
            root.style.setProperty('--grain-y', `${y}px`)
        }
        const show = () => {
            root.style.transition = '--grain-intensity 0.1s ease-in'
            root.style.setProperty('--grain-intensity', '1.0')
        }
        const hide = () => {
            root.style.transition = '--grain-intensity 1.2s ease-out'
            root.style.setProperty('--grain-intensity', '0')
        }

        window.addEventListener('touchstart', e => {
            const t = e.touches[0]; setPos(t.clientX, t.clientY); show()
        }, { passive: true })
        window.addEventListener('touchmove', e => {
            const t = e.touches[0]; setPos(t.clientX, t.clientY)
        }, { passive: true })
        window.addEventListener('touchend', hide)
    })
}

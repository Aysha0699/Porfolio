
export function initLiquidTouch(
  selector = 'button, .btn, .project-card, [data-liquid]'
) {
  if (typeof window === 'undefined') return () => {}

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }

  const onDown = (e) => {
    if (!(e.target instanceof Element)) return

    const el = e.target.closest(selector)
    if (!el) return

    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative'
    }

    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.8

    const layer = document.createElement('span')
    layer.className = 'liquid-layer'

    const wave = document.createElement('span')
    wave.className = 'liquid-wave'
    wave.style.left = `${e.clientX - rect.left}px`
    wave.style.top = `${e.clientY - rect.top}px`
    wave.style.setProperty('--s', `${size}px`)

    for (let i = 0; i < 3; i++) {
      wave.appendChild(document.createElement('i'))
    }

    layer.appendChild(wave)
    el.appendChild(layer)

    window.setTimeout(() => layer.remove(), 1500)

    if (e.pointerType === 'touch' && navigator.vibrate) {
      navigator.vibrate(8)
    }
  }

  document.addEventListener('pointerdown', onDown, { passive: true })

  return () => {
    document.removeEventListener('pointerdown', onDown)
  }
}

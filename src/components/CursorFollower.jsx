import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine) and (hover: hover)').matches) return
    const el = ref.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, shown = false

    const paint = () => { el.style.transform = `translate3d(${x - 8}px,${y - 8}px,0)` }
    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      paint()
      raf = requestAnimationFrame(loop)
    }
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY
      if (!shown) { x = tx; y = ty; shown = true; el.style.opacity = '1'; paint() }
      if (reduce) { x = tx; y = ty; paint() }
    }
    const onLeave = () => { shown = false; el.style.opacity = '0' }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    if (!reduce) raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />
}
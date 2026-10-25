
import { useEffect, useRef } from 'react'

const TAU = Math.PI * 2

const smooth = (v) => {
  v = Math.max(0, Math.min(1, v))
  return v * v * (3 - 2 * v)
}

export default function FaceField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const still = reducedMotion || coarsePointer
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let particles = []
    let raf = 0
    let running = false
    let progress = still ? 1 : 0
    let mouseX = -10000
    let mouseY = -10000
    let hovered = false

    function randomBetween(min, max) {
      return min + Math.random() * (max - min)
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height

      if (!width || !height) return

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Circle size adapts to the existing canvas dimensions.
      const radius = Math.min(width * 0.29, height * 0.39)
      const centerX = width * 0.72
      const centerY = height * 0.47

      particles = []

      // Dense central circle with an organic, dotted edge.
      const spacing = width < 500 ? 6 : 5.5
      const rowSpacing = spacing * 0.87
      const rows = Math.ceil((radius * 2) / rowSpacing)

      for (let row = -rows; row <= rows; row++) {
        const y = row * rowSpacing
        const offset = row % 2 ? spacing / 2 : 0

        for (
          let x = -radius;
          x <= radius;
          x += spacing
        ) {
          const px = x + offset + randomBetween(-1.2, 1.2)
          const py = y + randomBetween(-1.2, 1.2)
          const distance = Math.hypot(px, py)

          if (distance > radius) continue

          // Keep the center dense and gradually disperse the edge.
          const normalized = distance / radius
          const keepChance = 1 - 0.2 * smooth((normalized - 0.5) / 0.5)

          if (Math.random() > keepChance) continue

          particles.push({
            startX: randomBetween(0, width),
            startY: randomBetween(0, height),
            homeX: centerX + px,
            homeY: centerY + py,
            radius: randomBetween(0.7, 1.45) *
              (1 + normalized * 0.18),
            alpha: randomBetween(0.65, 1),
            phase: Math.random() * TAU,
            type: 'core',
          })
        }
      }

      // Scattered dots surrounding the circle, like the reference.
      const scatterCount = Math.floor((width * height) / 650)

      for (let i = 0; i < scatterCount; i++) {
        const angle = Math.random() * TAU
        const distance = radius * randomBetween(1.02, 1.75)

        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        // Keep the scattered particles inside the canvas.
        if (x < 0 || x > width || y < 0 || y > height) continue

        particles.push({
          startX: randomBetween(0, width),
          startY: randomBetween(0, height),
          homeX: x,
          homeY: y,
          radius: randomBetween(0.55, 1.2),
          alpha: randomBetween(0.18, 0.75),
          phase: Math.random() * TAU,
          type: 'scatter',
        })
      }

      if (still) progress = 1
      draw(performance.now())
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height)

      const eased = smooth(progress)
      const t = time * 0.00045

      for (const p of particles) {
        let x = p.startX + (p.homeX - p.startX) * eased
        let y = p.startY + (p.homeY - p.startY) * eased

        if (!still) {
          const movement = p.type === 'core' ? 1.1 : 2.4

          x += Math.sin(t + p.phase) * movement
          y += Math.cos(t * 0.9 + p.phase) * movement

          // Preserve the original particle-repulsion hover behavior.
          const dx = x - mouseX
          const dy = y - mouseY
          const distance = Math.hypot(dx, dy)

          if (hovered && distance < 80 && distance > 0.01) {
            const force = (1 - distance / 80) * 12
            x += (dx / distance) * force
            y += (dy / distance) * force
          }
        }

        ctx.beginPath()
        ctx.arc(x, y, p.radius, 0, TAU)

        // Neutral dots; no glow or extra colors.
        ctx.fillStyle = p.type === 'core'
          ? `rgba(220,224,218,${p.alpha})`
          : `rgba(190,198,187,${p.alpha})`

        ctx.fill()
      }
    }

    function animate(time) {
      progress += ((hovered ? 1 : 0) - progress) * 0.045
      draw(time)
      raf = requestAnimationFrame(animate)
    }

    function start() {
      if (running || still) return
      running = true
      raf = requestAnimationFrame(animate)
    }

    function stop() {
      if (!running) return
      cancelAnimationFrame(raf)
      running = false
    }

    function onPointerMove(event) {
      const rect = canvas.getBoundingClientRect()
      mouseX = event.clientX - rect.left
      mouseY = event.clientY - rect.top

      hovered =
        mouseX >= 0 &&
        mouseX <= width &&
        mouseY >= 0 &&
        mouseY <= height
    }

    function onPointerLeave() {
      hovered = false
      mouseX = mouseY = -10000
    }

    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start()
      else stop()
    })

    intersectionObserver.observe(canvas)

    if (!still) {
      window.addEventListener('pointermove', onPointerMove, {
        passive: true,
      })
      canvas.addEventListener('pointerleave', onPointerLeave)
    }

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="face-field" aria-hidden="true" />
}

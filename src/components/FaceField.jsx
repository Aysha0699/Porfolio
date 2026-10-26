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

    // Phones/tablets: interactive touch mode. Reduced motion stays static.
    // Desktop (fine pointer) behaves exactly as before.
    const touchMode = coarsePointer && !reducedMotion
    const still = reducedMotion
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

    // Touch-mode state (plain variables, no React state per frame)
    let formed = false
    let touchActive = false
    let focusX = 0
    let focusY = 0
    let lastTime = 0

    function randomBetween(min, max) {
      return min + Math.random() * (max - min)
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()

      // On phones, browser toolbars change the height while scrolling.
      // Keep the particles instead of reshuffling them.
      const keepParticles =
        touchMode &&
        particles.length > 0 &&
        Math.abs(rect.width - width) < 1

      width = rect.width
      height = rect.height

      if (!width || !height) return

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (keepParticles) {
        draw(performance.now())
        return
      }

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

          const sx = randomBetween(0, width)
          const sy = randomBetween(0, height)

          particles.push({
            startX: sx,
            startY: sy,
            homeX: centerX + px,
            homeY: centerY + py,
            // touch mode: offset from the touch point + live position
            offX: px,
            offY: py,
            x: sx,
            y: sy,
            speed: randomBetween(0.025, 0.075),
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

        const sx = randomBetween(0, width)
        const sy = randomBetween(0, height)

        particles.push({
          startX: sx,
          startY: sy,
          homeX: x,
          homeY: y,
          offX: Math.cos(angle) * distance,
          offY: Math.sin(angle) * distance,
          x: sx,
          y: sy,
          speed: randomBetween(0.02, 0.06),
          radius: randomBetween(0.55, 1.2),
          alpha: randomBetween(0.18, 0.75),
          phase: Math.random() * TAU,
          type: 'scatter',
        })
      }

      if (still) progress = 1
      draw(performance.now())
    }

    // Touch mode: ease every particle toward its slot in a circle
    // centered on the last touch point (or back to its scattered spot
    // if nothing has been touched yet).
    function updateTouch(time) {
      const dt = lastTime ? Math.min((time - lastTime) / 16.67, 3) : 1
      lastTime = time
      const t = time * 0.00045

      for (const p of particles) {
        const base = p.type === 'core' ? 1.1 : 2.4
        const amp = formed ? base : base * 2.5

        const tx =
          (formed ? focusX + p.offX : p.startX) +
          Math.sin(t + p.phase) * amp
        const ty =
          (formed ? focusY + p.offY : p.startY) +
          Math.cos(t * 0.9 + p.phase) * amp

        const k = 1 - Math.pow(1 - p.speed, dt)
        p.x += (tx - p.x) * k
        p.y += (ty - p.y) * k
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height)

      if (touchMode) {
        for (const p of particles) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, TAU)
          ctx.fillStyle = p.type === 'core'
            ? `rgba(220,224,218,${p.alpha})`
            : `rgba(190,198,187,${p.alpha})`
          ctx.fill()
        }
        return
      }

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
      if (touchMode) {
        updateTouch(time)
      } else {
        progress += ((hovered ? 1 : 0) - progress) * 0.045
      }
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
      lastTime = 0
    }

    // ---- Desktop handlers (unchanged) ----
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

    // ---- Touch handlers (phones/tablets only) ----
    function onTouchDown(event) {
      if (event.pointerType === 'mouse') return
      // Don't react to taps on links/buttons/inputs.
      if (event.target.closest?.('a, button, input, textarea, select')) return

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (x < 0 || x > width || y < 0 || y > height) return

      formed = true
      touchActive = true
      focusX = x
      focusY = y
    }

    function onTouchMove(event) {
      if (!touchActive || event.pointerType === 'mouse') return
      const rect = canvas.getBoundingClientRect()
      focusX = Math.max(0, Math.min(width, event.clientX - rect.left))
      focusY = Math.max(0, Math.min(height, event.clientY - rect.top))
    }

    function onTouchEnd() {
      // Circle stays where it is until the next touch.
      touchActive = false
    }

    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start()
      else stop()
    })

    intersectionObserver.observe(canvas)

    if (touchMode) {
      window.addEventListener('pointerdown', onTouchDown, { passive: true })
      window.addEventListener('pointermove', onTouchMove, { passive: true })
      window.addEventListener('pointerup', onTouchEnd, { passive: true })
      window.addEventListener('pointercancel', onTouchEnd, { passive: true })
    } else if (!still) {
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
      window.removeEventListener('pointerdown', onTouchDown)
      window.removeEventListener('pointermove', onTouchMove)
      window.removeEventListener('pointerup', onTouchEnd)
      window.removeEventListener('pointercancel', onTouchEnd)
    }
  }, [])

  return <canvas ref={canvasRef} className="face-field" aria-hidden="true" />
}
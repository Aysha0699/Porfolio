import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const P = 250 // wave period (SVG units)
const A = 12  // wave amplitude

function wavePath(periods, drop) {
  let d = `M0 0Q${P / 4} ${-2 * A} ${P / 2} 0`
  for (let k = 2; k <= periods * 2; k++) d += `T${(k * P) / 2} 0`
  return `${d}V${drop}H0Z`
}
const WAVE = wavePath(5, 400)

function WaveWord({ text, id, f, className }) {
  const n = text.length
  const size = 960 / (n * 0.62)
  const vbH = Math.round(size * 0.8)
  const base = Math.round(size * 0.76)
  const top = (vbH + A) * (1 - f) - 2 * A * f // wave line: below the text at 0%, above it at 100%
  return (
    <svg className={className} viewBox={`0 0 1000 ${vbH}`} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={id}>
          <text
            x="20" y={base} fontSize={size} fontWeight="800"
            textLength="960" lengthAdjust="spacingAndGlyphs"
            fontFamily="'Bricolage Grotesque', Impact, 'Arial Black', sans-serif"
          >
            {text}
          </text>
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="1000" height={vbH} fill="#454a46" />
        <g transform={`translate(0 ${top - 6})`}><path className="wave-back" d={WAVE} fill="#8d938d" /></g>
        <g transform={`translate(0 ${top})`}><path className="wave-front" d={WAVE} fill="#f3f3ee" /></g>
      </g>
    </svg>
  )
}

export default function LoadingScreen({ onDone }) {
  const [lvl, setLvl] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let target = 30 // app mounted
    const mark = (v) => { target = Math.max(target, v) }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => mark(70), () => mark(70))
    const onLoad = () => mark(100)
    if (document.readyState === 'complete') mark(100)
    else window.addEventListener('load', onLoad, { once: true })

    let shown = 0, raf = 0, finish = 0, last = performance.now()
    const tick = (now) => {
      const dt = now - last
      last = now
      // never ahead of the real checkpoint reached; capped speed so the fill is visible
      shown = reduce ? target : Math.min(target, shown + 0.07 * dt)
      setLvl(shown)
      if (shown >= 100) { finish = setTimeout(onDone, reduce ? 0 : 300); return }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const safety = setTimeout(onDone, 2500) // never stuck

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(finish)
      clearTimeout(safety)
      window.removeEventListener('load', onLoad)
    }
  }, [onDone])

  const f = lvl / 100
  return (
    <motion.div
      className="loader"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="loader-inner">
        <h1 className="sr-only">PORTFOLIO</h1>
        <WaveWord text="PORTFOLIO" id="wt-all" f={f} className="wave-svg wave-wide" />
        <div className="wave-stack">
          <WaveWord text="PORT" id="wt-a" f={f} className="wave-svg" />
          <WaveWord text="FOLIO" id="wt-b" f={f} className="wave-svg" />
        </div>
        <p className="loader-meta" aria-hidden="true">loading... {Math.floor(lvl)} %</p>
      </div>
    </motion.div>
  )
}
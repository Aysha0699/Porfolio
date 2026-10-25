import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { nav } from '../data/portfolioData.js'

const id = (l) => l.toLowerCase()

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    nav.forEach((l) => { const el = document.getElementById(id(l)); if (el) obs.observe(el) })
    const onScroll = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`nav ${solid ? 'solid' : ''}`}>
      <a href="#home" className="logo" aria-label="Home">AH.</a>
      <nav aria-label="Primary" className="nav-links">
        {nav.map((l) => (
          <a key={l} href={`#${id(l)}`} className={active === id(l) ? 'on' : ''} aria-current={active === id(l) ? 'true' : undefined}>
            {l}
          </a>
        ))}
      </nav>
      <button className="burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav className="drawer" aria-label="Mobile" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {nav.map((l) => (
              <a key={l} href={`#${id(l)}`} onClick={() => setOpen(false)}>{l}</a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
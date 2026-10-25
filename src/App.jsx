import { useState } from 'react'
import { MotionConfig, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import DesignShowcase from './components/DesignShowcase.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Achievements from './components/Achievements.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [ready, setReady] = useState(false)
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!ready && <LoadingScreen key="loader" onDone={() => setReady(true)} />}
      </AnimatePresence>
      {ready && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <DesignShowcase />
            <Skills />
            <Experience />
            <Achievements />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </MotionConfig>
  )
}
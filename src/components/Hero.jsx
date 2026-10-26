import { motion } from 'framer-motion'
import { ArrowDownRight, Download } from 'lucide-react'
import { profile } from '../data/portfolioData.js'
import { HackerRankIcon, LeetCodeIcon, GithubIcon, LinkedInIcon } from './BrandIcons.jsx'
import FaceField from './FaceField.jsx'



export default function Hero() {
  const [first, last] = profile.name.split(' ')
  return (
    <section id="home" className="hero dark">
      <FaceField />
      <div className="wrap">
        <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {profile.role}
        </motion.p>
        <h1 className="mega hero-name" aria-label={profile.name}>
          {[first, last].map((w, i) => (
            <span key={w} className="line">
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <p className="lead">{profile.intro}</p>
        <div className="row">
          <a className="btn primary" href="#projects">Explore Projects <ArrowDownRight size={18} /></a>
          <a className="btn" href={profile.cv} download="Aysha-Henan-CV.pdf"><Download size={18} /> Download CV</a>
          <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
          <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a className="icon-btn" href={profile.hackerrank} target="_blank" rel="noopener noreferrer" aria-label="HackerRank profile (opens in a new tab)"><HackerRankIcon /></a>
          <a className="icon-btn" href={profile.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode profile (opens in a new tab)"><LeetCodeIcon /></a>
        </div>
      </div>
    </section>
  )
}
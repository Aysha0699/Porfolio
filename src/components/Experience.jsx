import Reveal from './Reveal.jsx'
import { work, leadership, education } from '../data/portfolioData.js'

export default function Experience() {
  return (
    <section id="experience" className="light">
      <div className="wrap">
        <h2 className="big">Experience and leadership</h2>
        <h3 className="sub">Internship</h3>
        {work.map((w) => (
          <Reveal key={w.org} className="trow">
            <span>{w.date}</span>
            <div><strong>{w.role}</strong>, {w.org}<p>{w.text}</p></div>
          </Reveal>
        ))}
        <h3 className="sub">Student leadership</h3>
        {leadership.map((l, i) => (
          <Reveal key={l.role + l.org} delay={i * 0.04} className="trow">
            <span>{l.date}</span>
            <div><strong>{l.role}</strong>, {l.org}</div>
          </Reveal>
        ))}
        <h3 className="sub">Education</h3>
        <Reveal className="trow">
          <span>{education.years}</span>
          <div><strong>{education.degree}</strong><p>{education.school}</p></div>
        </Reveal>
      </div>
    </section>
  )
}
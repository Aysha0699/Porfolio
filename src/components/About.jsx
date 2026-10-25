import Reveal from './Reveal.jsx'
import { about } from '../data/portfolioData.js'

export default function About() {
  return (
    <section id="about" className="light">
      <div className="wrap split">
        <Reveal><h2 className="big">{about.lead}</h2></Reveal>
        <div className="stack">
          {about.points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
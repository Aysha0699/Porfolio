import Reveal from './Reveal.jsx'
import { achievements, participations } from '../data/portfolioData.js'

export default function Achievements() {
  return (
    <section id="achievements" className="dark">
      <div className="wrap">
        <h2 className="big">Achievements</h2>
        <div className="agrid">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1} className="acard">
              <span className="year">{a.year}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </Reveal>
          ))}
        </div>
        <h3 className="sub">Participations</h3>
        <ul className="list">{participations.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
    </section>
  )
}
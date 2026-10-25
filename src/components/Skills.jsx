import Reveal from './Reveal.jsx'
import { skills } from '../data/portfolioData.js'

export default function Skills() {
  return (
    <section id="skills" className="dark">
      <div className="wrap">
        <h2 className="big">Skills</h2>
        <div className="sgrid">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.08}>
              <h3>{g.group}</h3>
              <ul className="tags big-tags">
                {g.items.map((s) => {
                  const item = typeof s === 'string' ? { name: s } : s
                  return (
                    <li key={item.name} className="tag" title={item.note}>
                      {item.name}
                      {item.note && <small className="tag-note">{item.note}</small>}
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
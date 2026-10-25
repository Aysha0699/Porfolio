import Reveal from './Reveal.jsx'
import { designWork } from '../data/portfolioData.js'

const placeholders = [{ title: 'Add a Figma screen' }, { title: 'Add a poster' }, { title: 'Add a poster' }]

export default function DesignShowcase() {
  const items = designWork.length ? designWork : placeholders
  return (
    <section id="design" className="light">
      <div className="wrap">
        <h2 className="big">UI/UX and poster design</h2>
        <div className="dgrid">
          {items.map((d, i) => {
            const img = d.image && (
              <img
                src={d.image}
                alt={d.alt || d.title}
                loading="lazy"
                className={d.fit === 'contain' ? 'contain' : undefined}
              />
            )
            return (
              <Reveal key={d.image || i} delay={i * 0.08}>
                <figure className="dtile">
                  {d.image ? (
                    d.link ? (
                      <a href={d.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${d.title}`}>{img}</a>
                    ) : img
                  ) : (
                    <div className="dph">Place an image in public/images and list it in portfolioData.js</div>
                  )}
                  <figcaption>{d.title}</figcaption>
                </figure>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function ProjectCard({ p, index, onOpen }) {
  return (
    <Reveal className={`pcard ${index === 0 ? 'wide' : ''}`}>
      <article className="project-card-inner">
        <button
          type="button"
          className="preview"
          onClick={() => onOpen(p)}
          aria-label={`View case study: ${p.title}`}
          style={{
            '--a': p.tone?.[0] ?? '#27352f',
            '--b': p.tone?.[1] ?? '#111713',
          }}
        >
          <span className="glyph" aria-hidden="true">
            {p.glyph}
          </span>

          <span className="ghost" aria-hidden="true">
            {p.title}
          </span>

          <span className="view">
            View Case Study <ArrowUpRight size={18} />
          </span>
        </button>

        <div className="pmeta">
          <div className="project-description">
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
          </div>

          <span className="tag solid project-category">
            {p.category}
            {p.year ? `, ${p.year}` : ''}
          </span>
        </div>

        <ul className="tags project-tags">
          {(p.tech ?? []).map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}

          {p.status && (
            <li className="tag status">{p.status}</li>
          )}

          {p.demo && (
            <li>
              <a
                className="tag demo-link"
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {p.demoLabel || 'Watch Demo'}
                <ArrowUpRight size={13} />
              </a>
            </li>
          )}
        </ul>
      </article>
    </Reveal>
  )
}

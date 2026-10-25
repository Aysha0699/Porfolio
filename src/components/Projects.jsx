
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { projects } from '../data/portfolioData.js'
import ProjectCard from './ProjectCard.jsx'

const cats = [
  'All',
  ...new Set(projects.map((p) => p.category).filter(Boolean)),
]

function Link({ href, icon, label }) {
  if (!href) return null

  return (
    <a
      className="btn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon} {label}
    </a>
  )
}

export default function Projects() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)

  const list =
    cat === 'All'
      ? projects
      : projects.filter((p) => p.category === cat)

  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
    }

    const previousOverflow = document.body.style.overflow

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <section id="projects" className="dark">
      <div className="wrap">
        <h2 className="big">Selected projects</h2>

        <div
          className="filters"
          role="group"
          aria-label="Filter projects"
        >
          {cats.map((c) => (
            <button
              key={c}
              className={c === cat ? 'chip on' : 'chip'}
              aria-pressed={c === cat}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="pgrid">
          {list.map((p, i) => (
            <ProjectCard
              key={p.id}
              p={p}
              index={i}
              onOpen={setOpen}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-label={open.title}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="close"
                onClick={() => setOpen(null)}
                aria-label="Close project details"
              >
                <X />
              </button>

              <h3>{open.title}</h3>

              <p className="muted">
                {[open.category, open.status, open.year]
                  .filter(Boolean)
                  .join(' · ')}
              </p>

              {[
                ['Overview', open.overview],
                ['Problem', open.problem],
                ['My contribution', open.contribution],
                ['Challenges and learning', open.challenges],
              ].map(([heading, content]) =>
                content ? (
                  <div key={heading}>
                    <h4>{heading}</h4>
                    <p>{content}</p>
                  </div>
                ) : null
              )}

              {open.features?.length > 0 && (
                <>
                  <h4>Key features</h4>
                  <ul className="list">
                    {open.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}

              {open.tech?.length > 0 && (
                <>
                  <h4>Technologies</h4>
                  <ul className="tags">
                    {open.tech.map((technology) => (
                      <li key={technology} className="tag">
                        {technology}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="row">
                <Link
                  href={open.repo}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  }
                  label="GitHub"
                />

                <Link
                  href={open.demo}
                  icon={<ExternalLink size={18} />}
                  label={open.demoLabel || 'Watch Demo'}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

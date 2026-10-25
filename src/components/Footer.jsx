import { ArrowUp } from 'lucide-react'
import { nav, profile } from '../data/portfolioData.js'

export default function Footer() {
  return (
    <footer className="footer dark">
      <div className="wrap frow">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <nav aria-label="Footer">
          {nav.map((l) => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}
        </nav>
        <a className="icon-btn" href="#home" aria-label="Back to top"><ArrowUp /></a>
      </div>
    </footer>
  )
}
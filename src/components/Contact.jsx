import { Mail, Phone } from 'lucide-react'
import { profile } from '../data/portfolioData.js'
import { HackerRankIcon, LeetCodeIcon, GithubIcon, LinkedInIcon } from './BrandIcons.jsx'

export default function Contact() {
  return (
    <section id="contact" className="dark contact">
      <div className="wrap">
        <h2 className="mega small">LET'S BUILD SOMETHING MEANINGFUL.</h2>
        <p className="lead">Open to software internships. The quickest way to reach me is email.</p>
        <div className="row">
          <a className="btn" href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
          <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={18} /> GitHub</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon size={18} /> LinkedIn</a>
          <a className="btn" href={profile.hackerrank} target="_blank" rel="noopener noreferrer" aria-label="HackerRank profile (opens in a new tab)"><HackerRankIcon size={18} /> HackerRank</a>
          <a className="btn" href={profile.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode profile (opens in a new tab)"><LeetCodeIcon size={18} /> LeetCode</a>
        </div>
      </div>
    </section>
  )
}
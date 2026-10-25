// Edit everything here. Empty strings ("") for links show an "Add link" placeholder.
export const profile = {
  name: 'Aysha Henan',
  role: 'Computer Science student · aspiring software engineer',
  intro:
    'Third-year CSE student interested in software development, UI/UX design, web development and AI-based applications. Seeking internships to apply technical and creative skills in real-world environments.',
  email: 'ayshahenan0699@gmail.com',
  github: 'https://github.com/Aysha0699',
  linkedin: 'https://linkedin.com/in/aysha-henan',
  hackerrank: 'https://www.hackerrank.com/profile/ayshahenan15',
  leetcode: 'https://leetcode.com/u/Aysha_0699/',
  cv: '/cv.pdf',
}

export const nav = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Achievements', 'Contact']

export const about = {
  lead: 'I build thoughtful digital experiences that make a difference.',
  points: [
    { title: 'Interests', text: 'Software development, web development, UI/UX design and AI-based applications.' },
    { title: 'Problem-solving', text: 'Think logically. Solve creatively. Improve continuously.' },
    { title: 'Goal', text: 'Striving to become an engineer who doesn\'t just use technology, but pushes it forward.' },
  ],
}

export const projects = [
    {
    id: 'stm32voting', title: 'STM32 Fingerprint-Based Voting System', category: 'Embedded Systems', year: '2026', status: 'Completed',
    tone: ['#2a2f33', '#c9d1d6'], glyph: '⌬',
    summary: 'Fingerprint-based voter verification on an STM32 microcontroller, to help prevent duplicate voting.',
    overview: 'An embedded voter authentication system built using an STM32 microcontroller and an R307 fingerprint sensor. The system verifies registered voters through fingerprint authentication, helping prevent unauthorized access to the voting process and reduce duplicate voting.',
    problem: 'Traditional voter verification can be vulnerable to identity misuse and repeated voting. This project explores fingerprint-based authentication as a way to improve voter identification and support a more reliable voting process.',
    contribution: 'Designed and developed a prototype integrating the STM32 microcontroller with the R307 fingerprint sensor for biometric voter verification. Contributed to the system implementation and hardware integration.',
    features: ['Fingerprint-based voter verification', 'Designed to help prevent duplicate voting', 'Working demonstration video available'],
    tech: ['STM32', 'Embedded Systems','Embedded C'],
    challenges: 'Gained practical experience in microcontroller-based development, fingerprint sensor integration, LCD Display integration and communication between embedded hardware components. The project strengthened my understanding of biometric authentication and its application in voting systems.',
    demo: 'https://drive.google.com/file/d/1OTC8VtBiV2fa2bjHAjYSNkhvtphiuYwm/view?usp=drivesdk',
    demoLabel: 'Watch Demo',
  },
  {
    id: 'focusbruh', title: 'FocusBruh', category: 'Web', year: '2025', status: 'Completed',
    tone: ['#1f3d2b', '#d4f57a'], glyph: '◉',
    summary: 'Webcam-based distraction monitor that alerts you when you look away.',
    overview: 'A distraction-monitoring web application built with HTML, CSS, JavaScript and Mediapipe to help users stay focused while studying or working.',
    problem: 'Staying focused during long study or work sessions is hard, and distraction often goes unnoticed due to doom scrolling.',
    contribution: 'Developed the application, including the detection logic and the focus-time settings.',
    features: ['Webcam-based face and attention detection', 'Detects looking away or prolonged absence', 'Customisable study/work duration', 'Alerts during distraction events'],
    tech: ['HTML', 'CSS', 'JavaScript', 'Mediapipe'],
    challenges: 'EDIT ME: add what was hard and what you learned.',
    repo: 'https://github.com/Aysha0699/FocusBRuh.git', demo: '',
  },
  
  {
    id: 'buildakey', title: 'Build-A-Key', category: 'Web', year: '2025', status: 'Completed',
    tone: ['#3d2b1f', '#ffc46b'], glyph: '⌘',
    summary: 'Responsive password generator with personalised suggestions.',
    overview: 'A responsive password generator using HTML, CSS and JavaScript.',
    problem: 'Memorable yet strong passwords are hard to create.',
    contribution: 'Solo project.',
    features: ['Suggestions from name, date of birth and car or phone number', 'Control over length, digit count and special characters', 'Multiple choices, regeneration and copying', 'Does not store user information or passwords'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    challenges: 'password-generation logic that used the user\’s details while keeping passwords readable, personalised, and sufficiently secureEDIT ME: add what was hard and what you learned.',
    repo: 'https://github.com/Aysha0699/Build-A-Key.git', demo: 'https://aysha0699.github.io/Build-A-Key/',
  },
  {
    id: 'campusnavigator', title: 'Campus Navigator', category: 'Web', year: '', status: 'In progress',
    tone: ['#1f3340', '#8fd3ff'], glyph: '⌖',
    summary: 'College navigation web app (work in progress).',
    overview: 'A college navigation web app built with React, Vite and Tailwind CSS. Still in development.',
    problem: 'EDIT ME: describe the navigation problem it solves.',
    contribution: 'Solo project.',
    features: ['EDIT ME: list features that are actually built'],
    tech: ['React', 'Vite', 'Tailwind CSS'],
    challenges: 'EDIT ME: add what was hard and what you learned.',
    repo: '', demo: '',
  },
]

export const skills = [
  { group: 'Programming languages', items: ['Java', 'Python', 'C'] },
  { group: 'Web development', items: ['HTML', 'CSS', 'JavaScript'] },
  { group: 'AI / Generative AI', items: [{ name: 'RAG' }] },
  {
    group: 'Tools',
    items: [
      'GitHub',
      { name: 'Figma', note: 'UI/UX design, Poster Design' },
      { name: 'WordPress', note: 'Website creation and content management' },
    ],
  },
]

export const work = [
  { role: 'Web Development Intern', org: 'Edzpace Innovations Pvt. Ltd.', date: 'August 2026', text: 'Gained exposure to front-end development, responsive web design and professional web development workflows.' },
]

export const leadership = [
  { role: 'Vice Chair', org: 'IEEE SB GEC Palakkad', date: '2026' },
  { role: 'Co-Lead', org: 'Void Minds Club', date: '2026' },
  { role: 'Coordinator', org: 'Matrix 3.0 National Level Hackathon', date: '2026' },
  { role: 'Secretary', org: 'IEEE CS SBC GEC Palakkad', date: '2025' },
  { role: 'Joint Secretary', org: 'Void Minds Club', date: '2025' },
  { role: 'Event Coordinator', org: 'FOSS Club', date: '2025' },
]

export const education = {
  degree: 'B.Tech in Computer Science and Engineering',
  school: 'Government Engineering College Sreekrishnapuram, Palakkad',
  years: '2024 – 2028',
}

export const achievements = [
  { title: 'Best Office Bearer', text: 'IEEE Computer Society Student Branch Chapter, GEC Palakkad', year: '2026' },
  { title: 'Top 300 Participant', text: "TinkerHack Women's Hackathon", year: '2026' },
]

export const participations = [
  'IEEE YESS’25 (IEEE Kerala Section)',
  'TinkerHub 24-Hour Makeathon (2024, 2025)',
  'IEEE Technical Talk on Model Order Reduction (2025)',
  'TinkerHack Women’s Hackathon (2026)',
]

// Add Figma/poster screenshots to public/images and list them here, e.g. { title: 'Poster', image: '/images/poster1.png' }
export const designWork = [
  {  image: '/public/image1.jpeg', alt: 'Short description of the screen', link: '' },
  {  image: '/public/image2.jpeg', alt: 'Short description of the design', link: '', fit: 'contain' },
  {  image: '/public/image3.jpeg', alt: 'Short description of the poster', link: '' },
]
import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const highlights = [
  {
    title: 'Awards & Competitions',
    items: [
      '1st Prize, Tech Game — VENATUS College-Level Technical Fest, Basaveshwar Engineering College (2024).',
      'Team Lead and competitor, WAVE-2.0 National-Level 24-Hour Hackathon and WAVE State-Level 24-Hour Hackathon, BEC-AICTE IDEA Lab (2023–2024).',
      'Competitor, Line Follower Robot Race — TECHNISIUM, Siddaganga Institute of Technology, Tumakuru (2023).',
    ],
  },
  {
    title: 'Leadership & Technical Activities',
    items: [
      'Core Coordinator and organiser, TechTronix Technical Event, Dept. of AIML, Basaveshwar Engineering College (2025).',
      'Led project, hackathon, and robotics teams, coordinating technical implementation and team collaboration.',
      'Founded a first-year line-follower robotics team with no prior hardware experience, secured guidance from the college Idea Lab, and competed nationally against senior students.',
      'Regularly sought out by students across departments for final-year project guidance.',
    ],
  },
  {
    title: 'Community Engagement',
    items: [
      'Coordinated a Herkal Village outreach programme: a health and needs survey covering 300+ families, a free medical camp benefiting 110+ residents with SNMC Medical College, a school plantation drive, and a farmer biofuel-awareness session.',
      'Volunteer, Bagalkot Half Marathon (3K/5K/10K/21K), Real Sports Association Bagalkot (2023).',
      'Participated in the Swachh Bharat drive at Bagalkot Railway Station, a BEC Youth Red Cross blood donation camp, and plantation drives across two academic years.',
    ],
  },
  {
    title: 'Certifications',
    items: [
      'Supervised Machine Learning: Regression and Classification — Stanford Online (June 2026).',
      'DevOps, DataOps, MLOps — Duke University, Coursera (June 2026).',
      'Student Development Programme, DevOps Practices and Tools — Dept. of AIML / IQAC, BEC (October 2025).',
      'Student Development Programme, Modern SOC Strategies: Automation, AI & SIEM — Dept. of AIML / IQAC, BEC (August 2025).',
    ],
  },
]

export default function Highlights() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={sectionRef}
      id="highlights"
      className="relative overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-accent text-[0.68rem] tracking-[0.2em] uppercase">Beyond Work</span>
          </div>
          <h2 className="font-display text-off-white" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '0.04em', lineHeight: 0.95 }}>
            AWARDS &<br /><span className="text-accent">COMMUNITY</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {highlights.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.12 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8"
              style={{ background: 'rgba(242,242,242,0.04)', border: '1px solid rgba(242,242,242,0.1)' }}
            >
              <h3 className="font-display text-[1.55rem] tracking-[0.06em] mb-5 text-accent">{group.title}</h3>
              <ul className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.82rem] leading-[1.7] text-white/75">
                    <span aria-hidden="true" className="mt-[0.68rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const timeline = [
  {
    role: 'Software Development Intern',
    company: 'AI-driven Agritech Company · Agribid Private Limited · Mumbai',
    period: 'Jan 2026 — Apr 2026',
    desc: 'Built and shipped a production CMS with 20+ content modules for a live agritech platform, covering dynamic pages, media, news, blogs, tenders, programs, marketplace content, teams, testimonials, sponsors, awards, galleries, videos, FAQs, and site settings. Developed an RSS news platform that collects, categorises, and displays agriculture news from multiple sources. Built responsive React interfaces and PHP backend modules integrated with MySQL and REST APIs, resolved bugs to improve reliability, and collaborated with a cross-functional team using Git.',
    tags: ['React', 'Node.js', 'Express', 'PHP', 'MySQL', 'RSS Parser', 'REST API'],
  },
  {
    role: 'B.E. — Artificial Intelligence & Machine Learning',
    company: 'Basaveshwar Engineering College · VTU · Bagalkote',
    period: '2022 — 2026',
    desc: 'USN: 2BA22AI007. Coursework in Machine Learning, Deep Learning, NLP, Computer Vision, Reinforcement Learning, Data Structures and Algorithms, DBMS, and Software Engineering.',
    tags: ['ML', 'Deep Learning', 'Computer Vision', 'NLP'],
  },
]

export default function Skills() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#C40000' }}
      id="experience"
    >
      {/* Image collage bg */}
      <div className="absolute inset-0 z-0 grid grid-cols-5 grid-rows-2">
        <img src="/assets/collage-1.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/collage-2.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/collage-3.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/collage-4.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/collage-5.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/collage-6.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/collage-7.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/collage-8.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/collage-9.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/collage-10.jpeg" alt="" className="w-full h-full object-cover" />
      </div>
      {/* Red gradient overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(rgba(196,0,0,0.54), rgba(196,0,0,0.525), rgba(196,0,0,0.575))' }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-white/40" />
            <span className="font-mono text-white/60 text-[0.68rem] tracking-[0.2em] uppercase">Career</span>
          </div>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '0.04em', lineHeight: 0.95 }}>
            EXPERIENCE &<br /><span style={{ color: '#0A0A0A' }}>EDUCATION</span>
          </h2>
        </motion.div>

        <div className="relative pl-6 sm:pl-8" style={{ borderLeft: '1px solid rgba(196,0,0,0.3)' }}>
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative pb-10"
              style={{ paddingLeft: '2.5rem' }}
            >
              {/* Dot */}
              <div className="absolute left-[-2.65rem] top-1 w-[10px] h-[10px] rounded-full"
                style={{ background: '#C40000', boxShadow: '0 0 15px rgba(196,0,0,0.4)' }} />
              {/* Card */}
              <motion.div
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="p-4 sm:p-6"
                style={{ background: '#FFFFFF', border: '1px solid rgba(196,0,0,0.15)', cursor: 'default' }}
              >
                <h3 className="font-display text-[1.6rem] tracking-[0.06em] mb-1" style={{ color: '#C40000' }}>{item.role}</h3>
                <div className="font-mono text-[0.78rem] tracking-[0.1em] mb-1" style={{ color: '#0A0A0A' }}>{item.company}</div>
                <div className="font-mono text-[0.7rem] mb-3" style={{ color: '#888' }}>{item.period}</div>
                <p className="text-[0.88rem] leading-[1.75] mb-4" style={{ color: '#333' }}>{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, ti) => (
                    <span key={ti} className="font-mono text-[0.65rem] px-2.5 py-1 tracking-[0.06em]"
                      style={{ border: '1px solid rgba(196,0,0,0.25)', color: '#C40000' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

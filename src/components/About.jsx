import React from 'react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const stats = [
  { num: '20+', label: 'CMS Modules' },
  { num: '300+', label: 'Families Surveyed' },
  { num: '110+', label: 'Camp Beneficiaries' },
]

const skills = [
  { label: 'Languages: Python · JavaScript · TypeScript · PHP · SQL · HTML · CSS', w: '92%' },
  { label: 'AI/ML: Generative AI · RAG · LangChain · Vector Databases · Sentence Transformers · NLP · Deep Learning', w: '90%' },
  { label: 'Frontend: React · React Native · Vite · Tailwind CSS · Three.js', w: '85%' },
  { label: 'Backend: FastAPI · Node.js · Express.js · PHP', w: '86%' },
  { label: 'Databases: PostgreSQL · MySQL · SQLite · ChromaDB', w: '82%' },
  { label: 'Platforms: Git/GitHub · Render · Netlify · Vercel · Firebase', w: '80%' },
  { label: 'Other: REST API · JWT · CI/CD · Responsive Design · MVC · Agile · Vector Search · Prompt Engineering · Semantic Search · API Integration', w: '78%' },
]

export default function About() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0A0A0A' }}
      id="about"
    >
      {/* Image collage bg */}
      <div className="absolute inset-0 z-0 grid grid-cols-3 sm:grid-cols-4 grid-rows-3">
        <img src="/assets/home-x.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/click.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/branding.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/img-5.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/img-a.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/bold-minimalism.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/img-b.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/img-c.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/dither-sculpture.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/branding.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/ditherpunk.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/shark.jpeg" alt="" className="w-full h-full object-cover" />
      </div>

      {/* White overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(242,242,242,0.85)' }} />

      {/* Content */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[1200px] w-full mx-auto px-8 md:px-16 py-24"
      >
        <div className="about-inner grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* Left: Text + Stats */}
          <div>
            <div className="section-eyebrow" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              color: '#C40000',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#C40000' }} />
              About Me
            </div>

            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              letterSpacing: '0.04em',
              lineHeight: 0.95,
              color: '#0A0A0A',
              marginBottom: '1.5rem'
            }}>
              AI ENGINEER &<br /><span style={{ color: '#C40000' }}>BUILDER</span>
            </h2>

            <p style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: '#555',
              marginBottom: '1.5rem'
            }}>
              AI/ML graduate engineer with end-to-end experience designing RAG systems,
              full-stack applications, and production platforms. At Agribid, an AI-driven
              agritech company, I built and shipped a dynamic CMS with 20+ modules for a
              live platform. I am also Founder & Software Developer at SEATSIP, a
              café-discovery and seat-booking startup in development.
            </p>

            <p style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: '#555',
              marginBottom: '2rem'
            }}>
              <strong style={{ color: '#C40000' }}>SPECTER (2025)</strong> is my AI legal
              assistant project, built with RAG over Indian legal information.
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={{
                    background: 'rgba(196,0,0,0.04)',
                    border: '1px solid rgba(196,0,0,0.12)',
                    padding: '1.2rem',
                    textAlign: 'center',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '2.4rem',
                    color: '#C40000',
                    letterSpacing: '0.05em'
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: '#888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: '0.25rem'
                  }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Skills */}
          <div className="flex flex-col gap-6">
            {skills.map((skill, i) => (
              <div key={i}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#0A0A0A',
                  marginBottom: '0.5rem'
                }}>
                  <span>{skill.label}</span>
                </div>
                <div style={{
                  height: 5,
                  background: 'rgba(196,0,0,0.1)',
                  borderRadius: 999,
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: skill.w } : {}}
                    transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(to right, #C40000, #E8342E)',
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  )
}

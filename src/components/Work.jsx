import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

const projectData = {
  projects: [
    {
      num: '01', name: 'SPECTER',
      desc: 'RAG framework for Indian legal assistance. 59,630 document chunks, semantic retrieval, 146-sample evaluation. Bridges the access gap in Indian legal information.',
      arch: 'React → FastAPI → LangChain → ChromaDB → SentenceTransformers',
      tags: ['RAG', 'LangChain', 'ChromaDB', 'FastAPI', 'Research'],
      links: [{ label: 'GitHub', url: '#' }, { label: 'Paper', url: '#' }],
    },
    {
      num: '02', name: 'Agribid CMS',
      desc: 'Full-featured content management system for an agricultural B2B platform. JWT auth, RSS news integration, MySQL-backed REST API, live in production.',
      arch: 'React → Node/Express → MySQL → JWT → Render',
      tags: ['React', 'Node.js', 'MySQL', 'Production'],
      links: [{ label: 'GitHub', url: '#' }],
    },
    {
      num: '03', name: 'AI PDF Chatbot',
      desc: 'Document Q&A system built with LangChain and ChromaDB. Upload any PDF and get accurate, cited answers via semantic search over the document.',
      arch: 'React → FastAPI → LangChain → ChromaDB → OpenAI',
      tags: ['LangChain', 'ChromaDB', 'OpenAI'],
      links: [{ label: 'GitHub', url: '#' }, { label: 'Demo', url: '#' }],
    },
    {
      num: '04', name: 'SeatSip',
      desc: 'F&B startup — table booking + digital ordering SaaS for restaurants. Full-stack app with QR-based menus, real-time order management, and analytics dashboard.',
      arch: 'Next.js → Node → PostgreSQL → Firebase → Vercel',
      tags: ['Startup', 'Next.js', 'PostgreSQL', 'SaaS'],
      links: [{ label: 'Website', url: '#' }],
    },
  ],
  designs: [
    { num: 'D/01', name: 'Portfolio Site', desc: 'This very portfolio — cinematic dark design, glassmorphism, particle canvas background, and smooth reveal animations.', tags: ['HTML', 'CSS', 'JS', 'Design'] },
    { num: 'D/02', name: 'SPECTER UI', desc: 'Legal chatbot interface — dark-themed, search-first layout inspired by legal document aesthetics. Built in React with Tailwind.', tags: ['React', 'Tailwind', 'UI Design'] },
    { num: 'D/03', name: 'SeatSip Brand', desc: 'Brand identity and UI design for the SeatSip F&B SaaS — logo, color system, component library, and marketing landing page.', tags: ['Branding', 'Figma', 'Tailwind'] },
  ],
  experiments: [
    { num: 'X/01', name: 'Band 9 Quest', desc: 'Gamified IELTS vocabulary trainer — 15-day battle plan, spaced repetition, quiz engine, XP system. Built as a single-file HTML app.', tags: ['HTML', 'Gamification', 'IELTS'] },
    { num: 'X/02', name: 'Blender/Unity Game', desc: '26-day solo game dev project — 3D environment in Blender, gameplay logic in Unity with C#. First-person exploration experience.', tags: ['Unity', 'Blender', 'C#', '3D'] },
    { num: 'X/03', name: 'Cloud Cert Platform', desc: 'Interactive self-paced learning platform covering AWS SAA-C03, Azure AZ-900, Databricks, Docker/Kubernetes, and MLflow/MLOps.', tags: ['AWS', 'Azure', 'Docker', 'MLOps'] },
  ],
}

const tabs = ['Projects', 'Designs', 'Experiments']
const tabKeys = ['projects', 'designs', 'experiments']

export default function Work() {
  const [activeTab, setActiveTab] = useState('projects')
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#0A0A0A' }}
      id="projects"
    >
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/assets/work-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0A0A0A, transparent 15%, transparent 85%, #0A0A0A)' }} />
        <div className="absolute inset-0" style={{           background: 'rgba(0,0,0,0.05)' }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-accent text-[0.68rem] tracking-[0.2em] uppercase">Portfolio</span>
          </div>
          <h2 className="font-display text-off-white" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '0.04em', lineHeight: 0.95 }}>
            WHAT I'VE<br /><span className="text-accent">BUILT</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10" style={{ borderBottom: '1px solid rgba(242,242,242,0.08)' }}>
          {tabs.map((tab, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveTab(tabKeys[i])}
              className="font-mono text-[0.72rem] tracking-[0.1em] uppercase py-3 px-5 relative"
              style={{
                background: 'transparent',
                border: 'none',
                color: activeTab === tabKeys[i] ? '#F2F2F2' : 'rgba(242,242,242,0.3)',
                cursor: 'pointer',
                bottom: '-1px',
              }}
              whileHover={{ color: '#F2F2F2' }}
              whileTap={{ scale: 0.97 }}
            >
              {tab}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: '#C40000' }}
                animate={{ scaleX: activeTab === tabKeys[i] ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.button>
          ))}
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {projectData[activeTab].map((project, i) => (
              <motion.div
                key={`${activeTab}-${i}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative p-7"
                style={{
                  background: 'rgba(242,242,242,0.03)',
                  border: '1px solid rgba(242,242,242,0.06)',
                  backdropFilter: 'blur(12px)',
                  cursor: 'default',
                }}
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                  style={{ background: 'linear-gradient(to right, #C40000, #E8342E)' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                />

                <div className="font-display text-accent text-[0.85rem] tracking-[0.15em] opacity-50 mb-3">{project.num}</div>
                <h3 className="font-display text-off-white text-[1.8rem] tracking-[0.05em] mb-2">{project.name}</h3>
                <p className="text-[0.83rem] leading-[1.7] mb-4" style={{ color: 'rgba(242,242,242,0.55)' }}>{project.desc}</p>

                {project.arch && (
                  <div className="p-3 mb-4 font-mono text-[0.65rem] leading-[1.8]"
                    style={{ background: 'rgba(196,0,0,0.04)', border: '1px solid rgba(196,0,0,0.1)', color: '#C40000', opacity: 0.8 }}>
                    {project.arch}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, ti) => (
                    <span key={ti} className="font-mono text-[0.65rem] px-2.5 py-1 tracking-[0.06em]"
                      style={{ border: '1px solid rgba(196,0,0,0.25)', color: '#C40000' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Horizontal video strip */}
        <div className="mt-16 flex gap-3 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
          {[
            { src: '/assets/vid-3.mp4', label: 'Reel 01' },
            { src: '/assets/vid-5.mp4', label: 'Reel 02' },
            { src: '/assets/vid-7.mp4', label: 'Reel 03' },
            { src: '/assets/vid-9.mp4', label: 'Reel 04' },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-[300px] md:w-[400px] aspect-video relative overflow-hidden group"
              style={{ border: '1px solid rgba(242,242,242,0.06)' }}
            >
              <video autoPlay loop muted playsInline
                className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                style={{ filter: 'grayscale(1) contrast(1.2)' }}>
                <source src={v.src} type="video/mp4" />
              </video>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.6), transparent, rgba(10,10,10,0.6))' }} />
              <span className="absolute bottom-2 left-3 font-mono text-[0.55rem] tracking-widest uppercase" style={{ color: 'rgba(242,242,242,0.3)' }}>{v.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

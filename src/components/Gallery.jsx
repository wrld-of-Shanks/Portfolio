import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const blogs = [
  {
    cat: 'AI · RAG',
    title: 'Building a RAG Pipeline for 59K Legal Documents',
    summary: 'How I chunked, embedded, and indexed the Indian legal corpus for semantic retrieval — architecture decisions, failures, and what actually worked.',
    date: '2026',
  },
  {
    cat: 'Full Stack · CMS',
    title: 'Building a Production CMS in React + Node',
    summary: 'JWT auth, MySQL, RSS feeds, and role-based access. A walkthrough of the Agribid CMS from schema design to deployment on Render.',
    date: '2026',
  },
  {
    cat: 'Vector Search',
    title: 'ChromaDB vs FAISS: What I Learned the Hard Way',
    summary: 'Practical comparison from building real apps — persistence, metadata filtering, query speed, and which one to reach for first.',
    date: '2025',
  },
  {
    cat: 'Startup',
    title: 'SeatSip: Building a F&B SaaS from Zero',
    summary: 'From market research to MVP — QR menus, table booking, real-time orders. What I\'d do differently and where we\'re going next.',
    date: '2026',
  },
]

export default function Gallery() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#F2F2F2' }}
      id="blogs"
    >
      {/* Image collage bg */}
      <div className="absolute inset-0 z-0">
        <img src="/assets/gallery-bg.jpeg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(242,242,242,0.675)' }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-accent text-[0.68rem] tracking-[0.2em] uppercase">Writing</span>
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '0.04em', lineHeight: 0.95, color: '#0A0A0A' }}>
            THOUGHTS &<br /><span className="text-accent">TECHNICAL LOGS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-10">
          {blogs.map((blog, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-5 sm:p-7 cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.8)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-[1px]" style={{ background: '#C40000' }} />
                <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: '#C40000' }}>{blog.cat}</span>
              </div>
              <h3 className="font-display text-[1.35rem] tracking-[0.04em] leading-[1.2] mb-3" style={{ color: '#0A0A0A' }}>{blog.title}</h3>
              <p className="text-[0.8rem] leading-[1.7]" style={{ color: '#555' }}>{blog.summary}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-mono text-[0.65rem]" style={{ color: '#777' }}>{blog.date}</span>
                <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase" style={{ color: '#C40000' }}>Read →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

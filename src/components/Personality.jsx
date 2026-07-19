import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const traits = [
  {
    id: 'curious',
    title: 'Curious',
    desc: 'I ask why and what if long after everyone else has moved on.',
  },
  {
    id: 'builder',
    title: 'Builder',
    desc: "I'd rather ship something imperfect than admire a plan on a whiteboard.",
  },
  {
    id: 'entrepreneurial',
    title: 'Entrepreneurial',
    desc: 'I see gaps as opportunities and pivot quickly when data says to.',
  },
  {
    id: 'confident',
    title: 'Confident',
    desc: "I trust my judgment and I'm secure enough to say when I'm wrong.",
  },
  {
    id: 'natural-leader',
    title: 'Natural Leader',
    desc: 'People look to me when things get messy. I lead by doing first.',
  },
]

export default function Personality() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#C40000' }}
      id="personality"
    >
      {/* Video bg */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/assets/horizontal-video.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Red gradient overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(rgba(196,0,0,0.85), rgba(196,0,0,0.82), rgba(196,0,0,0.9))' }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-white/40" />
            <span className="font-mono text-white/60 text-[0.68rem] tracking-[0.2em] uppercase">Who I Am</span>
          </div>
          <h2 className="font-display mb-12" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '0.04em', lineHeight: 0.95 }}>
            <span style={{ color: '#0A0A0A' }}>PERSONALITY</span><br />
            <span style={{ color: '#FFFFFF' }}>PROFILE</span>
          </h2>
        </motion.div>

        <div className="flex justify-center items-start">
          {/* Trait list */}
          <div className="flex flex-col gap-5 items-center">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.id}
                initial={{ x: -20, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  className="font-display text-[clamp(1.5rem,3vw,2.2rem)] tracking-[0.08em] block text-center"
                  style={{ color: '#FFFFFF' }}
                  whileHover={{ x: 8, color: '#0A0A0A', transition: { duration: 0.15 } }}
                >
                  {trait.title}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const sections = [
  { id: 'hero', label: 'SD.', name: 'Home' },
  { id: 'about', label: '02', name: 'About' },
  { id: 'experience', label: '03', name: 'Experience' },
  { id: 'projects', label: '04', name: 'Projects' },
  { id: 'blogs', label: '05', name: 'Writing' },
  { id: 'personality', label: '06', name: 'Personality' },
  { id: 'hobbies', label: '07', name: 'Hobbies' },
  { id: 'contact', label: '08', name: 'Contact' },
]

export default function Nav({ currentSection }) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Top nav bar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          padding: '1rem 2rem',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(242,242,242,0.06)',
        }}
      >
        <a href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-display no-underline" style={{ fontSize: '1.5rem', letterSpacing: '0.15em', color: '#F2F2F2' }}>
          SD<span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {sections.slice(1).map((s) => (
            <motion.a
              key={s.id}
              href={`#${s.id}`}
              onClick={e => { e.preventDefault(); scrollTo(s.id) }}
              className="font-mono text-[0.78rem] font-medium tracking-[0.12em] uppercase no-underline relative"
              whileHover={{ color: '#C40000' }}
              animate={{ color: currentSection === s.id ? '#F2F2F2' : 'rgba(242,242,242,0.4)' }}
              transition={{ duration: 0.2 }}
            >
              {s.name}
              {currentSection === s.id && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[1px]"
                  style={{ background: '#C40000' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        <a href="#contact"
          onClick={e => { e.preventDefault(); scrollTo('contact') }}
          className="font-mono text-[0.68rem] tracking-[0.08em] no-underline transition-all duration-200 shrink-0"
          style={{
            padding: '0.45rem 1.2rem',
            border: '1px solid #C40000',
            color: '#C40000',
            background: 'transparent',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.target.style.background = '#C40000'; e.target.style.color = '#0A0A0A' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#C40000' }}>
          Let's Talk →
        </a>
      </motion.nav>

      {/* Side dot nav */}
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-4 hidden lg:flex"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.7s' }}
      >
        {sections.map((section) => {
          const isActive = currentSection === section.id
          return (
            <button key={section.id} onClick={() => scrollTo(section.id)}
              className="group flex items-center gap-3 py-1"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label={`Navigate to ${section.name}`}>
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[0.55rem] tracking-widest"
                    style={{ color: '#C40000' }}
                  >
                    {section.name}
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="flex items-center gap-1">
                <motion.div
                  animate={{
                    width: isActive ? 16 : 6,
                    height: isActive ? 2 : 1,
                    background: isActive ? '#C40000' : 'rgba(140,140,140,0.5)',
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </button>
          )
        })}
      </div>
    </>
  )
}

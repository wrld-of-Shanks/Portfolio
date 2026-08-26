import React, { useState, useEffect, useCallback } from 'react'
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
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = useCallback((id) => {
    setMobileOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }, [])

  return (
    <>
      {/* Top nav bar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          padding: '1rem clamp(1rem, 3vw, 2rem)',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(242,242,242,0.06)',
        }}
      >
        <a href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-display no-underline" style={{ fontSize: '1.5rem', letterSpacing: '0.15em', color: '#F2F2F2' }}>
          SD<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
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

        <div className="flex items-center gap-4">
          {/* Desktop CTA */}
          <a href="#contact"
            onClick={e => { e.preventDefault(); scrollTo('contact') }}
            className="hidden md:inline-block font-mono text-[0.68rem] tracking-[0.08em] no-underline transition-all duration-200 shrink-0"
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center relative z-[60]"
            style={{ width: 44, height: 44, background: 'none', border: 'none' }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[1.5px] origin-center"
              style={{ background: '#F2F2F2' }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[1.5px] my-[5px]"
              style={{ background: '#F2F2F2' }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[1.5px] origin-center"
              style={{ background: '#F2F2F2' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center md:hidden"
            style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <nav className="flex flex-col items-center gap-2">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={e => { e.preventDefault(); scrollTo(s.id) }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 no-underline py-3"
                  style={{ minHeight: 44 }}
                >
                  <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase"
                    style={{ color: currentSection === s.id ? '#C40000' : 'rgba(242,242,242,0.3)' }}>
                    {s.label}
                  </span>
                  <span className="font-display text-[1.6rem] tracking-[0.08em]"
                    style={{ color: currentSection === s.id ? '#F2F2F2' : 'rgba(242,242,242,0.5)' }}>
                    {s.name}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo('contact') }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 font-mono text-[0.72rem] tracking-[0.1em] uppercase no-underline"
              style={{
                padding: '0.7rem 2rem',
                border: '1px solid #C40000',
                color: '#C40000',
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Let's Talk →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side dot nav — desktop only */}
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

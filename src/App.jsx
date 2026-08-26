import React, { useRef, useEffect, useState, useCallback } from 'react'
import SplashScreen from './components/SplashScreen'
import Scene from './components/Scene'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Work from './components/Work'
import Gallery from './components/Gallery'
import Personality from './components/Personality'
import Hobby from './components/Hobby'
import Contact from './components/Contact'
import MusicToggle from './components/MusicToggle'

const sectionIds = ['hero', 'about', 'experience', 'projects', 'blogs', 'personality', 'hobbies', 'contact']

export default function App() {
  const scrollProgress = useRef(0)
  const mousePos = useRef({ x: 0, y: 0 })
  const [currentSection, setCurrentSection] = useState('hero')
  const [showSplash, setShowSplash] = useState(true)
  const lastScrollY = useRef(0)
  const rafId = useRef(null)

  const handleMouseMove = useCallback((e) => {
    mousePos.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = docHeight > 0 ? scrollY / docHeight : 0

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.3) {
          setCurrentSection(id)
          break
        }
      }

      lastScrollY.current = scrollY
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  return (
    <div className="relative bg-base min-h-screen">
      {/* Splash screen */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* Global 3D canvas layer */}
      <Scene scrollProgress={scrollProgress} mousePos={mousePos} />

      {/* Dither texture overlay */}
      <div className="dither-overlay" />

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden opacity-[0.015]">
        <div className="w-full h-[2px] bg-white/30 animate-scanline" />
      </div>

      {/* Navigation */}
      <Nav currentSection={currentSection} />

      {/* Fixed habit tracker video — top right, hidden on small mobile */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hidden sm:block"
        style={{
          position: 'fixed',
          top: '48px',
          right: '-34px',
          width: 'clamp(80px, 9vw, 120px)',
          zIndex: 100,
          borderRadius: '12px',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      >
        <source src="/assets/traffic-light-alpha.mov" type="video/mp4; codecs=hvc1" />
        <source src="/assets/480162cdb5de45bab663c0f46d74b1df.webm" type="video/webm" />
      </video>

      {/* Sections */}
      <MusicToggle />
      <main className="relative z-10">
        <section id="hero">
          <Hero scrollProgress={scrollProgress} />
        </section>
        <About />
        <Skills />
        <Work />
        <Gallery />
        <Personality />
        <Hobby />
        <Contact />
      </main>
    </div>
  )
}

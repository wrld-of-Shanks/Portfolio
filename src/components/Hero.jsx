import React from 'react'
import { motion } from 'motion/react'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#0A0A0A' }}
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="absolute top-1/2 left-1/2 object-cover"
          style={{
            width: '100vh',
            height: '100vw',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
          }}
        >
          <source src="/assets/dinner.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0A 25%, rgba(10,10,10,0.7) 55%, transparent)' }} />

      {/* Giant SHANKAR text — behind portrait, solid white fading from bottom */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="select-none whitespace-nowrap"
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(112px, 19vw, 300px)',
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, white 50%)',
            maskImage: 'linear-gradient(to top, transparent 0%, white 50%)',
          }}
        >
          SHANKAR
        </motion.span>
      </div>

      {/* Profile portrait — centered */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center z-[3] pointer-events-none"
      >
        <img
          src="/assets/profile.png"
          alt="Shankar Darur"
          className="w-auto object-contain"
          style={{
            maxHeight: '85vh',
            filter: 'drop-shadow(0 0 80px rgba(196,0,0,0.08))',
          }}
        />
      </motion.div>

      {/* Bottom gradient — on top of portrait */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] z-[4] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0A 30%, transparent)' }} />

      {/* Bottom-left name block */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 left-8 md:left-12 z-[5]"
      >
        <h1 className="font-display leading-none" style={{ fontSize: 'clamp(3.5rem, 7vw, 7.5rem)', letterSpacing: '0.05em' }}>
          SHANKAR<br />
          <span className="text-accent">DARUR</span>
        </h1>
      </motion.div>

      {/* Bottom-right tagline — separate block, never overlaps portrait */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 right-8 md:right-12 z-[5] text-right"
      >
        <div className="font-mono text-accent text-[0.75rem] tracking-[0.14em] uppercase mb-2">
          AI Engineer · Full Stack Dev
        </div>
        <div className="text-[0.88rem] leading-relaxed max-w-[240px] ml-auto" style={{ color: 'rgba(242,242,242,0.6)' }}>
          Building intelligent systems that bridge research and real-world impact.
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.58rem] tracking-[0.22em] uppercase" style={{ color: 'rgba(242,242,242,0.3)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-11"
          style={{ background: 'linear-gradient(to bottom, #C40000, transparent)' }}
        />
      </motion.div>
    </section>
  )
}

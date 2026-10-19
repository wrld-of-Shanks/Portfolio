import React from 'react'
import { motion } from 'motion/react'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '100dvh', background: '#0A0A0A' }}
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/dinner.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0A 25%, rgba(10,10,10,0.7) 55%, transparent)' }} />

      {/* Giant SHANKAR text — behind portrait */}
      <div className="absolute inset-x-0 top-[18%] flex justify-center pointer-events-none z-[2]
        sm:inset-0 sm:items-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="select-none whitespace-nowrap"
          style={{
            fontFamily: '"Planet Kosmos", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 16vw, 18.1rem)',
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, white 50%)',
            maskImage: 'linear-gradient(to top, transparent 0%, white 50%)',
            textShadow: '0 6px 12px rgba(0,0,0,0.5)',
          }}
        >
          SHANKAR
        </motion.span>
      </div>

      {/* Profile portrait */}
      <div className="absolute inset-0 z-[3] pointer-events-none" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <motion.img
          src="/assets/profile.png"
          alt="Shankar Darur"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-auto object-contain hero-photo-mobile sm:h-full"
          style={{ filter: 'drop-shadow(0 0 80px rgba(196,0,0,0.08))', marginBottom: '-100px' }}
        />
      </div>

      {/* Bottom gradient — on top of portrait */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] z-[4] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0A 30%, transparent)' }} />

      {/* Bottom-left name block — tight on mobile */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-2 left-5 z-[5]
          sm:bottom-8 sm:left-8 md:left-12"
      >
        <h1 className="font-display leading-none" style={{ fontSize: 'clamp(2.5rem, 7vw, 7.5rem)', letterSpacing: '0.05em' }}>
          SHANKAR M.<br />
          <span className="text-accent">DARUR</span>
        </h1>
      </motion.div>

      {/* Bottom-right tagline — desktop only */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 right-5 sm:bottom-10 sm:right-8 md:right-12 z-[5] text-right hidden sm:block"
      >
        <div className="font-mono text-accent text-[0.75rem] tracking-[0.14em] uppercase mb-2">
          AI/ML Engineer · Founder, SEATSIP
        </div>
        <div className="text-[0.88rem] leading-relaxed max-w-[240px] ml-auto" style={{ color: 'rgba(242,242,242,0.6)' }}>
          Building intelligent systems that bridge research and real-world impact.
        </div>
      </motion.div>

    </section>
  )
}

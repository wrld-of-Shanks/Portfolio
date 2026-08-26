import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const floatAnimation = prefersReducedMotion
  ? {}
  : {
      y: [0, -14, 0],
    }

const floatTransition = prefersReducedMotion
  ? {}
  : {
      y: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    }

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('splash') // splash | exiting | done

  const enter = useCallback(() => {
    if (phase !== 'splash') return
    setPhase('exiting')
  }, [phase])

  useEffect(() => {
    if (phase === 'exiting') {
      const t = setTimeout(() => onComplete(), 500)
      return () => clearTimeout(t)
    }
  }, [phase, onComplete])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        enter()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enter])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="splash-stage"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050505',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={enter}
          role="button"
          tabIndex={0}
          aria-label="Enter site"
        >
          {/* hint text */}
          <motion.p
            className="splash-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              position: 'absolute',
              top: 'clamp(28px, 8vh, 72px)',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(9px, 1.2vw, 12px)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#888',
              pointerEvents: 'none',
            }}
          >
            click the card
          </motion.p>

          {/* card image */}
          <motion.div
            className="splash-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              ...(phase === 'exiting' ? { scale: 1.05, filter: 'brightness(1.3)' } : {}),
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.3 },
            }}
            style={{
              width: 'clamp(200px, 36vw, 340px)',
              aspectRatio: '3 / 4',
              position: 'relative',
            }}
          >
            <motion.img
              src="/assets/raj.png"
              alt="SD card"
              draggable={false}
              animate={floatAnimation}
              transition={floatTransition}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 8px 32px rgba(196,0,0,0.15))',
                transition: 'filter 0.4s ease',
              }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { filter: 'drop-shadow(0 12px 40px rgba(196,0,0,0.25))' }
              }
            />
          </motion.div>

          {/* bottom copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: 'clamp(16px, 3vh, 40px)',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#555',
              pointerEvents: 'none',
            }}
          >
            &copy; {new Date().getFullYear()} Shankar
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function MusicToggle() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const savedTime = localStorage.getItem('music-time')
    if (savedTime) audio.currentTime = parseFloat(savedTime)

    const tryPlay = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }

    if (audio.readyState >= 2) {
      tryPlay()
    } else {
      audio.addEventListener('canplaythrough', tryPlay, { once: true })
    }

    const saveTime = () => {
      localStorage.setItem('music-time', audio.currentTime.toString())
    }
    window.addEventListener('beforeunload', saveTime)
    audio.addEventListener('pause', saveTime)
    audio.addEventListener('timeupdate', () => {
      if (!audio.paused) localStorage.setItem('music-time', audio.currentTime.toString())
    })

    return () => {
      window.removeEventListener('beforeunload', saveTime)
      audio.removeEventListener('pause', saveTime)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current
      if (!audio) return
      if (document.hidden && !audio.paused) {
        audio.pause()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return (
    <>
      <audio ref={audioRef} loop preload="auto" autoPlay src="/assets/theme.mp3" />
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[60] flex items-center justify-center rounded-full"
        style={{
          width: 44,
          height: 44,
          background: 'rgba(10,10,10,0.8)',
          border: '1px solid rgba(196,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.1, borderColor: '#C40000' }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-end gap-[3px]"
              style={{ height: 18 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.4, 1, 0.6, 0.9, 0.4] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-[3px] rounded-full origin-bottom"
                  style={{ height: '100%', background: '#C40000' }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C40000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

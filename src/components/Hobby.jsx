import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import ScrollingGallery, { GalleryLightbox } from './ScrollingGallery'

const hobbies = [
  {
    icon: '01',
    title: 'Drawings',
    desc: 'Sketching and doodling — from quick concepts to detailed illustrations. There\'s something meditative about putting pen to paper and letting ideas flow.',
    cover: '/assets/drawing-cover.jpeg',
    columns: [
      {
        direction: 1,
        images: [
          { id: 'draw-1', src: '/assets/drawing-1.jpeg' },
          { id: 'draw-2', src: '/assets/drawing-2.jpeg' },
          { id: 'draw-3', src: '/assets/drawing-3.jpeg' },
        ],
      },
      {
        direction: -1,
        images: [
          { id: 'draw-4', src: '/assets/drawing-4.jpeg' },
          { id: 'draw-5', src: '/assets/drawing-5.jpeg' },
          { id: 'draw-6', src: '/assets/drawing-6.jpeg' },
        ],
      },
      {
        direction: 1,
        images: [
          { id: 'draw-7', src: '/assets/drawing-1.jpeg' },
          { id: 'draw-8', src: '/assets/drawing-3.jpeg' },
          { id: 'draw-9', src: '/assets/drawing-5.jpeg' },
        ],
      },
    ],
  },
  {
    icon: '02',
    title: 'Listening Songs',
    desc: 'Music is my coding companion. Whether it\'s lo-fi beats for focus or heavy metal for energy, every playlist sets a different mood for building.',
    cover: '/assets/music-cover.jpeg',
    columns: [
      {
        direction: -1,
        images: [
          { id: 'music-1', src: '/assets/music-1.jpeg' },
          { id: 'music-2', src: '/assets/music-2.jpeg' },
          { id: 'music-3', src: '/assets/music-3.jpeg' },
        ],
      },
      {
        direction: 1,
        images: [
          { id: 'music-4', src: '/assets/music-4.jpeg' },
          { id: 'music-5', src: '/assets/music-5.jpeg' },
          { id: 'music-6', src: '/assets/music-1.jpeg' },
        ],
      },
      {
        direction: -1,
        images: [
          { id: 'music-7', src: '/assets/music-2.jpeg' },
          { id: 'music-8', src: '/assets/music-3.jpeg' },
          { id: 'music-9', src: '/assets/music-4.jpeg' },
        ],
      },
    ],
  },
  {
    icon: '03',
    title: 'Bike Ridings',
    desc: 'Hitting the open road on two wheels. The wind, the speed, the freedom — nothing clears my head faster than a long ride through the countryside.',
    cover: '/assets/bike-cover.jpeg',
    columns: [
      {
        direction: 1,
        images: [
          { id: 'bike-1', src: '/assets/bike-1.jpeg' },
          { id: 'bike-2', src: '/assets/bike-2.jpeg' },
          { id: 'bike-3', src: '/assets/bike-3.jpeg' },
        ],
      },
      {
        direction: -1,
        images: [
          { id: 'bike-4', src: '/assets/bike-4.jpeg' },
          { id: 'bike-5', src: '/assets/bike-1.jpeg' },
          { id: 'bike-6', src: '/assets/bike-2.jpeg' },
        ],
      },
      {
        direction: 1,
        images: [
          { id: 'bike-7', src: '/assets/bike-3.jpeg' },
          { id: 'bike-8', src: '/assets/bike-4.jpeg' },
          { id: 'bike-9', src: '/assets/bike-1.jpeg' },
        ],
      },
    ],
  },
]

export default function Hobby() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const [selected, setSelected] = useState(null)
  const [activeGallery, setActiveGallery] = useState(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#0A0A0A' }}
      id="hobbies"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/assets/hobby-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.85))' }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 py-24">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-accent text-[0.68rem] tracking-[0.2em] uppercase">Beyond Code</span>
          </div>
          <h2 className="font-display text-off-white mb-16" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '0.04em', lineHeight: 0.95 }}>
            WHAT I DO<br /><span className="text-accent">FOR FUN</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ alignItems: 'stretch' }}>
          {hobbies.map((hobby, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5 h-full"
            >
              {/* macOS window card */}
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group rounded-lg overflow-hidden cursor-pointer w-full flex flex-col h-full relative"
                style={{
                  background: hobby.cover ? 'transparent' : '#FFFFFF',
                  border: '1px solid rgba(196,0,0,0.2)',
                }}
                onClick={() => setActiveGallery(activeGallery === i ? null : i)}
              >
                {/* Cover image */}
                {hobby.cover && (
                  <>
                    <img
                      src={hobby.cover}
                      alt={hobby.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))' }} />
                  </>
                )}

                {/* Window dots */}
                <div className="flex p-2 gap-1.5 relative z-10">
                  <span className="bg-[#FF5F56] w-3 h-3 rounded-full"></span>
                  <span className="bg-[#FFBD2E] w-3 h-3 rounded-full"></span>
                  <span className="bg-[#27C93F] w-3 h-3 rounded-full"></span>
                </div>

                {/* Content */}
                <div className="px-4 pb-5 flex-1 flex flex-col relative z-10">
                  <div className="font-display text-[2rem] tracking-[0.08em] mb-2" style={{ color: hobby.cover ? '#FFF' : '#C40000', textShadow: hobby.cover ? '0 1px 3px rgba(0,0,0,0.5)' : 'none' }}>{hobby.icon}</div>
                  <h3 className="font-display text-[1.4rem] tracking-[0.05em] mb-2" style={{ color: hobby.cover ? '#FFF' : '#0A0A0A', textShadow: hobby.cover ? '0 1px 3px rgba(0,0,0,0.5)' : 'none' }}>{hobby.title}</h3>
                  <p className="text-[0.82rem] leading-[1.7]" style={{ color: hobby.cover ? 'rgba(255,255,255,0.85)' : '#666', textShadow: hobby.cover ? '0 1px 2px rgba(0,0,0,0.4)' : 'none' }}>{hobby.desc}</p>
                </div>
              </motion.div>

              {/* Scrolling gallery — shown when active */}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-screen scrolling gallery overlay */}
      <AnimatePresence>
        {activeGallery !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.95)' }}
          >
            {/* Back button + title */}
            <div className="flex items-center justify-between w-full z-10" style={{ maxWidth: 700, padding: '0 20px' }}>
              <button
                onClick={() => { setActiveGallery(null); setSelected(null) }}
                className="font-mono text-[0.72rem] tracking-[0.1em] uppercase px-4 py-2 rounded transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF' }}
                onMouseEnter={e => e.target.style.background = 'rgba(196,0,0,0.8)'}
                onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
              >
                ← Back
              </button>
              <span className="font-mono text-white/50 text-[0.72rem] tracking-[0.15em] uppercase">
                {hobbies[activeGallery].title}
              </span>
            </div>

            {/* Gallery centered */}
            <ScrollingGallery
              columns={hobbies[activeGallery].columns}
              onSelect={setSelected}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox — must be after overlay so it stacks on top */}
      <GalleryLightbox selected={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

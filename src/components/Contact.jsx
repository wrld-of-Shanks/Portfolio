import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export default function Contact() {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#F2F2F2' }}
      id="contact"
    >
      {/* Image collage bg */}
      <div className="absolute inset-0 z-0 grid grid-cols-4 grid-rows-3">
        <img src="/assets/home-x.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/click.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/branding.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/img-5.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/img-a.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/bold-minimalism.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/img-b.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/img-c.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/dither-sculpture.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/branding.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/ditherpunk.jpeg" alt="" className="w-full h-full object-cover" />
        <img src="/assets/shark.jpeg" alt="" className="w-full h-full object-cover" />
      </div>
      {/* Video bg */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/assets/contact-bg.mp4" type="video/mp4" />
        </video>
      </div>
      {/* White overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(242,242,242,0.44)' }} />

      <div className="relative z-10 max-w-[800px] w-full text-center px-8 py-24">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-accent text-[0.68rem] tracking-[0.2em] uppercase">Get In Touch</span>
            <div className="w-6 h-[1px] bg-accent" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '0.05em', lineHeight: 0.9, color: '#0A0A0A' }}
        >
          LET'S<br />BUILD<br /><span className="text-accent">TOGETHER</span>
        </motion.h2>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="text-[0.92rem] leading-[1.7] mb-8 max-w-[480px] mx-auto"
          style={{ color: '#111' }}
        >
          Open to AI engineering roles, freelance projects, and research collaborations.
        </motion.p>

        <motion.a
          href="mailto:shankar04darur@email.com"
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ color: '#C40000' }}
          className="font-display text-[1.2rem] tracking-[0.12em] mb-6 inline-block no-underline"
          style={{ color: '#111' }}
        >
          shankar04darur@EMAIL.COM
        </motion.a>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <div className="w-[6px] h-[6px] rounded-full animate-pulse-glow" style={{ background: '#C40000' }} />
          <span className="font-mono text-[0.7rem] tracking-[0.1em]" style={{ color: '#111' }}>
            Bagalkote, Karnataka, India · Open to Relocation
          </span>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-12"
        >
          <a href="/Shankar_Darur_CV.pdf" download
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 font-mono text-[0.72rem] tracking-[0.1em] uppercase transition-all duration-200 no-underline"
            style={{ background: '#C40000', color: '#FFFFFF', border: '1px solid #C40000', minHeight: 44 }}
            onMouseEnter={e => { e.target.style.background = 'transparent'; e.target.style.color = '#C40000' }}
            onMouseLeave={e => { e.target.style.background = '#C40000'; e.target.style.color = '#FFFFFF' }}>
            Download Resume →
          </a>
          <a href="https://github.com/wrld-of-Shanks" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 font-mono text-[0.72rem] tracking-[0.1em] uppercase transition-all duration-200 no-underline rounded-lg"
            style={{ background: 'rgba(255,255,255,0.4)', color: '#0A0A0A', border: '1px solid rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', minHeight: 44 }}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.7)'; e.target.style.borderColor = '#0A0A0A' }}
            onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.4)'; e.target.style.borderColor = 'rgba(0,0,0,0.15)' }}>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/shankar-m-darur07/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 font-mono text-[0.72rem] tracking-[0.1em] uppercase transition-all duration-200 no-underline rounded-lg"
            style={{ background: 'rgba(255,255,255,0.4)', color: '#0A0A0A', border: '1px solid rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', minHeight: 44 }}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.7)'; e.target.style.borderColor = '#0A0A0A' }}
            onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.4)'; e.target.style.borderColor = 'rgba(0,0,0,0.15)' }}>
            LinkedIn
          </a>
          <a href="https://www.instagram.com/wrld.of_shanks?igsh=bXZ3YjF1ZnBvbGo2" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 font-mono text-[0.72rem] tracking-[0.1em] uppercase transition-all duration-200 no-underline rounded-lg"
            style={{ background: 'rgba(255,255,255,0.4)', color: '#0A0A0A', border: '1px solid rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', minHeight: 44 }}
            onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.7)'; e.target.style.borderColor = '#0A0A0A' }}
            onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.4)'; e.target.style.borderColor = 'rgba(0,0,0,0.15)' }}>
            Instagram
          </a>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.84, ease: [0.16, 1, 0.3, 1] }}
          className="w-full p-6 text-center rounded-lg"
          style={{
            borderTop: '1px solid rgba(0,0,0,0.15)',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono text-[0.68rem] text-center md:text-left" style={{ color: '#0A0A0A' }}>
              © 2026 Shankar Darur · Built with intent.
            </span>
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
              {[
                { label: 'Top', href: '#hero' },
                { label: 'GitHub', href: 'https://github.com/wrld-of-Shanks' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shankar-m-darur07/' },
                { label: 'Instagram', href: 'https://www.instagram.com/wrld.of_shanks?igsh=bXZ3YjF1ZnBvbGo2' },
              ].map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[0.68rem] tracking-[0.08em] transition-colors duration-200 no-underline"
                  style={{ color: '#0A0A0A' }}
                  onMouseEnter={e => e.target.style.color = '#C40000'}
                  onMouseLeave={e => e.target.style.color = '#0A0A0A'}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

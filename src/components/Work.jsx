import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

const projectData = {
  projects: [
    {
      num: '01', name: 'SPECTER',
      desc: 'RAG framework for Indian legal assistance. 59,630 document chunks, semantic retrieval, 146-sample evaluation. Bridges the access gap in Indian legal information.',
      arch: 'React → FastAPI → LangChain → ChromaDB → SentenceTransformers',
      tags: ['RAG', 'LangChain', 'ChromaDB', 'FastAPI', 'Research'],
      links: [{ label: 'GitHub', url: '#' }, { label: 'Paper', url: '#' }],
    },
    {
      num: '02', name: 'Agribid CMS',
      desc: 'Full-featured content management system for an agricultural B2B platform. JWT auth, RSS news integration, MySQL-backed REST API, live in production.',
      arch: 'React → Node/Express → MySQL → JWT → Render',
      tags: ['React', 'Node.js', 'MySQL', 'Production'],
      links: [{ label: 'GitHub', url: '#' }],
    },
    {
      num: '03', name: 'AI PDF Chatbot',
      desc: 'Document Q&A system built with LangChain and ChromaDB. Upload any PDF and get accurate, cited answers via semantic search over the document.',
      arch: 'React → FastAPI → LangChain → ChromaDB → OpenAI',
      tags: ['LangChain', 'ChromaDB', 'OpenAI'],
      links: [{ label: 'GitHub', url: '#' }, { label: 'Demo', url: '#' }],
    },
    {
      num: '04', name: 'SeatSip',
      desc: 'F&B startup — table booking + digital ordering SaaS for restaurants. Full-stack app with QR-based menus, real-time order management, and analytics dashboard.',
      arch: 'Next.js → Node → PostgreSQL → Firebase → Vercel',
      tags: ['Startup', 'Next.js', 'PostgreSQL', 'SaaS'],
      links: [{ label: 'Website', url: '#' }],
    },
  ],
  designs: [
    { num: 'D/01', name: 'Portfolio Site', desc: 'This very portfolio — cinematic dark design, glassmorphism, particle canvas background, and smooth reveal animations.', tags: ['HTML', 'CSS', 'JS', 'Design'] },
    { num: 'D/02', name: 'SPECTER UI', desc: 'Legal chatbot interface — dark-themed, search-first layout inspired by legal document aesthetics. Built in React with Tailwind.', tags: ['React', 'Tailwind', 'UI Design'] },
    { num: 'D/03', name: 'SeatSip Brand', desc: 'Brand identity and UI design for the SeatSip F&B SaaS — logo, color system, component library, and marketing landing page.', tags: ['Branding', 'Figma', 'Tailwind'] },
  ],
  experiments: [
    { num: 'X/01', name: 'Blender/Unity Game', desc: '26-day solo game dev project — 3D environment in Blender, gameplay logic in Unity with C#. First-person exploration experience.', tags: ['Unity', 'Blender', 'C#', '3D'] },
  ],
}

const tabs = ['Projects', 'Designs', 'Experiments']
const tabKeys = ['projects', 'designs', 'experiments']

export default function Work() {
  const [activeTab, setActiveTab] = useState('projects')
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [projectsList, setProjectsList] = useState(projectData.projects)
  const [isLoading, setIsLoading] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)

  useEffect(() => {
    async function fetchGitHubRepos() {
      const username = 'wrld-of-Shanks'
      const cacheKey = `github_repos_${username}`
      const cacheExpiryKey = `github_repos_${username}_expiry`
      const cacheDuration = 60 * 60 * 1000 // 1 hour

      // Check cache first
      const cachedData = localStorage.getItem(cacheKey)
      const cachedExpiry = localStorage.getItem(cacheExpiryKey)
      const now = Date.now()

      if (cachedData && cachedExpiry && now < parseInt(cachedExpiry)) {
        try {
          const parsedRepos = JSON.parse(cachedData)
          processAndSetProjects(parsedRepos)
          return
        } catch (e) {
          console.error("Error parsing cached repos", e)
        }
      }

      setIsLoading(true)
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`)
        if (!response.ok) {
          throw new Error(`GitHub API returned status: ${response.status}`)
        }
        const repos = await response.json()
        
        // Cache the successful response
        localStorage.setItem(cacheKey, JSON.stringify(repos))
        localStorage.setItem(cacheExpiryKey, (now + cacheDuration).toString())
        
        processAndSetProjects(repos)
      } catch (err) {
        console.error("Failed to fetch GitHub repos, falling back to static data:", err)
        processAndSetProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    function processAndSetProjects(repos) {
      // Filter out forks
      const sourceRepos = repos.filter(repo => !repo.fork)

      const staticProjects = [...projectData.projects]
      const mergedList = []
      const matchedRepoUrls = new Set()

      // Match static projects with repos
      staticProjects.forEach((staticProj) => {
        const matchingRepo = sourceRepos.find(repo => {
          const sName = staticProj.name.toLowerCase().replace(/[^a-z0-9]/g, '')
          const rName = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '')
          return sName === rName || rName.includes(sName) || sName.includes(rName)
        })

        if (matchingRepo) {
          mergedList.push({
            ...staticProj,
            visitUrl: matchingRepo.html_url
          })
          matchedRepoUrls.add(matchingRepo.html_url)
        } else {
          // If no matching repo, find if there is an explicit GitHub link in static proj links
          const ghLink = staticProj.links?.find(l => l.label === 'GitHub')?.url
          mergedList.push({
            ...staticProj,
            visitUrl: ghLink && ghLink !== '#' ? ghLink : undefined
          })
        }
      })

      // Add remaining github source repos
      sourceRepos.forEach(repo => {
        if (!matchedRepoUrls.has(repo.html_url)) {
          let tags = repo.topics || []
          if (tags.length === 0 && repo.language) {
            tags = [repo.language]
          }
          
          mergedList.push({
            name: repo.name.toUpperCase().replace(/[-_]/g, ' '),
            desc: repo.description || 'No description provided.',
            tags: tags.slice(0, 4),
            visitUrl: repo.html_url,
            isGithubRepo: true
          })
        }
      })

      // Assign sequential numbers
      const finalProjects = mergedList.map((proj, idx) => ({
        ...proj,
        num: String(idx + 1).padStart(2, '0')
      }))

      setProjectsList(finalProjects)
    }

    fetchGitHubRepos()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#0A0A0A' }}
      id="projects"
    >
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/assets/work-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0A0A0A, transparent 15%, transparent 85%, #0A0A0A)' }} />
        <div className="absolute inset-0" style={{           background: 'rgba(0,0,0,0.05)' }} />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-accent" />
            <span className="font-mono text-accent text-[0.68rem] tracking-[0.2em] uppercase">Portfolio</span>
          </div>
          <h2 className="font-display text-off-white" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '0.04em', lineHeight: 0.95 }}>
            WHAT I'VE<br /><span className="text-accent">BUILT</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10" style={{ borderBottom: '1px solid rgba(242,242,242,0.08)' }}>
          {tabs.map((tab, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setActiveTab(tabKeys[i])
                setShowAllProjects(false)
              }}
              className="font-mono text-[0.72rem] tracking-[0.1em] uppercase py-3 px-5 relative"
              style={{
                background: 'transparent',
                border: 'none',
                color: activeTab === tabKeys[i] ? '#F2F2F2' : 'rgba(242,242,242,0.3)',
                cursor: 'pointer',
                bottom: '-1px',
              }}
              whileHover={{ color: '#F2F2F2' }}
              whileTap={{ scale: 0.97 }}
            >
              {tab}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: '#C40000' }}
                animate={{ scaleX: activeTab === tabKeys[i] ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.button>
          ))}
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {(activeTab === 'projects' ? (showAllProjects ? projectsList : projectsList.slice(0, 4)) : projectData[activeTab]).map((project, i) => (
              <motion.div
                key={`${activeTab}-${i}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative p-7 flex flex-col justify-between"
                style={{
                  background: 'rgba(242,242,242,0.03)',
                  border: '1px solid rgba(242,242,242,0.06)',
                  backdropFilter: 'blur(12px)',
                  cursor: 'default',
                }}
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                  style={{ background: 'linear-gradient(to right, #C40000, #E8342E)' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                />

                <div className="flex-1 flex flex-col justify-start">
                  <div className="font-display text-accent text-[0.85rem] tracking-[0.15em] opacity-50 mb-3">{project.num}</div>
                  <h3 className="font-display text-off-white text-[1.8rem] tracking-[0.05em] mb-2">{project.name}</h3>
                  <p className="text-[0.83rem] leading-[1.7] mb-4" style={{ color: 'rgba(242,242,242,0.55)' }}>{project.desc}</p>

                  {project.arch && (
                    <div className="p-3 mb-4 font-mono text-[0.65rem] leading-[1.8]"
                      style={{ background: 'rgba(196,0,0,0.04)', border: '1px solid rgba(196,0,0,0.1)', color: '#C40000', opacity: 0.8 }}>
                      {project.arch}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, ti) => (
                      <span key={ti} className="font-mono text-[0.65rem] px-2.5 py-1 tracking-[0.06em]"
                        style={{ border: '1px solid rgba(196,0,0,0.25)', color: '#C40000' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {project.visitUrl && (
                  <motion.a
                    href={project.visitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase py-2 px-4 w-fit"
                    style={{
                      border: '1px solid rgba(242, 242, 242, 0.12)',
                      color: '#F2F2F2',
                      background: 'rgba(242, 242, 242, 0.02)',
                    }}
                    whileHover={{
                      borderColor: '#C40000',
                      backgroundColor: 'rgba(196, 0, 0, 0.08)',
                      color: '#F2F2F2',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Visit Repo</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* See More / Back toggle button */}
        {activeTab === 'projects' && projectsList.length > 4 && (
          <div className="flex justify-center mt-10">
            <motion.button
              onClick={() => {
                if (showAllProjects) {
                  setShowAllProjects(false)
                  sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
                } else {
                  setShowAllProjects(true)
                }
              }}
              className="font-mono text-[0.72rem] tracking-[0.15em] uppercase py-3 px-8 relative"
              style={{
                background: 'transparent',
                border: '1px solid rgba(242, 242, 242, 0.15)',
                color: '#F2F2F2',
                cursor: 'pointer',
              }}
              whileHover={{
                borderColor: '#C40000',
                backgroundColor: 'rgba(196, 0, 0, 0.08)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              {showAllProjects ? 'Back' : 'See More'}
            </motion.button>
          </div>
        )}

        {/* Horizontal video strip */}
        <div className="mt-12 sm:mt-16 flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {[
            { src: '/assets/vid-3.mp4', label: 'Reel 01' },
            { src: '/assets/vid-5.mp4', label: 'Reel 02' },
            { src: '/assets/vid-7.mp4', label: 'Reel 03' },
            { src: '/assets/vid-9.mp4', label: 'Reel 04' },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[400px] aspect-video relative overflow-hidden group snap-start"
              style={{ border: '1px solid rgba(242,242,242,0.06)' }}
            >
              <video autoPlay loop muted playsInline loading="lazy" decoding="async"
                className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                style={{ filter: 'grayscale(1) contrast(1.2)' }}>
                <source src={v.src} type="video/mp4" />
              </video>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.6), transparent, rgba(10,10,10,0.6))' }} />
              <span className="absolute bottom-2 left-3 font-mono text-[0.55rem] tracking-widest uppercase" style={{ color: 'rgba(242,242,242,0.3)' }}>{v.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

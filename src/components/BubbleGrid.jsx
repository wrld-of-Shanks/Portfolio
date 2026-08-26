import React, { useRef, useEffect } from 'react'

const SIZE = 100
const STEP_X = 120
const STEP_Y = 100
const ROW_OFFSET = 60
const ROWS = 16
const COLS = 9

const INNER_R = 95
const OUTER_R = 270
const MIN_SCALE = 0.08

const BUBBLE_SOURCES = [
  '/assets/bubble-1.mp4',
  '/assets/bubble-2.mp4',
  '/assets/bubble-3.mp4',
  '/assets/bubble-4.mp4',
  '/assets/bubble-5.mp4',
  '/assets/bubble-6.mp4',
  '/assets/bubble-7.mp4',
  '/assets/bubble-8.mp4',
  '/assets/bubble-9.mp4',
  '/assets/bubble-10.mp4',
  '/assets/bubble-11.mp4',
  '/assets/bubble-12.mp4',
  '/assets/bubble-13.mp4',
  '/assets/bubble-14.mp4',
  'radial-gradient(circle at 30% 30%, #ffcf4d, #d98f00)',
  'radial-gradient(circle at 30% 30%, #7fb3ff, #1c3f7a)',
  'radial-gradient(circle at 30% 30%, #ff8a65, #b23c17)',
  'radial-gradient(circle at 30% 30%, #b0b0b0, #2b2b2b)',
  'radial-gradient(circle at 30% 30%, #f5f5f5, #b5b5b5)',
  'radial-gradient(circle at 30% 30%, #ff5252, #7a0d0d)',
  'radial-gradient(circle at 30% 30%, #8affc1, #1a7a4a)',
  'radial-gradient(circle at 30% 30%, #d9a7ff, #5b1a8a)',
]

export default function BubbleGrid() {
  const deviceRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const device = deviceRef.current
    const gridLayer = gridRef.current
    if (!device || !gridLayer) return

    const devW = device.offsetWidth
    const devH = device.offsetHeight
    const centerX = devW / 2
    const centerY = devH / 2

    const bubbles = []
    let sourceIndex = 0

    for (let r = -2; r < ROWS; r++) {
      for (let c = -1; c < COLS; c++) {
        const left = c * STEP_X + (r % 2 ? ROW_OFFSET : 0) - 300
        const top = r * STEP_Y - 250

        const el = document.createElement('div')
        el.style.cssText = `
          position: absolute;
          width: ${SIZE}px;
          height: ${SIZE}px;
          border-radius: 50%;
          overflow: hidden;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
        `
        el.style.left = left + 'px'
        el.style.top = top + 'px'

        const source = BUBBLE_SOURCES[sourceIndex % BUBBLE_SOURCES.length]
        if (/\.(mp4|webm|mov)$/i.test(source)) {
          const vid = document.createElement('video')
          vid.src = source
          vid.loop = true
          vid.autoplay = true
          vid.muted = true
          vid.playsInline = true
          vid.style.cssText = 'width:100%;height:100%;object-fit:cover;'
          el.appendChild(vid)
        } else {
          el.style.background = source
        }
        sourceIndex++

        gridLayer.appendChild(el)

        bubbles.push({
          el, left, top,
          phase: Math.random() * Math.PI * 2,
          breathePhase: Math.random() * Math.PI * 2,
          breatheDur: 4 + Math.random() * 2,
          floatDur: 5 + Math.random() * 4,
          floatPhaseX: Math.random() * Math.PI * 2,
          floatPhaseY: Math.random() * Math.PI * 2,
          hover: 0,
          hoverTarget: 0,
          bounce: 0,
        })

        const bo = bubbles[bubbles.length - 1]
        el.addEventListener('pointerenter', () => { bo.hoverTarget = 1 })
        el.addEventListener('pointerleave', () => { bo.hoverTarget = 0 })
        el.addEventListener('pointerdown', () => { bo.bounce = 1 })
      }
    }

    let panX = 0, panY = 0
    let velX = 0, velY = 0
    let dragging = false
    let lastX = 0, lastY = 0, lastT = 0
    let mouseX = centerX, mouseY = centerY
    let mouseActive = false

    const onPointerDown = (e) => {
      dragging = true
      device.style.cursor = 'grabbing'
      lastX = e.clientX
      lastY = e.clientY
      lastT = performance.now()
      velX = 0
      velY = 0
      device.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e) => {
      const rect = device.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      mouseActive = true
      if (!dragging) return
      const now = performance.now()
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const dt = Math.max(now - lastT, 1)
      panX += dx
      panY += dy
      velX = (dx / dt) * 16
      velY = (dy / dt) * 16
      lastX = e.clientX
      lastY = e.clientY
      lastT = now
    }

    const endDrag = () => {
      dragging = false
      device.style.cursor = 'grab'
    }

    const onPointerLeave = () => { mouseActive = false }

    device.addEventListener('pointerdown', onPointerDown)
    device.addEventListener('pointermove', onPointerMove)
    device.addEventListener('pointerup', endDrag)
    device.addEventListener('pointercancel', endDrag)
    device.addEventListener('pointerleave', onPointerLeave)

    let rafId
    const tick = (t) => {
      if (!dragging) {
        panX += velX
        panY += velY
        velX *= 0.94
        velY *= 0.94
      }

      const rotate = Math.sin(t / 9000) * 1.2
      gridLayer.style.transform =
        `translate(${panX}px, ${panY}px) rotate(${rotate}deg)`

      const parX = mouseActive ? (mouseX - centerX) / centerX : 0
      const parY = mouseActive ? (mouseY - centerY) / centerY : 0

      for (const b of bubbles) {
        const floatX = Math.sin(t / 1000 / b.floatDur + b.floatPhaseX) * 5
        const floatY = Math.cos(t / 1000 / b.floatDur + b.floatPhaseY) * 6
        const parDepth = 6
        const px = parX * parDepth
        const py = parY * parDepth

        const absX = b.left + SIZE / 2 + panX + floatX + px
        const absY = b.top + SIZE / 2 + panY + floatY + py
        const dist = Math.hypot(absX - centerX, absY - centerY)

        let falloff = 1
        if (dist > INNER_R) {
          const f = (dist - INNER_R) / (OUTER_R - INNER_R)
          falloff = Math.max(MIN_SCALE, 1 - f)
        }

        const breathe = 1 + Math.sin(t / 1000 / b.breatheDur + b.breathePhase) * 0.03

        b.hover += (b.hoverTarget - b.hover) * 0.18
        const hoverScale = 1 + b.hover * 0.14

        b.bounce *= 0.88
        const bounceScale = 1 - b.bounce * 0.08 + Math.sin(b.bounce * 6) * b.bounce * 0.05

        const scale = falloff * breathe * hoverScale * bounceScale

        b.el.style.opacity = falloff < 0.1 ? falloff / 0.1 : 1
        b.el.style.transform =
          `translate(${floatX + px}px, ${floatY + py}px) scale(${scale})`
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      device.removeEventListener('pointerdown', onPointerDown)
      device.removeEventListener('pointermove', onPointerMove)
      device.removeEventListener('pointerup', endDrag)
      device.removeEventListener('pointercancel', endDrag)
      device.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <div
      ref={deviceRef}
      style={{
        width: 380,
        height: 460,
        background: 'transparent',
        border: 'none',
        borderRadius: 0,
        overflow: 'visible',
        position: 'relative',
        touchAction: 'none',
        userSelect: 'none',
        cursor: 'grab',
      }}
    >
      <div
        ref={gridRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 2000,
          height: 2000,
          willChange: 'transform',
        }}
      />
    </div>
  )
}

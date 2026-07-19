import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  ditherVertexShader,
  ditherFragmentShader,
  particleVertexShader,
  particleFragmentShader,
  scanlineVertexShader,
  scanlineFragmentShader,
} from '../shaders/ditherShaders'

const ACCENT = new THREE.Color(0xC40000)

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}

function DitheredSculpture({ scrollProgress, mousePos, isMobile }) {
  const meshRef = useRef()
  const materialRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uAccentColor: { value: ACCENT },
    uDitherScale: { value: 1.5 },
  }), [])

  useFrame((state) => {
    if (!materialRef.current) return
    const t = state.clock.elapsedTime

    materialRef.current.uniforms.uTime.value = t
    materialRef.current.uniforms.uScrollProgress.value = scrollProgress.current
    materialRef.current.uniforms.uMouse.value.set(
      mousePos.current.x,
      mousePos.current.y
    )

    if (!meshRef.current) return
    const scroll = scrollProgress.current

    meshRef.current.rotation.y = t * 0.15 + scroll * Math.PI * 0.5
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.05 + scroll * 0.1

    const baseScale = 1.0
    const scrollScale = THREE.MathUtils.lerp(1.0, 0.55, Math.min(scroll * 2, 1))
    const scale = baseScale * scrollScale
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05)

    const targetX = THREE.MathUtils.lerp(0, 2.5, Math.min(scroll * 3, 1))
    const targetY = THREE.MathUtils.lerp(0, 0.3, Math.min(scroll * 2, 1))
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX + mousePos.current.x * 0.15,
      0.04
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY + mousePos.current.y * 0.1,
      0.04
    )
  })

  const geometry = useMemo(() => {
    const detail = isMobile ? 3 : 6
    const geo = new THREE.IcosahedronGeometry(1.6, detail)
    const posAttr = geo.attributes.position
    const arr = posAttr.array

    for (let i = 0; i < posAttr.count; i++) {
      const x = arr[i * 3]
      const y = arr[i * 3 + 1]
      const z = arr[i * 3 + 2]

      const noise1 = Math.sin(x * 2.5 + y * 1.5) * 0.15
      const noise2 = Math.cos(z * 3.0 + x * 0.8) * 0.12
      const noise3 = Math.sin(y * 4.0) * 0.08

      const headBulge = Math.max(0, 1.0 - Math.abs(y - 0.6) * 1.2)
      const neckPinch = Math.exp(-Math.pow(y + 0.2, 2) * 3.0) * 0.3
      const shoulderSpread = Math.exp(-Math.pow(y + 0.6, 2) * 2.0) * 0.4

      const displacement = noise1 + noise2 + noise3 + headBulge * 0.2 - neckPinch + shoulderSpread

      const r = Math.sqrt(x * x + z * z)
      arr[i * 3] += (x / r) * displacement * 0.5
      arr[i * 3 + 1] += displacement * 0.3
      arr[i * 3 + 2] += (z / r) * displacement * 0.5
    }

    geo.computeVertexNormals()
    return geo
  }, [isMobile])

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={ditherVertexShader}
        fragmentShader={ditherFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

function RedParticles({ scrollProgress, isMobile }) {
  const pointsRef = useRef()
  const count = isMobile ? 80 : 200

  const { positions, sizes, phases, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      sizes[i] = Math.random() * 3 + 1
      phases[i] = Math.random() * Math.PI * 2
      speeds[i] = Math.random() * 0.3 + 0.1
    }

    return { positions, sizes, phases, speeds }
  }, [count])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uColor: { value: ACCENT },
  }), [])

  useFrame((state) => {
    if (!pointsRef.current) return
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uScrollProgress.value = scrollProgress.current
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          count={count}
          array={phases}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={count}
          array={speeds}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function WireframeRing({ scrollProgress }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.z = t * 0.2
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.3
    const s = THREE.MathUtils.lerp(0.8, 0.3, Math.min(scrollProgress.current * 2, 1))
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.03)
  })

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      <mesh>
        <torusGeometry args={[2.2, 0.008, 8, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.005, 8, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function ScanPlane({ scrollProgress }) {
  const meshRef = useRef()
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  }), [])

  useFrame((state) => {
    if (!meshRef.current) return
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uScrollProgress.value = scrollProgress.current
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -3]} renderOrder={999}>
      <planeGeometry args={[10, 10, 1, 1]} />
      <shaderMaterial
        vertexShader={scanlineVertexShader}
        fragmentShader={scanlineFragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

function SceneContent({ scrollProgress, mousePos, isMobile }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 3]} color={ACCENT} intensity={0.5} />

      <DitheredSculpture scrollProgress={scrollProgress} mousePos={mousePos} isMobile={isMobile} />
      <RedParticles scrollProgress={scrollProgress} isMobile={isMobile} />
      <WireframeRing scrollProgress={scrollProgress} />
      {!isMobile && <ScanPlane scrollProgress={scrollProgress} />}
    </>
  )
}

export default function Scene({ scrollProgress, mousePos }) {
  const containerRef = useRef()
  const [inView, setInView] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="scene-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none' }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        frameloop={inView ? 'always' : 'never'}
      >
        <SceneContent scrollProgress={scrollProgress} mousePos={mousePos} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}

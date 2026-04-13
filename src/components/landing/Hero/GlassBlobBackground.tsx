'use client'

import { useEffect, useRef, useState } from 'react'

// ── Color Palettes ─────────────────────────────────────────────────────
// ── Constants ──────────────────────────────────────────────────────────
const MOBILE_BREAKPOINT = 768
const COLOR_CYCLE_DURATION = 20
const BLOB_BLUR = '22px'
const ORB_BLUR = '48px'

const BLUE_PALETTE = {
  orb1: { center: 'rgba(34, 139, 230, 0.5)', edge: 'rgba(30, 100, 200, 0.30)' },
  orb2: {
    center: 'rgba(100, 180, 255, 0.4)',
    edge: 'rgba(34, 139, 230, 0.20)',
  },
  orb3: { center: 'rgba(70, 150, 230, 0.25)', edge: 'transparent' },
}

const ORANGE_PALETTE = {
  orb1: { center: 'rgba(247, 103, 7, 0.55)', edge: 'rgba(232, 89, 12, 0.35)' },
  orb2: { center: 'rgba(253, 126, 20, 0.45)', edge: 'rgba(247, 103, 7, 0.25)' },
  orb3: { center: 'rgba(255, 146, 43, 0.30)', edge: 'transparent' },
}

// ── Types ─────────────────────────────────────────────────────────────
interface BlobConfig {
  id: string
  left: number
  top: number
  width: string
  height: string
  speed: number
  phase: number
}

interface OrbConfig {
  id: string
  width: string
  height: string
  top?: string
  bottom?: string
  left?: string
  right?: string
  centerX: number
  centerY: number
}

const DESKTOP_BLOBS: BlobConfig[] = [
  {
    id: 'primary',
    left: 58,
    top: 48,
    width: '54%',
    height: '80%',
    speed: 1.0,
    phase: 0,
  },
  {
    id: 'accent',
    left: 12,
    top: 72,
    width: '36%',
    height: '55%',
    speed: 1.35,
    phase: 2.4,
  },
]

const MOBILE_BLOBS: BlobConfig[] = [
  {
    id: 'primary',
    left: 50,
    top: 35,
    width: '70%',
    height: '40%',
    speed: 1.0,
    phase: 0,
  },
  {
    id: 'accent',
    left: 50,
    top: 78,
    width: '55%',
    height: '30%',
    speed: 1.35,
    phase: 2.4,
  },
]

const DESKTOP_ORBS: OrbConfig[] = [
  {
    id: 'orb1',
    width: '55%',
    height: '70%',
    top: '-15%',
    right: '-5%',
    centerX: 40,
    centerY: 40,
  },
  {
    id: 'orb2',
    width: '45%',
    height: '55%',
    bottom: '-10%',
    left: '-5%',
    centerX: 60,
    centerY: 60,
  },
  {
    id: 'orb3',
    width: '30%',
    height: '40%',
    top: '30%',
    left: '35%',
    centerX: 50,
    centerY: 50,
  },
]

const MOBILE_ORBS: OrbConfig[] = [
  {
    id: 'orb1',
    width: '80%',
    height: '35%',
    top: '-5%',
    left: '10%',
    centerX: 50,
    centerY: 30,
  },
  {
    id: 'orb2',
    width: '60%',
    height: '30%',
    bottom: '-5%',
    left: '20%',
    centerX: 50,
    centerY: 70,
  },
  {
    id: 'orb3',
    width: '40%',
    height: '25%',
    top: '50%',
    left: '30%',
    centerX: 50,
    centerY: 50,
  },
]

export function morphRadius(t: number, speed: number, phase: number): string {
  const s = t * speed + phase
  const a = 45 + 20 * Math.sin(s * 0.3)
  const b = 55 + 18 * Math.cos(s * 0.23)
  const c = 40 + 22 * Math.sin(s * 0.19)
  const d = 60 + 15 * Math.cos(s * 0.27)
  return `${a}% ${100 - a}% ${d}% ${100 - d}% / ${b}% ${c}% ${100 - c}% ${100 - b}%`
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function parseRgba(rgba: string): {
  r: number
  g: number
  b: number
  a: number
} {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) return { r: 0, g: 0, b: 0, a: 1 }
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] ? parseFloat(match[4]) : 1,
  }
}

export function buildRgba(r: number, g: number, b: number, a: number): string {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(2)})`
}

export function lerpRgba(color1: string, color2: string, t: number): string {
  const c1 = parseRgba(color1)
  const c2 = parseRgba(color2)
  return buildRgba(
    lerp(c1.r, c2.r, t),
    lerp(c1.g, c2.g, t),
    lerp(c1.b, c2.b, t),
    lerp(c1.a, c2.a, t)
  )
}

export function GlassBlobBackground() {
  const blobRefs = useRef<Array<HTMLDivElement | null>>([null, null])
  const orb1Ref = useRef<HTMLDivElement | null>(null)
  const orb2Ref = useRef<HTMLDivElement | null>(null)
  const orb3Ref = useRef<HTMLDivElement | null>(null)

  const [isMobile, setIsMobile] = useState(false)
  const [supportsBackdrop, setSupportsBackdrop] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const style = document.createElement('style')
    style.textContent = '.backdrop-filter-test { backdrop-filter: blur(1px); }'
    document.head.appendChild(style)
    const computed = window.getComputedStyle(document.body)
    setSupportsBackdrop(typeof computed.backdropFilter !== 'undefined')
    document.head.removeChild(style)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const BLOBS = isMobile ? MOBILE_BLOBS : DESKTOP_BLOBS
  const ORBS = isMobile ? MOBILE_ORBS : DESKTOP_ORBS
  const blobsRef = useRef(BLOBS)
  const orbsRef = useRef(ORBS)

  useEffect(() => {
    blobsRef.current = BLOBS
    orbsRef.current = ORBS
  }, [BLOBS, ORBS])

  useEffect(() => {
    const blobs = blobRefs.current
    const start = performance.now()
    let raf = 0
    let pausedTime = 0
    let lastTime = performance.now()
    const CYCLE_DURATION = COLOR_CYCLE_DURATION

    function animate() {
      const now = performance.now()
      /* v8 ignore start */
      if (document.hidden) {
        lastTime = now
        raf = requestAnimationFrame(animate)
        return
      }
      /* v8 ignore end */
      const t = (now - start - pausedTime) / 1000
      const currentBlobs = blobsRef.current
      const currentOrbs = orbsRef.current

      for (let i = 0; i < currentBlobs.length; i++) {
        const el = blobs[i]
        if (el !== null) {
          el.style.borderRadius = morphRadius(
            t,
            currentBlobs[i].speed,
            currentBlobs[i].phase
          )
        }
      }

      const cycleProgress = (t % CYCLE_DURATION) / CYCLE_DURATION
      const blendFactor =
        (Math.sin(cycleProgress * Math.PI * 2 - Math.PI / 2) + 1) / 2

      if (orb1Ref.current !== null) {
        const center = lerpRgba(
          BLUE_PALETTE.orb1.center,
          ORANGE_PALETTE.orb1.center,
          blendFactor
        )
        const edge = lerpRgba(
          BLUE_PALETTE.orb1.edge,
          ORANGE_PALETTE.orb1.edge,
          blendFactor
        )
        orb1Ref.current.style.background = `radial-gradient(circle at ${currentOrbs[0].centerX}% ${currentOrbs[0].centerY}%, ${center} 0%, ${edge} 45%, transparent 75%)`
      }

      if (orb2Ref.current !== null) {
        const center = lerpRgba(
          BLUE_PALETTE.orb2.center,
          ORANGE_PALETTE.orb2.center,
          blendFactor
        )
        const edge = lerpRgba(
          BLUE_PALETTE.orb2.edge,
          ORANGE_PALETTE.orb2.edge,
          blendFactor
        )
        orb2Ref.current.style.background = `radial-gradient(circle at ${currentOrbs[1].centerX}% ${currentOrbs[1].centerY}%, ${center} 0%, ${edge} 50%, transparent 75%)`
      }

      if (orb3Ref.current !== null) {
        const center = lerpRgba(
          BLUE_PALETTE.orb3.center,
          ORANGE_PALETTE.orb3.center,
          blendFactor
        )
        orb3Ref.current.style.background = `radial-gradient(circle at ${currentOrbs[2].centerX}% ${currentOrbs[2].centerY}%, ${center} 0%, transparent 70%)`
      }

      raf = requestAnimationFrame(animate)
    }

    const handleVisibilityChange = () => {
      /* v8 ignore start */
      if (document.hidden) {
        pausedTime += performance.now() - lastTime
      } else {
        lastTime = performance.now()
      }
      /* v8 ignore end */
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    raf = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const orbRefs = [orb1Ref, orb2Ref, orb3Ref]

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* ── Coloured glow orbs (behind the glass) ─────────────── */}
      {ORBS.map((orb, idx) => {
        const initialBlend =
          (Math.sin(
            ((0 % COLOR_CYCLE_DURATION) / COLOR_CYCLE_DURATION) * Math.PI * 2 -
              Math.PI / 2
          ) +
            1) /
          2
        let initialBackground = 'rgba(34,139,230,0.5)'
        if (idx === 0) {
          const center = lerpRgba(
            BLUE_PALETTE.orb1.center,
            ORANGE_PALETTE.orb1.center,
            initialBlend
          )
          const edge = lerpRgba(
            BLUE_PALETTE.orb1.edge,
            ORANGE_PALETTE.orb1.edge,
            initialBlend
          )
          initialBackground = `radial-gradient(circle at ${orb.centerX}% ${orb.centerY}%, ${center} 0%, ${edge} 45%, transparent 75%)`
        } else if (idx === 1) {
          const center = lerpRgba(
            BLUE_PALETTE.orb2.center,
            ORANGE_PALETTE.orb2.center,
            initialBlend
          )
          const edge = lerpRgba(
            BLUE_PALETTE.orb2.edge,
            ORANGE_PALETTE.orb2.edge,
            initialBlend
          )
          initialBackground = `radial-gradient(circle at ${orb.centerX}% ${orb.centerY}%, ${center} 0%, ${edge} 50%, transparent 75%)`
        } else if (idx === 2) {
          const center = lerpRgba(
            BLUE_PALETTE.orb3.center,
            ORANGE_PALETTE.orb3.center,
            initialBlend
          )
          initialBackground = `radial-gradient(circle at ${orb.centerX}% ${orb.centerY}%, ${center} 0%, transparent 70%)`
        }
        return (
          <div
            key={orb.id}
            ref={orbRefs[idx]}
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: orb.width,
              height: orb.height,
              top: orb.top,
              bottom: orb.bottom,
              left: orb.left,
              right: orb.right,
              background: initialBackground,
              filter: `blur(${ORB_BLUR})`,
            }}
          />
        )
      })}

      {/* ── Morphing glassmorphism blobs ──────────────────────── */}
      {BLOBS.map((cfg, idx) => (
        <div
          key={cfg.id}
          ref={(el) => {
            blobRefs.current[idx] = el
          }}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: `${cfg.left}%`,
            top: `${cfg.top}%`,
            width: cfg.width,
            height: cfg.height,
            transform: 'translate(-50%, -50%)',
            borderRadius: morphRadius(0, cfg.speed, cfg.phase),
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: supportsBackdrop ? `blur(${BLOB_BLUR})` : 'none',
            WebkitBackdropFilter: supportsBackdrop
              ? `blur(${BLOB_BLUR})`
              : 'none',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: [
              '0 8px 40px rgba(0,0,0,0.12)',
              'inset 0 1px 0 rgba(255,255,255,0.18)',
              'inset 0 -1px 0 rgba(255,255,255,0.06)',
            ].join(', '),
            willChange: 'border-radius',
          }}
        />
      ))}
    </div>
  )
}

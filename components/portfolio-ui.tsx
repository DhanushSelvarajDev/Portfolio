'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BriefcaseBusiness, Check, Copy, Cpu, Info, Layers3, Mail, Zap } from 'lucide-react'

/* ---------- Frame: a named, selectable block on the canvas ---------- */
export function Frame({ id, label, className = '', children }: { id: string; label: string; className?: string; children: ReactNode }) {
  return (
    <div className={`frame-wrap ${className}`}>
      <span className="frame-label">{label}</span>
      <section id={id} className="frame">
        <i /><i /><i /><i />
        {children}
      </section>
    </div>
  )
}

/* ---------- Hero name: letters stretch toward the pointer ---------- */
type Axis = { w: number; g: number }

export function StretchName({ text }: { text: string }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const letters = refs.current
    const base: Axis = { w: 78, g: 800 }
    const cur: Axis[] = letters.map(() => ({ ...base }))
    const tgt: Axis[] = letters.map(() => ({ ...base }))
    let raf = 0
    let pointer: { x: number; y: number } | null = null
    let sweepStart = 0

    const aim = () => {
      letters.forEach((el, i) => {
        if (!el) return
        if (!pointer) { tgt[i] = { ...base }; return }
        const r = el.getBoundingClientRect()
        const dx = Math.abs(pointer.x - (r.left + r.width / 2)) / (window.innerWidth * 0.2)
        const dy = Math.abs(pointer.y - (r.top + r.height / 2)) / (window.innerHeight * 0.8)
        const k = Math.max(0, 1 - dx) * Math.max(0, 1 - dy)
        tgt[i] = { w: 62 + 58 * k, g: 700 + 200 * k }
      })
    }

    const frame = (now: number) => {
      if (sweepStart) {
        const t = (now - sweepStart) / 1500
        if (t >= 1) { sweepStart = 0; pointer = null } else {
          const box = letters[0]?.parentElement?.getBoundingClientRect()
          if (box) pointer = { x: box.left - 120 + (box.width + 240) * t, y: box.top + box.height / 2 }
        }
      }
      aim()
      let moving = sweepStart !== 0
      cur.forEach((c, i) => {
        c.w += (tgt[i].w - c.w) * 0.16
        c.g += (tgt[i].g - c.g) * 0.16
        if (Math.abs(tgt[i].w - c.w) > 0.1) moving = true
        letters[i]?.style.setProperty('font-variation-settings', `"wdth" ${c.w.toFixed(1)}, "wght" ${c.g.toFixed(0)}`)
      })
      raf = moving ? requestAnimationFrame(frame) : 0
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }

    const onMove = (e: PointerEvent) => { if (e.pointerType === 'touch') return; sweepStart = 0; pointer = { x: e.clientX, y: e.clientY }; kick() }
    const onLeave = () => { pointer = null; kick() }
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)

    const start = window.setTimeout(() => { sweepStart = performance.now(); kick() }, 1100)
    return () => {
      window.clearTimeout(start)
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <h1 className="stretch-name" aria-label={text}>
      <span aria-hidden="true" className="stretch-row">
        {text.split('').map((ch, i) => (
          <span key={i} ref={(el) => { refs.current[i] = el }}>{ch}</span>
        ))}
      </span>
    </h1>
  )
}

/* ---------- Live local clock ---------- */
export function LocalClock({ place }: { place: string }) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 20000)
    return () => window.clearInterval(id)
  }, [])
  return <span>{place}{time ? `, ${time}` : ''}</span>
}

/* ---------- Copy email with confirmation ---------- */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setState('copied') } catch { setState('failed') }
    window.setTimeout(() => setState('idle'), 2200)
  }
  return (
    <div className="copy-email">
      <button type="button" onClick={copy} className="copy-btn">
        <span className="copy-addr">{email}</span>
        <span className="copy-state" aria-live="polite">
          {state === 'copied' ? <><Check /> Copied</> : state === 'failed' ? 'Copy failed. Select it manually' : <><Copy /> Copy email</>}
        </span>
      </button>
      <a href={`mailto:${email}`} className="copy-open">Open in mail app</a>
    </div>
  )
}

/* ---------- Name tag that trails the visitor's pointer ---------- */
export function YouTag() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    if (!el) return
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18
      el.style.transform = `translate(${x + 18}px, ${y + 20}px)`
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0
    }
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; el.style.opacity = '1'; if (!raf) raf = requestAnimationFrame(loop) }
    const leave = () => { el.style.opacity = '0' }
    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave) }
  }, [])
  return <div ref={ref} className="you-tag" aria-hidden="true">You</div>
}

/* ---------- Bottom toolbar navigation ---------- */
const TOOLS = [
  { id: 'top', label: 'Intro', Icon: Zap },
  { id: 'about', label: 'About', Icon: Info },
  { id: 'capabilities', label: 'Capabilities', Icon: Layers3 },
  { id: 'journey', label: 'Journey', Icon: BriefcaseBusiness },
  { id: 'strengths', label: 'Strengths', Icon: Cpu },
  { id: 'contact', label: 'Contact', Icon: Mail },
]

export function Toolbar() {
  const [active, setActive] = useState('top')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    TOOLS.forEach(({ id }) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <nav className="toolbar" aria-label="Sections">
      {TOOLS.map(({ id, label, Icon }) => (
        <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined} title={label}>
          <Icon /><span>{label}</span>
        </a>
      ))}
    </nav>
  )
}

/* ---------- Capabilities accordion ---------- */
export type Capability = { name: string; line: string; tech: string[] }

export function Capabilities({ items }: { items: Capability[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="cap-list">
      {items.map((c, i) => (
        <div key={c.name} className={`cap-row ${open === i ? 'is-open' : ''}`} data-build="scroll">
          <button type="button" aria-expanded={open === i} aria-controls={`cap-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="cap-name">{c.name}</span>
            <span className="cap-plus" aria-hidden="true" />
          </button>
          <div id={`cap-${i}`} className="cap-body" role="region">
            <div>
              <p>{c.line}</p>
              <ul>{c.tech.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------- Journey: line fills as you scroll ---------- */
export function Journey({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const on = () => {
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height))
      el.style.setProperty('--p', String(p))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])
  return <div ref={ref} className="journey">{children}</div>
}

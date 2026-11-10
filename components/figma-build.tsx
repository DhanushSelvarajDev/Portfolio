'use client'

import { useEffect } from 'react'

/**
 * Figma-multiplayer style "live build" animation.
 * - Tiny named cursors fly in, drag a blue selection box over each element
 *   (handles + size pill), then the element pops in and the frame disappears.
 * - Hero is built on load; everything else is built as it scrolls into view.
 * - A few ambient cursors keep wandering around the viewport.
 */

const PEOPLE = [
  { name: 'Dhanush', color: '#3478f6' },
  { name: 'Design', color: '#f24e1e' },
  { name: 'Dev', color: '#14ae5c' },
  { name: 'AI', color: '#8b5cf6' },
  { name: 'QA', color: '#f5a623' },
]

const HERO_TARGETS = '[data-build="hero"]'
const SCROLL_TARGETS = '[data-build="scroll"]'

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const EASE = 'cubic-bezier(.65,0,.25,1)'

function cursorHtml(p: { name: string; color: string }, tag = true) {
  return `<svg width="18" height="18" viewBox="0 0 18 18"><path d="M2 1.5l12 6.2-5.2 1.4-2.1 5.1z" fill="${p.color}" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>${tag ? `<span style="background:${p.color}">${p.name}</span>` : ''}`
}

function cursorEl(p: { name: string; color: string }, tag = true) {
  const el = document.createElement('div')
  el.className = 'fb-cursor'
  el.innerHTML = cursorHtml(p, tag)
  return el
}

export default function FigmaBuild() {

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('fb-js')

    const layer = document.createElement('div')
    layer.className = 'fb-layer'
    document.body.appendChild(layer)
    const timers: number[] = []
    const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)) }
    const built = new WeakSet<Element>()

    const build = (el: HTMLElement, delay: number) => {
      if (built.has(el)) return
      built.add(el)
      later(() => {
        const r = el.getBoundingClientRect()
        const x = r.left + window.scrollX
        const y = r.top + window.scrollY
        const w = r.width
        const h = r.height
        if (w < 4 || h < 4) { el.classList.remove('fb-pre'); return }
        const person = PEOPLE[Math.floor(Math.random() * PEOPLE.length)]
        const kind = /^(H[1-6]|P|SPAN|A)$/.test(el.tagName) ? 'Text' : el.querySelector('img') ? 'Image' : 'Frame'

        const box = document.createElement('div')
        box.className = 'fb-box'
        box.style.cssText = `left:${x}px;top:${y}px;width:0;height:0;--c:${person.color}`
        box.innerHTML = `<i></i><i></i><i></i><i></i><b>${kind}</b><em>${Math.round(w)} × ${Math.round(h)}</em>`
        const cur = cursorEl(person)
        layer.append(box, cur)

        const sx = rand(0, window.innerWidth - 40)
        const sy = window.scrollY + rand(-60, window.innerHeight)
        const dur = 1000
        cur.animate(
          [
            { transform: `translate(${sx}px,${sy}px)`, offset: 0 },
            { transform: `translate(${x}px,${y}px)`, offset: 0.45, easing: EASE },
            { transform: `translate(${x + w}px,${y + h}px)`, offset: 1 },
          ],
          { duration: dur, easing: EASE, fill: 'forwards' },
        )
        box.animate(
          [{ width: '0px', height: '0px', opacity: 0 }, { width: '0px', height: '0px', opacity: 1, offset: 0.45 }, { width: `${w}px`, height: `${h}px`, opacity: 1 }],
          { duration: dur, easing: EASE, fill: 'forwards' },
        )

        later(() => {
          el.classList.remove('fb-pre')
          el.classList.add('fb-in')
          box.classList.add('fb-done')
        }, dur + 60)
        later(() => {
          cur.animate(
            [{ transform: `translate(${x + w}px,${y + h}px)`, opacity: 1 }, { transform: `translate(${x + w + rand(40, 160)}px,${y + h + rand(30, 120)}px)`, opacity: 0 }],
            { duration: 700, easing: 'ease-in', fill: 'forwards' },
          )
        }, dur + 200)
        later(() => { box.remove(); cur.remove(); el.classList.remove('fb-in') }, dur + 1100)
      }, delay)
    }

    // Hide targets until built
    const hero = Array.from(document.querySelectorAll<HTMLElement>(HERO_TARGETS))
    const rest = Array.from(document.querySelectorAll<HTMLElement>(SCROLL_TARGETS))
    ;[...hero, ...rest].forEach((el) => el.classList.add('fb-pre'))

    hero.forEach((el, i) => build(el, 350 + i * 260))

    let batch = 0
    let batchTimer = 0
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          io.unobserve(entry.target)
          build(entry.target as HTMLElement, batch++ * 170)
        })
        window.clearTimeout(batchTimer)
        batchTimer = window.setTimeout(() => { batch = 0 }, 60)
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )
    rest.forEach((el) => io.observe(el))

    return () => {
      timers.forEach(window.clearTimeout)
      io.disconnect()
      layer.remove()
      root.classList.remove('fb-js')
      document.querySelectorAll('.fb-pre, .fb-in').forEach((e) => e.classList.remove('fb-pre', 'fb-in'))
    }
  }, [])

  return null
}

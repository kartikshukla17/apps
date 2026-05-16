'use client'

import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'saturate(180%) blur(14px)',
        WebkitBackdropFilter: 'saturate(180%) blur(14px)',
        backgroundColor: 'color-mix(in srgb, var(--color-canvas) 78%, transparent)',
        borderBottom: `1px solid ${scrolled ? 'var(--color-line)' : 'transparent'}`,
        transition: 'border-color var(--dur-base) var(--ease-out)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--width-wide)',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a
            href="https://kartikshukla.dev"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              color: 'var(--color-ink)',
              textDecoration: 'none',
            }}
          >
            Kartik Shukla
          </a>
          <span style={{ color: 'var(--color-faint)', fontSize: '14px', userSelect: 'none' }}>/</span>
          <span
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '14px',
              color: 'var(--color-muted)',
            }}
          >
            apps
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="status-dot" />
            <span
              className="mono"
              style={{
                fontSize: '11px',
                color: 'var(--color-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Available
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

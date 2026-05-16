'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'

export default function Base64Page() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  function run() {
    setError('')
    setCopied(false)
    if (!input.trim()) {
      setOutput('')
      return
    }
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      }
    } catch {
      setError(mode === 'encode' ? 'Could not encode input.' : 'Invalid Base64 string.')
      setOutput('')
    }
  }

  function swap() {
    const nextMode = mode === 'encode' ? 'decode' : 'encode'
    setMode(nextMode)
    setOutput('')
    setError('')
    setCopied(false)
  }

  function clear() {
    setInput('')
    setOutput('')
    setError('')
    setCopied(false)
  }

  async function copy() {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <Container width="base">
        <Eyebrow>Base64</Eyebrow>
        <h1
          className="display"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: '0.75rem' }}
        >
          Encode and decode.
        </h1>
        <p
          className="letter-body"
          style={{ marginTop: '0.5rem' }}
        >
          Convert plain text to Base64 or decode Base64 back to text. Handles Unicode.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '2.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-line)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}
          >
            {(['encode', 'decode'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setOutput(''); setError(''); setCopied(false) }}
                style={{
                  padding: '0.4rem 1rem',
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  border: 'none',
                  background: mode === m ? 'var(--color-accent)' : 'transparent',
                  color: mode === m ? 'var(--color-surface)' : 'var(--color-muted)',
                  transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <label className="tool-label" htmlFor="b64-input">
            {mode === 'encode' ? 'Plain text' : 'Base64 string'}
          </label>
          <textarea
            id="b64-input"
            className="tool-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={8}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            spellCheck={false}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <button className="btn-accent" onClick={run}>
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
          <button className="btn-ghost" onClick={clear}>Clear</button>
          {output && (
            <button className="btn-ghost" onClick={copy}>
              {copied ? 'Copied' : 'Copy output'}
            </button>
          )}
        </div>

        {error && (
          <div
            style={{
              marginTop: '1.25rem',
              padding: '0.75rem 1rem',
              background: 'rgba(160,60,40,0.08)',
              border: '1px solid rgba(160,60,40,0.2)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '12px',
              color: '#b05040',
            }}
          >
            {error}
          </div>
        )}

        {output && (
          <div style={{ marginTop: '1.5rem' }}>
            <span className="tool-label">
              {mode === 'encode' ? 'Encoded' : 'Decoded'}
            </span>
            <div className="tool-output">{output}</div>
          </div>
        )}
      </Container>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'

export default function JsonPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function format() {
    setError('')
    setCopied(false)
    if (!input.trim()) {
      setOutput('')
      return
    }
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }

  function minify() {
    setError('')
    setCopied(false)
    if (!input.trim()) {
      setOutput('')
      return
    }
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
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
        <Eyebrow>JSON formatter</Eyebrow>
        <h1
          className="display"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: '0.75rem' }}
        >
          Pretty-print JSON.
        </h1>
        <p
          className="letter-body"
          style={{ marginTop: '0.5rem' }}
        >
          Paste raw JSON to format or minify it. Validation errors appear inline.
        </p>

        <div style={{ marginTop: '2.5rem' }}>
          <label className="tool-label" htmlFor="json-input">Input</label>
          <textarea
            id="json-input"
            className="tool-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={14}
            placeholder='{"key": "value"}'
            spellCheck={false}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <button className="btn-accent" onClick={format}>Format</button>
          <button className="btn-ghost" onClick={minify}>Minify</button>
          <button className="btn-ghost" onClick={clear}>Clear</button>
          {output && (
            <button className="btn-ghost" onClick={copy}>
              {copied ? 'Copied' : 'Copy'}
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
            <span className="tool-label">Output</span>
            <pre className="tool-output" style={{ margin: 0 }}>{output}</pre>
          </div>
        )}
      </Container>
    </section>
  )
}

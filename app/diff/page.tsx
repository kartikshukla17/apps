'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'

type DiffOp = { type: 'equal' | 'insert' | 'delete'; value: string }

function diffLines(before: string, after: string): DiffOp[] {
  const a = before.split('\n')
  const b = after.split('\n')
  const m = a.length
  const n = b.length

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }

  const ops: DiffOp[] = []
  let i = m
  let j = n
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      ops.push({ type: 'equal', value: a[i - 1] })
      i--; j--
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      ops.push({ type: 'insert', value: b[j - 1] })
      j--
    } else {
      ops.push({ type: 'delete', value: a[i - 1] })
      i--
    }
  }
  return ops.reverse()
}

const LINE_COLORS: Record<DiffOp['type'], { bg: string; prefix: string; color: string }> = {
  equal:  { bg: 'transparent',                    prefix: '  ', color: 'var(--color-ink-soft)' },
  insert: { bg: 'rgba(95,110,63,0.12)',            prefix: '+ ', color: 'var(--color-accent)'   },
  delete: { bg: 'rgba(160,60,40,0.10)',            prefix: '- ', color: '#b05040'                },
}

export default function DiffPage() {
  const [before, setBefore] = useState('')
  const [after, setAfter] = useState('')
  const [ops, setOps] = useState<DiffOp[] | null>(null)

  function runDiff() {
    setOps(diffLines(before, after))
  }

  function clear() {
    setBefore('')
    setAfter('')
    setOps(null)
  }

  return (
    <section style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <Container width="wide">
        <Eyebrow>Diff viewer</Eyebrow>
        <h1
          className="display"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginTop: '0.75rem' }}
        >
          Side-by-side diff.
        </h1>
        <p
          className="letter-body"
          style={{ marginTop: '0.5rem', maxWidth: '36rem' }}
        >
          Paste two blocks of text below and compare them line by line.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginTop: '2.5rem',
          }}
        >
          <div>
            <label className="tool-label" htmlFor="before">Before</label>
            <textarea
              id="before"
              className="tool-input"
              value={before}
              onChange={e => setBefore(e.target.value)}
              rows={14}
              placeholder="Paste original text here..."
              spellCheck={false}
            />
          </div>
          <div>
            <label className="tool-label" htmlFor="after">After</label>
            <textarea
              id="after"
              className="tool-input"
              value={after}
              onChange={e => setAfter(e.target.value)}
              rows={14}
              placeholder="Paste changed text here..."
              spellCheck={false}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button className="btn-accent" onClick={runDiff}>Compare</button>
          <button className="btn-ghost" onClick={clear}>Clear</button>
        </div>

        {ops !== null && (
          <div style={{ marginTop: '2.5rem' }}>
            <span className="tool-label">Result</span>
            <div
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-line-soft)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
              }}
            >
              {ops.length === 0 ? (
                <div
                  style={{
                    padding: '1rem',
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: '13px',
                    color: 'var(--color-muted)',
                  }}
                >
                  No differences found.
                </div>
              ) : (
                ops.map((op, idx) => {
                  const c = LINE_COLORS[op.type]
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        backgroundColor: c.bg,
                        padding: '2px 1rem',
                        fontFamily: 'var(--font-jetbrains-mono), monospace',
                        fontSize: '13px',
                        lineHeight: 1.6,
                        color: c.color,
                        borderBottom: '1px solid transparent',
                      }}
                    >
                      <span style={{ opacity: 0.5, userSelect: 'none', minWidth: '1.5rem' }}>
                        {c.prefix}
                      </span>
                      <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                        {op.value || ' '}
                      </span>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}

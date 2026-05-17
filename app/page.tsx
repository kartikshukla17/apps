import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'

export default function Home() {
  return (
    <section style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <Container width="base">
        <Eyebrow>apps.kartikshukla.dev</Eyebrow>
        <h1
          className="display reveal"
          style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', marginTop: '1rem' }}
        >
          Tools that work.
        </h1>
        <p
          className="letter-body reveal reveal-delay-1"
          style={{ fontStyle: 'italic', marginTop: '0.75rem' }}
        >
          Every tool here started with someone searching "is there anything for this?"
        </p>

        <div className="reveal reveal-delay-2" style={{ marginTop: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0' }}>Tools</p>

          <a
            href="https://packguard.kartikshukla.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="work-row"
          >
            <div className="work-row-meta">
              <span className="tag-pill">npm</span>
              <span className="tag-pill">security</span>
              <span className="tag-pill">cli</span>
            </div>
            <div className="work-row-headline">
              <span className="work-row-title">PackGuard</span>
              <span className="work-arrow">↗</span>
            </div>
            <p className="tool-desc">
              Scans your npm tarball before publish. Catches AI config files (.claude, .cursor, .codex), embedded source maps, and high-entropy secrets. Runs entirely locally. Nothing leaves your machine.
            </p>
          </a>
        </div>

        <div
          className="reveal reveal-delay-3"
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-line-soft)',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '0.875rem' }}>The maker</p>
          <p
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'var(--color-ink-soft)',
              marginBottom: '1.25rem',
            }}
          >
            I&rsquo;m Kartik Shukla, a developer in Bengaluru. I notice what people
            keep searching for and build the missing tool. More at{' '}
            <a
              href="https://kartikshukla.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="letter-link"
              style={{ color: 'inherit' }}
            >
              kartikshukla.dev
            </a>
            .
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="https://kartikshukla.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ textDecoration: 'none' }}
            >
              Portfolio ↗
            </a>
            <a
              href="https://cal.com/kartikshukla"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
              style={{ textDecoration: 'none' }}
            >
              Book a call
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

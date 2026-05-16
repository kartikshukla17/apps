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
          Each one built for a specific job. Focused, fast, and complete.
        </p>
      </Container>
    </section>
  )
}

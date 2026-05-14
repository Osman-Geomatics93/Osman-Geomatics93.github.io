import Link from 'next/link'
import Nav from './components/Nav'
import Footer from './components/Footer'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        style={{
          paddingTop: '64px',
          minHeight: '100vh',
          backgroundColor: 'var(--bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div
            className="font-display font-extrabold"
            style={{
              fontSize: 'clamp(5rem, 15vw, 9rem)',
              color: 'var(--border-bright)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginBottom: '16px',
            }}
          >
            404
          </div>
          <h1
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              color: 'var(--text-1)',
              marginBottom: '16px',
            }}
          >
            Page not found
          </h1>
          <p
            style={{
              color: 'var(--text-2)',
              lineHeight: 1.7,
              marginBottom: '40px',
              fontSize: '0.95rem',
            }}
          >
            This coordinate doesn&apos;t exist on the map. Let&apos;s navigate back to known
            territory.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--accent)',
                color: '#070c14',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '12px 28px',
                borderRadius: '6px',
              }}
            >
              ← Home
            </Link>
            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid var(--border-bright)',
                color: 'var(--text-2)',
                fontWeight: 500,
                fontSize: '0.9rem',
                padding: '12px 28px',
                borderRadius: '6px',
              }}
            >
              View Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

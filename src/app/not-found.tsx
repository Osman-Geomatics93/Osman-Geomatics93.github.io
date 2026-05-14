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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Dot-grid texture */}
        <div
          aria-hidden="true"
          className="dot-grid"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }}
        />

        <div style={{ textAlign: 'center', maxWidth: '520px', position: 'relative' }}>
          {/* Satellite icon */}
          <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center', opacity: 0.5 }}>
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
              <rect x="24" y="24" width="16" height="16" rx="2" stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.08)"/>
              <line x1="4" y1="32" x2="24" y2="32" stroke="#10b981" strokeWidth="1.5"/>
              <line x1="40" y1="32" x2="60" y2="32" stroke="#10b981" strokeWidth="1.5"/>
              <rect x="1" y="27" width="7" height="10" rx="1.5" stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.1)"/>
              <rect x="56" y="27" width="7" height="10" rx="1.5" stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.1)"/>
              <line x1="32" y1="4" x2="32" y2="24" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3"/>
              <circle cx="32" cy="2" r="2" fill="#10b981"/>
            </svg>
          </div>

          {/* 404 */}
          <div
            className="font-display font-extrabold"
            style={{
              fontSize: 'clamp(6rem, 18vw, 10rem)',
              color: 'var(--accent)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginBottom: '4px',
            }}
          >
            404
          </div>

          {/* Section-label style tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '20px',
            }}
          >
            <span style={{ width: '20px', height: '1px', backgroundColor: 'var(--accent)', display: 'block' }} />
            Position Not Found
            <span style={{ width: '20px', height: '1px', backgroundColor: 'var(--accent)', display: 'block' }} />
          </div>

          <h1
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              color: 'var(--text-1)',
              marginBottom: '16px',
            }}
          >
            Outside Coverage Area
          </h1>

          <p
            style={{
              color: 'var(--text-2)',
              lineHeight: 1.75,
              marginBottom: '40px',
              fontSize: '0.95rem',
            }}
          >
            The coordinates you requested don&apos;t appear in our satellite imagery. Let&apos;s
            navigate you back to known territory.
          </p>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
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
                textDecoration: 'none',
              }}
            >
              ← Return Home
            </Link>
            {[
              { label: 'Projects', href: '/projects' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-bright)',
                  color: 'var(--text-2)',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Fake coordinates decoration */}
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              color: 'var(--text-3)',
              letterSpacing: '0.05em',
            }}
          >
            LAT: ——.——°N &nbsp;·&nbsp; LON: ——.——°E &nbsp;·&nbsp; ALT: N/A
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

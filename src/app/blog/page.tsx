import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RevealSection from '../components/RevealSection'
import AuroraBackground from '../components/AuroraBackground'
import BlogPostGrid from '../components/BlogPostGrid'
import { getAllPosts } from '../../lib/posts'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — Osman Ibrahim',
  description:
    'Technical articles on remote sensing, GIS, water productivity analysis, and geospatial Python — written from 8+ years of field experience.',
  openGraph: {
    title: 'Blog — Osman Ibrahim',
    description: 'Practical GIS and remote sensing guides from the field.',
    images: [{ url: '/api/og?title=Technical Blog&type=blog' }],
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const totalTags = Array.from(new Set(posts.flatMap((p) => p.tags))).length

  return (
    <>
      <Nav activePage="blog" />

      <main style={{ paddingTop: '64px' }}>

        {/* ═══════════════ HERO ═══════════════ */}
        <section
          className="dot-grid resp-section"
          style={{ backgroundColor: 'var(--bg)', padding: '0 24px', position: 'relative', overflow: 'hidden' }}
        >
          <AuroraBackground />

          <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p className="section-label">Writing</p>

            <h1
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(2.75rem, 5.5vw, 5rem)',
                color: 'var(--text-1)',
                lineHeight: 1.08,
                marginTop: '16px',
                letterSpacing: '-0.03em',
              }}
            >
              Technical
              <br />
              <span style={{ color: 'var(--accent)' }}>Articles</span>
            </h1>

            <p
              style={{
                color: 'var(--text-2)',
                maxWidth: '520px',
                marginTop: '20px',
                lineHeight: 1.75,
                fontSize: '1.05rem',
              }}
            >
              Practical guides on remote sensing, GIS workflows, water productivity,
              and open-source geospatial tools — written from 8+ years of field experience.
            </p>

            {/* Stats strip */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginTop: '40px' }}>
              {[
                { value: posts.length, label: 'Articles' },
                { value: totalTags, label: 'Topics covered' },
                { value: '8+', label: 'Years of field experience' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display font-bold" style={{ fontSize: '1.6rem', color: 'var(--accent)' }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ POSTS ═══════════════ */}
        <RevealSection>
          <section style={{ padding: '64px 24px 96px', backgroundColor: 'var(--bg)' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <BlogPostGrid posts={posts} />
            </div>
          </section>
        </RevealSection>

        {/* ═══════════════ CTA ═══════════════ */}
        <RevealSection>
          <section
            style={{
              padding: '64px 24px',
              backgroundColor: 'var(--bg)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                maxWidth: '640px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-border)',
                  marginBottom: '20px',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2
                className="font-display"
                style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '12px' }}
              >
                Have a question or want to collaborate?
              </h2>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '28px', fontSize: '0.95rem' }}>
                I'm always happy to discuss GIS, remote sensing, or water productivity projects.
                Reach out and let's talk.
              </p>
              <Link href="/contact" className="blog-cta-btn">
                Get in touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>
        </RevealSection>

      </main>

      <Footer />
    </>
  )
}

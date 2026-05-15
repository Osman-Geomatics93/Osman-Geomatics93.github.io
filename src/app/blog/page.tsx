import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RevealSection from '../components/RevealSection'
import { getAllPosts } from '../../lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Osman Ibrahim',
  description: 'Technical articles on remote sensing, GIS, water productivity analysis, and geospatial Python by Osman Ibrahim.',
  openGraph: {
    title: 'Blog — Osman Ibrahim',
    description: 'Technical articles on remote sensing, GIS, and geospatial Python.',
    images: [{ url: '/api/og?title=Technical Blog&type=blog' }],
  },
}

const TAG_COLORS: Record<string, string> = {
  WaPOR: '#10b981',
  FAO: '#10b981',
  'Water Productivity': '#10b981',
  Python: '#3b82f6',
  'Remote Sensing': '#3b82f6',
  'Google Earth Engine': '#f59e0b',
  'Sentinel-2': '#f59e0b',
  'Machine Learning': '#f59e0b',
  SVM: '#f59e0b',
  'Crop Mapping': '#f59e0b',
  'Accuracy Assessment': '#7e9ab5',
  'Land Cover': '#7e9ab5',
  Statistics: '#7e9ab5',
  QGIS: '#10b981',
}

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? '#6b7a99'
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <Nav activePage="blog" />

      <main style={{ paddingTop: '64px' }}>
        {/* Hero */}
        <section
          className="dot-grid resp-section"
          style={{ backgroundColor: 'var(--bg)', padding: '0 24px' }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p className="section-label">Writing</p>
            <h1
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: 'var(--text-1)',
                lineHeight: 1.1,
                marginTop: '16px',
              }}
            >
              Technical Articles
            </h1>
            <p
              style={{
                color: 'var(--text-2)',
                maxWidth: '540px',
                marginTop: '16px',
                lineHeight: 1.7,
                fontSize: '1rem',
              }}
            >
              Practical guides on remote sensing, GIS workflows, water productivity
              analysis, and open-source geospatial tools — written from field experience.
            </p>
          </div>
        </section>

        {/* Posts */}
        <RevealSection>
          <section style={{ padding: '48px 24px 96px', backgroundColor: 'var(--bg)' }}>
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>
              {posts.length === 0 ? (
                <p style={{ color: 'var(--text-3)', textAlign: 'center', padding: '64px 0' }}>
                  No posts yet — check back soon.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {posts.map((post, i) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <article
                        className="blog-post-row"
                        style={{
                          padding: '32px 0',
                          borderBottom: i < posts.length - 1 ? '1px solid var(--border)' : 'none',
                        }}
                      >
                        {/* Top row */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '14px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <span
                            style={{
                              width: '3px',
                              height: '3px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--text-3)',
                            }}
                          />
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
                            {post.readTime}
                          </span>
                        </div>

                        <h2
                          className="font-display"
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'var(--text-1)',
                            lineHeight: 1.3,
                            marginBottom: '10px',
                          }}
                        >
                          {post.title}
                        </h2>

                        <p
                          style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-2)',
                            lineHeight: 1.7,
                            marginBottom: '16px',
                          }}
                        >
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: '0.72rem',
                                color: tagColor(tag),
                                backgroundColor: `${tagColor(tag)}18`,
                                border: `1px solid ${tagColor(tag)}40`,
                                borderRadius: '4px',
                                padding: '2px 8px',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </RevealSection>
      </main>

      <Footer />
    </>
  )
}

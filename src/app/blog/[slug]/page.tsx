import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ReadingProgress from '../../components/ReadingProgress'
import ShareButtons from '../../components/ShareButtons'
import { getPost, getAllPosts, getAllSlugs } from '../../../lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Osman Ibrahim`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: `/api/og?title=${encodeURIComponent(post.title)}&type=blog` }],
    },
  }
}

const TAG_COLORS: Record<string, string> = {
  WaPOR: '#10b981', FAO: '#10b981', 'Water Productivity': '#10b981', QGIS: '#10b981',
  Python: '#3b82f6', 'Remote Sensing': '#3b82f6',
  'Google Earth Engine': '#f59e0b', 'Sentinel-2': '#f59e0b',
  'Machine Learning': '#f59e0b', SVM: '#f59e0b', 'Crop Mapping': '#f59e0b',
  'Accuracy Assessment': '#7e9ab5', 'Land Cover': '#7e9ab5', Statistics: '#7e9ab5',
}

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? '#6b7a99'
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2)
  const accent = post.coverColor ?? tagColor(post.tags[0] ?? '')

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <>
      <Nav activePage="blog" />
      <ReadingProgress />

      <main style={{ paddingTop: '64px' }}>

        {/* ═══════════════ HERO HEADER ═══════════════ */}
        <section
          className="dot-grid"
          style={{
            backgroundColor: 'var(--bg)',
            padding: '52px 24px 44px',
            borderBottom: '1px solid var(--border)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient glow from accent color */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-100px', right: '-100px',
              width: '500px', height: '500px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Left accent stripe */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: '4px',
              background: `linear-gradient(to bottom, ${accent}, ${accent}00)`,
            }}
          />

          <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative' }}>
            {/* Back link */}
            <Link href="/blog" className="blog-back-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              All Articles
            </Link>

            {/* Meta row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: accent,
                  backgroundColor: `${accent}15`,
                  border: `1px solid ${accent}35`,
                  borderRadius: '4px', padding: '3px 10px',
                }}
              >
                {post.tags[0]}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{date}</span>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--text-3)' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(1.85rem, 4vw, 3rem)',
                color: 'var(--text-1)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                marginBottom: '18px',
              }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p style={{ fontSize: '1.05rem', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '24px', maxWidth: '680px' }}>
              {post.excerpt}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
              {post.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.72rem', color: tagColor(tag),
                  backgroundColor: `${tagColor(tag)}15`,
                  border: `1px solid ${tagColor(tag)}35`,
                  borderRadius: '4px', padding: '3px 9px',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Author row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  border: `2px solid ${accent}40`,
                }}>
                  <span style={{ color: '#070c14', fontWeight: 800, fontSize: '1rem' }}>O</span>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-1)' }}>
                    Osman Ibrahim
                  </p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-3)' }}>
                    M.Sc. Geomatics · Remote Sensing & GIS Expert
                  </p>
                </div>
              </div>

              {/* Share (top) */}
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </div>
        </section>

        {/* ═══════════════ ARTICLE BODY ═══════════════ */}
        <section id="article-body" style={{ padding: '56px 24px 80px', backgroundColor: 'var(--bg)' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }} className="mdx-prose">
            <MDXRemote source={post.content} />
          </div>
        </section>

        {/* ═══════════════ BOTTOM SHARE + AUTHOR BIO ═══════════════ */}
        <section style={{ padding: '0 24px 64px', backgroundColor: 'var(--bg)' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>

            {/* Share bottom */}
            <div style={{
              padding: '28px 32px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              marginBottom: '28px',
            }}>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            {/* Author bio card */}
            <div style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderLeft: `4px solid ${accent}`,
              borderRadius: '12px',
              padding: '28px 32px',
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${accent}, ${accent}80)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                border: `2px solid ${accent}40`,
              }}>
                <span style={{ color: '#070c14', fontWeight: 800, fontSize: '1.2rem' }}>O</span>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-1)' }}>
                  Osman Ibrahim
                </p>
                <p style={{ margin: '0 0 12px', fontSize: '0.78rem', color: 'var(--text-3)' }}>
                  Remote Sensing & GIS Expert · M.Sc. Geomatics Engineering, KTU Turkey
                </p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
                  Geomatics Engineer with 8+ years applying satellite data to water management,
                  crop monitoring, and hydrology across Sudan and the Near East. Works with
                  FAO, IFAD, and UNESCO. Author of WaPOR Water Productivity and GeoAccuRate
                  QGIS plugins.
                </p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <a
                    href="https://www.linkedin.com/in/osman-ibrahim-a02a9a197/"
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.78rem', color: accent, textDecoration: 'none', fontWeight: 600 }}
                  >
                    LinkedIn →
                  </a>
                  <Link href="/contact" style={{ fontSize: '0.78rem', color: 'var(--text-3)', textDecoration: 'none', fontWeight: 600 }}>
                    Contact →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ RELATED POSTS ═══════════════ */}
        {related.length > 0 && (
          <section style={{
            padding: '48px 24px 80px',
            backgroundColor: 'var(--bg)',
            borderTop: '1px solid var(--border)',
          }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <p className="section-label" style={{ marginBottom: '28px' }}>More Articles</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}>
                {related.map((rel) => {
                  const relAccent = rel.coverColor ?? tagColor(rel.tags[0] ?? '')
                  return (
                    <Link key={rel.slug} href={`/blog/${rel.slug}`} style={{ textDecoration: 'none' }}>
                      <div className="blog-related-card" style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderTop: `3px solid ${relAccent}`,
                        borderRadius: '10px',
                        padding: '24px',
                      }}>
                        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: 'var(--text-3)' }}>
                          {new Date(rel.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} · {rel.readTime}
                        </p>
                        <h3 className="font-display" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.35, marginBottom: '8px' }}>
                          {rel.title}
                        </h3>
                        <p className="line-clamp-2" style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.65 }}>
                          {rel.excerpt}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div style={{ marginTop: '36px', textAlign: 'center' }}>
                <Link href="/blog" className="blog-all-link">
                  View all articles
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />

      <style>{`
        .mdx-prose h2 {
          font-size: clamp(1.3rem, 2.5vw, 1.6rem);
          font-weight: 700; color: var(--text-1);
          margin: 2.75rem 0 1rem; line-height: 1.25;
          font-family: var(--font-manrope), system-ui, sans-serif;
          letter-spacing: -0.02em;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }
        .mdx-prose h3 {
          font-size: 1.15rem; font-weight: 700; color: var(--text-1);
          margin: 2.25rem 0 0.75rem;
          font-family: var(--font-manrope), system-ui, sans-serif;
        }
        .mdx-prose h4 {
          font-size: 1rem; font-weight: 700; color: var(--text-1);
          margin: 1.75rem 0 0.5rem;
          font-family: var(--font-manrope), system-ui, sans-serif;
        }
        .mdx-prose p { font-size: 1rem; color: var(--text-2); line-height: 1.85; margin: 0 0 1.3rem; }
        .mdx-prose ul, .mdx-prose ol { color: var(--text-2); font-size: 1rem; line-height: 1.85; margin: 0 0 1.3rem; padding-left: 1.6rem; }
        .mdx-prose li { margin-bottom: 0.5rem; }
        .mdx-prose li::marker { color: var(--accent); }
        .mdx-prose strong { color: var(--text-1); font-weight: 600; }
        .mdx-prose em { color: var(--text-2); }
        .mdx-prose a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(16,185,129,0.4); }
        .mdx-prose a:hover { text-decoration-color: var(--accent); }
        .mdx-prose code {
          font-size: 0.875em; color: #10b981;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 5px; padding: 2px 7px;
          font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
        }
        .mdx-prose pre {
          background: #0a1220;
          border: 1px solid rgba(16,185,129,0.12);
          border-radius: 10px;
          padding: 24px;
          overflow-x: auto;
          margin: 1.75rem 0;
          position: relative;
        }
        .mdx-prose pre::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #10b981, #059669, transparent);
          border-radius: 10px 10px 0 0;
        }
        .mdx-prose pre code {
          background: none; border: none; padding: 0;
          color: #b8d0e8; font-size: 0.875rem; line-height: 1.75;
          font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
        }
        .mdx-prose table {
          width: 100%; border-collapse: collapse;
          font-size: 0.9rem; margin: 1.75rem 0;
          border-radius: 8px; overflow: hidden;
          border: 1px solid var(--border);
        }
        .mdx-prose th {
          color: var(--text-1); font-weight: 600; text-align: left;
          padding: 12px 16px;
          background: rgba(16,185,129,0.07);
          border-bottom: 1px solid rgba(16,185,129,0.25);
        }
        .mdx-prose td { color: var(--text-2); padding: 10px 16px; border-bottom: 1px solid var(--border); }
        .mdx-prose tr:last-child td { border-bottom: none; }
        .mdx-prose tr:hover td { background: rgba(255,255,255,0.02); }
        .mdx-prose blockquote {
          border-left: 3px solid var(--accent);
          padding: 16px 24px; margin: 1.75rem 0;
          background: rgba(16,185,129,0.05);
          border-radius: 0 8px 8px 0;
        }
        .mdx-prose blockquote p { margin: 0; font-style: italic; color: var(--text-2); }
        .mdx-prose hr { border: none; border-top: 1px solid var(--border); margin: 2.5rem 0; }
        .mdx-prose img { max-width: 100%; border-radius: 8px; border: 1px solid var(--border); }
      `}</style>
    </>
  )
}

import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { getPost, getAllSlugs } from '../../../lib/posts'
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

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug)
  if (!post) notFound()

  return (
    <>
      <Nav activePage="blog" />

      <main style={{ paddingTop: '64px' }}>
        {/* Header */}
        <section
          className="dot-grid"
          style={{ backgroundColor: 'var(--bg)', padding: '48px 24px 40px' }}
        >
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <Link href="/blog" className="blog-back-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              All Articles
            </Link>

            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-3)' }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--text-3)' }} />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-3)' }}>{post.readTime}</span>
            </div>

            <h1
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: 'var(--text-1)',
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              {post.title}
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '24px' }}>
              {post.excerpt}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.72rem',
                    color: tagColor(tag),
                    backgroundColor: `${tagColor(tag)}18`,
                    border: `1px solid ${tagColor(tag)}40`,
                    borderRadius: '4px',
                    padding: '3px 9px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '28px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ color: '#070c14', fontWeight: 800, fontSize: '0.9rem' }}>O</span>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-1)' }}>
                  Osman Ibrahim
                </p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-3)' }}>
                  Remote Sensing & GIS Expert · M.Sc. Geomatics
                </p>
              </div>
            </div>
          </div>
        </section>

        <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />

        {/* MDX Content */}
        <section style={{ padding: '48px 24px 96px', backgroundColor: 'var(--bg)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }} className="mdx-prose">
            <MDXRemote source={post.content} />
          </div>
        </section>

        {/* Back link */}
        <div
          style={{
            padding: '40px 24px 64px',
            backgroundColor: 'var(--bg)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .mdx-prose h2 {
          font-size: 1.5rem; font-weight: 700; color: var(--text-1);
          margin: 2.5rem 0 1rem; line-height: 1.25;
          font-family: var(--font-manrope), system-ui, sans-serif;
        }
        .mdx-prose h3 {
          font-size: 1.15rem; font-weight: 700; color: var(--text-1);
          margin: 2rem 0 0.75rem;
          font-family: var(--font-manrope), system-ui, sans-serif;
        }
        .mdx-prose p { font-size: 0.975rem; color: var(--text-2); line-height: 1.8; margin: 0 0 1.25rem; }
        .mdx-prose ul, .mdx-prose ol { color: var(--text-2); font-size: 0.975rem; line-height: 1.8; margin: 0 0 1.25rem; padding-left: 1.5rem; }
        .mdx-prose li { margin-bottom: 0.4rem; }
        .mdx-prose strong { color: var(--text-1); font-weight: 600; }
        .mdx-prose a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
        .mdx-prose code { font-size: 0.85em; color: #10b981; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); border-radius: 4px; padding: 1px 6px; }
        .mdx-prose pre { background: #0d1526; border: 1px solid rgba(16,185,129,0.15); border-radius: 8px; padding: 20px; overflow-x: auto; margin: 1.5rem 0; }
        .mdx-prose pre code { background: none; border: none; padding: 0; color: #c9d8ec; font-size: 0.85rem; line-height: 1.65; }
        .mdx-prose table { width: 100%; border-collapse: collapse; font-size: 0.875rem; margin: 1.5rem 0; }
        .mdx-prose th { color: var(--text-1); font-weight: 600; text-align: left; padding: 10px 14px; border-bottom: 2px solid rgba(16,185,129,0.3); background: rgba(16,185,129,0.05); }
        .mdx-prose td { color: var(--text-2); padding: 9px 14px; border-bottom: 1px solid var(--border); }
        .mdx-prose tr:last-child td { border-bottom: none; }
        .mdx-prose blockquote { border-left: 3px solid var(--accent); padding: 12px 20px; margin: 1.5rem 0; background: rgba(16,185,129,0.04); border-radius: 0 6px 6px 0; }
        .mdx-prose blockquote p { margin: 0; font-style: italic; }
        .mdx-prose hr { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
      `}</style>
    </>
  )
}

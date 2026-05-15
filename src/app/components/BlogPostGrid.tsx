'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PostMeta } from '../../lib/posts'

interface Props {
  posts: PostMeta[]
}

const ALL_TAG = 'All'

function tagColor(tag: string): string {
  const map: Record<string, string> = {
    WaPOR: '#10b981', FAO: '#10b981', 'Water Productivity': '#10b981', QGIS: '#10b981',
    Python: '#3b82f6', 'Remote Sensing': '#3b82f6',
    'Google Earth Engine': '#f59e0b', 'Sentinel-2': '#f59e0b',
    'Machine Learning': '#f59e0b', SVM: '#f59e0b', 'Crop Mapping': '#f59e0b',
    'Accuracy Assessment': '#7e9ab5', 'Land Cover': '#7e9ab5', Statistics: '#7e9ab5',
  }
  return map[tag] ?? '#6b7a99'
}

function coverAccent(post: PostMeta): string {
  return post.coverColor ?? tagColor(post.tags[0] ?? '')
}

function PostCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  const accent = coverAccent(post)
  const date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <article
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderLeft: `4px solid ${accent}`,
            borderRadius: '12px',
            padding: '40px',
            transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
            boxShadow: `0 0 0 0 ${accent}00`,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = accent
            el.style.transform = 'translateY(-3px)'
            el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px ${accent}30`
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--border)'
            el.style.transform = 'translateY(0)'
            el.style.boxShadow = '0 0 0 0 transparent'
          }}
        >
          {/* Label row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: accent,
                backgroundColor: `${accent}15`,
                border: `1px solid ${accent}35`,
                borderRadius: '4px', padding: '3px 10px',
              }}
            >
              Featured
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{date}</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--text-3)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{post.readTime}</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)',
              fontWeight: 800,
              color: 'var(--text-1)',
              lineHeight: 1.2,
              marginBottom: '14px',
            }}
          >
            {post.title}
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '24px' }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: '0.72rem', color: tagColor(tag),
                backgroundColor: `${tagColor(tag)}15`,
                border: `1px solid ${tagColor(tag)}35`,
                borderRadius: '4px', padding: '3px 9px',
              }}>{tag}</span>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: accent }}>
            Read article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <article
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '28px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.25s, transform 0.25s',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = accent
          el.style.transform = 'translateY(-3px)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--border)'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${accent}, ${accent}50)` }} />

        {/* Date + time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{date}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--text-3)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{post.readTime}</span>
        </div>

        <h3 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.35, marginBottom: '10px' }}>
          {post.title}
        </h3>

        <p className="line-clamp-3" style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.7, flex: 1, marginBottom: '16px' }}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto' }}>
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontSize: '0.68rem', color: tagColor(tag),
              backgroundColor: `${tagColor(tag)}15`,
              border: `1px solid ${tagColor(tag)}30`,
              borderRadius: '4px', padding: '2px 7px',
            }}>{tag}</span>
          ))}
        </div>
      </article>
    </Link>
  )
}

export default function BlogPostGrid({ posts }: Props) {
  // Collect all unique tags
  const allTags = [ALL_TAG, ...Array.from(new Set(posts.flatMap((p) => p.tags)))]
  const [activeTag, setActiveTag] = useState(ALL_TAG)

  const filtered = activeTag === ALL_TAG ? posts : posts.filter((p) => p.tags.includes(activeTag))
  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div>
      {/* Tag filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
        {allTags.map((tag) => {
          const active = activeTag === tag
          const tc = tag === ALL_TAG ? 'var(--accent)' : tagColor(tag)
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                padding: '6px 16px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                border: active ? 'none' : '1px solid var(--border-bright)',
                backgroundColor: active ? tc : 'transparent',
                color: active ? '#070c14' : 'var(--text-2)',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              {tag}
            </button>
          )
        })}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <p style={{ color: 'var(--text-3)', textAlign: 'center', padding: '64px 0' }}>
          No articles with this tag yet.
        </p>
      )}

      {/* Featured post */}
      {featured && (
        <div style={{ marginBottom: '28px' }}>
          <PostCard post={featured} featured />
        </div>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { projectsData } from '../../data/projects'
import { Calendar, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react'

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }))
}

const categoryColor: Record<string, string> = {
  'Water Resources': '#10b981',
  'Crop Monitoring': '#f59e0b',
  'Hydrology': '#7e9ab5',
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    return (
      <>
        <Nav activePage="projects" />
        <main style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 className="font-display" style={{ color: 'var(--text-1)', marginBottom: '16px' }}>Project not found</h1>
            <Link href="/projects" style={{ color: 'var(--accent)' }}>← Back to projects</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const accentColor = categoryColor[project.category] || '#10b981'

  return (
    <>
      <Nav activePage="projects" />

      <main style={{ paddingTop: '64px' }}>
        {/* ===================== HERO ===================== */}
        <section
          className="dot-grid"
          style={{ backgroundColor: 'var(--bg)', padding: '72px 24px 56px' }}
        >
          <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                color: 'var(--text-3)',
                marginBottom: '28px',
              }}
            >
              <ArrowLeft size={14} />
              Back to Projects
            </Link>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: accentColor,
                  backgroundColor: `${accentColor}18`,
                  border: `1px solid ${accentColor}40`,
                  borderRadius: '4px',
                  padding: '4px 10px',
                }}
              >
                {project.org}
              </span>
              {project.funder && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-3)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '4px 10px',
                  }}
                >
                  Funded by {project.funder}
                </span>
              )}
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-3)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: '4px 10px',
                }}
              >
                {project.category}
              </span>
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
              {project.title}
            </h1>

            {/* Meta */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-3)' }}>
                <Calendar size={14} />
                {project.period}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-3)' }}>
                <MapPin size={14} />
                {project.location}
              </span>
            </div>
          </div>
        </section>

        {/* ===================== CONTENT ===================== */}
        <section style={{ padding: '56px 24px 96px', backgroundColor: 'var(--bg)' }}>
          <div
            style={{
              maxWidth: '1024px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 280px',
              gap: '48px',
              alignItems: 'flex-start',
            }}
            className="md:grid-cols-[1fr_280px]"
          >
            {/* Main */}
            <div>
              {/* Overview */}
              <div style={{ marginBottom: '48px' }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  Project Overview
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.8 }}>
                  {project.fullDescription}
                </p>
              </div>

              {/* Methodology */}
              <div style={{ marginBottom: '48px' }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  Methodology
                </h2>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {project.methodology.map((step, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        padding: '16px 20px',
                      }}
                    >
                      <span
                        className="font-display font-bold"
                        style={{
                          fontSize: '0.72rem',
                          color: accentColor,
                          backgroundColor: `${accentColor}18`,
                          border: `1px solid ${accentColor}30`,
                          borderRadius: '4px',
                          padding: '2px 7px',
                          flexShrink: 0,
                          marginTop: '1px',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.65 }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Outputs */}
              <div>
                <h2
                  className="font-display"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  Key Outputs
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {project.outputs.map((output, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '0.875rem',
                        color: 'var(--text-2)',
                        lineHeight: 1.65,
                      }}
                    >
                      <CheckCircle2 size={15} style={{ color: accentColor, flexShrink: 0, marginTop: '2px' }} />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Achievement */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderLeft: `3px solid ${accentColor}`,
                  borderRadius: '6px',
                  padding: '24px',
                }}
              >
                <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  Key Achievement
                </div>
                <p style={{ fontSize: '0.9rem', color: accentColor, fontWeight: 600, lineHeight: 1.55 }}>
                  {project.achievement}
                </p>
              </div>

              {/* Technologies */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '24px',
                }}
              >
                <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  Technologies Used
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-2)',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        padding: '3px 8px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <Link
                href="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid var(--border-bright)',
                  color: 'var(--text-2)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                ← All Projects
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

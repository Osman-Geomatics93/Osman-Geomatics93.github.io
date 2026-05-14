'use client'

import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RevealSection from '../components/RevealSection'
import { ExternalLink } from 'lucide-react'

interface Cert {
  title: string
  org: string
  year: string
  category: string
  link?: string
}

const certifications: Cert[] = [
  // Remote Sensing
  {
    title: 'Remote Sensing Image Acquisition, Analysis and Applications',
    org: 'UNSW Sydney & IEEE Geoscience and Remote Sensing Society',
    year: '2023',
    category: 'Remote Sensing',
    link: 'https://coursera.org/verify/certificate_id',
  },
  {
    title: 'Spatial Analysis and Satellite Imagery in a GIS',
    org: 'University of Toronto',
    year: '2023',
    category: 'Remote Sensing',
    link: 'https://www.coursera.org/account/accomplishments/verify/729AQRHDM2UW',
  },
  {
    title: 'Python for WaPOR Geospatial Analyses',
    org: 'FAO / IHE Delft Institute for Water Education',
    year: '2024',
    category: 'Remote Sensing',
  },
  {
    title: 'GIS & Remote Sensing in WaPOR System',
    org: 'Hydraulics Research Center, Sudan',
    year: '2020',
    category: 'Remote Sensing',
    link: 'https://drive.google.com/file/d/1y3Id-15QSpiNNJHyAUES1KEGcedxOfAN/view?usp=sharing',
  },
  {
    title: 'Basics of Remote Sensing & Water Harvesting Applications',
    org: 'UNESCO RCWH – Ministry of Water Resources, Sudan',
    year: '2019',
    category: 'Remote Sensing',
    link: 'https://drive.google.com/file/d/1y2x33J6_gLaR8pcNutdJTuvg75XBGxar/view?usp=sharing',
  },

  // GIS
  {
    title: 'Geospatial Analysis with ArcGIS',
    org: 'University of California, Davis',
    year: '2023',
    category: 'GIS',
    link: 'https://coursera.org/verify/certificate_id',
  },
  {
    title: 'Geographic Information System (GIS) using QGIS',
    org: 'IOM–UN Migration, UNAMID & WES Sudan',
    year: '2020',
    category: 'GIS',
    link: 'https://drive.google.com/file/d/1QWs0l12Cpd_8mn5zbROP09OiDhRYWQe9/view?usp=sharing',
  },
  {
    title: 'Python for GIS Development',
    org: 'PARIS Training Center',
    year: '2019',
    category: 'GIS',
    link: 'https://drive.google.com/file/d/1oA1E_3bgPw4H7UBS90VXp2Os_2eJ5Chs/view?usp=sharing',
  },

  // Programming
  {
    title: 'Data Analysis with R Programming',
    org: 'Google',
    year: '2023',
    category: 'Programming',
    link: 'https://www.coursera.org/account/accomplishments/verify/KJ4JQPDC2J52',
  },
  {
    title: 'Data Analysis with Python',
    org: 'IBM',
    year: '2024',
    category: 'Programming',
    link: 'https://www.coursera.org/account/accomplishments/verify/VCKACJAQ92VV',
  },
  {
    title: 'Advanced Data Visualization with R',
    org: 'Coursera',
    year: '2024',
    category: 'Programming',
  },
  {
    title: 'Introduction to Front-End Development',
    org: 'Meta / Coursera',
    year: '2024',
    category: 'Programming',
  },

  // AI / Deep Learning
  {
    title: 'Advanced Computer Vision with TensorFlow',
    org: 'DeepLearning.AI',
    year: '2024',
    category: 'AI / Deep Learning',
  },
  {
    title: 'Sequence Models (Deep Learning Specialization)',
    org: 'DeepLearning.AI',
    year: '2024',
    category: 'AI / Deep Learning',
  },
  {
    title: 'AI Agents and Agentic AI with Python',
    org: 'DeepLearning.AI',
    year: '2024',
    category: 'AI / Deep Learning',
  },

  // Hydraulics
  {
    title: 'Hydraulic Engineering in River Basins',
    org: 'Regional Training Center, Hydraulics Research Institute, Egypt',
    year: '2021',
    category: 'Hydraulics',
    link: 'https://drive.google.com/file/d/1Crq_bwviW13QAtYByUpjKDV9ORhUPIfI/view?usp=sharing',
  },

  // Professional
  {
    title: 'Certified Trainer — GIS, Remote Sensing & Surveying Engineering',
    org: 'Hydraulics Research Center, Sudan',
    year: '2020',
    category: 'Professional',
  },
]

const categories = ['All', 'Remote Sensing', 'GIS', 'Programming', 'AI / Deep Learning', 'Hydraulics', 'Professional']

// Category left-border accent colors — subtle, no rainbow
const catBorderColor: Record<string, string> = {
  'Remote Sensing': '#10b981',
  'GIS': '#7e9ab5',
  'Programming': '#f59e0b',
  'AI / Deep Learning': '#60a5fa',
  'Hydraulics': '#3d5470',
  'Professional': '#a78bfa',
}

const catTagColor: Record<string, { bg: string; text: string; border: string }> = {
  'Remote Sensing': { bg: 'rgba(16,185,129,0.1)', text: '#10b981', border: 'rgba(16,185,129,0.25)' },
  'GIS': { bg: 'rgba(126,154,181,0.12)', text: '#7e9ab5', border: 'rgba(126,154,181,0.25)' },
  'Programming': { bg: 'rgba(245,158,11,0.1)', text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  'AI / Deep Learning': { bg: 'rgba(96,165,250,0.1)', text: '#60a5fa', border: 'rgba(96,165,250,0.25)' },
  'Hydraulics': { bg: 'rgba(61,84,112,0.15)', text: '#7e9ab5', border: 'rgba(61,84,112,0.3)' },
  'Professional': { bg: 'rgba(167,139,250,0.1)', text: '#a78bfa', border: 'rgba(167,139,250,0.25)' },
}

export default function CertificationsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? certifications
      : certifications.filter((c) => c.category === activeCategory)

  return (
    <>
      <Nav activePage="certifications" />

      <main style={{ paddingTop: '64px' }}>
        {/* ===================== HERO ===================== */}
        <section
          className="dot-grid"
          style={{ backgroundColor: 'var(--bg)', padding: '96px 24px 64px' }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p className="section-label">Credentials</p>
            <h1
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                color: 'var(--text-1)',
                lineHeight: 1.1,
                marginTop: '16px',
              }}
            >
              Certifications &amp; Training
            </h1>
            <p
              style={{
                color: 'var(--text-2)',
                maxWidth: '560px',
                marginTop: '16px',
                lineHeight: 1.7,
                fontSize: '1rem',
              }}
            >
              Continuous learning across remote sensing, GIS, machine learning, and water resources —
              from UNSW Sydney, UC Davis, IBM, Google, DeepLearning.AI, FAO/IHE Delft, UNESCO,
              and specialised institutions in hydraulics and geospatial science.
            </p>

            {/* Stats */}
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginTop: '40px' }}
            >
              {[
                { num: '17', label: 'Certifications' },
                { num: '10', label: 'Institutions' },
                { num: '200+', label: 'Professionals Trained' },
                { num: '6+', label: 'Years Teaching' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div
                    className="font-display font-bold"
                    style={{ fontSize: '1.5rem', color: 'var(--accent)' }}
                  >
                    {num}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '2px' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FILTER ===================== */}
        <div
          style={{
            padding: '24px',
            backgroundColor: 'var(--bg)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: isActive ? 'none' : '1px solid var(--border-bright)',
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? '#070c14' : 'var(--text-2)',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* ===================== CERTIFICATIONS GRID ===================== */}
        <section
          style={{
            padding: '48px 24px 96px',
            backgroundColor: 'var(--bg)',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              {filtered.map((cert) => {
                const borderLeft = catBorderColor[cert.category] || 'var(--border-bright)'
                const tag = catTagColor[cert.category] || {
                  bg: 'rgba(126,154,181,0.1)',
                  text: 'var(--text-2)',
                  border: 'rgba(126,154,181,0.25)',
                }

                // Initials badge
                const initials = cert.org
                  .split(/[\s,&/-]+/)
                  .filter(Boolean)
                  .map((w) => w[0].toUpperCase())
                  .slice(0, 3)
                  .join('')

                return (
                  <div
                    key={cert.title}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderLeft: `3px solid ${borderLeft}`,
                      borderRadius: '6px',
                      padding: '24px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      transition: 'border-color 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderTopColor = 'var(--border-bright)'
                      ;(e.currentTarget as HTMLElement).style.borderRightColor = 'var(--border-bright)'
                      ;(e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--border-bright)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderTopColor = 'var(--border)'
                      ;(e.currentTarget as HTMLElement).style.borderRightColor = 'var(--border)'
                      ;(e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--border)'
                    }}
                  >
                    {/* Org badge + category */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '6px',
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: 'var(--text-2)',
                          letterSpacing: '0.03em',
                          flexShrink: 0,
                        }}
                      >
                        {initials}
                      </div>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          color: tag.text,
                          backgroundColor: tag.bg,
                          border: `1px solid ${tag.border}`,
                          borderRadius: '4px',
                          padding: '2px 7px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {cert.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'var(--text-1)',
                        lineHeight: 1.4,
                      }}
                    >
                      {cert.title}
                    </h3>

                    {/* Org + year */}
                    <div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>{cert.org}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '2px' }}>{cert.year}</p>
                    </div>

                    {/* Link */}
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.78rem',
                          color: 'var(--accent)',
                          marginTop: 'auto',
                          transition: 'opacity 0.2s ease',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                      >
                        <ExternalLink size={12} />
                        View Certificate
                      </a>
                    )}
                  </div>
                )
              })}
            </div>

            {filtered.length === 0 && (
              <p style={{ color: 'var(--text-3)', textAlign: 'center', padding: '48px 0' }}>
                No certifications found in this category.
              </p>
            )}
          </div>
        </section>

        {/* ===================== KNOWLEDGE SHARING ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '96px 24px',
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Teaching</p>
              <h2
                className="font-display"
                style={{ marginTop: '12px', color: 'var(--text-1)' }}
              >
                Knowledge Sharing
              </h2>
              <p
                style={{
                  color: 'var(--text-2)',
                  maxWidth: '560px',
                  marginTop: '12px',
                  lineHeight: 1.7,
                }}
              >
                Beyond research, Osman has trained over 200 professionals in GIS, remote
                sensing, and surveying technologies across Sudan and the region — recognized
                formally by the HRC Director General.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '20px',
                  marginTop: '48px',
                }}
              >
                {[
                  { number: '200+', label: 'Professionals Trained', sub: 'GIS, RS & Surveying' },
                  { number: '6+', label: 'Years Teaching', sub: 'Formal & informal' },
                  { number: '15+', label: 'Training Modules', sub: 'Custom curriculum' },
                  { number: '10+', label: 'Software Tools', sub: 'Covered in training' },
                ].map(({ number, label, sub }) => (
                  <div
                    key={label}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '24px',
                      textAlign: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div
                      className="font-display font-bold"
                      style={{ fontSize: '1.75rem', color: 'var(--warm)', marginBottom: '4px' }}
                    >
                      {number}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-1)', fontWeight: 600, marginBottom: '4px' }}>
                      {label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{sub}</div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: '40px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderLeft: '3px solid var(--accent)',
                  borderRadius: '6px',
                  padding: '24px 28px',
                  maxWidth: '640px',
                }}
              >
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-2)',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;Recognized by the HRC Director General for exceptional contributions
                  to knowledge transfer and capacity building in geospatial technologies
                  across the Hydraulics Research Center and partner organizations.&rdquo;
                </p>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-3)',
                    marginTop: '12px',
                  }}
                >
                  — Hydraulics Research Center, Sudan
                </p>
              </div>
            </div>
          </section>
        </RevealSection>
      </main>

      <Footer />
    </>
  )
}

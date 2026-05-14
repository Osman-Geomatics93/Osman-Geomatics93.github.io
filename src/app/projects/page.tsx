'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RevealSection from '../components/RevealSection'
import { Calendar, MapPin, ExternalLink, Github } from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'
import { projectsData } from '../data/projects'

const LeafletMap = dynamic(() => import('../components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '460px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ color: 'var(--text-3)', fontSize: '0.875rem' }}>Loading map…</span>
    </div>
  ),
})

const professionalProjects = [
  {
    id: 1,
    slug: 'gezira-water-management',
    title: 'GIS & Remote Sensing for Water Management',
    org: 'HRC Sudan',
    category: 'Water Resources',
    period: 'May 2023 – Jul 2024',
    location: 'Gezira Scheme, Sudan',
    description:
      'Developed comprehensive GIS and remote sensing workflows for irrigation water management across the Gezira Scheme. Integrated WaPOR satellite products with field measurements to produce actionable water productivity maps and seasonal monitoring reports.',
    technologies: ['QGIS', 'WaPOR', 'Google Earth Engine', 'Python', 'Sentinel-2'],
    achievement: 'Streamlined water productivity reporting for 8.4M ha irrigation system',
    featured: true,
  },
  {
    id: 2,
    slug: 'fao-crop-monitoring',
    title: 'Remote Sensing–Based Monitoring and Yield Forecasting',
    org: 'FAO',
    category: 'Crop Monitoring',
    period: 'Jan 2023 – Sep 2024',
    location: 'Gezira Scheme, Sudan',
    description:
      'FAO-funded project developing satellite-based crop monitoring and wheat yield estimation tools. Combined SVM classification with WaPOR biomass products to forecast production at administrative-office scale. Delivered 15% improvement in monitoring accuracy and 9% productivity gain.',
    technologies: ['SVM', 'WaPOR', 'MODIS', 'Landsat', 'R', 'Python', 'SNAP'],
    achievement: '15% monitoring accuracy improvement, 9% productivity gain',
    featured: true,
  },
  {
    id: 3,
    slug: 'ifad-gash-scheme',
    title: 'Water Management & Productivity Assessment',
    org: 'IFAD',
    category: 'Water Resources',
    period: 'Mar 2019 – Jul 2021',
    location: 'Gash Irrigation Scheme, Sudan',
    description:
      'IFAD-funded project assessing irrigation efficiency and water productivity across the Gash Scheme using multi-temporal satellite imagery. Produced baseline water accounting and identified improvement opportunities for smallholder farmers.',
    technologies: ['ArcGIS', 'ERDAS', 'Sentinel-2', 'Landsat-8', 'WaPOR', 'FAO SEPAL'],
    achievement: 'Completed water productivity baseline for ~300,000 ha scheme',
    featured: false,
  },
  {
    id: 4,
    slug: 'gis-crop-mapping',
    title: 'GIS-Based Crop Mapping',
    org: 'HRC Sudan',
    category: 'Crop Monitoring',
    period: 'Nov 2018 – May 2021',
    location: 'Gezira Scheme, Sudan',
    description:
      'Designed and implemented a GIS-based crop mapping system covering 2.2 million hectares of irrigated and rain-fed agriculture. Applied multi-temporal NDVI analysis and object-based classification to achieve 30% improvement over previous mapping accuracy.',
    technologies: ['ArcGIS Pro', 'ENVI', 'MODIS', 'Landsat', 'Python', 'Random Forest'],
    achievement: '2.2M ha mapped, 30% classification accuracy improvement',
    featured: false,
  },
  {
    id: 5,
    slug: 'nile-gauging-stations',
    title: 'Nile Gauging Station Site Selection',
    org: 'HRC Sudan',
    category: 'Hydrology',
    period: 'Dec 2018 – Jun 2020',
    location: 'Northern Sudan / Egypt Border',
    description:
      'Led spatial analysis for optimal siting of Nile river gauging stations along the Sudan-Egypt border reach. Combined DEM analysis, hydraulic modeling inputs, and field reconnaissance to identify 12 priority monitoring locations.',
    technologies: ['ArcGIS', 'HEC-RAS', 'DEM', 'GPS-RTK', 'AutoCAD'],
    achievement: '12 priority gauging sites identified across 400 km reach',
    featured: false,
  },
  {
    id: 6,
    slug: 'south-darfur-hydrology',
    title: 'Hydrology & Surveying for Catchment Management',
    org: 'ZOA',
    category: 'Hydrology',
    period: 'Dec 2019 – Apr 2020',
    location: 'South Darfur, Sudan',
    description:
      'ZOA-funded emergency hydrology and field surveying project in South Darfur to support catchment management and flood risk reduction. Conducted topographic surveys, drainage mapping, and flood inundation modeling resulting in 40% reduction in estimated flood risk.',
    technologies: ['QGIS', 'GPS-RTK', 'HEC-HMS', 'Sentinel-1 SAR', 'ODK Collect'],
    achievement: '40% flood risk reduction achieved through interventions',
    featured: false,
  },
  {
    id: 7,
    slug: 'masalamia-sedimentation',
    title: 'Sedimentation Survey — Masalamia Canal',
    org: 'HRC Sudan',
    category: 'Hydrology',
    period: 'Oct 2019 – Mar 2020',
    location: 'Gezira, Sudan',
    description:
      'Conducted bathymetric and sedimentation surveys of Masalamia Canal using ADCP and GPS-RTK equipment. Produced cross-section profiles and sediment budget estimates to inform dredging and maintenance planning.',
    technologies: ['ADCP', 'GPS-RTK', 'Total Station', 'AutoCAD Civil 3D', 'HydroSurv'],
    achievement: 'Full canal sedimentation budget produced — informed 3-year maintenance plan',
    featured: false,
  },
]

const ossProjects = [
  {
    name: 'wapor-water-productivity',
    description: 'QGIS plugin for FAO WaPOR water productivity analysis and automated reporting',
    url: 'https://github.com/Osman-Geomatics93/wapor-water-productivity',
    tags: ['QGIS Plugin', 'Python', 'WaPOR'],
  },
  {
    name: 'GeoAccuRate',
    description: 'QGIS plugin implementing Olofsson (2014) accuracy assessment for land-cover maps',
    url: 'https://github.com/Osman-Geomatics93/GeoAccuRate',
    tags: ['QGIS Plugin', 'Python', 'Accuracy'],
  },
  {
    name: 'GCN-Crop-Classification',
    description: 'Graph Convolutional Network for crop type mapping — 99.9% accuracy on Sentinel-2',
    url: 'https://github.com/Osman-Geomatics93/GCN-Crop-Classification',
    tags: ['PyTorch', 'GCN', 'Deep Learning'],
  },
  {
    name: 'Merowe-Dam-Water-Quality',
    description: 'Sentinel-2 water quality index monitoring for Merowe Dam reservoir, Sudan',
    url: 'https://github.com/Osman-Geomatics93/Merowe-Dam-Water-Quality',
    tags: ['Sentinel-2', 'Python', 'Water Quality'],
  },
  {
    name: 'Sudan-Flood-Disaster-Management',
    description: 'GIS-based flood disaster risk mapping and management system for Sudan',
    url: 'https://github.com/Osman-Geomatics93/Sudan-Flood-Disaster-Management',
    tags: ['GIS', 'Hydrology', 'Risk'],
  },
  {
    name: 'pansharpening-toolkit',
    description: 'Python toolkit for multi-method satellite image pansharpening (Brovey, Gram-Schmidt, IHS)',
    url: 'https://github.com/Osman-Geomatics93/pansharpening-toolkit',
    tags: ['Python', 'Image Processing', 'Rasterio'],
  },
  {
    name: 'gezira-lens',
    description: 'Interactive geospatial dashboard for Gezira Irrigation Scheme monitoring',
    url: 'https://github.com/Osman-Geomatics93/gezira-lens',
    tags: ['Dashboard', 'JavaScript', 'GEE'],
  },
  {
    name: 'TerraDiff',
    description: 'LiDAR-based 3D terrain change detection — before/after elevation difference mapping',
    url: 'https://github.com/Osman-Geomatics93/TerraDiff',
    tags: ['LiDAR', 'Python', '3D Analysis'],
  },
  {
    name: 'crop-classification-deep-learning',
    description: 'End-to-end deep learning pipeline for multi-class crop classification from satellite time series',
    url: 'https://github.com/Osman-Geomatics93/crop-classification-deep-learning',
    tags: ['TensorFlow', 'CNN', 'Time Series'],
  },
]

const categories = ['All', 'Water Resources', 'Crop Monitoring', 'Hydrology']

const categoryColor: Record<string, string> = {
  'Water Resources': 'rgba(16,185,129,0.15)',
  'Crop Monitoring': 'rgba(245,158,11,0.15)',
  'Hydrology': 'rgba(126,154,181,0.15)',
}

const categoryTextColor: Record<string, string> = {
  'Water Resources': '#10b981',
  'Crop Monitoring': '#f59e0b',
  'Hydrology': '#7e9ab5',
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? professionalProjects
      : professionalProjects.filter((p) => p.category === activeCategory)

  const featured = filtered.filter((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <>
      <Nav activePage="projects" />

      <main style={{ paddingTop: '64px' }}>
        {/* ===================== HERO ===================== */}
        <section
          className="dot-grid resp-section"
          style={{ backgroundColor: 'var(--bg)', padding: '0 24px' }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p className="section-label">Work</p>
            <h1
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: 'var(--text-1)',
                lineHeight: 1.1,
                marginTop: '16px',
              }}
            >
              Projects &amp; Field Work
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
              Eight years of applied geomatics — from satellite classification at 10-meter
              resolution to boots-on-ground ADCP surveys along the Nile.
            </p>

            {/* Stats strip */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '32px',
                marginTop: '40px',
              }}
            >
              {[
                { to: 7,   suffix: '',  decimals: 0, label: 'Field Projects' },
                { to: 2.2, suffix: 'M', decimals: 1, label: 'Hectares Mapped' },
                { to: 4,   suffix: '',  decimals: 0, label: 'UN / INGO Partners' },
                { to: 8,   suffix: '+', decimals: 0, label: 'Years in Practice' },
              ].map(({ to, suffix, decimals, label }) => (
                <div key={label}>
                  <AnimatedCounter
                    to={to}
                    suffix={suffix}
                    decimals={decimals}
                    duration={1600}
                    className="font-display font-bold"
                    style={{ fontSize: '1.5rem', color: 'var(--accent)', display: 'block' }}
                  />
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
            padding: '24px 24px',
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

        {/* ===================== PROJECT MAP ===================== */}
        <section
          style={{
            padding: '48px 24px',
            backgroundColor: 'var(--bg)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <p className="section-label">Field Locations</p>
                <h2
                  className="font-display"
                  style={{ marginTop: '8px', color: 'var(--text-1)', fontSize: '1.25rem', fontWeight: 700 }}
                >
                  Interactive Project Map
                </h2>
                <p style={{ color: 'var(--text-2)', marginTop: '6px', fontSize: '0.875rem' }}>
                  Click any marker to see project details. Use +/− to zoom.
                </p>
              </div>
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              {[
                { label: 'Water Resources', color: '#10b981' },
                { label: 'Crop Monitoring', color: '#f59e0b' },
                { label: 'Hydrology', color: '#60a5fa' },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color, boxShadow: `0 0 6px ${color}80`, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{label}</span>
                </div>
              ))}
            </div>
            <LeafletMap
              markers={projectsData.map((p) => {
                const catColor: Record<string, string> = {
                  'Water Resources': '#10b981',
                  'Crop Monitoring': '#f59e0b',
                  'Hydrology': '#60a5fa',
                }
                return {
                  lat: p.coordinates[0],
                  lng: p.coordinates[1],
                  name: p.location,
                  type: p.category,
                  year: p.period,
                  org: p.org,
                  desc: p.description,
                  slug: p.slug,
                  color: catColor[p.category] || '#10b981',
                }
              })}
            />
          </div>
        </section>

        {/* ===================== PROJECTS GRID ===================== */}
        <section style={{ padding: '48px 24px 96px', backgroundColor: 'var(--bg)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            {/* Featured (full-width) */}
            {featured.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
                {featured.map((proj) => (
                  <ProjectCard key={proj.id} proj={proj} fullWidth />
                ))}
              </div>
            )}

            {/* Rest (2-col grid) */}
            {rest.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '24px',
                }}
              >
                {rest.map((proj) => (
                  <ProjectCard key={proj.id} proj={proj} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <p style={{ color: 'var(--text-3)', textAlign: 'center', padding: '48px 0' }}>
                No projects found in this category.
              </p>
            )}
          </div>
        </section>

        {/* ===================== VOLUNTEER / SOCIAL IMPACT ===================== */}
        <RevealSection>
          <section
            className="resp-section"
            style={{
              padding: '0 24px',
              backgroundColor: 'var(--bg)',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 55% 50% at 90% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <p
                  className="section-label"
                  style={{ color: '#a78bfa', marginBottom: 0 }}
                >
                  Volunteer Work
                </p>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: '#fff',
                    backgroundColor: '#10b981',
                    borderRadius: '20px',
                    padding: '2px 9px',
                    letterSpacing: '0.05em',
                  }}
                >
                  ● LIVE
                </span>
              </div>
              <h2
                className="font-display"
                style={{ marginTop: '12px', color: 'var(--text-1)', marginBottom: '48px' }}
              >
                Social Impact &amp; Volunteer Projects
              </h2>

              {/* Featured volunteer project card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  borderLeft: '4px solid #7c3aed',
                  borderRadius: '8px',
                  padding: '40px',
                  boxShadow: '0 0 40px rgba(139,92,246,0.06)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '48px',
                    alignItems: 'start',
                  }}
                >
                  {/* Left */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          color: '#a78bfa',
                          backgroundColor: 'rgba(139,92,246,0.1)',
                          border: '1px solid rgba(139,92,246,0.3)',
                          borderRadius: '4px',
                          padding: '3px 8px',
                        }}
                      >
                        Web Platform
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--text-3)',
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          padding: '3px 8px',
                        }}
                      >
                        Social Impact
                      </span>
                    </div>

                    <h3
                      className="font-display"
                      style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.2, marginBottom: '6px' }}
                    >
                      Sudan Scholars Hub
                    </h3>
                    <a
                      href="https://www.deltaroots.store"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.82rem', color: '#a78bfa', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      deltaroots.store <ExternalLink size={11} />
                    </a>

                    <p
                      style={{
                        color: 'var(--text-2)',
                        fontSize: '0.9rem',
                        lineHeight: 1.75,
                        marginTop: '16px',
                        marginBottom: '24px',
                      }}
                    >
                      A free bilingual scholarship discovery platform designed to empower
                      Sudanese students worldwide. Users can search 300+ international
                      scholarships, track their applications, and compare up to three
                      opportunities side-by-side — in both English and Arabic with full
                      RTL layout support.
                    </p>

                    {/* Features */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '24px' }}>
                      {[
                        'Bilingual (English + Arabic) with full RTL support',
                        'Scholarship search, filter, save & application tracking',
                        'Google OAuth + OTP email authentication',
                        'Admin CMS dashboard for content management',
                        'Side-by-side scholarship comparison tool',
                        'System-aware dark mode',
                      ].map((feat) => (
                        <div
                          key={feat}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontSize: '0.85rem',
                            color: 'var(--text-2)',
                          }}
                        >
                          <span style={{ color: '#a78bfa', fontWeight: 700, flexShrink: 0 }}>✓</span>
                          {feat}
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
                      {['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'NextAuth.js v5', 'next-intl', 'Tailwind CSS', 'Resend', 'Zod'].map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: '0.7rem',
                            color: '#a78bfa',
                            backgroundColor: 'rgba(139,92,246,0.1)',
                            border: '1px solid rgba(139,92,246,0.25)',
                            borderRadius: '4px',
                            padding: '2px 7px',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <a
                        href="https://www.deltaroots.store"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '7px',
                          backgroundColor: '#7c3aed',
                          color: '#fff',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          padding: '10px 22px',
                          borderRadius: '6px',
                          transition: 'background-color 0.2s ease, transform 0.2s ease',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.backgroundColor = '#6d28d9'
                          el.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.backgroundColor = '#7c3aed'
                          el.style.transform = 'translateY(0)'
                        }}
                      >
                        <ExternalLink size={14} />
                        Visit Live Site
                      </a>
                      <a
                        href="https://github.com/Osman-Geomatics93/sudan-scholars-hub"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '7px',
                          border: '1px solid rgba(139,92,246,0.4)',
                          color: '#a78bfa',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          padding: '10px 22px',
                          borderRadius: '6px',
                          transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = '#a78bfa'
                          el.style.color = '#c4b5fd'
                          el.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'rgba(139,92,246,0.4)'
                          el.style.color = '#a78bfa'
                          el.style.transform = 'translateY(0)'
                        }}
                      >
                        <Github size={14} />
                        View on GitHub
                      </a>
                    </div>
                  </div>

                  {/* Right: stats + mini mockup */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Impact stats */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                      }}
                    >
                      {[
                        { num: '300+', label: 'Scholarships Indexed', color: '#a78bfa' },
                        { num: '2', label: 'Languages (AR + EN)', color: '#a78bfa' },
                        { num: '100%', label: 'Free for Students', color: '#10b981' },
                        { num: '↔', label: 'Side-by-side Comparison', color: '#f59e0b' },
                      ].map(({ num, label, color }) => (
                        <div
                          key={label}
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            padding: '18px',
                            textAlign: 'center',
                          }}
                        >
                          <div
                            className="font-display font-bold"
                            style={{ fontSize: '1.4rem', color }}
                          >
                            {num}
                          </div>
                          <div
                            style={{
                              fontSize: '0.72rem',
                              color: 'var(--text-3)',
                              marginTop: '4px',
                              lineHeight: 1.4,
                            }}
                          >
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quote/mission */}
                    <div
                      style={{
                        backgroundColor: 'rgba(139,92,246,0.06)',
                        border: '1px solid rgba(139,92,246,0.2)',
                        borderRadius: '8px',
                        padding: '20px',
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', color: '#7c3aed', lineHeight: 1, marginBottom: '10px' }}>"</div>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-2)',
                          lineHeight: 1.65,
                          fontStyle: 'italic',
                        }}
                      >
                        Built entirely as a volunteer initiative — no funding, no team —
                        to give every Sudanese student equal access to international
                        education opportunities.
                      </p>
                      <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#a78bfa', fontWeight: 600 }}>
                        — Osman Ibrahim, Founder
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== CHROME EXTENSION — MAPLAYOUT PRO ===================== */}
        <RevealSection>
          <section
            className="resp-section"
            style={{
              padding: '0 24px',
              backgroundColor: 'var(--bg)',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 50% 60% at 10% 50%, rgba(14,165,233,0.09) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
              {/* Label row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <p className="section-label" style={{ color: '#0ea5e9', marginBottom: 0 }}>
                  Chrome Extension
                </p>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: '#fff',
                    backgroundColor: '#0284c7',
                    borderRadius: '20px',
                    padding: '2px 9px',
                    letterSpacing: '0.05em',
                  }}
                >
                  v1.3.2 · Published
                </span>
              </div>

              <h2
                className="font-display"
                style={{ marginTop: '12px', color: 'var(--text-1)', marginBottom: '48px' }}
              >
                Browser-Based Cartographic Tool
              </h2>

              {/* Main card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid rgba(14,165,233,0.25)',
                  borderLeft: '4px solid #0ea5e9',
                  borderRadius: '8px',
                  padding: '40px',
                  boxShadow: '0 0 40px rgba(14,165,233,0.06)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '56px',
                    alignItems: 'start',
                  }}
                >
                  {/* ── Left: description + features + CTAs ── */}
                  <div>
                    {/* Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          color: '#0ea5e9',
                          backgroundColor: 'rgba(14,165,233,0.1)',
                          border: '1px solid rgba(14,165,233,0.3)',
                          borderRadius: '4px',
                          padding: '3px 8px',
                        }}
                      >
                        Chrome Extension
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--text-3)',
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          padding: '3px 8px',
                        }}
                      >
                        Cartography · GIS
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.7rem',
                          color: '#f59e0b',
                          backgroundColor: 'rgba(245,158,11,0.1)',
                          border: '1px solid rgba(245,158,11,0.25)',
                          borderRadius: '4px',
                          padding: '3px 8px',
                        }}
                      >
                        ★★★★★ 5.0
                      </span>
                    </div>

                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--text-1)',
                        lineHeight: 1.2,
                        marginBottom: '6px',
                      }}
                    >
                      MapLayout Pro
                    </h3>
                    <a
                      href="https://chromewebstore.google.com/detail/maplayout-pro/flgjppmpdkhjpokcgdglnacnopoedbnh"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.82rem',
                        color: '#0ea5e9',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#38bdf8' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#0ea5e9' }}
                    >
                      chromewebstore.google.com
                      <ExternalLink size={11} />
                    </a>

                    <p
                      style={{
                        color: 'var(--text-2)',
                        fontSize: '0.9rem',
                        lineHeight: 1.75,
                        marginTop: '16px',
                        marginBottom: '24px',
                      }}
                    >
                      A full cartographic layout studio that runs entirely inside your
                      browser — no desktop GIS required. Load spatial data, auto-generate
                      professional map layouts with north arrow, scale bar, legend and
                      inset maps, then export publication-ready PDFs or high-DPI PNGs in
                      minutes.
                    </p>

                    {/* Feature list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '24px' }}>
                      {[
                        '10+ basemap options: OSM, Satellite, Terrain, Dark, and more',
                        'Auto-generate north arrow, scale bar, inset maps & legend',
                        'Drag-and-drop layout editor — no coding required',
                        'Import GeoJSON, KML, KMZ, GPX and Shapefiles',
                        'Export PDF, PNG (up to 600 DPI), and SVG',
                        'Coordinate grid with DMS labels',
                        'Drawing tools: lines, arrows, circles, text annotations',
                      ].map((feat) => (
                        <div
                          key={feat}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontSize: '0.855rem',
                            color: 'var(--text-2)',
                            lineHeight: 1.5,
                          }}
                        >
                          <span style={{ color: '#0ea5e9', fontWeight: 700, flexShrink: 0 }}>✓</span>
                          {feat}
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div style={{ marginBottom: '28px' }}>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--text-3)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          fontWeight: 600,
                          marginBottom: '10px',
                        }}
                      >
                        Built With
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {['MapLibre GL JS', 'TypeScript', 'Custom SVG Engine', 'Chrome Extension API', '1:1 mm Print Scale'].map((tech) => (
                          <span
                            key={tech}
                            style={{
                              fontSize: '0.72rem',
                              color: '#0ea5e9',
                              backgroundColor: 'rgba(14,165,233,0.1)',
                              border: '1px solid rgba(14,165,233,0.25)',
                              borderRadius: '4px',
                              padding: '3px 8px',
                              fontWeight: 500,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <a
                        href="https://chromewebstore.google.com/detail/maplayout-pro/flgjppmpdkhjpokcgdglnacnopoedbnh"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#0284c7',
                          color: '#fff',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          padding: '11px 22px',
                          borderRadius: '6px',
                          transition: 'background-color 0.2s ease, transform 0.2s ease',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.backgroundColor = '#0369a1'
                          el.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.backgroundColor = '#0284c7'
                          el.style.transform = 'translateY(0)'
                        }}
                      >
                        {/* Chrome icon */}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="2.5"/>
                          <path d="M12 8h9.5M5.3 17l4.75-8.25M5.3 7l4.75 8.25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        </svg>
                        Get on Chrome Store
                      </a>
                      <a
                        href="https://github.com/Osman-Geomatics93"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: '1px solid rgba(14,165,233,0.35)',
                          color: '#0ea5e9',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          padding: '11px 22px',
                          borderRadius: '6px',
                          transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = '#0ea5e9'
                          el.style.color = '#38bdf8'
                          el.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'rgba(14,165,233,0.35)'
                          el.style.color = '#0ea5e9'
                          el.style.transform = 'translateY(0)'
                        }}
                      >
                        <Github size={14} />
                        View Source
                      </a>
                    </div>
                  </div>

                  {/* ── Right: stats + browser mockup ── */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Stats grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                      }}
                    >
                      {[
                        { num: '97+', label: 'Chrome Store Users', color: '#0ea5e9' },
                        { num: '5.0★', label: 'Average Rating', color: '#f59e0b' },
                        { num: '10+', label: 'Basemap Options', color: '#0ea5e9' },
                        { num: '600 DPI', label: 'Max Export Quality', color: '#10b981' },
                      ].map(({ num, label, color }) => (
                        <div
                          key={label}
                          style={{
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            padding: '18px',
                            textAlign: 'center',
                          }}
                        >
                          <div
                            className="font-display font-bold"
                            style={{ fontSize: '1.3rem', color }}
                          >
                            {num}
                          </div>
                          <div
                            style={{
                              fontSize: '0.72rem',
                              color: 'var(--text-3)',
                              marginTop: '4px',
                              lineHeight: 1.4,
                            }}
                          >
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Browser extension mockup */}
                    <div
                      style={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(14,165,233,0.25)',
                        boxShadow: '0 0 40px rgba(14,165,233,0.12), 0 4px 24px rgba(0,0,0,0.4)',
                      }}
                    >
                      {/* Browser chrome */}
                      <div
                        style={{
                          backgroundColor: '#0c1929',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          borderBottom: '1px solid rgba(14,165,233,0.15)',
                        }}
                      >
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                            <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: c }} />
                          ))}
                        </div>
                        <div
                          style={{
                            flex: 1,
                            backgroundColor: '#162032',
                            borderRadius: '4px',
                            padding: '3px 8px',
                            fontSize: '0.6rem',
                            color: '#0ea5e9',
                            marginLeft: '4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          🔒 MapLayout Pro · Cartographic Studio
                        </div>
                        {/* Extension icon pill */}
                        <div
                          style={{
                            backgroundColor: '#0284c7',
                            borderRadius: '4px',
                            padding: '2px 7px',
                            fontSize: '0.55rem',
                            fontWeight: 700,
                            color: '#fff',
                            flexShrink: 0,
                          }}
                        >
                          EXT
                        </div>
                      </div>

                      {/* Toolbar */}
                      <div
                        style={{
                          backgroundColor: '#0d1f35',
                          padding: '6px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          borderBottom: '1px solid rgba(14,165,233,0.1)',
                          flexWrap: 'wrap',
                        }}
                      >
                        {['OSM', 'Satellite', 'Dark', 'Terrain'].map((b, i) => (
                          <div
                            key={b}
                            style={{
                              fontSize: '0.5rem',
                              color: i === 2 ? '#0d1f35' : '#7e9ab5',
                              backgroundColor: i === 2 ? '#0ea5e9' : '#162032',
                              borderRadius: '3px',
                              padding: '2px 6px',
                              fontWeight: 600,
                            }}
                          >
                            {b}
                          </div>
                        ))}
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                          {['⬆ Import', '⬇ Export'].map((lbl) => (
                            <div
                              key={lbl}
                              style={{
                                fontSize: '0.48rem',
                                color: '#0ea5e9',
                                backgroundColor: 'rgba(14,165,233,0.12)',
                                border: '1px solid rgba(14,165,233,0.3)',
                                borderRadius: '3px',
                                padding: '2px 6px',
                                fontWeight: 600,
                              }}
                            >
                              {lbl}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Map canvas */}
                      <div
                        style={{
                          backgroundColor: '#0a1525',
                          padding: '12px',
                          position: 'relative',
                          minHeight: '200px',
                        }}
                      >
                        {/* Grid overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage:
                              'linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                          }}
                        />

                        {/* Main map frame */}
                        <div
                          style={{
                            position: 'relative',
                            border: '1.5px solid rgba(14,165,233,0.4)',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            margin: '0 0 8px 0',
                            height: '110px',
                            background: 'linear-gradient(135deg, #0d2137 0%, #0a1a2e 50%, #0d2137 100%)',
                          }}
                        >
                          {/* Simulated map shapes */}
                          <svg
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                            viewBox="0 0 300 110"
                            preserveAspectRatio="xMidYMid slice"
                          >
                            <polygon points="40,20 140,15 160,35 120,55 50,50" fill="rgba(14,165,233,0.18)" stroke="rgba(14,165,233,0.5)" strokeWidth="0.8"/>
                            <polygon points="130,30 210,25 230,55 180,70 120,60" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="0.8"/>
                            <polygon points="50,55 130,60 110,85 40,80" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.35)" strokeWidth="0.8"/>
                            <polyline points="20,60 80,50 130,65 200,55 270,60" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5" fill="none"/>
                            {/* Grid lines */}
                            {[0,1,2,3,4].map(i => (
                              <line key={i} x1={i*75} y1="0" x2={i*75} y2="110" stroke="rgba(14,165,233,0.1)" strokeWidth="0.5"/>
                            ))}
                            {[0,1,2].map(i => (
                              <line key={i} x1="0" y1={i*55} x2="300" y2={i*55} stroke="rgba(14,165,233,0.1)" strokeWidth="0.5"/>
                            ))}
                          </svg>

                          {/* Title block */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '6px',
                              left: '6px',
                              backgroundColor: 'rgba(10,21,37,0.85)',
                              border: '1px solid rgba(14,165,233,0.3)',
                              borderRadius: '3px',
                              padding: '3px 6px',
                            }}
                          >
                            <div style={{ fontSize: '0.48rem', color: '#e8f0fe', fontWeight: 700 }}>Gezira Irrigation Scheme</div>
                            <div style={{ fontSize: '0.42rem', color: '#7e9ab5' }}>Sudan · WGS84 · 1:250,000</div>
                          </div>

                          {/* North arrow */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '6px',
                              right: '6px',
                              width: '18px',
                              height: '18px',
                              backgroundColor: 'rgba(10,21,37,0.85)',
                              border: '1px solid rgba(14,165,233,0.3)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.55rem',
                              color: '#0ea5e9',
                              fontWeight: 700,
                            }}
                          >
                            N
                          </div>
                        </div>

                        {/* Bottom row: scale bar + inset + legend */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                          {/* Scale bar */}
                          <div
                            style={{
                              flex: 1,
                              backgroundColor: 'rgba(10,21,37,0.8)',
                              border: '1px solid rgba(14,165,233,0.2)',
                              borderRadius: '3px',
                              padding: '4px 6px',
                            }}
                          >
                            <div style={{ fontSize: '0.42rem', color: '#7e9ab5', marginBottom: '3px' }}>Scale</div>
                            <div style={{ display: 'flex', gap: '1px', alignItems: 'center' }}>
                              {[1,0,1,0,1].map((dark, i) => (
                                <div key={i} style={{ flex: 1, height: '4px', backgroundColor: dark ? '#0ea5e9' : '#162032' }} />
                              ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1px' }}>
                              {['0', '25', '50 km'].map(t => (
                                <div key={t} style={{ fontSize: '0.38rem', color: '#3d5470' }}>{t}</div>
                              ))}
                            </div>
                          </div>

                          {/* Inset map */}
                          <div
                            style={{
                              width: '52px',
                              backgroundColor: 'rgba(10,21,37,0.8)',
                              border: '1px solid rgba(14,165,233,0.2)',
                              borderRadius: '3px',
                              padding: '3px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <div style={{ fontSize: '0.38rem', color: '#7e9ab5', marginBottom: '2px' }}>Inset</div>
                            <svg width="42" height="28" viewBox="0 0 42 28">
                              <rect width="42" height="28" fill="#0d2137"/>
                              <polygon points="5,8 25,5 30,15 20,22 5,18" fill="rgba(14,165,233,0.25)" stroke="rgba(14,165,233,0.5)" strokeWidth="0.5"/>
                              <rect x="15" y="8" width="8" height="8" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="1"/>
                            </svg>
                          </div>

                          {/* Legend */}
                          <div
                            style={{
                              width: '62px',
                              backgroundColor: 'rgba(10,21,37,0.8)',
                              border: '1px solid rgba(14,165,233,0.2)',
                              borderRadius: '3px',
                              padding: '4px 5px',
                            }}
                          >
                            <div style={{ fontSize: '0.4rem', color: '#7e9ab5', marginBottom: '3px', fontWeight: 700 }}>LEGEND</div>
                            {[
                              { color: 'rgba(14,165,233,0.6)', label: 'Irrigated' },
                              { color: 'rgba(16,185,129,0.5)', label: 'Cropland' },
                              { color: 'rgba(245,158,11,0.45)', label: 'Fallow' },
                            ].map(({ color, label }) => (
                              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '2px' }}>
                                <div style={{ width: '7px', height: '7px', backgroundColor: color, borderRadius: '1px', flexShrink: 0 }} />
                                <span style={{ fontSize: '0.38rem', color: '#7e9ab5' }}>{label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* "No GIS software needed" label */}
                        <div
                          style={{
                            marginTop: '8px',
                            textAlign: 'center',
                            fontSize: '0.48rem',
                            color: '#3d5470',
                            letterSpacing: '0.06em',
                          }}
                        >
                          Publication-ready · Export PDF / PNG 600 DPI / SVG
                        </div>
                      </div>
                    </div>

                    {/* Privacy note */}
                    <div
                      style={{
                        backgroundColor: 'rgba(14,165,233,0.06)',
                        border: '1px solid rgba(14,165,233,0.15)',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>🔒</span>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-3)', lineHeight: 1.55, margin: 0 }}>
                        <strong style={{ color: 'var(--text-2)' }}>Zero data collection.</strong>
                        {' '}All processing happens locally in your browser. No spatial data is
                        transmitted to any server.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== OPEN SOURCE ===================== */}
        <RevealSection>
          <section
            className="resp-section"
            style={{
              padding: '0 24px',
              backgroundColor: 'var(--bg)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Open Source</p>
              <h2
                className="font-display"
                style={{ marginTop: '12px', color: 'var(--text-1)' }}
              >
                GitHub Projects
              </h2>
              <p
                style={{
                  color: 'var(--text-2)',
                  maxWidth: '560px',
                  marginTop: '12px',
                  lineHeight: 1.7,
                }}
              >
                Public tools and research code released for the geospatial community — QGIS
                plugins, deep learning pipelines, and monitoring dashboards.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '20px',
                  marginTop: '48px',
                }}
              >
                {ossProjects.map((proj) => (
                  <a
                    key={proj.name}
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '24px',
                      transition: 'border-color 0.25s ease, transform 0.25s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--border-bright)'
                      el.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--border)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '8px',
                        marginBottom: '10px',
                      }}
                    >
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <Github size={15} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                        <h3
                          className="font-display"
                          style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.3 }}
                        >
                          {proj.name}
                        </h3>
                      </div>
                      <ExternalLink size={13} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                    </div>
                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-2)',
                        lineHeight: 1.65,
                        marginBottom: '14px',
                      }}
                    >
                      {proj.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '0.7rem',
                            color: 'var(--accent)',
                            backgroundColor: 'var(--accent-dim)',
                            border: '1px solid var(--accent-border)',
                            borderRadius: '4px',
                            padding: '2px 7px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
      </main>

      <Footer />
    </>
  )
}

// ===================== PROJECT CARD =====================
interface ProjectData {
  id: number
  slug?: string
  title: string
  org: string
  category: string
  period: string
  location: string
  description: string
  technologies: string[]
  achievement: string
  featured: boolean
}

function ProjectCard({ proj, fullWidth = false }: { proj: ProjectData; fullWidth?: boolean }) {
  const catColor = categoryColor[proj.category] || 'rgba(126,154,181,0.15)'
  const catText = categoryTextColor[proj.category] || 'var(--text-2)'

  return (
    <div
      className={fullWidth ? 'card-row' : ''}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: fullWidth ? '36px' : '28px',
        transition: 'border-color 0.25s ease, transform 0.25s ease',
        display: 'flex',
        flexDirection: fullWidth ? 'row' : 'column',
        gap: fullWidth ? '40px' : '0',
        alignItems: fullWidth ? 'flex-start' : 'stretch',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border-bright)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Main content */}
      <div style={{ flex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: catText,
              backgroundColor: catColor,
              borderRadius: '4px',
              padding: '3px 8px',
              border: `1px solid ${catText}40`,
            }}
          >
            {proj.org}
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-3)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '3px 8px',
            }}
          >
            {proj.category}
          </span>
        </div>

        <h3
          className="font-display"
          style={{
            fontSize: fullWidth ? '1.2rem' : '1rem',
            fontWeight: 700,
            color: 'var(--text-1)',
            lineHeight: 1.35,
            marginBottom: '10px',
          }}
        >
          {proj.title}
        </h3>

        {/* Meta */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.78rem',
              color: 'var(--text-3)',
            }}
          >
            <Calendar size={12} />
            {proj.period}
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.78rem',
              color: 'var(--text-3)',
            }}
          >
            <MapPin size={12} />
            {proj.location}
          </span>
        </div>

        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-2)',
            lineHeight: 1.7,
            marginBottom: '16px',
          }}
        >
          {proj.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {proj.technologies.map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-3)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '2px 7px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Achievement highlight (shown as sidebar on featured) */}
      <div
        className={fullWidth ? 'card-row-achievement' : ''}
        style={{
          minWidth: fullWidth ? '240px' : 'auto',
          maxWidth: fullWidth ? '280px' : 'none',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: '6px',
          padding: '20px',
          marginTop: fullWidth ? '0' : '20px',
        }}
      >
        <div
          style={{
            fontSize: '0.7rem',
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px',
          }}
        >
          Key Achievement
        </div>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--accent)',
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          {proj.achievement}
        </p>
        {proj.slug && (
          <a
            href={`/projects/${proj.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78rem',
              color: 'var(--text-3)',
              fontWeight: 600,
              marginTop: '14px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)' }}
          >
            View case study →
          </a>
        )}
      </div>
    </div>
  )
}

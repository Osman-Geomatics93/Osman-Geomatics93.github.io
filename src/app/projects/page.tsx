'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RevealSection from '../components/RevealSection'
import { Calendar, MapPin, ExternalLink, Github } from 'lucide-react'
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
          className="dot-grid"
          style={{ backgroundColor: 'var(--bg)', padding: '96px 24px 64px' }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p className="section-label">Work</p>
            <h1
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
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
                { num: '7', label: 'Field Projects' },
                { num: '2.2M', label: 'Hectares Mapped' },
                { num: '4', label: 'UN / INGO Partners' },
                { num: '8+', label: 'Years in Practice' },
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
            <LeafletMap
              markers={projectsData.map((p) => ({
                lat: p.coordinates[0],
                lng: p.coordinates[1],
                name: p.location,
                type: p.category,
                year: p.period,
                org: p.org,
                desc: p.description,
                slug: p.slug,
              }))}
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

        {/* ===================== OPEN SOURCE ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '96px 24px',
              backgroundColor: 'var(--bg-surface)',
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
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
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
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: fullWidth ? '36px' : '28px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
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

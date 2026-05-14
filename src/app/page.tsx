'use client'

import Nav from './components/Nav'
import Footer from './components/Footer'
import RevealSection from './components/RevealSection'
import { MapPin, Mail, Phone, Linkedin, Github, Download, ExternalLink } from 'lucide-react'
import AnimatedCounter from './components/AnimatedCounter'

const expertiseAreas = [
  {
    title: 'GIS & Remote Sensing',
    description: 'Advanced satellite imagery analysis across optical and radar platforms for land use, agriculture, and environmental monitoring.',
    tools: ['QGIS', 'ArcGIS Pro', 'Google Earth Engine', 'SNAP', 'WaPOR', 'FAO SEPAL'],
  },
  {
    title: 'Programming & ML/AI',
    description: 'End-to-end machine learning pipelines for geospatial classification, yield forecasting, and deep learning model development.',
    tools: ['Python', 'R', 'PyTorch', 'TensorFlow', 'scikit-learn', 'GeoPandas', 'Rasterio'],
  },
  {
    title: 'Field Surveying',
    description: 'High-precision ground-truth data collection using professional-grade surveying instruments and mobile data tools.',
    tools: ['GPS-RTK', 'Total Station (Leica)', 'ADCP', 'ODK Collect', 'Level Instrument'],
  },
  {
    title: 'Water Resources',
    description: 'Hydrological analysis, irrigation scheme monitoring, flood risk assessment, and water productivity optimization.',
    tools: ['WaPOR', 'HEC-RAS', 'SWAT', 'Sentinel-5P/TROPOMI', 'MODIS ET', 'Landsat'],
  },
]

const ossProjects = [
  {
    name: 'wapor-water-productivity',
    description: 'QGIS plugin for FAO WaPOR water productivity analysis and reporting',
    url: 'https://github.com/Osman-Geomatics93/wapor-water-productivity',
    tags: ['QGIS Plugin', 'Python', 'WaPOR'],
  },
  {
    name: 'GeoAccuRate',
    description: 'QGIS plugin implementing Olofsson accuracy assessment methodology for land-cover maps',
    url: 'https://github.com/Osman-Geomatics93/GeoAccuRate',
    tags: ['QGIS Plugin', 'Python', 'Statistics'],
  },
  {
    name: 'GCN-Crop-Classification',
    description: 'Graph Convolutional Network for multi-class crop type mapping — 99.9% classification accuracy',
    url: 'https://github.com/Osman-Geomatics93/GCN-Crop-Classification',
    tags: ['PyTorch', 'GCN', 'Deep Learning'],
  },
  {
    name: 'Merowe-Dam-Water-Quality',
    description: 'Sentinel-2 based water quality monitoring for Merowe Dam, Sudan',
    url: 'https://github.com/Osman-Geomatics93/Merowe-Dam-Water-Quality',
    tags: ['Sentinel-2', 'Python', 'Water Quality'],
  },
  {
    name: 'Sudan-Flood-Disaster-Management',
    description: 'GIS-based flood disaster risk mapping and management framework for Sudan',
    url: 'https://github.com/Osman-Geomatics93/Sudan-Flood-Disaster-Management',
    tags: ['GIS', 'Hydrology', 'Risk Mapping'],
  },
  {
    name: 'gezira-lens',
    description: 'Interactive geospatial dashboard for monitoring the Gezira Irrigation Scheme',
    url: 'https://github.com/Osman-Geomatics93/gezira-lens',
    tags: ['Dashboard', 'JavaScript', 'GEE'],
  },
]

const recentCerts = [
  {
    title: 'Advanced Computer Vision with TensorFlow',
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
  {
    title: 'Python for WaPOR Geospatial Analyses',
    org: 'FAO / IHE Delft',
    year: '2024',
    category: 'Remote Sensing',
  },
  {
    title: 'Remote Sensing Image Acquisition, Analysis and Applications',
    org: 'UNSW Sydney & IEEE',
    year: '2023',
    category: 'Remote Sensing',
  },
]

export default function Home() {
  return (
    <>
      <Nav activePage="home" />

      <main style={{ paddingTop: '64px' }}>
        {/* ===================== HERO ===================== */}
        <section
          className="dot-grid"
          style={{
            backgroundColor: 'var(--bg)',
            paddingTop: '96px',
            paddingBottom: '96px',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '64px',
                alignItems: 'center',
              }}
              className="lg:grid-cols-[1fr_320px]"
            >
              {/* Left column */}
              <div>
                <p className="section-label animate-hero-1">
                  Remote Sensing &amp; GIS Expert
                </p>

                <h1
                  className="font-display font-extrabold animate-hero-2"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    lineHeight: 1.1,
                    marginTop: '16px',
                    color: 'var(--text-1)',
                  }}
                >
                  Geomatics Engineer
                  <br />
                  <span style={{ color: 'var(--accent)' }}>&amp; Research Scientist</span>
                </h1>

                <p
                  className="animate-hero-3"
                  style={{
                    color: 'var(--text-2)',
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    maxWidth: '560px',
                    marginTop: '24px',
                  }}
                >
                  8+ years transforming satellite data into actionable insights for water
                  management, crop monitoring, and environmental assessment. Leading
                  projects with FAO, IFAD, and UNESCO across East Africa and Sudan.
                </p>

                {/* Contact info */}
                <div
                  className="animate-hero-4"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginTop: '24px',
                  }}
                >
                  {[
                    { Icon: MapPin, text: 'Trabzon, Turkey' },
                    { Icon: Mail, text: 'osmangeomatics93@gmail.com' },
                    { Icon: Phone, text: '+90 531 946 44 05' },
                  ].map(({ Icon, text }) => (
                    <span
                      key={text}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.85rem',
                        color: 'var(--text-3)',
                      }}
                    >
                      <Icon size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      {text}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div
                  className="animate-hero-5"
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }}
                >
                  <a
                    href="/cv"
                    target="_blank"
                    rel="noopener noreferrer"
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
                      transition: 'background-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.backgroundColor = 'var(--accent-hover)'
                      el.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.backgroundColor = 'var(--accent)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    <Download size={16} />
                    Download CV
                  </a>
                  <a
                    href="/projects"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid var(--border-bright)',
                      color: 'var(--text-2)',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      padding: '12px 28px',
                      borderRadius: '6px',
                      transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--accent)'
                      el.style.color = 'var(--accent)'
                      el.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--border-bright)'
                      el.style.color = 'var(--text-2)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    View Projects →
                  </a>
                </div>

                {/* Social links */}
                <div
                  className="animate-hero-6"
                  style={{ display: 'flex', gap: '16px', marginTop: '24px' }}
                >
                  <a
                    href="https://www.linkedin.com/in/osman-ibrahim-a02a9a197/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{
                      color: 'var(--text-3)',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)' }}
                  >
                    <Linkedin size={22} />
                  </a>
                  <a
                    href="https://github.com/Osman-Geomatics93"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    style={{
                      color: 'var(--text-3)',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)' }}
                  >
                    <Github size={22} />
                  </a>
                </div>
              </div>

              {/* Right column — photo */}
              <div
                className="animate-hero-3"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <div
                  style={{
                    border: '1px solid var(--border-bright)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                    width: '100%',
                    maxWidth: '320px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }}
                >
                  <img
                    src="https://i.imgur.com/1QHqofS.jpg"
                    alt="Osman Osama Ahmed Ibrahim — Geomatics Engineer"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(20%) contrast(1.05)',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== STATS STRIP ===================== */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: '32px 24px',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                textAlign: 'center',
              }}
            >
              {[
                { to: 8,   suffix: '+', label: 'Years Experience' },
                { to: 15,  suffix: '+', label: 'International Projects' },
                { to: 200, suffix: '+', label: 'Professionals Trained' },
                { to: 13,  suffix: '+', label: 'Certifications' },
              ].map(({ to, suffix, label }, i) => (
                <div
                  key={label}
                  style={{
                    padding: '8px 16px',
                    borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <AnimatedCounter
                    to={to}
                    suffix={suffix}
                    duration={1600}
                    className="font-display font-bold"
                    style={{ fontSize: '1.75rem', color: 'var(--accent)', display: 'block' }}
                  />
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginTop: '4px' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================== EXPERTISE ===================== */}
        <RevealSection>
          <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Capabilities</p>
              <h2
                className="font-display"
                style={{ marginTop: '12px', color: 'var(--text-1)' }}
              >
                Technical Capabilities
              </h2>
              <p
                style={{
                  color: 'var(--text-2)',
                  maxWidth: '560px',
                  marginTop: '12px',
                  lineHeight: 1.7,
                }}
              >
                A full-stack geospatial skill set covering satellite analysis, machine
                learning, field surveying, and hydrological modeling.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '24px',
                  marginTop: '48px',
                }}
              >
                {expertiseAreas.map((area) => (
                  <div
                    key={area.title}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '28px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      transition: 'border-color 0.25s ease, transform 0.25s ease',
                      borderBottomColor: 'var(--accent-border)',
                      borderBottomWidth: '2px',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--border-bright)'
                      el.style.borderBottomColor = 'var(--accent)'
                      el.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--border)'
                      el.style.borderBottomColor = 'var(--accent-border)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--text-1)',
                        marginBottom: '10px',
                      }}
                    >
                      {area.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-2)',
                        lineHeight: 1.65,
                        marginBottom: '16px',
                      }}
                    >
                      {area.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {area.tools.map((tool) => (
                        <span
                          key={tool}
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-3)',
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            padding: '3px 8px',
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== MSC RESEARCH ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '96px 24px',
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Research</p>
              <h2 className="font-display" style={{ marginTop: '12px', color: 'var(--text-1)' }}>
                Master&apos;s Research
              </h2>

              <div
                style={{
                  marginTop: '40px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '40px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '40px',
                    alignItems: 'start',
                  }}
                >
                  <div>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--text-1)',
                        lineHeight: 1.4,
                        marginBottom: '16px',
                      }}
                    >
                      The Use of Remote Sensing for Monitoring Agricultural Products in the
                      Gezira Irrigation Scheme, Sudan
                    </h3>
                    <p
                      style={{
                        color: 'var(--text-2)',
                        fontSize: '0.9rem',
                        lineHeight: 1.7,
                      }}
                    >
                      M.Sc. Geomatics Engineering — Karadeniz Technical University, Turkey (2024).
                      Developed SVM + OBIA crop classification pipelines and novel wheat yield
                      estimation algorithms. Enhanced WaPOR accuracy by 15% across three
                      administrative offices covering 8.4 million hectares.
                    </p>
                    <div
                      style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}
                    >
                      <a
                        href="/msc-thesis.pdf"
                        download="Osman_Ibrahim_MSc_Thesis.pdf"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: 'var(--accent)',
                          color: '#070c14',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          padding: '10px 22px',
                          borderRadius: '6px',
                          transition: 'background-color 0.2s ease, transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.backgroundColor = 'var(--accent-hover)'
                          el.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.backgroundColor = 'var(--accent)'
                          el.style.transform = 'translateY(0)'
                        }}
                      >
                        <Download size={14} />
                        Download Thesis
                      </a>
                      <a
                        href="/msc-presentation.pdf"
                        download="Osman_Ibrahim_Research_Presentation.pdf"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: '1px solid var(--border-bright)',
                          color: 'var(--text-2)',
                          fontWeight: 500,
                          fontSize: '0.85rem',
                          padding: '10px 22px',
                          borderRadius: '6px',
                          transition: 'border-color 0.2s ease, color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'var(--accent)'
                          el.style.color = 'var(--accent)'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'var(--border-bright)'
                          el.style.color = 'var(--text-2)'
                        }}
                      >
                        <Download size={14} />
                        Presentation Slides
                      </a>
                    </div>
                  </div>

                  {/* Key stats */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                    }}
                  >
                    {[
                      { number: '15%', label: 'WaPOR Accuracy Improvement' },
                      { number: '8.4M', label: 'Hectares Study Area' },
                      { number: '3', label: 'Administrative Offices' },
                      { number: '3.50', label: 'GPA (out of 4.00)' },
                    ].map(({ number, label }) => (
                      <div
                        key={label}
                        style={{
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          padding: '20px',
                          textAlign: 'center',
                        }}
                      >
                        <div
                          className="font-display font-bold"
                          style={{ fontSize: '1.5rem', color: 'var(--warm)' }}
                        >
                          {number}
                        </div>
                        <div
                          style={{
                            fontSize: '0.75rem',
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
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== OPEN SOURCE ===================== */}
        <RevealSection>
          <section style={{ padding: '96px 24px', backgroundColor: 'var(--bg)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Open Source</p>
              <h2 className="font-display" style={{ marginTop: '12px', color: 'var(--text-1)' }}>
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
                Public tools and research code released to the geospatial community — QGIS
                plugins, deep learning pipelines, and interactive dashboards.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '8px',
                        marginBottom: '10px',
                      }}
                    >
                      <h3
                        className="font-display"
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: 'var(--text-1)',
                          lineHeight: 1.3,
                        }}
                      >
                        {proj.name}
                      </h3>
                      <ExternalLink
                        size={14}
                        style={{ color: 'var(--text-3)', flexShrink: 0, marginTop: '2px' }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: '0.85rem',
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

              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <a
                  href="https://github.com/Osman-Geomatics93"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid var(--border-bright)',
                    color: 'var(--text-2)',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--accent)'
                    el.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--border-bright)'
                    el.style.color = 'var(--text-2)'
                  }}
                >
                  <Github size={16} />
                  View all repositories on GitHub →
                </a>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== VOLUNTEER / SOCIAL IMPACT ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '96px 24px',
              backgroundColor: 'var(--bg-surface)',
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
                background:
                  'radial-gradient(ellipse 55% 50% at 90% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
              {/* Label row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <p
                  className="section-label"
                  style={{ color: '#a78bfa', marginBottom: 0, letterSpacing: '0.12em' }}
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
                style={{ marginTop: '12px', color: 'var(--text-1)' }}
              >
                Social Impact Project
              </h2>

              {/* Two-column layout */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '56px',
                  marginTop: '48px',
                  alignItems: 'center',
                }}
              >
                {/* ── Left: content ── */}
                <div>
                  {/* Project name + URL */}
                  <div style={{ marginBottom: '8px' }}>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1.6rem',
                        fontWeight: 800,
                        color: 'var(--text-1)',
                        lineHeight: 1.2,
                      }}
                    >
                      Sudan Scholars Hub
                    </h3>
                    <a
                      href="https://www.deltaroots.store"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.85rem',
                        color: '#a78bfa',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '4px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#c4b5fd' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#a78bfa' }}
                    >
                      deltaroots.store
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  <p
                    style={{
                      color: 'var(--text-2)',
                      fontSize: '0.95rem',
                      lineHeight: 1.75,
                      marginTop: '16px',
                      marginBottom: '28px',
                    }}
                  >
                    A free, bilingual (English / Arabic) scholarship discovery platform built
                    to help Sudanese students worldwide navigate the complex landscape of
                    international funding opportunities — from application tracking to
                    side-by-side scholarship comparison.
                  </p>

                  {/* Impact stats */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px',
                      marginBottom: '28px',
                    }}
                  >
                    {[
                      { num: '300+', label: 'Scholarships indexed' },
                      { num: '2', label: 'Languages (AR + EN)' },
                      { num: '100%', label: 'Free for students' },
                      { num: 'RTL', label: 'Full Arabic support' },
                    ].map(({ num, label }) => (
                      <div
                        key={label}
                        style={{
                          backgroundColor: 'rgba(139,92,246,0.08)',
                          border: '1px solid rgba(139,92,246,0.2)',
                          borderRadius: '6px',
                          padding: '14px 18px',
                        }}
                      >
                        <div
                          className="font-display font-bold"
                          style={{ fontSize: '1.25rem', color: '#a78bfa' }}
                        >
                          {num}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '2px' }}>
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features list */}
                  <div style={{ marginBottom: '28px' }}>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '12px',
                        fontWeight: 600,
                      }}
                    >
                      Key Features
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        'Bilingual UI with full RTL Arabic layout',
                        'Scholarship search, filter & category browse',
                        'User accounts — save & track applications',
                        'Side-by-side comparison (up to 3 scholarships)',
                        'Admin CMS dashboard for content management',
                        'Google OAuth + OTP email authentication',
                      ].map((feat) => (
                        <div
                          key={feat}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontSize: '0.875rem',
                            color: 'var(--text-2)',
                            lineHeight: 1.5,
                          }}
                        >
                          <span style={{ color: '#a78bfa', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div style={{ marginBottom: '28px' }}>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '10px',
                        fontWeight: 600,
                      }}
                    >
                      Built With
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {[
                        'Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma ORM',
                        'NextAuth.js v5', 'next-intl', 'Tailwind CSS', 'Resend', 'Zod',
                      ].map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: '0.72rem',
                            color: '#a78bfa',
                            backgroundColor: 'rgba(139,92,246,0.1)',
                            border: '1px solid rgba(139,92,246,0.25)',
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
                      href="https://www.deltaroots.store"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#7c3aed',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        padding: '11px 24px',
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
                      <ExternalLink size={15} />
                      Visit Live Site
                    </a>
                    <a
                      href="https://github.com/Osman-Geomatics93/sudan-scholars-hub"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: '1px solid rgba(139,92,246,0.4)',
                        color: '#a78bfa',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        padding: '11px 24px',
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
                      <Github size={15} />
                      View on GitHub
                    </a>
                  </div>
                </div>

                {/* ── Right: Browser mockup ── */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '480px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid rgba(139,92,246,0.3)',
                      boxShadow: '0 0 60px rgba(139,92,246,0.15), 0 4px 24px rgba(0,0,0,0.4)',
                    }}
                  >
                    {/* Browser chrome */}
                    <div
                      style={{
                        backgroundColor: '#1e1b2e',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        borderBottom: '1px solid rgba(139,92,246,0.2)',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                          <div
                            key={c}
                            style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: '#2d2a40',
                          borderRadius: '4px',
                          padding: '4px 10px',
                          fontSize: '0.7rem',
                          color: '#a78bfa',
                          marginLeft: '6px',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        🔒 deltaroots.store/en
                      </div>
                    </div>

                    {/* Simulated site content */}
                    <div style={{ backgroundColor: '#0f0d1a', padding: '20px' }}>
                      {/* Nav bar */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '22px', height: '22px', backgroundColor: '#7c3aed', borderRadius: '5px' }} />
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e2e8f0' }}>
                            Sudan Scholars Hub
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <div style={{ width: '28px', height: '8px', backgroundColor: '#2d2a40', borderRadius: '4px' }} />
                          <div style={{ width: '28px', height: '8px', backgroundColor: '#2d2a40', borderRadius: '4px' }} />
                          <div style={{ width: '36px', height: '16px', backgroundColor: '#7c3aed', borderRadius: '4px' }} />
                        </div>
                      </div>

                      {/* Hero */}
                      <div
                        style={{
                          background: 'linear-gradient(135deg, #1a1133 0%, #2d1b69 100%)',
                          borderRadius: '8px',
                          padding: '18px',
                          marginBottom: '14px',
                          border: '1px solid rgba(139,92,246,0.2)',
                        }}
                      >
                        <div style={{ fontSize: '0.65rem', color: '#c4b5fd', marginBottom: '6px', fontWeight: 700 }}>
                          منصة المنح الدراسية للطلاب السودانيين
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 700, marginBottom: '10px' }}>
                          Find Your Path to Education
                        </div>
                        <div
                          style={{
                            backgroundColor: '#2d2a40',
                            borderRadius: '5px',
                            padding: '6px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#a78bfa' }} />
                          <div style={{ flex: 1, height: '5px', backgroundColor: '#3d3660', borderRadius: '3px' }} />
                          <div style={{ width: '40px', height: '18px', backgroundColor: '#7c3aed', borderRadius: '4px' }} />
                        </div>
                      </div>

                      {/* Scholarship cards */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                        {[
                          { flag: '🇩🇪', name: 'DAAD Scholarship', country: 'Germany', color: '#fbbf24' },
                          { flag: '🇬🇧', name: 'Chevening Award', country: 'United Kingdom', color: '#34d399' },
                          { flag: '🇹🇷', name: 'Türkiye Burslari', country: 'Turkey', color: '#60a5fa' },
                          { flag: '🇯🇵', name: 'MEXT Scholarship', country: 'Japan', color: '#f87171' },
                        ].map((s) => (
                          <div
                            key={s.name}
                            style={{
                              backgroundColor: '#1a1733',
                              border: '1px solid #2d2a40',
                              borderRadius: '6px',
                              padding: '10px',
                            }}
                          >
                            <div style={{ fontSize: '1rem', marginBottom: '4px' }}>{s.flag}</div>
                            <div style={{ fontSize: '0.55rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '2px', lineHeight: 1.3 }}>
                              {s.name}
                            </div>
                            <div style={{ fontSize: '0.5rem', color: '#6b7280' }}>{s.country}</div>
                            <div
                              style={{
                                marginTop: '6px',
                                fontSize: '0.5rem',
                                color: s.color,
                                backgroundColor: `${s.color}15`,
                                border: `1px solid ${s.color}30`,
                                borderRadius: '3px',
                                padding: '1px 5px',
                                display: 'inline-block',
                              }}
                            >
                              Open
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom bar */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0 0',
                          borderTop: '1px solid #1e1b2e',
                        }}
                      >
                        <div style={{ fontSize: '0.55rem', color: '#6b7280' }}>300+ scholarships available</div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <div style={{ width: '16px', height: '8px', backgroundColor: '#7c3aed', borderRadius: '3px' }} />
                          <div style={{ width: '8px', height: '8px', backgroundColor: '#2d2a40', borderRadius: '3px' }} />
                          <div style={{ width: '8px', height: '8px', backgroundColor: '#2d2a40', borderRadius: '3px' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== CERTIFICATIONS PREVIEW ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '96px 24px',
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Credentials</p>
              <h2 className="font-display" style={{ marginTop: '12px', color: 'var(--text-1)' }}>
                Recent Certifications
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '20px',
                  marginTop: '40px',
                }}
              >
                {recentCerts.map((cert) => (
                  <div
                    key={cert.title}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderLeft: '3px solid var(--accent)',
                      borderRadius: '6px',
                      padding: '24px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--accent)',
                        backgroundColor: 'var(--accent-dim)',
                        border: '1px solid var(--accent-border)',
                        borderRadius: '4px',
                        padding: '2px 7px',
                        display: 'inline-block',
                        marginBottom: '10px',
                      }}
                    >
                      {cert.category}
                    </span>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--text-1)',
                        lineHeight: 1.4,
                        marginBottom: '6px',
                      }}
                    >
                      {cert.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>{cert.org}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '4px' }}>
                      {cert.year}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <a
                  href="/certifications"
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
                    transition: 'background-color 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.backgroundColor = 'var(--accent-hover)'
                    el.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.backgroundColor = 'var(--accent)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  View all 13 certifications →
                </a>
              </div>
            </div>
          </section>
        </RevealSection>
      </main>

      <Footer />
    </>
  )
}

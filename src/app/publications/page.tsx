'use client'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RevealSection from '../components/RevealSection'
import { BookOpen, Code2, FileText, Award, ExternalLink } from 'lucide-react'

const thesis = {
  title:
    'Remote Sensing-Based Evaluation of Agricultural Water Productivity in the Gezira Irrigation Scheme Using WaPOR Data',
  institution: 'Karadeniz Technical University (KTU)',
  department: 'Department of Geomatics Engineering',
  year: '2024',
  type: 'M.Sc. Thesis',
  supervisor: 'Assoc. Prof. Volkan Yilmaz',
  abstract:
    'This thesis developed a multi-scale remote sensing framework for evaluating agricultural water productivity across the Gezira Irrigation Scheme — the world\'s largest contiguous irrigation project (8.4 M ha, central Sudan). FAO WaPOR Level 2 and 3 satellite products were combined with Sentinel-2 10 m imagery and an SVM/OBIA crop classification pipeline to produce field-level water productivity maps (WP = Y/ETa) for 3 consecutive growing seasons. The methodology improved WaPOR accuracy assessment by 15% versus prior approaches, and identified spatial patterns of water use inefficiency guiding targeted management interventions. A QGIS plugin and Python pipeline were released as open-source tools.',
  keywords: [
    'WaPOR',
    'Remote Sensing',
    'Water Productivity',
    'SVM Classification',
    'Gezira Scheme',
    'FAO',
    'OBIA',
    'Irrigation Management',
    'Sudan',
    'Sentinel-2',
  ],
  gpa: '3.50 / 4.00',
}

const technicalReports = [
  {
    title: 'Seasonal Water Productivity Assessment Report — Gezira Irrigation Scheme',
    authors: 'O. Ibrahim',
    year: '2023–2024',
    client: 'Hydraulics Research Center (HRC), Sudan',
    type: 'Technical Report',
    series: '5 seasonal reports',
    description:
      'Series of seasonal monitoring reports documenting WaPOR-based water productivity at administrative-office scale, delivered to HRC Sudan management for irrigation planning.',
  },
  {
    title: 'Water Productivity Baseline Report — Gash Irrigation Scheme',
    authors: 'O. Ibrahim, HRC Sudan Team',
    year: '2021',
    client: 'IFAD / Gash Agricultural Development Project',
    type: 'Technical Report',
    description:
      'Comprehensive baseline water accounting using the FAO WA+ framework for the 300,000 ha spate irrigation system in Kassala State, Sudan. Delivered to IFAD Project Coordination Unit.',
  },
  {
    title: 'GIS-Based Crop Inventory and Monitoring Protocol — Gezira-Managil Complex',
    authors: 'O. Ibrahim, HRC Sudan',
    year: '2019–2021',
    client: 'HRC Sudan / Gezira Board',
    type: 'Technical Report',
    description:
      'Multi-temporal satellite-based crop inventory for the 2.2 million hectare Gezira-Managil complex, replacing manual survey methods and establishing a replicable annual monitoring protocol.',
  },
  {
    title: 'Flood Inundation Mapping and Risk Assessment — South Darfur',
    authors: 'O. Ibrahim, ZOA Team',
    year: '2020',
    client: 'ZOA International',
    type: 'Technical Report',
    description:
      'HEC-HMS/RAS hydrological modelling and Sentinel-1 SAR flood extent mapping for 6 wadi catchments in South Darfur State. Intervention recommendations achieving 40% flood risk reduction.',
  },
  {
    title: 'Nile River Gauging Station Site Selection — Sudan–Egypt Border Reach',
    authors: 'O. Ibrahim, HRC Sudan',
    year: '2020',
    client: 'HRC Sudan / Bilateral Nile Waters Programme',
    type: 'Technical Report',
    description:
      'Multi-criteria GIS spatial analysis identifying 12 priority hydrological gauging locations along the 400 km Nile reach. Combined DEM analysis, HEC-RAS hydraulic modelling, and GPS-RTK field surveys.',
  },
]

const ossProjects = [
  {
    name: 'wapor-water-productivity',
    type: 'QGIS Plugin',
    year: '2023',
    description:
      'QGIS plugin automating FAO WaPOR water productivity analysis, seasonal report generation, and map production. Designed for irrigation scheme monitoring by practitioners without programming background.',
    url: 'https://github.com/Osman-Geomatics93/wapor-water-productivity',
    tags: ['QGIS', 'Python', 'WaPOR', 'FAO'],
  },
  {
    name: 'GeoAccuRate',
    type: 'QGIS Plugin',
    year: '2024',
    description:
      'QGIS plugin implementing the Olofsson et al. (2014) area-adjusted accuracy assessment framework for land-cover and crop maps. Automates confusion matrix, user/producer accuracy, and confidence interval calculation.',
    url: 'https://github.com/Osman-Geomatics93/GeoAccuRate',
    tags: ['QGIS', 'Python', 'Accuracy Assessment', 'Remote Sensing'],
  },
  {
    name: 'GCN-Crop-Classification',
    type: 'Research Code',
    year: '2024',
    description:
      'Graph Convolutional Network (GCN) framework for crop type mapping from Sentinel-2 multi-temporal imagery. Achieved 99.9% overall accuracy on Gezira test dataset. PyTorch implementation with full training pipeline.',
    url: 'https://github.com/Osman-Geomatics93/GCN-Crop-Classification',
    tags: ['PyTorch', 'GCN', 'Deep Learning', 'Sentinel-2'],
  },
  {
    name: 'crop-classification-deep-learning',
    type: 'Research Code',
    year: '2023',
    description:
      'End-to-end deep learning pipeline for multi-class crop classification from Sentinel-2 time series. CNN + LSTM architecture capturing both spectral and temporal crop phenology signatures.',
    url: 'https://github.com/Osman-Geomatics93/crop-classification-deep-learning',
    tags: ['TensorFlow', 'CNN', 'LSTM', 'Time Series'],
  },
  {
    name: 'Merowe-Dam-Water-Quality',
    type: 'Research Code',
    year: '2022',
    description:
      'Sentinel-2 multi-temporal water quality monitoring for Merowe Dam reservoir — turbidity, chlorophyll-a, and CDOM index mapping using empirical band-ratio algorithms and in-situ calibration.',
    url: 'https://github.com/Osman-Geomatics93/Merowe-Dam-Water-Quality',
    tags: ['Sentinel-2', 'Python', 'Water Quality', 'Remote Sensing'],
  },
  {
    name: 'Sudan-Flood-Disaster-Management',
    type: 'Research Code',
    year: '2022',
    description:
      'GIS-based flood disaster risk mapping and management framework for Sudan. Integrates Sentinel-1 SAR flood detection, population exposure analysis, and infrastructure vulnerability scoring.',
    url: 'https://github.com/Osman-Geomatics93/Sudan-Flood-Disaster-Management',
    tags: ['GIS', 'SAR', 'Flood Risk', 'Python'],
  },
  {
    name: 'pansharpening-toolkit',
    type: 'Tool',
    year: '2022',
    description:
      'Python toolkit implementing multiple pansharpening algorithms (Brovey, Gram-Schmidt, IHS, PCA) for fusing high-resolution panchromatic with multispectral satellite bands using Rasterio.',
    url: 'https://github.com/Osman-Geomatics93/pansharpening-toolkit',
    tags: ['Python', 'Rasterio', 'Image Processing'],
  },
  {
    name: 'gezira-lens',
    type: 'Dashboard',
    year: '2023',
    description:
      'Interactive geospatial web dashboard for Gezira Irrigation Scheme monitoring. Real-time WaPOR layer visualization, seasonal comparison, and water productivity trend analysis via Google Earth Engine API.',
    url: 'https://github.com/Osman-Geomatics93/gezira-lens',
    tags: ['JavaScript', 'GEE', 'Dashboard', 'Leaflet'],
  },
  {
    name: 'TerraDiff',
    type: 'Tool',
    year: '2023',
    description:
      'LiDAR-based 3D terrain change detection — compute before/after elevation difference maps (DEMs of Difference), volumetric change estimation, and automated report generation from point cloud inputs.',
    url: 'https://github.com/Osman-Geomatics93/TerraDiff',
    tags: ['Python', 'LiDAR', 'Point Cloud', '3D Analysis'],
  },
]

const typeColors: Record<string, string> = {
  'QGIS Plugin': '#10b981',
  'Research Code': '#7e9ab5',
  'Tool': '#f59e0b',
  'Dashboard': '#60a5fa',
}

export default function PublicationsPage() {
  return (
    <>
      <Nav activePage="publications" />

      <main style={{ paddingTop: '64px' }}>
        {/* ===================== HERO ===================== */}
        <section
          className="dot-grid"
          style={{ backgroundColor: 'var(--bg)', padding: '96px 24px 64px' }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p className="section-label">Research</p>
            <h1
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                color: 'var(--text-1)',
                lineHeight: 1.1,
                marginTop: '16px',
              }}
            >
              Publications &amp; Research
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
              Academic thesis, technical reports from UN-funded projects, and open-source
              geospatial tools published for the global research community.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginTop: '40px' }}>
              {[
                { num: '1', label: 'M.Sc. Thesis' },
                { num: '5', label: 'Technical Reports' },
                { num: '9', label: 'OSS Projects' },
                { num: '3', label: 'UN Partners' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="font-display font-bold" style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>
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

        {/* ===================== THESIS ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '80px 24px',
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Academic</p>
              <h2 className="font-display" style={{ marginTop: '12px', color: 'var(--text-1)' }}>
                M.Sc. Thesis
              </h2>

              <div
                style={{
                  marginTop: '40px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderLeft: '3px solid var(--accent)',
                  borderRadius: '6px',
                  padding: '36px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '20px' }}>
                  <BookOpen size={22} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      {thesis.type} &nbsp;·&nbsp; {thesis.year} &nbsp;·&nbsp; GPA {thesis.gpa}
                    </div>
                    <h3
                      className="font-display"
                      style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.4, marginBottom: '8px' }}
                    >
                      {thesis.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>
                      {thesis.institution} &nbsp;·&nbsp; {thesis.department}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginTop: '3px' }}>
                      Supervised by {thesis.supervisor}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '20px 24px',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                    Abstract
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.75 }}>
                    {thesis.abstract}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {thesis.keywords.map((kw) => (
                    <span
                      key={kw}
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--accent)',
                        backgroundColor: 'rgba(16,185,129,0.08)',
                        border: '1px solid rgba(16,185,129,0.2)',
                        borderRadius: '4px',
                        padding: '3px 8px',
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== TECHNICAL REPORTS ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '80px 24px',
              backgroundColor: 'var(--bg)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Field Research</p>
              <h2 className="font-display" style={{ marginTop: '12px', color: 'var(--text-1)' }}>
                Technical Reports
              </h2>
              <p style={{ color: 'var(--text-2)', maxWidth: '540px', marginTop: '12px', lineHeight: 1.7 }}>
                Project deliverables produced under UN-agency and INGO contracts — water accounting, crop mapping, and hydrological assessments.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }}>
                {technicalReports.map((rep, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '28px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <FileText size={18} style={{ color: 'var(--text-3)', marginTop: '3px', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '16px',
                            flexWrap: 'wrap',
                            marginBottom: '8px',
                          }}
                        >
                          <h3
                            className="font-display"
                            style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.4 }}
                          >
                            {rep.title}
                          </h3>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                            {rep.year}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '4px', fontWeight: 500 }}>
                          {rep.client}
                        </p>
                        {rep.authors && (
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginBottom: '10px' }}>
                            {rep.authors} {rep.series ? `· ${rep.series}` : ''}
                          </p>
                        )}
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.65 }}>
                          {rep.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== OPEN SOURCE ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '80px 24px 96px',
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Open Source</p>
              <h2 className="font-display" style={{ marginTop: '12px', color: 'var(--text-1)' }}>
                Software &amp; Tools
              </h2>
              <p style={{ color: 'var(--text-2)', maxWidth: '540px', marginTop: '12px', lineHeight: 1.7 }}>
                QGIS plugins, deep learning pipelines, and monitoring dashboards released for the global geospatial community on GitHub.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '20px',
                  marginTop: '40px',
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
                      textDecoration: 'none',
                      transition: 'border-color 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            color: typeColors[proj.type] || '#7e9ab5',
                            textTransform: 'uppercase',
                            letterSpacing: '0.07em',
                            display: 'block',
                            marginBottom: '4px',
                          }}
                        >
                          {proj.type} &nbsp;·&nbsp; {proj.year}
                        </span>
                        <h3
                          className="font-display"
                          style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.3 }}
                        >
                          {proj.name}
                        </h3>
                      </div>
                      <ExternalLink size={13} style={{ color: 'var(--text-3)', flexShrink: 0, marginTop: '2px' }} />
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '14px' }}>
                      {proj.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '0.68rem',
                            color: 'var(--text-3)',
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            padding: '2px 6px',
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

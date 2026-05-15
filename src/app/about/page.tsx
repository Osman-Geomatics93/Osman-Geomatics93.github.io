'use client'

import Image from 'next/image'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RevealSection from '../components/RevealSection'
import { MapPin, Calendar, Globe, Users, GraduationCap } from 'lucide-react'
import AnimatedSkillBar from '../components/AnimatedSkillBar'
import GitHubStats from '../components/GitHubStats'
import TiltCard from '../components/TiltCard'

const education = [
  {
    degree: 'M.Sc. Geomatics Engineering',
    field: 'Remote Sensing & GIS',
    institution: 'Karadeniz Technical University',
    location: 'Trabzon, Turkey',
    year: 'Aug 2024',
    gpa: 'GPA 3.50 / 4.00',
    highlights: [
      'Thesis: Remote Sensing for Agricultural Monitoring in the Gezira Irrigation Scheme',
      'SVM + OBIA crop classification methodology',
      'WaPOR accuracy enhancement by 15%',
      'FAO-aligned water productivity assessment framework',
    ],
  },
  {
    degree: 'B.Sc. Surveying Engineering',
    field: 'First Class Honours',
    institution: 'Omdurman Islamic University',
    location: 'Omdurman, Sudan',
    year: '2017',
    gpa: 'First Class Honours',
    highlights: [
      'Core geodesy, photogrammetry, and land surveying curriculum',
      'GPS, total station, and level instrument proficiency',
      'GIS fundamentals and cartographic principles',
      'Foundation for professional career in geomatics',
    ],
  },
]

const careerTimeline = [
  {
    typeLabel: 'Education',
    year: '2013 – 2017',
    title: 'B.Sc. Surveying Engineering',
    org: 'Omdurman Islamic University',
    location: 'Omdurman, Sudan',
    summary:
      'First Class Honours. Foundation in geodesy, photogrammetry, GPS-RTK, GIS, and land surveying — the technical bedrock for everything that followed.',
    color: '#f59e0b',
  },
  {
    typeLabel: 'Work',
    year: '2017 – 2018',
    title: 'Land Surveyor',
    org: 'Ministry of Infrastructure & Transport',
    location: 'Khartoum, Sudan',
    summary:
      'Precision GPS-RTK and total station surveys for national road infrastructure. Topographic mapping, boundary demarcation, and AutoCAD Civil 3D processing.',
    color: '#7e9ab5',
  },
  {
    typeLabel: 'Work',
    year: '2018',
    title: 'Joined Hydraulics Research Center',
    org: 'HRC Sudan',
    location: 'Sudan',
    summary:
      "Joined East Africa's leading water research institution. Began expanding into satellite-based water resource monitoring and remote sensing — a pivot that defined the next eight years.",
    color: '#10b981',
  },
  {
    typeLabel: 'Project',
    year: '2019 – 2021',
    title: 'IFAD & ZOA International Projects',
    org: 'IFAD / ZOA International',
    location: 'Gash Scheme & South Darfur, Sudan',
    summary:
      'Dual international engagements: IFAD water productivity baseline for ~300,000 ha spate scheme and ZOA emergency hydrology achieving 40% flood risk reduction across 6 catchments.',
    color: '#60a5fa',
  },
  {
    typeLabel: 'Project',
    year: '2020 – 2021',
    title: 'FAO Remote Sensing Analyst',
    org: 'FAO / HRC Sudan',
    location: 'Gezira Scheme, Sudan',
    summary:
      'FAO-funded crop monitoring for 8.4 million hectares. Delivered 15% monitoring accuracy improvement and 9% water productivity gain using SVM classification and WaPOR biomass products.',
    color: '#f59e0b',
  },
  {
    typeLabel: 'Education',
    year: '2022 – 2024',
    title: 'M.Sc. Geomatics Engineering',
    org: 'Karadeniz Technical University',
    location: 'Trabzon, Turkey',
    summary:
      'Remote Sensing & GIS specialisation. GPA 3.50/4.00. Thesis on satellite monitoring of the Gezira Irrigation Scheme. Released two open-source QGIS plugins adopted internationally.',
    color: '#10b981',
  },
  {
    typeLabel: 'Work',
    year: '2023 – Present',
    title: 'GIS & Remote Sensing, Water Management',
    org: 'HRC Sudan',
    location: 'Gezira Scheme, Sudan',
    summary:
      'Ongoing WaPOR + Sentinel-2 water productivity monitoring at scale. Released wapor-water-productivity QGIS plugin and GeoAccuRate plugin to the open-source geospatial community.',
    color: '#10b981',
  },
  {
    typeLabel: 'Volunteer',
    year: '2024',
    title: 'Founded Sudan Scholars Hub',
    org: 'deltaroots.store',
    location: 'Remote / Global',
    summary:
      "Built and launched a free bilingual scholarship platform for Sudanese students worldwide — solo, zero funding — because access to international education shouldn't depend on who you know.",
    color: '#a78bfa',
  },
]

const partners = [
  { name: 'FAO', full: 'Food & Agriculture Organization', type: 'UN Agency' },
  { name: 'IFAD', full: 'Intl. Fund for Agricultural Development', type: 'UN Agency' },
  { name: 'UNESCO', full: 'UN Educational, Scientific & Cultural Org.', type: 'UN Agency' },
  { name: 'ZOA', full: 'ZOA International', type: 'INGO' },
  { name: 'KTU', full: 'Karadeniz Technical University', type: 'Academic' },
  { name: 'WES Sudan', full: 'Water, Engineering & Sanitation Sudan', type: 'Government' },
  { name: 'UNAMID', full: 'AU-UN Hybrid Mission in Darfur', type: 'UN Mission' },
  { name: 'IOM', full: 'International Organization for Migration', type: 'UN Agency' },
]

const values = [
  {
    title: 'Evidence-Based Practice',
    description:
      'Every decision is grounded in data. Whether classifying crops from 10-meter Sentinel-2 imagery or selecting river gauging sites, rigorous statistical validation underpins all outputs.',
  },
  {
    title: 'Field-to-Pixel Integration',
    description:
      'Remote sensing without ground truth is speculation. Years of field work with GPS-RTK and ODK Collect inform how satellite products are interpreted and validated.',
  },
  {
    title: 'Open & Reproducible Science',
    description:
      'All major tools and pipelines are released as open-source QGIS plugins and GitHub repositories — making geospatial science accessible to practitioners across Africa and beyond.',
  },
]

const testimonials = [
  {
    quote:
      'Osman demonstrated exceptional capability in applying advanced remote sensing methods to real-world irrigation management challenges. His thesis work on WaPOR-based water productivity assessment produced results that are directly applicable to FAO field programmes.',
    name: 'Assoc. Prof. Volkan Yilmaz',
    role: 'M.Sc. Thesis Supervisor',
    institution: 'Karadeniz Technical University, Turkey',
    contact: 'volkanyilmaz.jdz@ktu.edu.tr',
  },
  {
    quote:
      'His technical contributions to our FAO and IFAD-funded projects were outstanding. Osman\'s ability to translate satellite data into actionable management insights — and to communicate results clearly to non-technical stakeholders — is a rare combination in our field.',
    name: 'Assoc. Prof. Younis A. Gismalla',
    role: 'Head of Remote Sensing Division',
    institution: 'Hydraulics Research Center, Sudan',
    contact: 'hrs_younis@hotmail.com',
  },
]

const skillBars = [
  { label: 'Remote Sensing & Earth Observation', level: 95, cat: 'primary' },
  { label: 'GIS Analysis (QGIS / ArcGIS)', level: 95, cat: 'primary' },
  { label: 'WaPOR / FAO Water Productivity', level: 92, cat: 'primary' },
  { label: 'Google Earth Engine (GEE)', level: 90, cat: 'primary' },
  { label: 'Python (GeoPandas / Rasterio / ML)', level: 88, cat: 'code' },
  { label: 'Machine Learning & Deep Learning', level: 85, cat: 'code' },
  { label: 'R Statistical Analysis', level: 80, cat: 'code' },
  { label: 'Field Surveys (GPS-RTK / ADCP)', level: 88, cat: 'field' },
]

export default function AboutPage() {
  return (
    <>
      <Nav activePage="about" />

      <main style={{ paddingTop: '64px' }}>
        {/* ===================== HERO ===================== */}
        <section
          className="dot-grid resp-section"
          style={{
            backgroundColor: 'var(--bg)',
            padding: '0 24px',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p className="section-label">About</p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '64px',
                alignItems: 'center',
                marginTop: '16px',
              }}
              className="lg:grid-cols-2"
            >
              {/* Left */}
              <div>
                <h1
                  className="font-display font-extrabold"
                  style={{
                    fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                    color: 'var(--text-1)',
                    lineHeight: 1.15,
                    marginBottom: '24px',
                  }}
                >
                  From Sudan to Global Geoscience
                </h1>

                <p
                  style={{
                    color: 'var(--text-2)',
                    lineHeight: 1.75,
                    marginBottom: '18px',
                    fontSize: '1rem',
                  }}
                >
                  Born and trained in Sudan, I built my career at the Hydraulics Research Center
                  — one of East Africa&apos;s leading water and land research institutions. Over
                  eight years, I grew from a field surveyor into a senior remote sensing expert
                  managing FAO- and IFAD-funded projects that span millions of hectares.
                </p>
                <p
                  style={{
                    color: 'var(--text-2)',
                    lineHeight: 1.75,
                    marginBottom: '24px',
                    fontSize: '1rem',
                  }}
                >
                  My M.Sc. at Karadeniz Technical University in Turkey deepened my expertise in
                  machine learning for geospatial analysis — combining SVM, OBIA, and deep
                  learning with WaPOR satellite products to monitor the Gezira Irrigation Scheme,
                  the world&apos;s largest irrigation project.
                </p>

                {/* Quick facts */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginTop: '8px',
                  }}
                >
                  {[
                    { Icon: MapPin, label: 'Location', value: 'Trabzon, Turkey' },
                    { Icon: Calendar, label: 'Experience', value: '8+ years' },
                    { Icon: Globe, label: 'Languages', value: 'Arabic, English, Turkish' },
                    { Icon: Users, label: 'Trained', value: '200+ professionals' },
                  ].map(({ Icon, label, value }) => (
                    <div
                      key={label}
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Icon size={15} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {label}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-1)', fontWeight: 500, marginTop: '2px' }}>
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — photo */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    border: '1px solid var(--border-bright)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                    width: '100%',
                    maxWidth: '340px',
                  }}
                >
                  <Image
                    src="https://i.imgur.com/1QHqofS.jpg"
                    alt="Osman Ibrahim — Geomatics Engineer"
                    width={340}
                    height={425}
                    priority
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

        {/* ===================== EDUCATION ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '96px 24px',
              backgroundColor: 'var(--bg)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Education</p>
              <h2
                className="font-display"
                style={{ marginTop: '12px', color: 'var(--text-1)' }}
              >
                Educational Foundation
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '24px',
                  marginTop: '48px',
                }}
              >
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '32px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                      <GraduationCap size={20} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <h3
                          className="font-display"
                          style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.3 }}
                        >
                          {edu.degree}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--accent)', marginTop: '2px' }}>
                          {edu.field}
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-1)', fontWeight: 500 }}>
                        {edu.institution}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '2px' }}>
                        {edu.location} &middot; {edu.year} &middot; {edu.gpa}
                      </p>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {edu.highlights.map((h) => (
                        <li
                          key={h}
                          style={{
                            fontSize: '0.82rem',
                            color: 'var(--text-2)',
                            paddingLeft: '14px',
                            position: 'relative',
                            marginBottom: '6px',
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: '8px',
                              width: '4px',
                              height: '1px',
                              backgroundColor: 'var(--accent)',
                            }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== CAREER TIMELINE ===================== */}
        <RevealSection>
          <section className="resp-section" style={{ padding: '0 24px', backgroundColor: 'var(--bg)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Experience</p>
              <h2
                className="font-display"
                style={{ marginTop: '12px', color: 'var(--text-1)', marginBottom: '64px' }}
              >
                Career Journey
              </h2>

              <div className="tl-outer">
                {careerTimeline.map((entry, i) => {
                  const isReversed = i % 2 !== 0

                  const dateLabel = (
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: entry.color,
                          backgroundColor: `${entry.color}18`,
                          border: `1px solid ${entry.color}35`,
                          borderRadius: '20px',
                          padding: '3px 10px',
                          letterSpacing: '0.07em',
                          textTransform: 'uppercase',
                          marginBottom: '10px',
                        }}
                      >
                        {entry.typeLabel}
                      </span>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: 'var(--text-2)',
                          lineHeight: 1.4,
                        }}
                      >
                        {entry.year}
                      </div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-3)',
                          marginTop: '4px',
                          lineHeight: 1.4,
                        }}
                      >
                        {entry.location}
                      </div>
                    </div>
                  )

                  const card = (
                    <div
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderLeft: `3px solid ${entry.color}`,
                        borderRadius: '6px',
                        padding: '22px 24px',
                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.transform = 'translateY(-3px)'
                        el.style.boxShadow = `0 6px 20px rgba(0,0,0,0.3), 0 0 0 1px ${entry.color}30`
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.transform = 'translateY(0)'
                        el.style.boxShadow = '0 1px 8px rgba(0,0,0,0.25)'
                      }}
                    >
                      <h3
                        className="font-display"
                        style={{
                          fontSize: '0.975rem',
                          fontWeight: 700,
                          color: 'var(--text-1)',
                          lineHeight: 1.3,
                          marginBottom: '4px',
                        }}
                      >
                        {entry.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: entry.color,
                          fontWeight: 600,
                          marginBottom: '12px',
                        }}
                      >
                        {entry.org}
                      </p>
                      <p
                        style={{
                          fontSize: '0.855rem',
                          color: 'var(--text-2)',
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {entry.summary}
                      </p>
                    </div>
                  )

                  return (
                    <div
                      key={entry.title}
                      className={`tl-row${isReversed ? ' tl-row-rev' : ''}`}
                    >
                      {/* Left slot */}
                      <div
                        className="tl-col-l"
                        style={{ paddingRight: '28px', textAlign: 'right' }}
                      >
                        {isReversed ? card : dateLabel}
                      </div>

                      {/* Center dot */}
                      <div className="tl-col-c">
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--bg)',
                            border: `3px solid ${entry.color}`,
                            boxShadow: `0 0 0 3px var(--bg), 0 0 12px ${entry.color}55`,
                            flexShrink: 0,
                          }}
                        />
                      </div>

                      {/* Right slot */}
                      <div className="tl-col-r" style={{ paddingLeft: '28px' }}>
                        {isReversed ? dateLabel : card}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== TESTIMONIALS ===================== */}
        <RevealSection>
          <section className="resp-section" style={{ padding: '0 24px', backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">References</p>
              <h2 className="font-display" style={{ marginTop: '12px', color: 'var(--text-1)' }}>
                What Colleagues Say
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '24px',
                  marginTop: '48px',
                }}
              >
                {testimonials.map((t) => {
                  const initials = t.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('')
                  return (
                  <TiltCard key={t.name} intensity={5}>
                  <div
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderTop: '3px solid var(--accent)',
                      borderRadius: '6px',
                      padding: '32px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Large decorative quote */}
                    <div
                      style={{
                        fontSize: '4rem',
                        lineHeight: 0.8,
                        marginBottom: '20px',
                        color: 'var(--accent)',
                        opacity: 0.25,
                        fontFamily: 'Georgia, serif',
                        userSelect: 'none',
                      }}
                    >
                      &ldquo;
                    </div>

                    <p
                      style={{
                        fontSize: '0.92rem',
                        color: 'var(--text-2)',
                        lineHeight: 1.8,
                        marginBottom: '28px',
                        fontStyle: 'italic',
                        flex: 1,
                      }}
                    >
                      {t.quote}
                    </p>

                    {/* Author row */}
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {/* Initials avatar */}
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-dim)',
                          border: '1px solid var(--accent-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: 'var(--accent)',
                          fontFamily: 'var(--font-manrope), system-ui, sans-serif',
                        }}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="font-display" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-1)' }}>
                          {t.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--accent)', marginTop: '2px', fontWeight: 500 }}>
                          {t.role}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-3)', marginTop: '2px', lineHeight: 1.4 }}>
                          {t.institution}
                        </div>
                      </div>
                    </div>
                  </div>
                  </TiltCard>
                  )
                })}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== SKILLS & GITHUB ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '96px 24px',
              backgroundColor: 'var(--bg)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '64px',
                  alignItems: 'flex-start',
                }}
              >
                {/* Skills bars */}
                <div>
                  <p className="section-label">Technical Depth</p>
                  <h2 className="font-display" style={{ marginTop: '12px', color: 'var(--text-1)', marginBottom: '40px' }}>
                    Core Skills
                  </h2>
                  {skillBars.map((skill) => (
                    <AnimatedSkillBar
                      key={skill.label}
                      label={skill.label}
                      level={skill.level}
                      color={
                        skill.cat === 'primary'
                          ? 'var(--accent)'
                          : skill.cat === 'code'
                          ? '#60a5fa'
                          : 'var(--warm)'
                      }
                    />
                  ))}
                </div>

                {/* GitHub stats — live from API */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  <div style={{ marginBottom: '28px' }}>
                    <p className="section-label">Open Source</p>
                    <h2 className="font-display" style={{ marginTop: '12px', color: 'var(--text-1)' }}>
                      GitHub Activity
                    </h2>
                  </div>
                  <GitHubStats />
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== INTERNATIONAL PARTNERS ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '96px 24px',
              backgroundColor: 'var(--bg)',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Partners</p>
              <h2
                className="font-display"
                style={{ marginTop: '12px', color: 'var(--text-1)' }}
              >
                International Partners
              </h2>
              <p
                style={{
                  color: 'var(--text-2)',
                  maxWidth: '520px',
                  marginTop: '12px',
                  lineHeight: 1.7,
                }}
              >
                Projects and research conducted in collaboration with leading UN agencies,
                academic institutions, and international NGOs.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '16px',
                  marginTop: '40px',
                }}
              >
                {partners.map((p) => (
                  <div
                    key={p.name}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '20px',
                    }}
                  >
                    <div
                      className="font-display font-bold"
                      style={{ fontSize: '1.1rem', color: 'var(--text-1)', marginBottom: '4px' }}
                    >
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '8px', lineHeight: 1.4 }}>
                      {p.full}
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-3)',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        padding: '2px 7px',
                        display: 'inline-block',
                      }}
                    >
                      {p.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== VALUES ===================== */}
        <RevealSection>
          <section className="resp-section" style={{ padding: '0 24px', backgroundColor: 'var(--bg)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <p className="section-label">Approach</p>
              <h2
                className="font-display"
                style={{ marginTop: '12px', color: 'var(--text-1)' }}
              >
                Values &amp; Approach
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '24px',
                  marginTop: '48px',
                }}
              >
                {values.map((v) => (
                  <div
                    key={v.title}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '32px',
                      transition: 'border-color 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                    }}
                  >
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        marginBottom: '12px',
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-2)',
                        lineHeight: 1.7,
                      }}
                    >
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ===================== CTA ===================== */}
        <RevealSection>
          <section
            style={{
              padding: '96px 24px',
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border)',
              textAlign: 'center',
            }}
          >
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2
                className="font-display"
                style={{ color: 'var(--text-1)', marginBottom: '16px' }}
              >
                Let&apos;s Work Together
              </h2>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '32px' }}>
                Open to research collaborations, consulting projects, and positions in remote
                sensing, GIS, and geospatial data science worldwide.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <a
                  href="/contact"
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
                  Get In Touch →
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
                  View Projects
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

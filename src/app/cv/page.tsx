'use client'

import { Printer } from 'lucide-react'

export default function CVPage() {
  return (
    <>
      {/* ── FLOATING PRINT BUTTON (hidden on print) ── */}
      <button
        onClick={() => window.print()}
        className="no-print"
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 100,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#10b981',
          color: '#070c14',
          fontWeight: 700,
          fontSize: '0.85rem',
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(16,185,129,0.35)',
          fontFamily: 'system-ui, sans-serif',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#059669' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#10b981' }}
      >
        <Printer size={15} />
        Download PDF
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #f5f4f0;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        .cv-wrapper {
          background: #f5f4f0;
          min-height: 100vh;
          padding: 40px 24px 60px;
          display: flex;
          justify-content: center;
        }

        .cv-page {
          width: 210mm;
          max-width: 100%;
          background: #ffffff;
          box-shadow: 0 4px 32px rgba(0,0,0,0.12);
          padding: 18mm 20mm 16mm;
          font-size: 9.5pt;
          line-height: 1.5;
          color: #1a1a1a;
        }

        /* ── HEADER ── */
        .cv-header {
          border-bottom: 2px solid #0f4c35;
          padding-bottom: 10px;
          margin-bottom: 12px;
        }

        .cv-name {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 24pt;
          font-weight: 700;
          color: #0f4c35;
          letter-spacing: 1.5px;
          line-height: 1;
          margin-bottom: 3px;
        }

        .cv-title {
          font-size: 10pt;
          font-weight: 600;
          color: #2c3e50;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .cv-contact {
          font-size: 8.5pt;
          color: #444;
          line-height: 1.7;
        }

        .cv-contact a {
          color: #0f4c35;
          text-decoration: none;
        }

        .sep { color: #aaa; margin: 0 5px; }

        /* ── SECTIONS ── */
        .section { margin-bottom: 10px; }

        .section-title {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 9.5pt;
          font-weight: 700;
          color: #0f4c35;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          border-bottom: 1.5px solid #0f4c35;
          padding-bottom: 2px;
          margin-bottom: 6px;
        }

        /* ── SUMMARY ── */
        .summary p {
          text-align: justify;
          font-size: 9pt;
          line-height: 1.6;
          color: #2a2a2a;
        }

        /* ── COMPETENCIES ── */
        .competencies {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px 12px;
        }

        .comp-item {
          font-size: 8.5pt;
          color: #2a2a2a;
          padding-left: 11px;
          position: relative;
          line-height: 1.5;
        }

        .comp-item::before {
          content: '▪';
          position: absolute;
          left: 0;
          color: #0f4c35;
          font-size: 8pt;
        }

        /* ── SKILLS TABLE ── */
        .skills-grid {
          display: grid;
          grid-template-columns: 148px 1fr;
          gap: 2px 8px;
          font-size: 8.5pt;
        }

        .skill-label { font-weight: 600; color: #1a1a1a; }
        .skill-val { color: #333; }

        /* ── EXPERIENCE ── */
        .job { margin-bottom: 10px; }

        .job-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .job-org {
          font-size: 10pt;
          font-weight: 700;
          color: #0f4c35;
        }

        .job-loc {
          font-size: 8.5pt;
          color: #555;
        }

        .job-mid {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }

        .job-role {
          font-size: 9.5pt;
          font-weight: 600;
          font-style: italic;
          color: #2c3e50;
        }

        .job-date {
          font-size: 8.5pt;
          color: #555;
        }

        .theme-label {
          font-size: 8.5pt;
          font-weight: 700;
          color: #2c3e50;
          margin-top: 5px;
          margin-bottom: 2px;
        }

        .bullet-list { list-style: none; padding: 0; }

        .bullet-list li {
          padding-left: 13px;
          position: relative;
          font-size: 8.5pt;
          color: #2a2a2a;
          margin-bottom: 1.5px;
          text-align: justify;
          line-height: 1.5;
        }

        .bullet-list li::before {
          content: '•';
          position: absolute;
          left: 1px;
          color: #0f4c35;
          font-weight: bold;
        }

        /* ── PROJECTS ── */
        .project { margin-bottom: 5px; }

        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .project-name {
          font-size: 8.5pt;
          font-weight: 700;
          color: #1a1a1a;
        }

        .project-date { font-size: 8pt; color: #555; }

        .project-desc {
          font-size: 8.5pt;
          color: #333;
          padding-left: 12px;
          position: relative;
          text-align: justify;
          line-height: 1.5;
        }

        .project-desc::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #0f4c35;
        }

        /* ── OSS ── */
        .oss-list { list-style: none; padding: 0; }

        .oss-list li {
          font-size: 8.5pt;
          color: #2a2a2a;
          padding-left: 11px;
          position: relative;
          margin-bottom: 2px;
          line-height: 1.5;
        }

        .oss-list li::before {
          content: '▪';
          position: absolute;
          left: 0;
          color: #0f4c35;
          font-size: 8pt;
        }

        .oss-name { font-weight: 700; color: #0f4c35; }
        .oss-sub { color: #2a2a2a; }

        /* ── EDUCATION ── */
        .edu { margin-bottom: 6px; }

        .edu-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .edu-degree {
          font-size: 9.5pt;
          font-weight: 700;
          color: #1a1a1a;
        }

        .edu-date { font-size: 8.5pt; color: #555; }
        .edu-school { font-size: 8.5pt; font-style: italic; color: #333; }
        .edu-detail { font-size: 8.5pt; color: #2a2a2a; }

        /* ── CERTIFICATIONS ── */
        .cert-group-label {
          font-size: 8.5pt;
          font-weight: 700;
          color: #2c3e50;
          margin-top: 4px;
          margin-bottom: 2px;
        }

        .cert-list { list-style: none; padding: 0; }

        .cert-list li {
          font-size: 8pt;
          color: #2a2a2a;
          padding-left: 11px;
          position: relative;
          margin-bottom: 1px;
          line-height: 1.45;
        }

        .cert-list li::before {
          content: '•';
          position: absolute;
          left: 1px;
          color: #0f4c35;
        }

        .cert-iss { color: #555; }

        /* ── LANGUAGES ── */
        .lang-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 4px;
          font-size: 8.5pt;
        }

        .lang-name { font-weight: 700; color: #1a1a1a; }
        .lang-level { color: #333; }

        /* ── REFERENCES ── */
        .ref-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          font-size: 8.5pt;
        }

        .ref-name { font-weight: 700; color: #1a1a1a; }
        .ref-title { font-style: italic; color: #555; }
        .ref-contact { color: #333; }

        /* ── DIVIDER SPACING ── */
        .mt { margin-top: 8px; }

        /* ── PRINT ── */
        @media print {
          .no-print { display: none !important; }

          body { background: #ffffff; }

          .cv-wrapper {
            background: #ffffff;
            padding: 0;
            display: block;
          }

          .cv-page {
            width: 100%;
            box-shadow: none;
            padding: 10mm 14mm;
            font-size: 9pt;
          }

          .section-title { page-break-after: avoid; }
          .job { page-break-inside: avoid; }
          .edu { page-break-inside: avoid; }
          .ref-grid { page-break-inside: avoid; }
          .lang-grid { page-break-inside: avoid; }

          a { color: #0f4c35 !important; }
        }

        @page { size: A4; margin: 0; }

        .no-print { }
      `}</style>

      <div className="cv-wrapper">
        <div className="cv-page">

          {/* ═══════ HEADER ═══════ */}
          <div className="cv-header">
            <div className="cv-name">OSMAN IBRAHIM</div>
            <div className="cv-title">Remote Sensing Expert &amp; Geospatial Specialist</div>
            <div className="cv-contact">
              Sudanese National &nbsp;|&nbsp; Trabzon, Turkey
              <br />
              Phone: <a href="tel:+905319464405">+90-531-946-44-05</a>
              <span className="sep">|</span>
              Email: <a href="mailto:osmangeomatics93@gmail.com">osmangeomatics93@gmail.com</a>
              <span className="sep">|</span>
              GitHub: <a href="https://github.com/Osman-Geomatics93">github.com/Osman-Geomatics93</a>
              <span className="sep">|</span>
              LinkedIn: <a href="https://www.linkedin.com/in/osman-ibrahim-a02a9a197/">linkedin.com/in/osman-ibrahim-a02a9a197</a>
            </div>
          </div>

          {/* ═══════ PROFESSIONAL SUMMARY ═══════ */}
          <div className="section summary">
            <div className="section-title">Professional Summary</div>
            <p>
              Remote Sensing Expert and Geospatial Specialist with 8+ years of progressive experience in satellite
              and aerial imagery analysis, environmental monitoring, land use/land cover classification, change
              detection, and GIS-based data integration for water resources, hydrogeological, and infrastructure
              projects. Specialized in analyzing satellite imagery (Sentinel-2, Landsat, MODIS, Sentinel-5P/TROPOMI)
              to assess environmental conditions, urban expansion, vegetation indices, water bodies, and hydrological
              cycles using advanced spectral analysis and machine learning classification techniques. Proven expertise
              integrating remote sensing data with GIS to create comprehensive decision-support models. Extensive
              experience in groundwater monitoring, water balance studies, water quality assessment, and predictive
              environmental modelling. Proficient in Google Earth Engine, QGIS, ArcGIS, SNAP, Python, and R for
              large-scale satellite data processing. Developer of open-source QGIS plugins and AI/deep learning
              geospatial tools. M.Sc. in Geomatics Engineering (GPA 3.50/4.00) with thesis on remote sensing and
              deep learning for crop area estimation and water productivity. Native Arabic speaker fluent in English
              and Turkish.
            </p>
          </div>

          {/* ═══════ CORE COMPETENCIES ═══════ */}
          <div className="section">
            <div className="section-title">Core Competencies</div>
            <div className="competencies">
              <div className="comp-item">Satellite &amp; Aerial Imagery Analysis</div>
              <div className="comp-item">Environmental Impact Assessment</div>
              <div className="comp-item">Land Use / Land Cover Classification</div>
              <div className="comp-item">Hydrological &amp; Hydrogeological Modelling</div>
              <div className="comp-item">Vegetation Indices &amp; Spectral Analysis (NDVI, EVI)</div>
              <div className="comp-item">Water Bodies &amp; Water Quality Monitoring</div>
              <div className="comp-item">Change Detection &amp; Multi-temporal Analysis</div>
              <div className="comp-item">GIS Data Integration &amp; Spatial Databases</div>
              <div className="comp-item">AI / Deep Learning for Remote Sensing (CNN, GCN, ViT)</div>
              <div className="comp-item">Groundwater Monitoring &amp; Water Balance Studies</div>
              <div className="comp-item">Google Earth Engine &amp; Cloud Computing</div>
              <div className="comp-item">ISO / FAO LCCS Compliant Technical Reporting</div>
              <div className="comp-item">QGIS Plugin Development (Python/PyQGIS)</div>
              <div className="comp-item">Field Surveying &amp; Ground Truth Data Collection</div>
            </div>
          </div>

          {/* ═══════ TECHNICAL SKILLS ═══════ */}
          <div className="section">
            <div className="section-title">Technical Skills</div>
            <div className="skills-grid">
              <span className="skill-label">Remote Sensing:</span>
              <span className="skill-val">Sentinel-2, Landsat, MODIS, Sentinel-5P/TROPOMI, WaPOR (FAO); image pre-processing (mosaicking, atmospheric correction), OBIA segmentation, supervised/unsupervised classification, change detection, spectral indices</span>

              <span className="skill-label">GIS Software:</span>
              <span className="skill-val">QGIS (advanced + plugin developer), ArcGIS Pro / ArcMap, ERDAS Imagine, ENVI, SNAP, MapInfo, Idrisi</span>

              <span className="skill-label">Cloud Platforms:</span>
              <span className="skill-val">Google Earth Engine (GEE), FAO SEPAL, Google Colab</span>

              <span className="skill-label">Programming:</span>
              <span className="skill-val">Python (GeoPandas, Rasterio, scikit-learn, PyTorch, TensorFlow, Pandas, NumPy), R (sf, terra, tidyverse, ggplot2), SQL, batch scripting</span>

              <span className="skill-label">AI &amp; Machine Learning:</span>
              <span className="skill-val">Deep Learning (CNN1D, Vision Transformer, Graph Convolutional Network), SVM, Random Forest, K-Means, OBIA; up to 99.9% classification accuracy</span>

              <span className="skill-label">Hydrological Modelling:</span>
              <span className="skill-val">HEC-RAS, HEC-GeoHMS, SWAT, water balance analysis, catchment hydrology, ADCP discharge measurement</span>

              <span className="skill-label">Environmental Analysis:</span>
              <span className="skill-val">LULC mapping, EIA, climate change analysis, water quality indices (NDCI, FAI, chlorophyll-a, turbidity, TSS, CDOM)</span>

              <span className="skill-label">Web GIS &amp; Databases:</span>
              <span className="skill-val">PostGIS, Leaflet.js, D3.js, Streamlit, FastAPI, spatial databases, interactive dashboards</span>

              <span className="skill-label">Field Instruments:</span>
              <span className="skill-val">Total Station (Leica), GPS RTK, GNSS, Echo Sounder, ADCP, Level, Theodolite, ODK Collect</span>

              <span className="skill-label">Standards &amp; QA:</span>
              <span className="skill-val">ISO standards, FAO LCCS / LCML (ISO 19144-2), Olofsson accuracy assessment, Pontius validation methods</span>
            </div>
          </div>

          {/* ═══════ PROFESSIONAL EXPERIENCE ═══════ */}
          <div className="section">
            <div className="section-title">Professional Experience</div>

            {/* HRC */}
            <div className="job">
              <div className="job-top">
                <span className="job-org">Hydraulics Research Center (HRC) — Ministry of Irrigation &amp; Water Resources</span>
                <span className="job-loc">Wad-Madani, Sudan</span>
              </div>
              <div className="job-mid">
                <span className="job-role">Remote Sensing Expert &amp; GIS Specialist / Research Assistant</span>
                <span className="job-date">October 2018 – Present</span>
              </div>

              <div className="theme-label">Satellite &amp; Aerial Imagery Analysis</div>
              <ul className="bullet-list">
                <li>Analyzed Sentinel-2 and Landsat multi-temporal imagery to assess environmental conditions, land use changes, and water resource status across major irrigation schemes and river basins in Sudan</li>
                <li>Selected satellite imagery based on resolution, coverage, and spectral characteristics for project-specific analyses; performed mosaicking, stacking, atmospheric corrections, and OBIA segmentation</li>
                <li>Extracted land cover types, vegetation indices (NDVI, EVI), water bodies, and cropland boundaries using supervised classification, spectral analysis, and machine learning models</li>
                <li>Monitored urban expansion, river morphology, and environmental change over time using multi-temporal imagery and automated change detection algorithms</li>
              </ul>

              <div className="theme-label">Environmental Modelling &amp; Water Resources</div>
              <ul className="bullet-list">
                <li>Analyzed FAO WaPOR remote sensing data to monitor crop water consumption, yield forecasts, water use efficiency, and groundwater-dependent agricultural productivity across Gezira Irrigation Scheme</li>
                <li>Developed water quality monitoring solutions using Sentinel-2 imagery and spectral indices (NDCI, FAI) to assess chlorophyll-a, turbidity, TSS, and CDOM — applied to Merowe Dam and irrigation waterways</li>
                <li>Conducted hydrographic surveys collecting cross-sectional data on channel geometry, slope, and discharge; applied remote sensing change detection to identify river morphological changes for hydrological modelling</li>
                <li>Developed spatial and attribute databases integrating satellite imagery, field data, and socioeconomic information for comprehensive environmental decision-support systems</li>
              </ul>

              <div className="theme-label">AI / Deep Learning &amp; Tool Development</div>
              <ul className="bullet-list">
                <li>Performed crop classification using SVM and deep learning architectures (CNN1D, Vision Transformer, Graph Convolutional Network) from Sentinel-2 imagery — achieving up to 99.9% classification accuracy</li>
                <li>Developed two QGIS plugins: <strong>wapor-water-productivity</strong> (WaPOR-based evapotranspiration analysis) and <strong>GeoAccuRate</strong> (Olofsson/Pontius accuracy assessment with Kappa indices) — both published on QGIS Plugin Repository</li>
                <li>Built land cover monitoring workflows aligned with FAO LCCS and LCML/ISO 19144-2 standards; developed GEE scripts for large-scale satellite-based monitoring</li>
              </ul>

              <div className="theme-label">Capacity Development &amp; Reporting</div>
              <ul className="bullet-list">
                <li>Authored monthly environmental monitoring reports on crop water consumption, yield forecasts, and water productivity performance for FAO, IFAD, and HRC institutional review</li>
                <li>Delivered recurring training programme as <strong>Certified Trainer</strong> on GIS, remote sensing, and surveying technologies — trained 200+ engineers and researchers; recognized by HRC Director General</li>
              </ul>
            </div>

            {/* Ministry */}
            <div className="job mt">
              <div className="job-top">
                <span className="job-org">Ministry of Infrastructure and Transport</span>
                <span className="job-loc">Khartoum, Sudan</span>
              </div>
              <div className="job-mid">
                <span className="job-role">Surveyor &amp; Geospatial Engineer</span>
                <span className="job-date">August 2017 – August 2018</span>
              </div>
              <ul className="bullet-list">
                <li>Conducted geospatial surveys and feasibility studies for road and dam infrastructure projects using GIS and remote sensing data; prepared technical reports and tender documents</li>
                <li>Supervised construction and rehabilitation projects ensuring adherence to engineering specifications; liaised with government agencies and UN stakeholders on multi-party projects</li>
              </ul>
            </div>
          </div>

          {/* ═══════ KEY PROJECTS ═══════ */}
          <div className="section">
            <div className="section-title">Key Internationally-Funded Projects</div>

            <div className="project">
              <div className="project-top">
                <span className="project-name">GIS &amp; Remote Sensing — Gezira Irrigation Scheme Water Management (HRC)</span>
                <span className="project-date">May 2023 – Present</span>
              </div>
              <div className="project-desc">Developing comprehensive spatial database integrating satellite imagery, field, and environmental data for sustainable water management, climate adaptation, and EIA across the Gezira Irrigation Scheme</div>
            </div>

            <div className="project">
              <div className="project-top">
                <span className="project-name">FAO-Funded: Remote Sensing Analyst — Gezira Irrigation Scheme, Sudan</span>
                <span className="project-date">Jan 2020 – May 2021</span>
              </div>
              <div className="project-desc">Integrated WaPOR remote sensing data and field observations for water management decisions; produced monthly monitoring reports; achieved FAO-commended 9% productivity improvement and 15% monitoring accuracy gain</div>
            </div>

            <div className="project">
              <div className="project-top">
                <span className="project-name">IFAD-Funded: Water Resources Engineer — Gash Irrigation Scheme, Kassala</span>
                <span className="project-date">Mar 2019 – Apr 2020</span>
              </div>
              <div className="project-desc">Applied remote sensing and GIS to optimize water management and agricultural productivity; integrated satellite-derived soil moisture for water balance analysis and irrigation network mapping</div>
            </div>

            <div className="project">
              <div className="project-top">
                <span className="project-name">ZOA-Funded: Hydrology &amp; Remote Sensing Engineer — South Darfur, Sudan</span>
                <span className="project-date">Dec 2019 – Apr 2020</span>
              </div>
              <div className="project-desc">Conducted catchment hydrological studies and flood risk remote sensing analysis; collected field data on rainfall, streamflow, water quality, and land use for infrastructure planning</div>
            </div>

            <div className="project">
              <div className="project-top">
                <span className="project-name">Cropped Area Determination — Gezira &amp; Al-Rahad Irrigation Schemes (HRC)</span>
                <span className="project-date">Jan 2018 – May 2021</span>
              </div>
              <div className="project-desc">Leveraged Sentinel-2 satellite classification and ML models to map 2.2 million feddan of irrigated cropland — replacing manual surveying with automated remote sensing workflows; improved accuracy by 30%</div>
            </div>

            <div className="project">
              <div className="project-top">
                <span className="project-name">Nile Gauging Station Site Selection — Northern Sudan / Egypt Border (HRC)</span>
                <span className="project-date">Dec 2018 – Jun 2020</span>
              </div>
              <div className="project-desc">Used remote sensing change detection to analyze Nile morphological changes; conducted hydrographic surveys and rating curve development; coordinated site selection with Egyptian Ministry of Water Resources</div>
            </div>
          </div>

          {/* ═══════ OPEN-SOURCE SOFTWARE ═══════ */}
          <div className="section">
            <div className="section-title">Open-Source Research Software — github.com/Osman-Geomatics93</div>
            <ul className="oss-list">
              <li><span className="oss-name">wapor-water-productivity</span> — <span className="oss-sub">QGIS plugin for FAO WaPOR-based water productivity analysis, ETa, AGBP, GBWP, NBWP mapping (QGIS Plugin Repository)</span></li>
              <li><span className="oss-name">GeoAccuRate</span> — <span className="oss-sub">QGIS plugin implementing Olofsson (2014) accuracy assessment with Pontius area-adjusted estimates, Kappa, and bias-corrected area (QGIS Plugin Repository)</span></li>
              <li><span className="oss-name">GCN-Crop-Classification</span> — <span className="oss-sub">Graph Convolutional Network pipeline for Sentinel-2 multi-temporal LULC classification — 99.9% overall accuracy (PyTorch)</span></li>
              <li><span className="oss-name">crop-classification-deep-learning</span> — <span className="oss-sub">Multi-architecture Sentinel-2 crop classification comparing CNN1D, Hybrid CNN+MLP, and Vision Transformer (ViT)</span></li>
              <li><span className="oss-name">Merowe-Dam-Water-Quality</span> — <span className="oss-sub">Multi-parameter water quality monitoring via Sentinel-2 and GEE using NDCI, FAI spectral indices (chlorophyll-a, turbidity, TSS, CDOM)</span></li>
              <li><span className="oss-name">Sudan-Flood-Disaster-Management</span> — <span className="oss-sub">PostGIS and Leaflet.js environmental disaster response and flood risk mapping system for Sudan</span></li>
              <li><span className="oss-name">pansharpening-toolkit</span> — <span className="oss-sub">Classical (IHS, Brovey, PCA) and deep learning satellite image pansharpening with quality metrics (ERGAS, SAM, Q-index)</span></li>
              <li><span className="oss-name">gezira-lens</span> — <span className="oss-sub">Interactive geospatial dashboard for Gezira Irrigation Scheme monitoring (Leaflet, D3.js, Streamlit, time animation)</span></li>
              <li><span className="oss-name">TerraDiff</span> — <span className="oss-sub">LiDAR point cloud 3D change detection and volumetric analysis for terrain and glacier surface dynamics</span></li>
            </ul>
          </div>

          {/* ═══════ EDUCATION ═══════ */}
          <div className="section">
            <div className="section-title">Education</div>

            <div className="edu">
              <div className="edu-top">
                <span className="edu-degree">Master of Science in Geomatics Engineering (Remote Sensing &amp; GIS)</span>
                <span className="edu-date">August 2024</span>
              </div>
              <div className="edu-school">Karadeniz Technical University (KTU), Trabzon, Turkey</div>
              <div className="edu-detail">GPA: 3.50 / 4.00 &nbsp;|&nbsp; Supervised by Assoc. Prof. Dr. Volkan Yilmaz</div>
              <div className="edu-detail">
                Thesis: &ldquo;Application of Remote Sensing and Deep Learning for Estimating Crop Areas, Yield, and Water Productivity of Wheat in the Gezira Irrigation Scheme&rdquo;
              </div>
              <div className="edu-detail">Focus Areas: Satellite Image Processing, Spectral Analysis, Deep Learning, Environmental Modelling, GIS, WaPOR</div>
            </div>

            <div className="edu mt">
              <div className="edu-top">
                <span className="edu-degree">B.Sc. (Hons.) in Surveying Engineering — First Class Honours</span>
                <span className="edu-date">July 2017</span>
              </div>
              <div className="edu-school">Omdurman Islamic University, Faculty of Engineering, Khartoum, Sudan</div>
              <div className="edu-detail">Thesis: &ldquo;Evaluating Roads within Omdurman Islamic University Utilizing Geographic Information Systems Technology&rdquo;</div>
            </div>
          </div>

          {/* ═══════ CERTIFICATIONS ═══════ */}
          <div className="section">
            <div className="section-title">Certifications &amp; Professional Development</div>

            <div className="cert-group-label">Remote Sensing, GIS &amp; Water Resources:</div>
            <ul className="cert-list">
              <li>Remote Sensing Image Acquisition, Analysis and Applications &mdash; <span className="cert-iss">UNSW Sydney &amp; IEEE GRSS, Coursera (2023)</span></li>
              <li>Spatial Analysis and Satellite Imagery in a GIS &mdash; <span className="cert-iss">University of Toronto, Coursera (2023)</span></li>
              <li>Geospatial Analysis with ArcGIS &mdash; <span className="cert-iss">University of California, Davis, Coursera (2023)</span></li>
              <li>Python for WaPOR Geospatial Analyses &mdash; <span className="cert-iss">FAO / IHE Delft Institute for Water Education (2024)</span></li>
              <li>GIS &amp; Remote Sensing in WaPOR System &mdash; <span className="cert-iss">Hydraulics Research Center, Sudan (2020)</span></li>
              <li>Geographic Information System (GIS) using QGIS &mdash; <span className="cert-iss">IOM–UN Migration, UNAMID &amp; WES Sudan (2020)</span></li>
              <li>Basics of Remote Sensing &amp; Water Harvesting Applications &mdash; <span className="cert-iss">UNESCO RCWH, Sudan (2019)</span></li>
              <li>Python for GIS Development &mdash; <span className="cert-iss">PARIS Training Center (2019)</span></li>
              <li>Hydraulic Engineering in River Basins &mdash; <span className="cert-iss">Regional Training Center, Hydraulics Research Institute, Egypt (2021)</span></li>
            </ul>

            <div className="cert-group-label">AI, Deep Learning &amp; Data Science:</div>
            <ul className="cert-list">
              <li>Advanced Computer Vision with TensorFlow &mdash; <span className="cert-iss">DeepLearning.AI, Coursera (2024)</span></li>
              <li>Sequence Models (Deep Learning Specialization) &mdash; <span className="cert-iss">DeepLearning.AI, Coursera (2024)</span></li>
              <li>AI Agents and Agentic AI with Python &mdash; <span className="cert-iss">DeepLearning.AI, Coursera (2024)</span></li>
              <li>Data Analysis with Python &mdash; <span className="cert-iss">IBM, Coursera (2024)</span></li>
              <li>Data Analysis with R Programming &mdash; <span className="cert-iss">Google, Coursera (2023)</span></li>
              <li>Advanced Data Visualization with R &mdash; <span className="cert-iss">Coursera (2024)</span></li>
            </ul>

            <div className="cert-group-label">Professional Recognition:</div>
            <ul className="cert-list">
              <li>Certified Trainer — GIS, Remote Sensing &amp; Surveying Engineering &mdash; <span className="cert-iss">Hydraulics Research Center, Sudan (2020)</span></li>
              <li>Introduction to Front-End Development &mdash; <span className="cert-iss">Meta / Coursera (2024)</span></li>
            </ul>
          </div>

          {/* ═══════ LANGUAGES ═══════ */}
          <div className="section" style={{ pageBreakInside: 'avoid' }}>
            <div className="section-title">Languages</div>
            <div className="lang-grid">
              <div>
                <div className="lang-name">Arabic</div>
                <div className="lang-level">Native Speaker</div>
              </div>
              <div>
                <div className="lang-name">English</div>
                <div className="lang-level">Professional — B2/C1</div>
                <div className="lang-level" style={{ fontSize: '7.5pt', color: '#555' }}>Listening B2 · Speaking B2 · Reading C1 · Writing B2</div>
              </div>
              <div>
                <div className="lang-name">Turkish</div>
                <div className="lang-level">Advanced — C1</div>
                <div className="lang-level" style={{ fontSize: '7.5pt', color: '#555' }}>Listening C1 · Speaking C1 · Reading C1 · Writing B2</div>
              </div>
            </div>
          </div>

          {/* ═══════ REFERENCES ═══════ */}
          <div className="section" style={{ pageBreakInside: 'avoid' }}>
            <div className="section-title">References</div>
            <div className="ref-grid">
              <div>
                <div className="ref-name">Assoc. Prof. Volkan Yilmaz</div>
                <div className="ref-title">Dept. of Geomatics Engineering, Karadeniz Technical University</div>
                <div className="ref-contact">Phone: +90-462-377-2778</div>
                <div className="ref-contact">Email: <a href="mailto:volkanyilmaz.jdz@ktu.edu.tr">volkanyilmaz.jdz@ktu.edu.tr</a></div>
              </div>
              <div>
                <div className="ref-name">Assoc. Prof. Younis A. Gismalla (PhD)</div>
                <div className="ref-title">General Director, Hydraulics Research Center, Sudan</div>
                <div className="ref-contact">Phone: +249-912-833-773</div>
                <div className="ref-contact">Email: <a href="mailto:hrs_younis@hotmail.com">hrs_younis@hotmail.com</a></div>
              </div>
            </div>
          </div>

        </div>{/* /cv-page */}
      </div>{/* /cv-wrapper */}
    </>
  )
}

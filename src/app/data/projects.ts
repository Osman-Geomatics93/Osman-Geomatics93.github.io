export interface ProjectDetail {
  id: number
  slug: string
  title: string
  org: string
  funder?: string
  category: string
  period: string
  location: string
  coordinates: [number, number]
  description: string
  fullDescription: string
  methodology: string[]
  technologies: string[]
  outputs: string[]
  achievement: string
  featured: boolean
}

export const projectsData: ProjectDetail[] = [
  {
    id: 1,
    slug: 'gezira-water-management',
    title: 'GIS & Remote Sensing for Water Management',
    org: 'HRC Sudan',
    category: 'Water Resources',
    period: 'May 2023 – Jul 2024',
    location: 'Gezira Scheme, Sudan',
    coordinates: [14.35, 33.35],
    description:
      'Developed comprehensive GIS and remote sensing workflows for irrigation water management across the Gezira Scheme. Integrated WaPOR satellite products with field measurements to produce actionable water productivity maps and seasonal monitoring reports.',
    fullDescription:
      "The Gezira Irrigation Scheme is the world's largest contiguous irrigation project, spanning 8.4 million hectares in central Sudan. This project developed end-to-end workflows combining FAO WaPOR Level 2 and Level 3 products with multi-temporal Sentinel-2 imagery to produce seasonal water productivity assessments. Field-validated crop water requirement models were calibrated against ADCP discharge measurements and GPS-RTK survey benchmarks, ensuring rigorous ground-truth for all satellite-derived outputs.",
    methodology: [
      'Multi-temporal Sentinel-2 NDVI and EVI time-series extraction at 10-meter resolution',
      'WaPOR ETa, AETI, and Biomass product integration for water productivity calculation (WP = Y/ETa)',
      'Object-Based Image Analysis (OBIA) for canal and field boundary delineation',
      'Random Forest land-cover classification for seasonal crop mapping',
      'Python (Rasterio, GeoPandas) automation of product generation and report outputs',
      'QGIS dashboard integration for stakeholder reporting',
    ],
    technologies: ['QGIS', 'WaPOR', 'Google Earth Engine', 'Python', 'Sentinel-2', 'SNAP', 'FAO SEPAL'],
    outputs: [
      'Seasonal water productivity maps at administrative-office scale',
      '5 technical monitoring reports delivered to HRC management',
      'Automated Python pipeline reducing processing time by 60%',
      'QGIS plugin (wapor-water-productivity) released as open source',
    ],
    achievement: 'Streamlined water productivity reporting for 8.4M ha irrigation system',
    featured: true,
  },
  {
    id: 2,
    slug: 'fao-crop-monitoring',
    title: 'Remote Sensing–Based Monitoring and Yield Forecasting',
    org: 'FAO',
    funder: 'FAO',
    category: 'Crop Monitoring',
    period: 'Jan 2023 – Sep 2024',
    location: 'Gezira Scheme, Sudan',
    coordinates: [14.35, 33.35],
    description:
      'FAO-funded project developing satellite-based crop monitoring and wheat yield estimation tools. Combined SVM classification with WaPOR biomass products to forecast production at administrative-office scale.',
    fullDescription:
      'This FAO-funded initiative established a replicable satellite-based crop monitoring system for the Gezira wheat belt. Support Vector Machine (SVM) classifiers were trained on multi-temporal Sentinel-2 imagery (20 bands, 6 seasonal composites) using 600+ GPS-verified field training samples. Wheat yield forecasting combined WaPOR NPP biomass estimates with a harvest index calibrated against historical yield records from the Gezira Board, delivering pre-harvest estimates 8 weeks before official reports.',
    methodology: [
      'SVM multi-class crop classification on Sentinel-2 composites (10 & 20 m bands)',
      'Training sample collection using ODK Collect mobile field surveys (600+ GPS points)',
      'Accuracy assessment using Olofsson (2014) area-adjusted estimators — 94.2% overall accuracy',
      'WaPOR NPP × harvest index yield estimation model development and calibration',
      'Time-series NDVI phenology profiling per administrative block',
      'R (tidyverse, ggplot2) statistical analysis and visualization',
    ],
    technologies: ['SVM', 'WaPOR', 'MODIS', 'Landsat', 'R', 'Python', 'SNAP', 'ODK Collect'],
    outputs: [
      'Pre-harvest wheat yield forecast model (validated within 7% of actual)',
      '15% improvement in crop area monitoring accuracy over previous method',
      '9% water productivity gain identified through spatial analysis',
      'GeoAccuRate QGIS plugin released implementing Olofsson accuracy assessment',
      'Full technical report submitted to FAO Sudan country office',
    ],
    achievement: '15% monitoring accuracy improvement, 9% productivity gain',
    featured: true,
  },
  {
    id: 3,
    slug: 'ifad-gash-scheme',
    title: 'Water Management & Productivity Assessment',
    org: 'IFAD',
    funder: 'IFAD',
    category: 'Water Resources',
    period: 'Mar 2019 – Jul 2021',
    location: 'Gash Irrigation Scheme, Sudan',
    coordinates: [15.45, 36.40],
    description:
      'IFAD-funded project assessing irrigation efficiency and water productivity across the Gash Scheme using multi-temporal satellite imagery. Produced baseline water accounting and identified improvement opportunities for smallholder farmers.',
    fullDescription:
      'The Gash Irrigation Scheme in eastern Sudan (Kassala State) is a spate irrigation system supporting ~300,000 smallholder farming households. This IFAD-funded project established a comprehensive water productivity baseline using the FAO Water Accounting Plus (WA+) framework combined with Sentinel-2 and Landsat-8 satellite imagery. WaPOR Level 1 and 2 products were downscaled to the scheme level and validated against seasonal flow records from the Gash River gauging network.',
    methodology: [
      'FAO Water Accounting Plus (WA+) framework implementation for seasonal analysis',
      'Sentinel-2 10 m and Landsat-8 30 m time-series analysis for crop extent mapping',
      'WaPOR AETI spatial downscaling using regression-kriging with soil-moisture covariates',
      'ArcGIS hydrological modeling for spate irrigation channel network delineation',
      'ERDAS IMAGINE supervised maximum likelihood classification for land-cover baseline',
      'FAO SEPAL platform cloud processing for large-area analysis',
    ],
    technologies: ['ArcGIS', 'ERDAS', 'Sentinel-2', 'Landsat-8', 'WaPOR', 'FAO SEPAL', 'Python'],
    outputs: [
      'Complete water productivity baseline for ~300,000 ha spate scheme',
      'Seasonal water accounting reports in WA+ framework format',
      'Spatial map of low-productivity irrigation blocks for targeted intervention',
      '3 training workshops delivered for local Gash Board technicians',
      'Technical report submitted to IFAD Project Coordination Unit',
    ],
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
    coordinates: [14.35, 33.35],
    description:
      'Designed and implemented a GIS-based crop mapping system covering 2.2 million hectares. Applied multi-temporal NDVI analysis and object-based classification to achieve 30% accuracy improvement.',
    fullDescription:
      'This project developed the first systematic satellite-based crop inventory for the full Gezira-Managil complex (2.2 million hectares), replacing previous manual survey methods. A multi-scale approach combined MODIS 250 m time-series phenology for large-area crop extent detection with Sentinel-2 10 m imagery for field-level classification. Object-Based Image Analysis (OBIA) using eCognition algorithms segmented field boundaries and classified 8 crop types across 3 growing seasons.',
    methodology: [
      'MODIS MOD13Q1 NDVI time-series smoothing (Savitzky-Golay) for phenology extraction',
      'Multi-resolution segmentation in eCognition for field boundary delineation',
      'Random Forest classification on 35 spectral, textural, and temporal features',
      'NDVI change detection for inter-season crop rotation mapping',
      'GPS-RTK ground control network establishment (120 points across 6 blocks)',
      'ArcGIS Pro geodatabase design for annual inventory management',
    ],
    technologies: ['ArcGIS Pro', 'ENVI', 'MODIS', 'Landsat', 'Python', 'Random Forest', 'GPS-RTK'],
    outputs: [
      '2.2 million hectare multi-class crop inventory at 10 m resolution',
      '30% improvement in classification accuracy over previous manual method',
      'Annual crop monitoring protocol adopted by HRC Sudan management',
      'Geodatabase archive of 3 growing seasons for time-series analysis',
    ],
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
    coordinates: [19.8, 30.3],
    description:
      'Led spatial analysis for optimal siting of Nile river gauging stations along the Sudan-Egypt border reach. Identified 12 priority monitoring locations combining DEM analysis with field reconnaissance.',
    fullDescription:
      'A critical transboundary water monitoring project tasked with identifying optimal locations for 12 new hydrological gauging stations along the 400 km Nile reach from Dal Cataract to the Egyptian border. The selection framework combined multi-source DEM analysis (SRTM 30 m, TanDEM-X 12 m), hydraulic stability criteria, and logistical accessibility scoring. Final site selection was validated against historical discharge records from existing HRC Sudan gauging network and cross-checked with Egyptian Water Ministry requirements for bilateral data sharing.',
    methodology: [
      'Multi-criteria GIS spatial analysis using weighted overlay for site suitability scoring',
      'SRTM and TanDEM-X DEM hydrological conditioning and channel network extraction',
      'HEC-RAS 1D hydraulic modeling for channel stability assessment at candidate sites',
      'Sentinel-1 SAR backscatter analysis for bank erosion risk detection',
      'GPS-RTK field reconnaissance surveys at 28 candidate locations',
      'AutoCAD Civil 3D cross-section profiles and benchmark establishment',
    ],
    technologies: ['ArcGIS', 'HEC-RAS', 'DEM', 'GPS-RTK', 'AutoCAD', 'Sentinel-1', 'QGIS'],
    outputs: [
      '12 priority gauging site recommendations with full technical justification',
      'Hydraulic stability assessment report for each selected location',
      'GPS benchmark and cross-section survey data package',
      'Bilateral monitoring protocol draft shared with Egyptian Water Authority',
    ],
    achievement: '12 priority gauging sites identified across 400 km reach',
    featured: false,
  },
  {
    id: 6,
    slug: 'south-darfur-hydrology',
    title: 'Hydrology & Surveying for Catchment Management',
    org: 'ZOA',
    funder: 'ZOA International',
    category: 'Hydrology',
    period: 'Dec 2019 – Apr 2020',
    location: 'South Darfur, Sudan',
    coordinates: [11.0, 24.5],
    description:
      'ZOA-funded emergency hydrology and field surveying project in South Darfur. Conducted topographic surveys, drainage mapping, and flood inundation modeling — achieving 40% flood risk reduction.',
    fullDescription:
      'An emergency response hydrology project in South Darfur State supporting conflict-affected communities through infrastructure-based flood risk reduction. Combining Sentinel-1 SAR flood extent mapping with GPS-RTK topographic surveys of 6 major wadi catchments, the project developed HEC-HMS runoff models calibrated against ADCP discharge measurements. Intervention recommendations (check dams, drainage diversions) were evaluated through HEC-RAS inundation scenarios, identifying cost-effective measures that reduced estimated property and livelihood flood exposure by 40%.',
    methodology: [
      'Sentinel-1 SAR dual-polarization (VH/VV) flood extent mapping during 2019 flood event',
      'GPS-RTK topographic surveys of 6 wadi catchments (total ~1,200 km²)',
      'HEC-HMS hydrological modelling with SCS curve number parameterization',
      'HEC-RAS 2D unsteady flow inundation modelling for design floods (25-year, 50-year return)',
      'ODK Collect mobile data collection for community vulnerability assessment (320 households)',
      'Intervention scenario comparison: check dams, drainage diversion, settlement relocation',
    ],
    technologies: ['QGIS', 'GPS-RTK', 'HEC-HMS', 'HEC-RAS', 'Sentinel-1 SAR', 'ODK Collect', 'AutoCAD'],
    outputs: [
      '40% reduction in estimated flood risk through recommended interventions',
      'Flood inundation maps for 25- and 50-year return periods across 6 catchments',
      'Community vulnerability database (320 households) linked to spatial flood zones',
      'Engineering design brief for 4 priority check dams submitted to ZOA engineers',
    ],
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
    coordinates: [14.5, 33.5],
    description:
      'Conducted bathymetric and sedimentation surveys of Masalamia Canal using ADCP and GPS-RTK. Produced cross-section profiles and sediment budget estimates informing a 3-year maintenance plan.',
    fullDescription:
      'A precision field survey of the 87 km Masalamia main canal — a primary distribution canal within the Gezira scheme — to quantify sedimentation and inform dredging prioritization. ADCP discharge measurements at 22 cross-sections were combined with GPS-RTK bathymetric profiling to produce a continuous sediment volume model. AutoCAD Civil 3D surface generation and HydroSurv processing produced volume estimates at 500 m intervals, identifying 14 critical deposition zones requiring immediate intervention.',
    methodology: [
      'ADCP (SonTek FlowTracker) discharge measurements at 22 cross-sections',
      'GPS-RTK bathymetric profiling — 1.5 m grid spacing across full 87 km reach',
      'AutoCAD Civil 3D 3D surface and volume calculation',
      'HydroSurv post-processing for raw ADCP data integration',
      'Leica Total Station benchmark establishment at each cross-section',
      'Sediment grain size analysis at 45 sampling locations',
    ],
    technologies: ['ADCP', 'GPS-RTK', 'Total Station', 'AutoCAD Civil 3D', 'HydroSurv', 'QGIS'],
    outputs: [
      'Full canal sedimentation budget and 3-year dredging maintenance plan',
      '22 cross-section profiles with sediment depth contours',
      '14 critical deposition zones flagged for priority intervention',
      'Volume-cost optimization model for annual dredging programme',
    ],
    achievement: 'Full canal sedimentation budget produced — informed 3-year maintenance plan',
    featured: false,
  },
]

export const mapMarkers = projectsData
  .filter((p, i, arr) => arr.findIndex(q => q.coordinates[0] === p.coordinates[0] && q.coordinates[1] === p.coordinates[1]) === i)
  .map((p) => ({
    lat: p.coordinates[0],
    lng: p.coordinates[1],
    name: p.location,
    type: p.category,
    year: p.period,
    org: p.org,
    desc: p.description,
    slug: p.slug,
  }))

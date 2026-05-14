'use client'

import { useEffect, useRef } from 'react'

const projectSites = [
  {
    name: 'Gezira Irrigation Scheme',
    lat: 14.38,
    lng: 33.42,
    type: 'FAO Project',
    color: '#10b981',
    desc: 'FAO-funded crop monitoring — 8.4 M ha, 15% accuracy improvement',
    year: '2020–2021',
  },
  {
    name: 'Gash Spate Scheme',
    lat: 15.45,
    lng: 36.35,
    type: 'IFAD Project',
    color: '#60a5fa',
    desc: 'IFAD water productivity baseline — ~300,000 ha spate irrigation',
    year: '2019–2020',
  },
  {
    name: 'South Darfur',
    lat: 11.15,
    lng: 24.90,
    type: 'ZOA Project',
    color: '#f59e0b',
    desc: 'ZOA emergency hydrology — 40% flood risk reduction, 6 catchments',
    year: '2019–2020',
  },
  {
    name: 'Nile Gauging Sites — Northern Sudan',
    lat: 18.55,
    lng: 31.62,
    type: 'HRC Sudan',
    color: '#7e9ab5',
    desc: 'GIS-based gauging site selection along the Nile River',
    year: '2018–2020',
  },
  {
    name: 'Merowe Dam',
    lat: 18.44,
    lng: 31.83,
    type: 'HRC Sudan',
    color: '#7e9ab5',
    desc: 'Sentinel-2 water quality monitoring for Merowe Dam reservoir',
    year: '2021',
  },
  {
    name: 'Karadeniz Technical University',
    lat: 41.00,
    lng: 39.73,
    type: 'Education',
    color: '#a78bfa',
    desc: 'M.Sc. Geomatics Engineering — GPA 3.50/4.00, Aug 2024',
    year: '2022–2024',
  },
  {
    name: 'Hydraulics Research Center',
    lat: 15.58,
    lng: 32.55,
    type: 'HRC Sudan',
    color: '#10b981',
    desc: "East Africa's leading water research institution — 8+ years",
    year: '2018–Present',
  },
]

export default function ProjectMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<unknown>(null)

  useEffect(() => {
    if (mapInstance.current || !mapRef.current) return

    // Dynamically import leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      if (mapInstance.current || !mapRef.current) return

      // Fix default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: [16, 32],
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      })

      mapInstance.current = map

      // Dark satellite-style basemap
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { subdomains: 'abcd', maxZoom: 19 }
      ).addTo(map)

      // Attribution (small)
      L.control.attribution({ prefix: false, position: 'bottomright' })
        .addAttribution('© <a href="https://carto.com/" style="color:#10b981">CARTO</a>')
        .addTo(map)

      // Custom zoom control — bottom left
      L.control.zoom({ position: 'bottomleft' }).addTo(map)

      // Plot markers
      projectSites.forEach((site) => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width:14px;height:14px;
            border-radius:50%;
            background:${site.color};
            border:2px solid rgba(255,255,255,0.7);
            box-shadow:0 0 10px ${site.color}88;
            cursor:pointer;
          "></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        })

        const popup = L.popup({
          className: 'map-popup',
          closeButton: false,
          offset: [0, -6],
          maxWidth: 240,
        }).setContent(`
          <div style="font-family:system-ui,sans-serif;padding:4px 0;">
            <div style="
              display:inline-block;
              font-size:0.6rem;font-weight:700;
              letter-spacing:0.08em;text-transform:uppercase;
              color:${site.color};
              background:${site.color}20;
              border:1px solid ${site.color}40;
              border-radius:20px;padding:2px 8px;
              margin-bottom:6px;
            ">${site.type}</div>
            <div style="font-size:0.82rem;font-weight:700;color:#f1f5f9;line-height:1.3;margin-bottom:4px;">
              ${site.name}
            </div>
            <div style="font-size:0.72rem;color:#94a3b8;line-height:1.5;margin-bottom:4px;">
              ${site.desc}
            </div>
            <div style="font-size:0.65rem;color:${site.color};font-weight:600;">
              ${site.year}
            </div>
          </div>
        `)

        L.marker([site.lat, site.lng], { icon })
          .addTo(map)
          .bindPopup(popup)
      })
    })

    return () => {
      if (mapInstance.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(mapInstance.current as any).remove()
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <>
      {/* Inject Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <style>{`
        .leaflet-container { background: #070c14; }
        .map-popup .leaflet-popup-content-wrapper {
          background: #0d1526;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          color: #f1f5f9;
        }
        .map-popup .leaflet-popup-tip { background: #0d1526; }
        .leaflet-popup-content { margin: 14px 16px; }
        .leaflet-control-zoom a {
          background: #0d1526 !important;
          border-color: rgba(255,255,255,0.12) !important;
          color: #94a3b8 !important;
        }
        .leaflet-control-zoom a:hover { background: #1a2744 !important; color: #fff !important; }
        .leaflet-control-attribution {
          background: rgba(7,12,20,0.7) !important;
          color: #64748b !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a { color: #10b981 !important; }
      `}</style>
      <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
    </>
  )
}

'use client'

import { useEffect, useRef } from 'react'

interface MarkerData {
  lat: number
  lng: number
  name: string
  type: string
  year: string
  org: string
  desc: string
  slug: string
  color?: string
}

interface LeafletMapProps {
  markers: MarkerData[]
}

export default function LeafletMap({ markers }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || mapInstanceRef.current) return

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    import('leaflet').then((L) => {
      if (!containerRef.current || mapInstanceRef.current) return

      const map = L.map(containerRef.current, {
        center: [16, 32],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright" style="color:#10b981">OpenStreetMap</a> © <a href="https://carto.com" style="color:#10b981">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      markers.forEach((proj) => {
        const c = proj.color || '#10b981'
        const icon = L.divIcon({
          html: `<div style="
            width:14px;height:14px;border-radius:50%;
            background:${c};
            border:2px solid ${c}55;
            box-shadow:0 0 0 4px ${c}25, 0 0 16px ${c}80;
            cursor:pointer;
          "></div>`,
          className: '',
          iconSize: [14, 14],
          iconAnchor: [7, 7],
          popupAnchor: [0, -12],
        })

        L.marker([proj.lat, proj.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:system-ui,sans-serif;padding:4px 2px;min-width:210px;">
              <div style="font-size:0.62rem;font-weight:700;color:${c};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;">
                ${proj.type}
              </div>
              <div style="font-size:0.88rem;font-weight:700;color:#111827;line-height:1.35;margin-bottom:3px;">
                ${proj.name}
              </div>
              <div style="font-size:0.73rem;color:#6b7280;margin-bottom:8px;">
                ${proj.org} &nbsp;·&nbsp; ${proj.year}
              </div>
              <p style="margin:0;font-size:0.78rem;color:#374151;line-height:1.55;">
                ${proj.desc.length > 120 ? proj.desc.slice(0, 120) + '…' : proj.desc}
              </p>
              <a href="/projects/${proj.slug}" style="display:inline-block;margin-top:10px;font-size:0.75rem;color:${c};font-weight:600;text-decoration:none;">
                View details →
              </a>
            </div>`,
            { maxWidth: 300 }
          )
      })

      mapInstanceRef.current = map
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [markers])

  return (
    <div
      ref={containerRef}
      style={{
        height: '460px',
        width: '100%',
        borderRadius: '6px',
        border: '1px solid #1a2d45',
        overflow: 'hidden',
        position: 'relative',
      }}
    />
  )
}

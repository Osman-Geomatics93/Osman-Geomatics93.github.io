'use client'

import { useEffect, useRef, useState } from 'react'

/* ── project sites ─────────────────────────────────────── */
const PROJECT_SITES = [
  { name: 'Gezira Scheme', lat: 14.38, lng: 33.42, color: '#10b981', desc: 'FAO crop monitoring — 8.4 M ha', year: '2020–2024', org: 'FAO / HRC' },
  { name: 'Gash Spate Scheme', lat: 15.45, lng: 36.35, color: '#60a5fa', desc: 'IFAD water productivity — 300,000 ha', year: '2019–2021', org: 'IFAD' },
  { name: 'South Darfur', lat: 11.15, lng: 24.90, color: '#f59e0b', desc: 'ZOA emergency hydrology', year: '2019–2020', org: 'ZOA' },
  { name: 'Northern Sudan / Nile', lat: 18.55, lng: 31.62, color: '#7e9ab5', desc: 'Nile gauging site selection', year: '2018–2020', org: 'HRC Sudan' },
  { name: 'Merowe Dam', lat: 18.44, lng: 31.83, color: '#7e9ab5', desc: 'Sentinel-2 water quality monitoring', year: '2021', org: 'HRC Sudan' },
  { name: 'Karadeniz Technical University', lat: 41.00, lng: 39.73, color: '#a78bfa', desc: 'M.Sc. Geomatics Engineering', year: '2022–2024', org: 'KTU Turkey' },
  { name: 'Hydraulics Research Center', lat: 15.58, lng: 32.55, color: '#10b981', desc: 'East Africa\'s leading water research — 8+ years', year: '2018–Present', org: 'HRC Sudan' },
]

/* ── satellite TLEs (fallback if API unavailable) ──────── */
const SAT_TLES = [
  {
    name: 'Sentinel-2A', color: '#10b981', altitude: 786,
    line1: '1 40697U 15028A   25134.50000000  .00000053  00000-0  34099-4 0  9993',
    line2: '2 40697  98.5703 175.4152 0001089  88.8862 271.2442 14.30826855557163',
  },
  {
    name: 'Sentinel-2B', color: '#60a5fa', altitude: 786,
    line1: '1 42063U 17013A   25134.50000000  .00000049  00000-0  31456-4 0  9997',
    line2: '2 42063  98.5707 355.4000 0001082  89.3215 270.8089 14.30832090395445',
  },
  {
    name: 'Landsat-9', color: '#f59e0b', altitude: 705,
    line1: '1 49260U 21088A   25134.50000000  .00000061  00000-0  34097-4 0  9992',
    line2: '2 49260  98.2207  92.0000 0000948  89.1423 271.0000 14.57109117193821',
  },
]

interface SatInfo { name: string; color: string; altitude: number; lat: number; lng: number; type?: string }

/* compute ground track for one satellite: N minutes ahead */
function computeGroundTrack(
  satLib: typeof import('satellite.js'),
  line1: string,
  line2: string,
  minutes = 100,
  stepMin = 2,
): Array<{ lat: number; lng: number }> {
  const satrec = satLib.twoline2satrec(line1, line2)
  const points: Array<{ lat: number; lng: number }> = []
  const now = Date.now()
  for (let m = 0; m <= minutes; m += stepMin) {
    const t = new Date(now + m * 60000)
    const r = satLib.propagate(satrec, t)
    if (!r?.position) continue
    const gd = satLib.eciToGeodetic(r.position as import('satellite.js').EciVec3<number>, satLib.gstime(t))
    points.push({
      lat: (satLib.degreesLat(gd.latitude) * 10 | 0) / 10,
      lng: (satLib.degreesLong(gd.longitude) * 10 | 0) / 10,
    })
  }
  return points
}

export default function EarthGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<ReturnType<typeof import('globe.gl')['default']> | null>(null)
  const [satellites, setSatellites] = useState<SatInfo[]>([])
  const [satUpdated, setSatUpdated] = useState('')
  const [hovered, setHovered] = useState<typeof PROJECT_SITES[0] | null>(null)
  const [hoveredPos, setHoveredPos] = useState({ x: 0, y: 0 })

  /* ── init globe ──────────────────────────────────────── */
  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current

    let globe: ReturnType<typeof import('globe.gl')['default']>

    const init = async () => {
      const [GlobeModule, satLib] = await Promise.all([
        import('globe.gl'),
        import('satellite.js'),
      ])
      const Globe = GlobeModule.default

      /* project pins data */
      const sitePins = PROJECT_SITES.map(s => ({
        ...s,
        kind: 'site' as const,
        radius: 0.45,
        alt: 0.01,
      }))

      globe = Globe({ animateIn: true })(el)
        /* ── Real Earth texture (NASA Blue Marble) ── */
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
        /* ── Atmosphere ── */
        .showAtmosphere(true)
        .atmosphereColor('#10b981')
        .atmosphereAltitude(0.12)
        /* ── Project site points ── */
        .pointsData(sitePins)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor('color')
        .pointRadius('radius')
        .pointAltitude('alt')
        .pointLabel((d: object) => {
          const s = d as typeof sitePins[0]
          return `
            <div style="
              background:rgba(7,12,20,0.92);
              border:1px solid ${s.color};
              border-left:3px solid ${s.color};
              border-radius:6px;
              padding:10px 14px;
              min-width:180px;
              font-family:system-ui,sans-serif;
              pointer-events:none;
              box-shadow:0 8px 24px rgba(0,0,0,0.6);
            ">
              <p style="font-size:12px;font-weight:700;color:#edf0f8;margin:0 0 3px">${s.name}</p>
              <p style="font-size:11px;color:#7a94b0;margin:0 0 2px;line-height:1.4">${s.desc}</p>
              <p style="font-size:10px;color:${s.color};font-weight:600;margin:0">${s.org} · ${s.year}</p>
            </div>`
        })
        /* ── Camera ── */
        .pointOfView({ lat: 15, lng: 34, altitude: 2 }, 1200)

      /* ── auto-slow-rotate ── */
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.4
      globe.controls().enableDamping = true

      globeRef.current = globe

      /* ── compute ground tracks once ── */
      const tracks = SAT_TLES.map(s => {
        const pts = computeGroundTrack(satLib, s.line1, s.line2, 100, 2)
        return pts.map((p, i) => ({ ...p, satName: s.name, satColor: s.color, i }))
      })

      /* split track into segments (avoid wrap-around arcs) */
      const pathsData: object[] = []
      tracks.forEach((pts, si) => {
        const color = SAT_TLES[si].color
        let seg: typeof pts = []
        for (let i = 0; i < pts.length; i++) {
          if (i > 0 && Math.abs(pts[i].lng - pts[i - 1].lng) > 90) {
            if (seg.length > 1) pathsData.push({ coords: seg.map(p => [p.lng, p.lat]), color })
            seg = []
          }
          seg.push(pts[i])
        }
        if (seg.length > 1) pathsData.push({ coords: seg.map(p => [p.lng, p.lat]), color })
      })

      globe
        .pathsData(pathsData)
        .pathPoints('coords')
        .pathPointLng((p: object) => (p as number[])[0])
        .pathPointLat((p: object) => (p as number[])[1])
        .pathColor((d: object) => {
          const c = (d as { color: string }).color
          return [c, c.replace(')', ', 0.15)').replace('rgb(', 'rgba(').replace('#', '') ]
        })
        .pathDashLength(0.05)
        .pathDashGap(0.03)
        .pathDashAnimateTime(4000)
        .pathStroke(1.2)
        .pathTransitionDuration(0)
    }

    init()

    return () => {
      if (globeRef.current) {
        try { globeRef.current._destructor?.() } catch {}
        el.innerHTML = ''
      }
    }
  }, [])

  /* ── satellite positions poll ───────────────────────── */
  useEffect(() => {
    const fetchSats = async () => {
      try {
        const res = await fetch('/api/satellites')
        if (!res.ok) return
        const data = await res.json()
        if (!data.satellites) return
        setSatellites(data.satellites)
        setSatUpdated(new Date(data.updatedAt).toLocaleTimeString())

        if (!globeRef.current) return

        /* merge site pins + satellite dots */
        const sitePins = PROJECT_SITES.map(s => ({ ...s, kind: 'site', radius: 0.45, alt: 0.01 }))
        const satPins = (data.satellites as SatInfo[]).map(s => ({
          lat: s.lat, lng: s.lng, color: s.color, name: s.name,
          desc: `Altitude: ${s.altitude} km`,
          org: s.type ?? '',
          year: '',
          kind: 'satellite',
          radius: 0.65,
          alt: 0.06 + (s.altitude / 6371) * 0.5,
        }))

        globeRef.current
          .pointsData([...sitePins, ...satPins])
          .pointRadius((d: object) => (d as { radius: number }).radius)
          .pointAltitude((d: object) => (d as { alt: number }).alt)
      } catch { /* silent */ }
    }

    fetchSats()
    const id = setInterval(fetchSats, 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#020810' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Satellite tracker panel */}
      <div style={{
        position: 'absolute', bottom: 16, left: 16,
        background: 'rgba(7,12,20,0.85)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10,
        padding: '12px 16px', minWidth: 210, zIndex: 10,
      }}>
        <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3a5068', marginBottom: 10 }}>
          Live Satellite Positions
        </p>
        {satellites.length === 0 ? (
          <p style={{ fontSize: '0.72rem', color: '#3a5068' }}>Loading…</p>
        ) : satellites.map(sat => (
          <div key={sat.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: sat.color, flexShrink: 0, marginTop: 3, boxShadow: `0 0 6px ${sat.color}` }} />
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#edf0f8', lineHeight: 1.2 }}>{sat.name}</p>
              <p style={{ fontSize: '0.65rem', color: '#3a5068', lineHeight: 1.4 }}>
                {Math.abs(sat.lat)}°{sat.lat >= 0 ? 'N' : 'S'} {Math.abs(sat.lng)}°{sat.lng >= 0 ? 'E' : 'W'} · {sat.altitude} km
              </p>
            </div>
          </div>
        ))}
        {satUpdated && (
          <p style={{ fontSize: '0.6rem', color: '#2a3a50', marginTop: 6, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 6 }}>
            Updated {satUpdated}
          </p>
        )}
      </div>

      {/* Legend */}
      <div style={{
        position: 'absolute', top: 16, right: 16,
        background: 'rgba(7,12,20,0.78)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
        padding: '10px 14px', zIndex: 10,
      }}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3a5068', marginBottom: 8 }}>
          Project Sites
        </p>
        {[
          { color: '#10b981', label: 'FAO / HRC Projects' },
          { color: '#60a5fa', label: 'IFAD Projects' },
          { color: '#f59e0b', label: 'ZOA Projects' },
          { color: '#a78bfa', label: 'Education' },
          { color: '#7e9ab5', label: 'Research' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
            <p style={{ fontSize: '0.65rem', color: '#7a94b0' }}>{l.label}</p>
          </div>
        ))}
        <div style={{ marginTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 8 }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#3a5068', marginBottom: 6 }}>
            Orbital Tracks
          </p>
          {SAT_TLES.map(s => (
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <div style={{ width: 16, height: 2, background: s.color, borderRadius: 1, flexShrink: 0 }} />
              <p style={{ fontSize: '0.65rem', color: '#7a94b0' }}>{s.name}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.6rem', color: '#3a5068', marginTop: 8 }}>Drag to rotate · Hover pins</p>
      </div>
    </div>
  )
}

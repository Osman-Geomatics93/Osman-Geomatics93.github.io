'use client'

import { useEffect, useRef, useState } from 'react'

const PROJECT_SITES = [
  { name: 'Gezira Scheme', lat: 14.38, lng: 33.42, color: '#10b981', desc: 'FAO crop monitoring — 8.4 M ha', year: '2020–2021' },
  { name: 'Gash Spate Scheme', lat: 15.45, lng: 36.35, color: '#60a5fa', desc: 'IFAD water productivity — 300,000 ha', year: '2019–2020' },
  { name: 'South Darfur', lat: 11.15, lng: 24.90, color: '#f59e0b', desc: 'ZOA emergency hydrology', year: '2019–2020' },
  { name: 'Northern Sudan / Nile', lat: 18.55, lng: 31.62, color: '#7e9ab5', desc: 'Nile gauging site selection', year: '2018–2020' },
  { name: 'Merowe Dam', lat: 18.44, lng: 31.83, color: '#7e9ab5', desc: 'Sentinel-2 water quality monitoring', year: '2021' },
  { name: 'Karadeniz Technical University', lat: 41.00, lng: 39.73, color: '#a78bfa', desc: 'M.Sc. Geomatics Engineering', year: '2022–2024' },
  { name: 'Hydraulics Research Center', lat: 15.58, lng: 32.55, color: '#10b981', desc: 'East Africa leading water research — 8+ years', year: '2018–Present' },
]

interface SatInfo { name: string; type: string; color: string; altitude: number; lat: number; lng: number }

function latLngToVec3(lat: number, lng: number, r = 1.02) {
  const phi = (90 - lat) * Math.PI / 180
  const theta = (lng + 180) * Math.PI / 180
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  }
}

export default function EarthGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; site: typeof PROJECT_SITES[0] } | null>(null)
  const [satellites, setSatellites] = useState<SatInfo[]>([])
  const [satUpdated, setSatUpdated] = useState<string>('')

  // Fetch satellite positions
  useEffect(() => {
    const fetchSats = async () => {
      try {
        const res = await fetch('/api/satellites')
        if (!res.ok) return
        const data = await res.json()
        if (data.satellites) {
          setSatellites(data.satellites)
          setSatUpdated(new Date(data.updatedAt).toLocaleTimeString())
        }
      } catch { /* silent */ }
    }
    fetchSats()
    const interval = setInterval(fetchSats, 15000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    let THREE: typeof import('three')
    let renderer: import('three').WebGLRenderer
    let animId: number
    let earthGroup: import('three').Group
    let satelliteMeshes: Array<{ mesh: import('three').Mesh; name: string; color: string }> = []
    let pinMeshes: Array<{ mesh: import('three').Mesh; site: typeof PROJECT_SITES[0] }> = []
    let camera: import('three').PerspectiveCamera

    // Mouse drag state
    let isDragging = false
    let prevMouse = { x: 0, y: 0 }
    let rotVel = { x: 0, y: 0 }
    let autoRotate = true

    const init = async () => {
      THREE = await import('three')
      const scene = new THREE.Scene()

      const W = container.offsetWidth
      const H = container.offsetHeight
      camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
      camera.position.set(0, 0, 2.6)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // ---- Stars ----
      const starPositions: number[] = []
      for (let i = 0; i < 1200; i++) {
        const r = 50
        const theta = Math.random() * 2 * Math.PI
        const phi = Math.acos(2 * Math.random() - 1)
        starPositions.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        )
      }
      const starGeo = new THREE.BufferGeometry()
      starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, sizeAttenuation: true, transparent: true, opacity: 0.7 })))

      // ---- Earth group (rotates together) ----
      earthGroup = new THREE.Group()
      scene.add(earthGroup)

      // Earth sphere
      const earthGeo = new THREE.SphereGeometry(1, 64, 64)
      const earthMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x050d1a),
        emissive: new THREE.Color(0x020508),
        specular: new THREE.Color(0x112233),
        shininess: 20,
      })
      earthGroup.add(new THREE.Mesh(earthGeo, earthMat))

      // Graticule lines
      const gridMat = new THREE.LineBasicMaterial({ color: 0x0d3d2a, transparent: true, opacity: 0.55 })
      const equatorMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.25 })

      const makeLat = (lat: number, mat: import('three').LineBasicMaterial) => {
        const pts: import('three').Vector3[] = []
        const phi = (90 - lat) * Math.PI / 180
        for (let i = 0; i <= 128; i++) {
          const t = (i / 128) * 2 * Math.PI
          pts.push(new THREE.Vector3(Math.sin(phi) * Math.cos(t), Math.cos(phi), Math.sin(phi) * Math.sin(t)))
        }
        earthGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat))
      }
      const makeLng = (lng: number) => {
        const pts: import('three').Vector3[] = []
        const t = (lng + 180) * Math.PI / 180
        for (let i = 0; i <= 64; i++) {
          const phi = (i / 64) * Math.PI
          pts.push(new THREE.Vector3(Math.sin(phi) * Math.cos(t), Math.cos(phi), Math.sin(phi) * Math.sin(t)))
        }
        earthGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat))
      }

      for (let lat = -80; lat <= 80; lat += 20) {
        makeLat(lat, lat === 0 ? equatorMat : gridMat)
      }
      for (let lng = 0; lng < 360; lng += 20) makeLng(lng)

      // Atmosphere glow
      const atmosGeo = new THREE.SphereGeometry(1.06, 32, 32)
      const atmosMat = new THREE.MeshPhongMaterial({ color: 0x10b981, side: THREE.BackSide, transparent: true, opacity: 0.10 })
      earthGroup.add(new THREE.Mesh(atmosGeo, atmosMat))

      const outerGlowGeo = new THREE.SphereGeometry(1.14, 32, 32)
      const outerGlowMat = new THREE.MeshPhongMaterial({ color: 0x051a10, side: THREE.BackSide, transparent: true, opacity: 0.25 })
      earthGroup.add(new THREE.Mesh(outerGlowGeo, outerGlowMat))

      // Lighting
      scene.add(new THREE.AmbientLight(0x223344, 0.6))
      const sun = new THREE.DirectionalLight(0x8af0c8, 0.9)
      sun.position.set(5, 3, 5)
      scene.add(sun)

      // ---- Project pins ----
      PROJECT_SITES.forEach(site => {
        const pos = latLngToVec3(site.lat, site.lng, 1.02)
        const c = new THREE.Color(site.color)

        const pinGeo = new THREE.SphereGeometry(0.018, 12, 12)
        const pinMat = new THREE.MeshBasicMaterial({ color: c })
        const pin = new THREE.Mesh(pinGeo, pinMat)
        pin.position.set(pos.x, pos.y, pos.z)
        earthGroup.add(pin)
        pinMeshes.push({ mesh: pin, site })

        // Halo ring
        const ringGeo = new THREE.RingGeometry(0.025, 0.038, 24)
        const ringMat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.position.set(pos.x, pos.y, pos.z)
        ring.lookAt(0, 0, 0)
        earthGroup.add(ring)
      })

      // ---- Satellite placeholders (updated via useEffect satellites state) ----
      // We'll manage satellites via a separate update function

      // ---- Lighting ----
      scene.add(new THREE.PointLight(0x10b981, 0.15, 10))

      // ---- Raycaster for hover ----
      const raycaster = new THREE.Raycaster()
      raycaster.params.Points = { threshold: 0.05 }
      const mouse2d = new THREE.Vector2()

      const onMouseMove = (e: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        mouse2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouse2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

        if (isDragging) return

        raycaster.setFromCamera(mouse2d, camera)
        const hits = raycaster.intersectObjects(pinMeshes.map(p => p.mesh))
        if (hits.length > 0) {
          const hit = pinMeshes.find(p => p.mesh === hits[0].object)
          if (hit) {
            const rect2 = renderer.domElement.getBoundingClientRect()
            setTooltip({ x: e.clientX - rect2.left, y: e.clientY - rect2.top, site: hit.site })
            renderer.domElement.style.cursor = 'pointer'
            return
          }
        }
        setTooltip(null)
        renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'grab'
      }

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true
        autoRotate = false
        prevMouse = { x: e.clientX, y: e.clientY }
        renderer.domElement.style.cursor = 'grabbing'
      }
      const onMouseUp = () => {
        isDragging = false
        renderer.domElement.style.cursor = 'grab'
        setTimeout(() => { autoRotate = true }, 2000)
      }
      const onMouseDrag = (e: MouseEvent) => {
        if (!isDragging) return
        const dx = e.clientX - prevMouse.x
        const dy = e.clientY - prevMouse.y
        rotVel.y = dx * 0.005
        rotVel.x = dy * 0.005
        prevMouse = { x: e.clientX, y: e.clientY }
      }

      renderer.domElement.style.cursor = 'grab'
      renderer.domElement.addEventListener('mousemove', onMouseMove)
      renderer.domElement.addEventListener('mousemove', onMouseDrag)
      renderer.domElement.addEventListener('mousedown', onMouseDown)
      renderer.domElement.addEventListener('mouseup', onMouseUp)
      renderer.domElement.addEventListener('mouseleave', () => { isDragging = false; setTooltip(null) })

      // Resize
      const onResize = () => {
        const W2 = container.offsetWidth
        const H2 = container.offsetHeight
        camera.aspect = W2 / H2
        camera.updateProjectionMatrix()
        renderer.setSize(W2, H2)
      }
      window.addEventListener('resize', onResize, { passive: true })

      // Set initial Earth rotation to face Sudan/Turkey
      earthGroup.rotation.y = -0.55

      // ---- Animate ----
      const animate = () => {
        animId = requestAnimationFrame(animate)

        if (autoRotate) rotVel.y = 0.0012
        earthGroup.rotation.y += rotVel.y
        earthGroup.rotation.x += rotVel.x
        // Clamp x tilt
        earthGroup.rotation.x = Math.max(-0.5, Math.min(0.5, earthGroup.rotation.x))
        if (!isDragging) { rotVel.x *= 0.92; if (!autoRotate) rotVel.y *= 0.92 }

        renderer.render(scene, camera)
      }
      animate()

      // Cleanup
      const cleanup = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        renderer.domElement.remove()
      }
      container.dataset.cleanup = 'ready'
      ;(container as HTMLDivElement & { _cleanup?: () => void })._cleanup = cleanup
    }

    init()

    return () => {
      ;(container as HTMLDivElement & { _cleanup?: () => void })._cleanup?.()
    }
  }, [])

  // Update satellite positions on the globe whenever `satellites` state changes
  useEffect(() => {
    // Satellite dots are rendered in the info panel; actual globe dots update on next globe init
    // For live updates without re-init, we update via the container's stored sat data
  }, [satellites])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x + 16,
            top: tooltip.y - 12,
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-bright)',
            borderLeft: `3px solid ${tooltip.site.color}`,
            borderRadius: '6px',
            padding: '10px 14px',
            pointerEvents: 'none',
            zIndex: 10,
            minWidth: '180px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          }}
        >
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '3px' }}>{tooltip.site.name}</p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-2)', marginBottom: '3px', lineHeight: 1.5 }}>{tooltip.site.desc}</p>
          <p style={{ fontSize: '0.65rem', color: tooltip.site.color, fontWeight: 600 }}>{tooltip.site.year}</p>
        </div>
      )}

      {/* Satellite tracker panel */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          backgroundColor: 'rgba(7,12,20,0.82)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          padding: '12px 16px',
          minWidth: '210px',
          zIndex: 10,
        }}
      >
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3a5068', marginBottom: '10px' }}>
          Live Satellite Positions
        </p>
        {satellites.length === 0 ? (
          <p style={{ fontSize: '0.72rem', color: '#3a5068' }}>Loading…</p>
        ) : (
          satellites.map(sat => (
            <div key={sat.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sat.color, flexShrink: 0, marginTop: '3px', boxShadow: `0 0 6px ${sat.color}` }} />
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#edf0f8', lineHeight: 1.2 }}>{sat.name}</p>
                <p style={{ fontSize: '0.65rem', color: '#3a5068', lineHeight: 1.4 }}>
                  {sat.lat}°{sat.lat >= 0 ? 'N' : 'S'} {Math.abs(sat.lng)}°{sat.lng >= 0 ? 'E' : 'W'} · {sat.altitude} km
                </p>
              </div>
            </div>
          ))
        )}
        {satUpdated && (
          <p style={{ fontSize: '0.6rem', color: '#3a5068', marginTop: '6px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '6px' }}>
            Updated {satUpdated}
          </p>
        )}
      </div>

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: 'rgba(7,12,20,0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '6px',
          padding: '10px 12px',
          zIndex: 10,
        }}
      >
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3a5068', marginBottom: '8px' }}>Project Sites</p>
        {[
          { color: '#10b981', label: 'FAO / HRC Projects' },
          { color: '#60a5fa', label: 'IFAD Projects' },
          { color: '#f59e0b', label: 'ZOA Projects' },
          { color: '#a78bfa', label: 'Education' },
          { color: '#7e9ab5', label: 'Research' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: l.color, flexShrink: 0 }} />
            <p style={{ fontSize: '0.65rem', color: '#7a94b0' }}>{l.label}</p>
          </div>
        ))}
        <p style={{ fontSize: '0.6rem', color: '#3a5068', marginTop: '6px' }}>Drag to rotate · Hover pins</p>
      </div>
    </div>
  )
}

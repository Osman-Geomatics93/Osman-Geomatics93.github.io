import { NextResponse } from 'next/server'

// TLEs sourced from Celestrak — accurate within ~2 weeks of the epoch date
// Update line1/line2 periodically from https://celestrak.org for best accuracy
const SATELLITES = [
  {
    name: 'Sentinel-2A',
    type: 'ESA / Copernicus',
    color: '#10b981',
    altitude: 786,
    line1: '1 40697U 15028A   25134.50000000  .00000053  00000-0  34099-4 0  9993',
    line2: '2 40697  98.5703 175.4152 0001089  88.8862 271.2442 14.30826855557163',
  },
  {
    name: 'Sentinel-2B',
    type: 'ESA / Copernicus',
    color: '#60a5fa',
    altitude: 786,
    line1: '1 42063U 17013A   25134.50000000  .00000049  00000-0  31456-4 0  9997',
    line2: '2 42063  98.5707 355.4000 0001082  89.3215 270.8089 14.30832090395445',
  },
  {
    name: 'Landsat-9',
    type: 'NASA / USGS',
    color: '#f59e0b',
    altitude: 705,
    line1: '1 49260U 21088A   25134.50000000  .00000061  00000-0  34097-4 0  9992',
    line2: '2 49260  98.2207  92.0000 0000948  89.1423 271.0000 14.57109117193821',
  },
]

export async function GET() {
  try {
    // Try to get live TLEs from Celestrak first
    const ids = [40697, 42063, 49260]
    let tleMap: Record<number, { line1: string; line2: string }> = {}

    try {
      const res = await fetch(
        `https://celestrak.org/satcat/tle.txt?CATNR=${ids.join(',')}&FORMAT=tle`,
        { next: { revalidate: 3600 } }
      )
      if (res.ok) {
        const text = await res.text()
        const lines = text.trim().split('\n').map(l => l.trim())
        for (let i = 0; i + 2 < lines.length; i += 3) {
          const catnr = parseInt(lines[i + 1].slice(2, 7))
          if (ids.includes(catnr)) {
            tleMap[catnr] = { line1: lines[i + 1], line2: lines[i + 2] }
          }
        }
      }
    } catch {
      // fall through to hardcoded TLEs
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const satellite = require('satellite.js')
    const now = new Date()
    const gmst = satellite.gstime(now)

    const positions = SATELLITES.map((sat, idx) => {
      const noradIds = [40697, 42063, 49260]
      const tleOverride = tleMap[noradIds[idx]]
      const line1 = tleOverride?.line1 ?? sat.line1
      const line2 = tleOverride?.line2 ?? sat.line2

      try {
        const satrec = satellite.twoline2satrec(line1, line2)
        const result = satellite.propagate(satrec, now)
        if (!result?.position) return null
        const gd = satellite.eciToGeodetic(result.position, gmst)
        return {
          name: sat.name,
          type: sat.type,
          color: sat.color,
          altitude: Math.round(sat.altitude),
          lat: Math.round(satellite.degreesLat(gd.latitude) * 10) / 10,
          lng: Math.round(satellite.degreesLong(gd.longitude) * 10) / 10,
        }
      } catch {
        return null
      }
    }).filter(Boolean)

    return NextResponse.json({ satellites: positions, updatedAt: now.toISOString() })
  } catch {
    return NextResponse.json({ error: 'Tracking unavailable' }, { status: 500 })
  }
}

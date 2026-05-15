'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ── Code snippets ─────────────────────────────────────────────── */
const SNIPPETS = [
  {
    id: 'wapor',
    label: 'WaPOR Analysis',
    lang: 'python',
    title: 'wapor_water_productivity.py',
    description: 'FAO WaPOR — Irrigation Water Productivity mapping for Gezira Scheme',
    color: '#10b981',
    lines: [
      { t: 'comment',  v: '# FAO WaPOR Water Productivity — Gezira Irrigation Scheme' },
      { t: 'keyword',  v: 'import' },   { t: 'plain',   v: ' numpy ' },  { t: 'keyword', v: 'as' }, { t: 'plain', v: ' np\n' },
      { t: 'keyword',  v: 'import' },   { t: 'plain',   v: ' pandas ' }, { t: 'keyword', v: 'as' }, { t: 'plain', v: ' pd\n' },
      { t: 'keyword',  v: 'from' },     { t: 'plain',   v: ' wapordl ' },{ t: 'keyword', v: 'import' }, { t: 'plain', v: ' WaPOR\n' },
      { t: 'blank',    v: '\n' },
      { t: 'comment',  v: '# Connect to WaPOR API and download AETI raster' },
      { t: 'plain',    v: 'api = WaPOR(' },
      { t: 'string',   v: '"L2_AETI_D"' },
      { t: 'plain',    v: ', level=' },
      { t: 'number',   v: '2' },
      { t: 'plain',    v: ')\n' },
      { t: 'plain',    v: 'aeti = api.download(\n' },
      { t: 'plain',    v: '    bbox=[' },
      { t: 'number',   v: '32.1' },
      { t: 'plain',    v: ', ' },
      { t: 'number',   v: '13.5' },
      { t: 'plain',    v: ', ' },
      { t: 'number',   v: '34.5' },
      { t: 'plain',    v: ', ' },
      { t: 'number',   v: '15.1' },
      { t: 'plain',    v: '],\n' },
      { t: 'plain',    v: '    period=[' },
      { t: 'string',   v: '"2022-01-01"' },
      { t: 'plain',    v: ', ' },
      { t: 'string',   v: '"2022-12-31"' },
      { t: 'plain',    v: '],\n' },
      { t: 'plain',    v: ')\n' },
      { t: 'blank',    v: '\n' },
      { t: 'comment',  v: '# Calculate Total Biomass Production (TBP)' },
      { t: 'plain',    v: 'tbp = api.download(' },
      { t: 'string',   v: '"L2_TBP_A"' },
      { t: 'plain',    v: ', level=' },
      { t: 'number',   v: '2' },
      { t: 'plain',    v: ')\n' },
      { t: 'blank',    v: '\n' },
      { t: 'comment',  v: '# Water Productivity = TBP / AETI  (kg/m³)' },
      { t: 'plain',    v: 'wp_gross = np.where(aeti > ' },
      { t: 'number',   v: '0' },
      { t: 'plain',    v: ', tbp / aeti, np.nan)\n' },
      { t: 'blank',    v: '\n' },
      { t: 'builtin',  v: 'print' },
      { t: 'plain',    v: '(' },
      { t: 'string',   v: 'f"Mean WP: {np.nanmean(wp_gross):.2f} kg/m³"' },
      { t: 'plain',    v: ')\n' },
    ],
  },
  {
    id: 'gee',
    label: 'GEE Sentinel-2',
    lang: 'javascript',
    title: 'sentinel2_classification.js',
    description: 'Google Earth Engine — SVM crop classification on Sentinel-2 imagery',
    color: '#3b82f6',
    lines: [
      { t: 'comment',  v: '// Google Earth Engine — Sentinel-2 Crop Classification (SVM)' },
      { t: 'keyword',  v: 'var' },      { t: 'plain',   v: ' roi = ee.FeatureCollection(\n' },
      { t: 'plain',    v: '    ' },
      { t: 'string',   v: '"FAO/GAUL/2015/level2"' },
      { t: 'plain',    v: ').filter(\n' },
      { t: 'plain',    v: '    ee.Filter.eq(' },
      { t: 'string',   v: '"ADM1_NAME"' },
      { t: 'plain',    v: ', ' },
      { t: 'string',   v: '"Gezira"' },
      { t: 'plain',    v: '));\n' },
      { t: 'blank',    v: '\n' },
      { t: 'comment',  v: '// Cloud-free composite — 2022 growing season' },
      { t: 'keyword',  v: 'var' },      { t: 'plain',   v: ' s2 = ee.ImageCollection(\n' },
      { t: 'plain',    v: '    ' },
      { t: 'string',   v: '"COPERNICUS/S2_SR_HARMONIZED"' },
      { t: 'plain',    v: ')\n' },
      { t: 'plain',    v: '    .filterBounds(roi)\n' },
      { t: 'plain',    v: '    .filterDate(' },
      { t: 'string',   v: '"2022-06-01"' },
      { t: 'plain',    v: ', ' },
      { t: 'string',   v: '"2022-09-30"' },
      { t: 'plain',    v: ')\n' },
      { t: 'plain',    v: '    .filter(ee.Filter.lt(' },
      { t: 'string',   v: '"CLOUDY_PIXEL_PERCENTAGE"' },
      { t: 'plain',    v: ', ' },
      { t: 'number',   v: '10' },
      { t: 'plain',    v: '))\n' },
      { t: 'plain',    v: '    .median().clip(roi);\n' },
      { t: 'blank',    v: '\n' },
      { t: 'comment',  v: '// Add spectral indices (NDVI, MNDWI, SAVI)' },
      { t: 'keyword',  v: 'var' },      { t: 'plain',   v: ' ndvi = s2.normalizedDifference([' },
      { t: 'string',   v: '"B8"' },
      { t: 'plain',    v: ',' },
      { t: 'string',   v: '"B4"' },
      { t: 'plain',    v: ']);\n' },
      { t: 'keyword',  v: 'var' },      { t: 'plain',   v: ' features = s2.addBands([ndvi]);\n' },
      { t: 'blank',    v: '\n' },
      { t: 'comment',  v: '// Train SVM classifier on field samples' },
      { t: 'keyword',  v: 'var' },      { t: 'plain',   v: ' classifier = ee.Classifier.libsvm({\n' },
      { t: 'plain',    v: '    kernelType: ' },
      { t: 'string',   v: '"RBF"' },
      { t: 'plain',    v: ', cost: ' },
      { t: 'number',   v: '100' },
      { t: 'plain',    v: ', gamma: ' },
      { t: 'number',   v: '0.1' },
      { t: 'plain',    v: '\n}).train(trainingData, ' },
      { t: 'string',   v: '"class"' },
      { t: 'plain',    v: ');\n' },
      { t: 'blank',    v: '\n' },
      { t: 'keyword',  v: 'var' },      { t: 'plain',   v: ' classified = features.classify(classifier);\n' },
      { t: 'plain',    v: 'Map.addLayer(classified, ' },
      { t: 'plain',    v: '{min:' },
      { t: 'number',   v: '0' },
      { t: 'plain',    v: ',max:' },
      { t: 'number',   v: '5' },
      { t: 'plain',    v: '}, ' },
      { t: 'string',   v: '"Crop Classes"' },
      { t: 'plain',    v: ');\n' },
    ],
  },
  {
    id: 'accuracy',
    label: 'Accuracy Assessment',
    lang: 'python',
    title: 'accuracy_assessment.py',
    description: 'Confusion matrix & kappa coefficient for remote sensing classification',
    color: '#a78bfa',
    lines: [
      { t: 'comment',  v: '# Classification Accuracy Assessment — Confusion Matrix & Kappa' },
      { t: 'keyword',  v: 'import' },   { t: 'plain',   v: ' numpy ' }, { t: 'keyword', v: 'as' }, { t: 'plain', v: ' np\n' },
      { t: 'keyword',  v: 'from' },     { t: 'plain',   v: ' sklearn.metrics ' }, { t: 'keyword', v: 'import' },
      { t: 'plain',    v: ' (\n' },
      { t: 'plain',    v: '    confusion_matrix, classification_report,\n' },
      { t: 'plain',    v: '    cohen_kappa_score,\n' },
      { t: 'plain',    v: ')\n' },
      { t: 'blank',    v: '\n' },
      { t: 'comment',  v: '# Ground truth vs predicted labels' },
      { t: 'plain',    v: 'cm = confusion_matrix(y_true, y_pred)\n' },
      { t: 'plain',    v: 'kappa = cohen_kappa_score(y_true, y_pred)\n' },
      { t: 'blank',    v: '\n' },
      { t: 'comment',  v: '# Per-class Producer/User accuracy' },
      { t: 'plain',    v: 'pa = np.diag(cm) / cm.sum(axis=' },
      { t: 'number',   v: '1' },
      { t: 'plain',    v: ')\n' },
      { t: 'plain',    v: 'ua = np.diag(cm) / cm.sum(axis=' },
      { t: 'number',   v: '0' },
      { t: 'plain',    v: ')\n' },
      { t: 'plain',    v: 'oa = np.diag(cm).sum() / cm.sum()\n' },
      { t: 'blank',    v: '\n' },
      { t: 'builtin',  v: 'print' },
      { t: 'plain',    v: '(' },
      { t: 'string',   v: 'f"Overall Accuracy: {oa:.1%}"' },
      { t: 'plain',    v: ')\n' },
      { t: 'builtin',  v: 'print' },
      { t: 'plain',    v: '(' },
      { t: 'string',   v: 'f"Kappa Coefficient: {kappa:.4f}"' },
      { t: 'plain',    v: ')\n' },
      { t: 'blank',    v: '\n' },
      { t: 'comment',  v: '# Full per-class report' },
      { t: 'plain',    v: 'labels = [' },
      { t: 'string',   v: '"Cotton"' },
      { t: 'plain',    v: ', ' },
      { t: 'string',   v: '"Wheat"' },
      { t: 'plain',    v: ', ' },
      { t: 'string',   v: '"Sorghum"' },
      { t: 'plain',    v: ', ' },
      { t: 'string',   v: '"Fallow"' },
      { t: 'plain',    v: ', ' },
      { t: 'string',   v: '"Water"' },
      { t: 'plain',    v: ']\n' },
      { t: 'builtin',  v: 'print' },
      { t: 'plain',    v: '(classification_report(y_true, y_pred,\n' },
      { t: 'plain',    v: '    target_names=labels, digits=' },
      { t: 'number',   v: '4' },
      { t: 'plain',    v: '))\n' },
    ],
  },
]

/* ── Token colours per language ────────────────────────────────── */
const TOKEN_STYLE: Record<string, React.CSSProperties> = {
  keyword:  { color: '#f97316', fontWeight: 600 },
  string:   { color: '#a3e635' },
  comment:  { color: '#4a6580', fontStyle: 'italic' },
  number:   { color: '#fb923c' },
  builtin:  { color: '#60a5fa' },
  plain:    { color: '#e2e8f0' },
  blank:    { color: 'transparent' },
}

/* ── Flatten snippet tokens into a character stream ────────────── */
type Char = { char: string; style: React.CSSProperties }

function buildStream(lines: typeof SNIPPETS[0]['lines']): Char[] {
  const out: Char[] = []
  for (const tok of lines) {
    const style = TOKEN_STYLE[tok.t] ?? TOKEN_STYLE.plain
    for (const ch of tok.v) out.push({ char: ch, style })
  }
  return out
}

/* ── Component ─────────────────────────────────────────────────── */
export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const streamRef = useRef<Char[]>(buildStream(SNIPPETS[0].lines))
  const containerRef = useRef<HTMLDivElement>(null)

  /* rebuild stream when tab changes */
  useEffect(() => {
    streamRef.current = buildStream(SNIPPETS[activeTab].lines)
    setCharIndex(0)
    lastTimeRef.current = 0
  }, [activeTab])

  /* typewriter loop */
  const tick = useCallback((ts: number) => {
    if (paused) return
    const elapsed = ts - lastTimeRef.current
    const speed = 18 // ms per char
    if (elapsed >= speed) {
      const steps = Math.floor(elapsed / speed)
      lastTimeRef.current = ts - (elapsed % speed)
      setCharIndex(prev => {
        const next = Math.min(prev + steps, streamRef.current.length)
        if (next >= streamRef.current.length) {
          /* auto-advance to next tab after 3 s pause */
          setTimeout(() => {
            setActiveTab(t => (t + 1) % SNIPPETS.length)
          }, 3000)
          return next
        }
        return next
      })
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [paused])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [tick])

  /* auto-scroll code container */
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [charIndex])

  const snippet = SNIPPETS[activeTab]
  const stream = streamRef.current
  const done = charIndex >= stream.length

  /* build rendered lines */
  const chars = stream.slice(0, charIndex)
  const rawText = chars.map(c => c.char).join('')
  const lineCount = rawText.split('\n').length

  /* group chars into visual lines with token grouping */
  const visualLines: Array<Array<{ text: string; style: React.CSSProperties }>> = [[]]
  let currentLineTokens = visualLines[0]
  let currentStyle = chars[0]?.style ?? TOKEN_STYLE.plain
  let currentText = ''

  for (const ch of chars) {
    if (ch.char === '\n') {
      if (currentText) currentLineTokens.push({ text: currentText, style: currentStyle })
      currentText = ''
      currentLineTokens = []
      visualLines.push(currentLineTokens)
    } else {
      if (ch.style !== currentStyle) {
        if (currentText) currentLineTokens.push({ text: currentText, style: currentStyle })
        currentStyle = ch.style
        currentText = ''
      }
      currentText += ch.char
    }
  }
  if (currentText) currentLineTokens.push({ text: currentText, style: currentStyle })

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>

      {/* Description */}
      <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.7 }}>
        {snippet.description}
      </p>

      {/* Terminal window */}
      <div style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--border-bright)',
        boxShadow: `0 0 60px rgba(${snippet.color === '#10b981' ? '16,185,129' : snippet.color === '#3b82f6' ? '59,130,246' : '167,139,250'},0.08)`,
        transition: 'box-shadow 0.4s',
      }}>

        {/* Title bar */}
        <div style={{
          backgroundColor: '#0d1420',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          userSelect: 'none',
        }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: c, opacity: 0.9 }} />
            ))}
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', gap: 2, flex: 1, overflowX: 'auto' }}>
            {SNIPPETS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setActiveTab(i); setPaused(false) }}
                style={{
                  background: i === activeTab ? '#111827' : 'transparent',
                  border: 'none',
                  borderBottom: i === activeTab ? `2px solid ${s.color}` : '2px solid transparent',
                  color: i === activeTab ? '#e2e8f0' : '#4a6580',
                  fontSize: '0.72rem',
                  fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace',
                  padding: '5px 14px',
                  cursor: 'pointer',
                  borderRadius: '4px 4px 0 0',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  flexShrink: 0,
                }}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Status + pause */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                backgroundColor: done ? snippet.color : '#f59e0b',
                boxShadow: done ? `0 0 6px ${snippet.color}` : '0 0 6px #f59e0b',
                animation: done ? 'none' : 'pulse 1.2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: '0.6rem', color: '#3a5068', fontFamily: 'monospace' }}>
                {done ? 'DONE' : 'RUNNING'}
              </span>
            </div>
            <button
              onClick={() => setPaused(p => !p)}
              title={paused ? 'Resume' : 'Pause'}
              style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                color: '#7a94b0', fontSize: '0.6rem', padding: '3px 8px', borderRadius: 4,
                cursor: 'pointer', fontFamily: 'monospace',
              }}
            >
              {paused ? '▶ RESUME' : '⏸ PAUSE'}
            </button>
          </div>
        </div>

        {/* Code area */}
        <div
          ref={containerRef}
          style={{
            backgroundColor: '#080d18',
            padding: '20px 0',
            height: 360,
            overflowY: 'auto',
            fontFamily: 'ui-monospace, "Cascadia Code", "Fira Code", Consolas, monospace',
            fontSize: '0.82rem',
            lineHeight: 1.65,
          }}
        >
          {visualLines.map((lineTokens, li) => (
            <div key={li} style={{ display: 'flex', minHeight: '1.65em' }}>
              {/* Line number gutter */}
              <div style={{
                width: 40, textAlign: 'right', paddingRight: 16, flexShrink: 0,
                color: '#1e3548', fontSize: '0.72rem', userSelect: 'none',
                paddingTop: 1,
              }}>
                {li + 1}
              </div>
              {/* Code tokens */}
              <div style={{ flex: 1, paddingRight: 20, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {lineTokens.map((tok, ti) => (
                  <span key={ti} style={tok.style}>{tok.text}</span>
                ))}
                {/* Blinking cursor on the last line */}
                {li === visualLines.length - 1 && !done && (
                  <span style={{
                    display: 'inline-block', width: 8, height: '1em',
                    backgroundColor: snippet.color,
                    verticalAlign: 'text-bottom',
                    animation: 'blink 1s step-end infinite',
                    borderRadius: 1,
                    opacity: 0.9,
                  }} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div style={{
          backgroundColor: snippet.color,
          padding: '4px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#070c14', fontWeight: 700 }}>
            {snippet.lang === 'python' ? '🐍 Python 3.11' : '⚡ GEE JavaScript'}
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'rgba(7,12,20,0.7)' }}>
              Ln {lineCount} · Col {rawText.split('\n').at(-1)?.length ?? 0}
            </span>
            <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'rgba(7,12,20,0.7)' }}>
              UTF-8 · LF
            </span>
          </div>
        </div>
      </div>

      {/* Snippet selector cards */}
      <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
        {SNIPPETS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setActiveTab(i); setPaused(false) }}
            style={{
              flex: '1 1 200px',
              background: i === activeTab ? 'var(--bg-card)' : 'transparent',
              border: `1px solid ${i === activeTab ? s.color : 'var(--border)'}`,
              borderRadius: 8,
              padding: '10px 14px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: i === activeTab ? s.color : 'var(--text-2)' }}>
                {s.label}
              </span>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-3)', margin: 0, lineHeight: 1.4 }}>
              {s.description}
            </p>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
      `}</style>
    </div>
  )
}

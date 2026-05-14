'use client'

export default function AuroraBackground() {
  return (
    <>
      <style>{`
        @keyframes aurora-1 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(6%,-8%) scale(1.15); }
          66%      { transform: translate(-4%,5%) scale(0.92); }
        }
        @keyframes aurora-2 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          40%     { transform: translate(-8%,6%) scale(1.2); }
          70%     { transform: translate(5%,-4%) scale(0.88); }
        }
        @keyframes aurora-3 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          30%     { transform: translate(4%,8%) scale(0.9); }
          60%     { transform: translate(-6%,-5%) scale(1.1); }
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Emerald — centre-left */}
        <div style={{
          position: 'absolute',
          top: '5%', left: '5%',
          width: '55%', height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 65%)',
          filter: 'blur(72px)',
          animation: 'aurora-1 14s ease-in-out infinite',
        }} />
        {/* Blue — top-right */}
        <div style={{
          position: 'absolute',
          top: '-15%', right: '0%',
          width: '52%', height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)',
          filter: 'blur(88px)',
          animation: 'aurora-2 18s ease-in-out infinite',
        }} />
        {/* Purple — bottom */}
        <div style={{
          position: 'absolute',
          bottom: '-5%', left: '25%',
          width: '50%', height: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%)',
          filter: 'blur(80px)',
          animation: 'aurora-3 22s ease-in-out infinite',
        }} />
      </div>
    </>
  )
}

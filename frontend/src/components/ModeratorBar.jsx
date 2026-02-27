import { useState } from 'react'

export default function ModeratorBar({ dilemma, roundCount, onEnd, isEnding }) {
  const [confirming, setConfirming] = useState(false)

  const handleEnd = () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    onEnd()
  }

  return (
    <div
      className="flex items-center justify-between px-3 md:px-5 py-3 shrink-0"
      style={{
        background: '#0d0d1a',
        borderBottom: '1px solid #1a1a2e',
      }}
    >
      {/* Left: badge + topic */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wider"
          style={{
            background: '#22d3ee15',
            border: '1px solid #22d3ee40',
            color: '#22d3ee',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#22d3ee', boxShadow: '0 0 6px #22d3ee' }}
          />
          Live Debate
        </div>

        <div className="h-4 w-px shrink-0" style={{ background: '#1a1a2e' }} />

        <div className="min-w-0 flex-1">
          <span className="font-mono text-xs text-[#4a4a6a] mr-2 shrink-0">
            topic:
          </span>
          <span
            className="font-mono text-xs text-[#e2e8f0] truncate"
            title={dilemma}
          >
            {dilemma}
          </span>
        </div>
      </div>

      {/* Right: round counter + end button */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-center">
          <div
            className="font-syne font-bold text-base leading-none"
            style={{ color: '#d946ef' }}
          >
            {roundCount}
          </div>
          <div
            className="font-mono text-[0.55rem] tracking-widest uppercase mt-0.5"
            style={{ color: '#4a4a6a' }}
          >
            rounds
          </div>
        </div>

        <button
          onClick={handleEnd}
          disabled={isEnding}
          className="px-4 py-2 rounded-sm font-mono text-xs tracking-wider transition-all duration-200"
          style={{
            background: confirming ? '#d946ef20' : 'transparent',
            border: `1px solid ${confirming ? '#d946ef' : '#1a1a2e'}`,
            color: confirming ? '#d946ef' : '#8888aa',
            cursor: isEnding ? 'not-allowed' : 'pointer',
            opacity: isEnding ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (!confirming) e.target.style.borderColor = '#4a4a6a'
          }}
          onMouseLeave={(e) => {
            if (!confirming) e.target.style.borderColor = '#1a1a2e'
          }}
        >
          {isEnding ? (
            'Analysing...'
          ) : confirming ? (
            <>
              <span className="md:hidden">Confirm</span>
              <span className="hidden md:inline">Confirm → Autopsy</span>
            </>
          ) : (
            <>
              <span className="md:hidden">Autopsy</span>
              <span className="hidden md:inline">End Session → Autopsy</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

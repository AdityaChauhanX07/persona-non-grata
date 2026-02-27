import { useState } from 'react'

export default function OnboardingScreen({ onSubmit }) {
  const [soulDump, setSoulDump] = useState('')
  const [dilemma, setDilemma] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!soulDump.trim() || !dilemma.trim()) return
    onSubmit(soulDump.trim(), dilemma.trim())
  }

  const isReady = soulDump.trim().length > 20 && dilemma.trim().length > 3

  return (
    <div className="screen-enter min-h-screen flex flex-col items-center justify-center px-6 py-16 relative">
      {/* Background gradient orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, #d946ef08 0%, #d946ef02 40%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-[0.3em] text-[#4a4a6a] uppercase mb-4">
            experimental · psychological mirror
          </div>
          <h1
            className="font-syne text-5xl font-black tracking-tight mb-2"
            style={{ color: '#e2e8f0' }}
          >
            Persona Non Grata
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-16 bg-[#1a1a2e]" />
            <span className="text-xs font-mono text-[#d946ef] tracking-widest uppercase">
              The AI Ego-Mirror
            </span>
            <div className="h-px w-16 bg-[#1a1a2e]" />
          </div>
          <p className="mt-5 text-sm font-mono text-[#8888aa] leading-relaxed max-w-md mx-auto">
            Paste your writing. Face a version of yourself built from your own
            patterns. Debate the one person who knows every argument you'll try
            to avoid.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Soul Dump */}
          <div>
            <label
              className="block text-xs font-mono tracking-[0.2em] text-[#4a4a6a] uppercase mb-2"
              htmlFor="soul-dump"
            >
              soul dump
              <span className="ml-2 text-[#d946ef]">*</span>
            </label>
            <div className="relative">
              <textarea
                id="soul-dump"
                value={soulDump}
                onChange={(e) => setSoulDump(e.target.value)}
                placeholder="Paste samples of your writing — journal entries, messages, tweets, emails, notes to yourself. The more raw and unfiltered, the more accurate your ego-mirror will be..."
                rows={10}
                className="w-full resize-none rounded-sm font-mono text-sm text-[#e2e8f0] placeholder-[#4a4a6a] p-4 leading-relaxed transition-all duration-200 h-[120px] md:h-[unset]"
                style={{
                  background: '#0d0d1a',
                  border: '1px solid #1a1a2e',
                  boxShadow: soulDump
                    ? 'inset 0 0 0 1px #d946ef20'
                    : 'none',
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = '#d946ef40')
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = '#1a1a2e')
                }
              />
              {soulDump && (
                <div className="absolute bottom-3 right-3 text-xs font-mono text-[#4a4a6a]">
                  {soulDump.length} chars
                </div>
              )}
            </div>
          </div>

          {/* Dilemma */}
          <div>
            <label
              className="block text-xs font-mono tracking-[0.2em] text-[#4a4a6a] uppercase mb-2"
              htmlFor="dilemma"
            >
              your dilemma
              <span className="ml-2 text-[#d946ef]">*</span>
            </label>
            <input
              id="dilemma"
              type="text"
              value={dilemma}
              onChange={(e) => setDilemma(e.target.value)}
              placeholder='e.g. "Should I quit my job?" or "Should I end this relationship?"'
              className="w-full rounded-sm font-mono text-sm text-[#e2e8f0] placeholder-[#4a4a6a] px-4 py-3 transition-all duration-200"
              style={{
                background: '#0d0d1a',
                border: '1px solid #1a1a2e',
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = '#d946ef40')
              }
              onBlur={(e) => (e.target.style.borderColor = '#1a1a2e')}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isReady}
            className="w-full py-4 rounded-sm font-syne font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 mt-2"
            style={{
              background: isReady
                ? 'linear-gradient(135deg, #d946ef, #a21caf)'
                : '#0d0d1a',
              color: isReady ? '#ffffff' : '#4a4a6a',
              border: `1px solid ${isReady ? '#d946ef' : '#1a1a2e'}`,
              boxShadow: isReady
                ? '0 0 30px #d946ef30, 0 0 60px #d946ef10'
                : 'none',
              cursor: isReady ? 'pointer' : 'not-allowed',
            }}
          >
            Forge Ego →
          </button>

          <p className="text-center text-xs font-mono text-[#4a4a6a]">
            Your writing is never stored. It exists only for this session.
          </p>
        </form>
      </div>
    </div>
  )
}

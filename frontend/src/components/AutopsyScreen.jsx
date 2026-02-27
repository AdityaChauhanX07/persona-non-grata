export default function AutopsyScreen({ data, dilemma, onNewSession }) {
  const { biases_detected = [], avoided_argument = '', what_revealed = '', verdict = '' } =
    data || {}

  return (
    <div className="screen-enter min-h-screen px-6 py-12 relative overflow-y-auto">
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, #d946ef06 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔬</span>
            <h1 className="font-syne font-black text-3xl text-[#e2e8f0]">
              Psychological Autopsy
            </h1>
          </div>
          <div
            className="h-px w-full mb-4"
            style={{
              background: 'linear-gradient(90deg, #d946ef40, transparent)',
            }}
          />
          <p className="font-mono text-sm text-[#8888aa]">
            re:{' '}
            <span className="text-[#e2e8f0] italic">"{dilemma}"</span>
          </p>
        </div>

        <div className="space-y-8">
          {/* Cognitive Biases */}
          <section>
            <SectionLabel>Cognitive Biases Detected</SectionLabel>
            <div className="flex flex-wrap gap-2 mt-3">
              {biases_detected.length > 0 ? (
                biases_detected.map((bias, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs px-3 py-1.5 rounded-sm leading-relaxed"
                    style={{
                      background: '#f8717110',
                      border: '1px solid #f87171',
                      color: '#f87171',
                    }}
                  >
                    {bias}
                  </span>
                ))
              ) : (
                <span className="font-mono text-xs text-[#4a4a6a] italic">
                  No biases recorded — suspiciously clean.
                </span>
              )}
            </div>
          </section>

          {/* Avoided Argument */}
          <section>
            <SectionLabel>Argument You Avoided Most</SectionLabel>
            <div
              className="mt-3 p-4 rounded-sm"
              style={{
                background: '#0d0d1a',
                border: '1px solid #1a1a2e',
              }}
            >
              <p className="font-mono text-sm text-[#8888aa] leading-relaxed">
                {avoided_argument || 'No clear avoidance pattern detected.'}
              </p>
            </div>
          </section>

          {/* What the Debate Revealed */}
          <section>
            <SectionLabel>What the Debate Revealed</SectionLabel>
            <div
              className="mt-3 p-4 rounded-sm"
              style={{
                background: '#0d0d1a',
                border: '1px solid #1a1a2e',
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#e2e8f0', lineHeight: '1.7' }}
              >
                {what_revealed || 'Insufficient data to reveal patterns.'}
              </p>
            </div>
          </section>

          {/* Mirror's Verdict */}
          <section>
            <SectionLabel>The Mirror's Verdict</SectionLabel>
            <div
              className="mt-3 p-5 rounded-sm relative overflow-hidden"
              style={{
                background: '#14001f',
                borderLeft: '3px solid #d946ef',
                borderTop: '1px solid #d946ef30',
                borderRight: '1px solid #d946ef10',
                borderBottom: '1px solid #d946ef10',
                boxShadow: '-4px 0 20px #d946ef20, inset 0 0 40px #d946ef05',
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                  background:
                    'linear-gradient(90deg, #d946ef60, transparent)',
                }}
              />
              <div
                className="font-mono text-xs text-[#d946ef80] tracking-widest uppercase mb-3"
              >
                ◈ verdict
              </div>
              <p
                className="font-syne font-bold text-lg leading-snug"
                style={{ color: '#e2c4ff' }}
              >
                {verdict || 'The mirror has nothing more to say.'}
              </p>
            </div>
          </section>
        </div>

        {/* New Session button */}
        <div className="mt-12 text-center">
          <button
            onClick={onNewSession}
            className="px-8 py-3 font-mono text-sm tracking-wider transition-all duration-300 rounded-sm"
            style={{
              background: 'transparent',
              border: '1px solid #1a1a2e',
              color: '#8888aa',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#d946ef40'
              e.currentTarget.style.color = '#d946ef'
              e.currentTarget.style.background = '#d946ef08'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1a1a2e'
              e.currentTarget.style.color = '#8888aa'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            ↺ New Session
          </button>
          <p className="font-mono text-xs text-[#4a4a6a] mt-4">
            confront a different version of yourself
          </p>
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-1 h-4 rounded-full shrink-0"
        style={{ background: '#d946ef' }}
      />
      <span className="font-syne font-bold text-xs tracking-[0.15em] uppercase text-[#e2e8f0]">
        {children}
      </span>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import { extractPersona } from '../api/client'

const FORGE_STEPS = [
  'Parsing linguistic cadence...',
  'Extracting emotional defaults...',
  'Mapping cognitive bias signatures...',
  'Identifying deflection patterns...',
  'Synthesizing counter-persona...',
  'Calibrating adversarial voice...',
  'Ego forged.',
]

const STEP_DURATION = 850

export default function PersonaForge({ soulDump, dilemma, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [logLines, setLogLines] = useState([FORGE_STEPS[0]])
  const [error, setError] = useState(null)
  const personaRef = useRef(null)
  const animDoneRef = useRef(false)
  const apiDoneRef = useRef(false)

  const tryComplete = () => {
    if (animDoneRef.current && apiDoneRef.current && personaRef.current) {
      setTimeout(() => onComplete(personaRef.current), 600)
    }
  }

  useEffect(() => {
    // Start API call immediately
    extractPersona(soulDump, dilemma)
      .then((data) => {
        personaRef.current = data
        apiDoneRef.current = true
        tryComplete()
      })
      .catch((err) => {
        setError(err.message)
      })

    // Run animation steps
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step < FORGE_STEPS.length) {
        setCurrentStep(step)
        setLogLines((prev) => [...prev, FORGE_STEPS[step]])
        setProgress(Math.round((step / (FORGE_STEPS.length - 1)) * 100))
      }
      if (step >= FORGE_STEPS.length - 1) {
        clearInterval(interval)
        animDoneRef.current = true
        tryComplete()
      }
    }, STEP_DURATION)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    return (
      <div className="screen-enter min-h-screen flex flex-col items-center justify-center px-6">
        <div
          className="max-w-md w-full p-6 rounded-sm text-center"
          style={{ background: '#0d0d1a', border: '1px solid #f87171' }}
        >
          <div className="text-[#f87171] text-2xl mb-4">⚠</div>
          <h2 className="font-syne font-bold text-[#e2e8f0] text-lg mb-2">
            Ego Forge Failed
          </h2>
          <p className="font-mono text-sm text-[#8888aa] mb-4">{error}</p>
          <p className="font-mono text-xs text-[#4a4a6a]">
            Check your API key and backend connection, then refresh.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="screen-enter min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background pulse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, #d946ef06 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="text-xs font-mono tracking-[0.3em] text-[#4a4a6a] uppercase mb-3">
            ego forge active
          </div>
          <h2 className="font-syne font-black text-3xl text-[#e2e8f0]">
            Building Your Mirror
          </h2>
        </div>

        {/* Spinning Ring */}
        <div className="relative mb-10" style={{ width: 180, height: 180 }}>
          {/* Outer ring */}
          <div
            className="forge-ring-outer absolute inset-0 rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: '#d946ef',
              borderRightColor: '#d946ef60',
            }}
          />
          {/* Middle ring */}
          <div
            className="forge-ring-inner absolute rounded-full"
            style={{
              inset: 12,
              border: '1.5px solid transparent',
              borderTopColor: '#d946ef80',
              borderLeftColor: '#d946ef40',
            }}
          />
          {/* Inner ring */}
          <div
            className="forge-ring-innermost absolute rounded-full"
            style={{
              inset: 26,
              border: '1px solid transparent',
              borderTopColor: '#d946ef50',
              borderBottomColor: '#d946ef20',
            }}
          />
          {/* Center emoji */}
          <div
            className="forge-emoji-pulse absolute text-4xl select-none"
            style={{ top: '50%', left: '50%' }}
          >
            🪞
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full mb-6">
          <div
            className="w-full h-px relative overflow-hidden"
            style={{ background: '#1a1a2e' }}
          >
            <div
              className="progress-bar-fill absolute left-0 top-0 h-full"
              style={{
                width: `${progress}%`,
                background:
                  'linear-gradient(90deg, #a21caf, #d946ef, #e879f9)',
                boxShadow: '0 0 8px #d946ef',
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs font-mono text-[#4a4a6a]">
              {progress}%
            </span>
            <span className="text-xs font-mono text-[#4a4a6a]">
              {currentStep + 1}/{FORGE_STEPS.length}
            </span>
          </div>
        </div>

        {/* Log lines */}
        <div
          className="w-full rounded-sm p-4 font-mono text-xs space-y-1"
          style={{
            background: '#0d0d1a',
            border: '1px solid #1a1a2e',
            minHeight: 140,
          }}
        >
          <div
            className="text-[#4a4a6a] tracking-widest uppercase mb-2"
            style={{ fontSize: '0.6rem' }}
          >
            ● analysis log
          </div>
          {logLines.map((line, i) => (
            <div
              key={i}
              className="log-fade flex items-center gap-2"
              style={{
                color:
                  i === logLines.length - 1
                    ? line === 'Ego forged.'
                      ? '#d946ef'
                      : '#e2e8f0'
                    : '#4a4a6a',
              }}
            >
              <span style={{ color: '#d946ef60' }}>›</span>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

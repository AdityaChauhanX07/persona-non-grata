import { useState } from 'react'
import { useDebate } from '../hooks/useDebate'
import ModeratorBar from './ModeratorBar'
import UserPanel from './UserPanel'
import EgoPanel from './EgoPanel'

export default function DebateArena({ persona, dilemma, onAutopsy }) {
  const { history, isEgoTyping, egoStreamText, roundCount, error, sendMessage, endDebate } =
    useDebate(persona, dilemma)
  const [isEnding, setIsEnding] = useState(false)
  const [endError, setEndError] = useState(null)

  const handleEnd = async () => {
    if (history.length === 0) return
    setIsEnding(true)
    setEndError(null)
    try {
      const data = await endDebate()
      onAutopsy(data)
    } catch (err) {
      setEndError(err.message)
      setIsEnding(false)
    }
  }

  return (
    <div className="screen-enter flex flex-col h-screen">
      <ModeratorBar
        dilemma={dilemma}
        roundCount={roundCount}
        onEnd={handleEnd}
        isEnding={isEnding}
      />

      {/* Error banners */}
      {(error || endError) && (
        <div
          className="px-5 py-2 font-mono text-xs text-[#f87171] shrink-0"
          style={{
            background: '#f8717110',
            borderBottom: '1px solid #f8717130',
          }}
        >
          ⚠ {error || endError}
        </div>
      )}

      {/* Main debate area */}
      <div className="flex flex-1 overflow-hidden">
        <UserPanel
          history={history}
          onSend={sendMessage}
          disabled={isEgoTyping}
        />
        <EgoPanel
          history={history}
          isTyping={isEgoTyping}
          egoStreamText={egoStreamText}
        />
      </div>

      {/* Loading overlay when generating autopsy */}
      {isEnding && (
        <div
          className="absolute inset-0 flex items-center justify-center z-50"
          style={{ background: '#08081090' }}
        >
          <div
            className="px-8 py-6 rounded-sm text-center"
            style={{
              background: '#0d0d1a',
              border: '1px solid #d946ef',
              boxShadow: '0 0 40px #d946ef20',
            }}
          >
            <div className="forge-emoji-pulse text-3xl mb-3">🔬</div>
            <div className="font-syne font-bold text-[#e2e8f0] mb-1">
              Generating Autopsy
            </div>
            <div className="font-mono text-xs text-[#8888aa]">
              Analysing cognitive patterns...
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

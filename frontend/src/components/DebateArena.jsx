import { useState, useEffect, useRef } from 'react'
import { useDebate } from '../hooks/useDebate'
import ModeratorBar from './ModeratorBar'
import UserPanel from './UserPanel'
import EgoPanel from './EgoPanel'

export default function DebateArena({ persona, dilemma, onAutopsy }) {
  const { history, isEgoTyping, egoStreamText, roundCount, error, sendMessage, endDebate } =
    useDebate(persona, dilemma)
  const [isEnding, setIsEnding] = useState(false)
  const [endError, setEndError] = useState(null)
  const [activeTab, setActiveTab] = useState('user')
  const prevTypingRef = useRef(false)
  const initialSentRef = useRef(false)

  const handleSend = (msg) => {
    setActiveTab('ego')
    sendMessage(msg)
  }

  useEffect(() => {
    if (prevTypingRef.current && !isEgoTyping) {
      const timer = setTimeout(() => setActiveTab('user'), 600)
      return () => clearTimeout(timer)
    }
    prevTypingRef.current = isEgoTyping
  }, [isEgoTyping])

  useEffect(() => {
    if (!initialSentRef.current && dilemma) {
      initialSentRef.current = true
      handleSend(dilemma)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      {/* Mobile tab bar */}
      <div
        className="md:hidden flex shrink-0"
        style={{ borderBottom: '1px solid #1a1a2e', background: '#0d0d1a' }}
      >
        <button
          onClick={() => setActiveTab('user')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-xs transition-colors duration-200 ${
            activeTab === 'user' ? 'text-[#4ade80]' : 'text-[#4a4a6a]'
          }`}
          style={{ borderBottom: activeTab === 'user' ? '2px solid #4ade80' : '2px solid transparent' }}
        >
          🧑 You
          {!isEgoTyping && history.some((m) => m.role === 'ego') && activeTab === 'user' && (
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#4ade80' }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('ego')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-xs transition-colors duration-200 ${
            activeTab === 'ego' ? 'text-[#d946ef]' : 'text-[#4a4a6a]'
          }`}
          style={{ borderBottom: activeTab === 'ego' ? '2px solid #d946ef' : '2px solid transparent' }}
        >
          🪞 Your Ego
          {isEgoTyping && (
            <span className="font-mono text-[#d946ef] animate-pulse">···</span>
          )}
        </button>
      </div>

      {/* Main debate area */}
      <div className="flex flex-1 overflow-hidden">
        <div className={`${activeTab === 'user' ? 'flex' : 'hidden'} md:flex flex-col flex-1 overflow-hidden`}>
          <UserPanel
            history={history}
            onSend={handleSend}
            disabled={isEgoTyping}
          />
        </div>
        <div className={`${activeTab === 'ego' ? 'flex' : 'hidden'} md:flex flex-col flex-1 overflow-hidden`}>
          <EgoPanel
            history={history}
            isTyping={isEgoTyping}
            egoStreamText={egoStreamText}
          />
        </div>
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

import { useEffect, useRef } from 'react'

export default function EgoPanel({ history, isTyping, egoStreamText }) {
  const messagesEndRef = useRef(null)

  const egoMessages = history.filter((m) => m.role === 'ego')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [egoMessages.length, egoStreamText])

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div
        className="px-5 py-4 shrink-0 flex items-center justify-between"
        style={{
          background: '#14001f',
          borderBottom: '1px solid #2d002d',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg ego-avatar"
            style={{
              background: '#1a003a',
              border: '1px solid #d946ef40',
            }}
          >
            🪞
          </div>
          <div>
            <div className="font-syne font-bold text-sm" style={{ color: '#d946ef' }}>
              Your Ego
            </div>
            <div className="font-mono text-xs text-[#6b006b] mt-0.5">
              subconscious · pattern mirror
            </div>
          </div>
        </div>
        <div
          className="px-3 py-1 rounded-full font-mono text-xs font-medium tracking-wider"
          style={{
            background: '#d946ef20',
            border: '1px solid #d946ef50',
            color: '#d946ef',
          }}
        >
          AGAINST
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
        style={{ background: '#0a0010' }}
      >
        {egoMessages.length === 0 && !isTyping ? (
          <div className="h-full flex items-center justify-center">
            <p className="font-mono text-xs text-[#6b006b] text-center leading-relaxed">
              The mirror stirs.
              <br />
              Make your argument first.
            </p>
          </div>
        ) : (
          <>
            {egoMessages.map((msg, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div
                  className="font-mono text-[#6b006b] mb-1"
                  style={{ fontSize: '0.6rem' }}
                >
                  round {i + 1}
                </div>
                <div
                  className="ego-message rounded-sm px-4 py-3 font-mono text-sm leading-relaxed"
                  style={{
                    background: '#14001f',
                    color: '#e2c4ff',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Streaming message */}
            {isTyping && (
              <div className="flex flex-col gap-1">
                <div
                  className="font-mono text-[#6b006b] mb-1"
                  style={{ fontSize: '0.6rem' }}
                >
                  round {egoMessages.length + 1}
                </div>
                <div
                  className="ego-message rounded-sm px-4 py-3 font-mono text-sm leading-relaxed"
                  style={{
                    background: '#14001f',
                    color: '#e2c4ff',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {egoStreamText ? (
                    <span className={egoStreamText ? 'typing-cursor' : ''}>
                      {egoStreamText}
                    </span>
                  ) : (
                    <span className="text-[#6b006b] italic">
                      processing argument...
                    </span>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Listening indicator */}
      <div
        className="px-5 py-4 shrink-0 flex items-center gap-3"
        style={{
          background: '#0d0018',
          borderTop: '1px solid #2d002d',
        }}
      >
        <div
          className="pulse-dot w-2 h-2 rounded-full shrink-0"
          style={{
            background: isTyping ? '#d946ef' : '#4a4a6a',
            boxShadow: isTyping ? '0 0 8px #d946ef' : 'none',
          }}
        />
        <span
          className="font-mono text-xs italic"
          style={{ color: isTyping ? '#d946ef80' : '#4a4a6a' }}
        >
          {isTyping
            ? 'reflecting your argument...'
            : 'listening to your argument...'}
        </span>
      </div>
    </div>
  )
}

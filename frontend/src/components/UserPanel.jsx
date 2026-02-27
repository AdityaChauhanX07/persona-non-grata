import { useEffect, useRef, useState } from 'react'

export default function UserPanel({ history, onSend, disabled }) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const userMessages = history.filter((m) => m.role === 'user')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [userMessages.length])

  const handleSend = () => {
    const msg = input.trim()
    if (!msg || disabled) return
    setInput('')
    onSend(msg)
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className="flex flex-col flex-1 overflow-hidden"
      style={{ borderRight: '1px solid #1a1a2e' }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 shrink-0 flex items-center justify-between"
        style={{
          background: '#111124',
          borderBottom: '1px solid #1a1a2e',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
            style={{ background: '#1a1a2e' }}
          >
            🧑
          </div>
          <div>
            <div className="font-syne font-bold text-sm text-[#e2e8f0]">
              You
            </div>
            <div className="font-mono text-xs text-[#4a4a6a] mt-0.5">
              authentic self · present mind
            </div>
          </div>
        </div>
        <div
          className="px-3 py-1 rounded-full font-mono text-xs font-medium tracking-wider"
          style={{
            background: '#16a34a20',
            border: '1px solid #16a34a50',
            color: '#4ade80',
          }}
        >
          FOR
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
        style={{ background: '#080810' }}
      >
        {userMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="font-mono text-xs text-[#4a4a6a] text-center leading-relaxed">
              State your position on the dilemma.
              <br />
              Your ego is waiting.
            </p>
          </div>
        ) : (
          userMessages.map((msg, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div
                className="font-mono text-xs text-[#4a4a6a] mb-1"
                style={{ fontSize: '0.6rem' }}
              >
                round {i + 1}
              </div>
              <div
                className="rounded-sm px-4 py-3 font-mono text-sm text-[#e2e8f0] leading-relaxed"
                style={{
                  background: '#111124',
                  border: '1px solid #1a1a2e',
                  borderRadius: '2px',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className="p-4 shrink-0"
        style={{
          background: '#0d0d1a',
          borderTop: '1px solid #1a1a2e',
        }}
      >
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={
              disabled
                ? 'Wait for the ego to respond...'
                : 'State your argument... (Enter to send)'
            }
            rows={3}
            className="w-full resize-none font-mono text-sm text-[#e2e8f0] placeholder-[#4a4a6a] px-4 py-3 pr-16 rounded-sm transition-all duration-200"
            style={{
              background: '#080810',
              border: `1px solid ${disabled ? '#1a1a2e' : '#1a1a2e'}`,
              opacity: disabled ? 0.5 : 1,
            }}
            onFocus={(e) => {
              if (!disabled) e.target.style.borderColor = '#4ade8040'
            }}
            onBlur={(e) => (e.target.style.borderColor = '#1a1a2e')}
          />
          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="absolute right-3 bottom-3 w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-200 font-mono text-xs"
            style={{
              background:
                !disabled && input.trim() ? '#4ade8020' : 'transparent',
              border: `1px solid ${!disabled && input.trim() ? '#4ade8050' : '#1a1a2e'}`,
              color:
                !disabled && input.trim() ? '#4ade80' : '#4a4a6a',
              cursor:
                disabled || !input.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            ↑
          </button>
        </div>
        <div className="mt-2 font-mono text-[0.6rem] text-[#4a4a6a]">
          shift+enter for new line
        </div>
      </div>
    </div>
  )
}

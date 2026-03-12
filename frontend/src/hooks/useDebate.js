import { useState, useCallback, useRef } from 'react'
import { streamDebateResponse, generateAutopsy } from '../api/client'

export function useDebate(persona, dilemma) {
  const [history, setHistory] = useState([])
  const [isEgoTyping, setIsEgoTyping] = useState(false)
  const [egoStreamText, setEgoStreamText] = useState('')
  const [roundCount, setRoundCount] = useState(0)
  const [error, setError] = useState(null)

  // Ref-based guard: prevents stale-closure race where isEgoTyping state
  // hasn't re-rendered yet but sendMessage is called again.
  const isTypingRef = useRef(false)

  const sendMessage = useCallback(
    async (userMessage) => {
      if (isTypingRef.current || !userMessage.trim()) return

      const oldHistory = history
      isTypingRef.current = true
      setHistory((prev) => [...prev, { role: 'user', content: userMessage }])
      setIsEgoTyping(true)
      setEgoStreamText('')
      setError(null)

      let fullResponse = ''

      try {
        await streamDebateResponse(
          persona,
          dilemma,
          oldHistory,
          userMessage,
          (chunk) => {
            fullResponse += chunk
            setEgoStreamText(fullResponse)
          },
          () => {
            // Ordering guarantee: ego message is added to history in the same
            // React batch as isEgoTyping → false. The ref is cleared first so
            // any synchronous re-entrant call is still blocked until the batch
            // commits and the component re-renders with the full history.
            setHistory((prev) => [
              ...prev,
              { role: 'ego', content: fullResponse },
            ])
            setEgoStreamText('')
            setRoundCount((prev) => prev + 1)
            isTypingRef.current = false
            setIsEgoTyping(false)
          },
          (err) => {
            setError(err)
            isTypingRef.current = false
            setIsEgoTyping(false)
          },
        )
      } catch (err) {
        setError(err.message)
        isTypingRef.current = false
        setIsEgoTyping(false)
      }
    },
    // isEgoTyping removed from deps: the ref is the authoritative guard now.
    // history stays in deps so oldHistory is always the latest committed state.
    [history, persona, dilemma],
  )

  const endDebate = useCallback(async () => {
    return await generateAutopsy(persona, dilemma, history)
  }, [persona, dilemma, history])

  return {
    history,
    isEgoTyping,
    egoStreamText,
    roundCount,
    error,
    sendMessage,
    endDebate,
  }
}

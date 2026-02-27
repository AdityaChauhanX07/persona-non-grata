import { useState, useCallback } from 'react'
import { streamDebateResponse, generateAutopsy } from '../api/client'

export function useDebate(persona, dilemma) {
  const [history, setHistory] = useState([])
  const [isEgoTyping, setIsEgoTyping] = useState(false)
  const [egoStreamText, setEgoStreamText] = useState('')
  const [roundCount, setRoundCount] = useState(0)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(
    async (userMessage) => {
      if (isEgoTyping || !userMessage.trim()) return

      const oldHistory = history // capture before state update
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
            setHistory((prev) => [
              ...prev,
              { role: 'ego', content: fullResponse },
            ])
            setEgoStreamText('')
            setIsEgoTyping(false)
            setRoundCount((prev) => prev + 1)
          },
          (err) => {
            setError(err)
            setIsEgoTyping(false)
          },
        )
      } catch (err) {
        setError(err.message)
        setIsEgoTyping(false)
      }
    },
    [history, persona, dilemma, isEgoTyping],
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

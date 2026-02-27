const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function extractPersona(soulDump, dilemma) {
  const res = await fetch(`${API_BASE}/extract-persona`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ soul_dump: soulDump, dilemma }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(err.detail || 'Failed to extract persona')
  }
  return res.json()
}

export async function streamDebateResponse(
  persona,
  dilemma,
  history,
  userMessage,
  onChunk,
  onDone,
  onError,
) {
  const res = await fetch(`${API_BASE}/debate-response`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      persona,
      dilemma,
      history,
      user_message: userMessage,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Stream failed' }))
    throw new Error(err.detail || 'Debate stream failed')
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    // Split on double newline (SSE message boundary)
    const parts = buffer.split('\n\n')
    buffer = parts.pop() // keep incomplete tail

    for (const part of parts) {
      const trimmed = part.trim()
      if (!trimmed.startsWith('data: ')) continue

      const data = trimmed.slice(6)
      if (data === '[DONE]') {
        onDone()
        return
      }

      onChunk(data)
    }
  }

  onDone()
}

export async function generateAutopsy(persona, dilemma, history) {
  const res = await fetch(`${API_BASE}/generate-autopsy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ persona, dilemma, history }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(err.detail || 'Failed to generate autopsy')
  }
  return res.json()
}

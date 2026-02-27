import { useState } from 'react'
import OnboardingScreen from './components/OnboardingScreen'
import PersonaForge from './components/PersonaForge'
import DebateArena from './components/DebateArena'
import AutopsyScreen from './components/AutopsyScreen'

export default function App() {
  const [screen, setScreen] = useState('onboarding')
  const [soulDump, setSoulDump] = useState('')
  const [dilemma, setDilemma] = useState('')
  const [persona, setPersona] = useState(null)
  const [autopsyData, setAutopsyData] = useState(null)

  const handleForgeSubmit = (dump, dil) => {
    setSoulDump(dump)
    setDilemma(dil)
    setScreen('forge')
  }

  const handleForgeComplete = (data) => {
    setPersona(data.persona)
    setScreen('debate')
  }

  const handleAutopsy = (data) => {
    setAutopsyData(data)
    setScreen('autopsy')
  }

  const handleNewSession = () => {
    setSoulDump('')
    setDilemma('')
    setPersona(null)
    setAutopsyData(null)
    setScreen('onboarding')
  }

  return (
    <div className="min-h-screen bg-bg">
      {screen === 'onboarding' && (
        <OnboardingScreen key="onboarding" onSubmit={handleForgeSubmit} />
      )}
      {screen === 'forge' && (
        <PersonaForge
          key="forge"
          soulDump={soulDump}
          dilemma={dilemma}
          onComplete={handleForgeComplete}
        />
      )}
      {screen === 'debate' && (
        <DebateArena
          key="debate"
          persona={persona}
          dilemma={dilemma}
          onAutopsy={handleAutopsy}
        />
      )}
      {screen === 'autopsy' && (
        <AutopsyScreen
          key="autopsy"
          data={autopsyData}
          dilemma={dilemma}
          onNewSession={handleNewSession}
        />
      )}
    </div>
  )
}

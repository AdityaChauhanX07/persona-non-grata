# Persona Non Grata

An AI that builds a clone of your personality from your own writing, then argues the opposite side of your biggest decisions back at you.

---

**Live demo:** [persona-non-grata.vercel.app](https://persona-non-grata.vercel.app)

---

## What it does

You paste raw samples of your own writing. The app extracts your psycholinguistic patterns and constructs an adversarial counter-persona. You state your position on a dilemma. Your ego-mirror argues back using your own vocabulary, logic patterns, and blind spots against you.

At the end, a Psychological Autopsy breaks down the cognitive biases you displayed, the arguments you avoided, and what the debate actually revealed.

**The point:** most AI is designed to agree with you. This one isn't.

---

## Flow

1. **Soul Dump** -- paste journal entries, messages, tweets, anything written in your voice
2. **Ego Forge** -- AI extracts your personality: cadence, emotional defaults, cognitive biases, recurring patterns
3. **Debate Arena** -- split-screen real-time debate between you and your ego-mirror (streaming via SSE)
4. **Psychological Autopsy** -- clinical breakdown of what the debate exposed

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Python + FastAPI |
| AI | Groq API (llama-3.3-70b-versatile) with SSE streaming |
| Fonts | Syne + JetBrains Mono |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Project structure

```
persona-non-grata/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── OnboardingScreen.jsx
│   │   │   ├── PersonaForge.jsx
│   │   │   ├── DebateArena.jsx
│   │   │   ├── UserPanel.jsx
│   │   │   ├── EgoPanel.jsx
│   │   │   ├── ModeratorBar.jsx
│   │   │   └── AutopsyScreen.jsx
│   │   ├── hooks/
│   │   │   └── useDebate.js
│   │   ├── api/
│   │   │   └── client.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/
│   ├── main.py
│   ├── prompts.py
│   ├── persona.py
│   ├── debate.py
│   └── requirements.txt
├── .env.example
└── README.md
```

---

## Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- A Groq API key (free at [console.groq.com](https://console.groq.com))

### 1. Clone and configure

```bash
git clone https://github.com/AdityaChauhanX07/persona-non-grata.git
cd persona-non-grata
cp .env.example backend/.env
# Add your GROQ_API_KEY to backend/.env
```

### 2. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`. Backend runs at `http://localhost:8000`.

---

## API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/extract-persona` | Analyse writing samples, return persona JSON |
| POST | `/debate-response` | Stream ego response via SSE |
| POST | `/generate-autopsy` | Analyse full debate transcript, return autopsy JSON |

---

## Deployment

### Backend on Render

1. New Web Service, connect this repo
2. Root directory: `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Environment variable: `GROQ_API_KEY=your_key`

### Frontend on Vercel

1. Import repo, set root directory to `frontend`
2. Framework preset: Vite
3. Environment variable: `VITE_API_URL=https://your-render-url.onrender.com`

---

## Design

```
Background:   #080810
Ego accent:   #d946ef  (purple)
Moderator:    #22d3ee  (cyan)
Bias tags:    #f87171  (red)
```

Headings: Syne 800. Body and messages: JetBrains Mono.

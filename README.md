# Persona Non Grata — The AI Ego-Mirror

> Paste your writing, face a version of yourself built from your own patterns, and debate the one person who knows every argument you'll try to avoid.

---

## What It Does

1. **Soul Dump** — paste raw writing samples (journal entries, messages, tweets)
2. **Ego Forge** — Claude analyses your psycholinguistic patterns and builds a counter-persona
3. **Debate Arena** — argue your dilemma against your own ego-mirror in real-time (streaming via SSE)
4. **Psychological Autopsy** — receive a clinical breakdown of the cognitive biases and avoidance patterns the debate exposed

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Python 3.11+ + FastAPI |
| AI | Anthropic Claude API (`claude-sonnet-4-6`) with streaming |
| Fonts | Syne (headings) + JetBrains Mono (body) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Project Structure

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
- An Anthropic API key ([get one here](https://console.anthropic.com/))

### 1. Clone & configure environment

```bash
git clone <repo-url>
cd persona-non-grata
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### 2. Backend

```bash
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

Backend runs at `http://localhost:8000`

### 3. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/extract-persona` | Analyse writing samples, return persona JSON |
| `POST` | `/debate-response` | Stream ego's response via SSE |
| `POST` | `/generate-autopsy` | Analyse full debate, return autopsy JSON |
| `GET` | `/health` | Health check |

---

## Deployment

### Backend (Render)

1. Create a new **Web Service** on Render
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variable: `ANTHROPIC_API_KEY=your_key`
5. Add `FRONTEND_URL=https://your-vercel-app.vercel.app`

### Frontend (Vercel)

1. Import the `frontend/` directory into Vercel
2. Framework: **Vite**
3. Add environment variable: `VITE_API_URL=https://your-render-backend.onrender.com`

---

## Design System

```css
--bg:       #080810   /* near-black background */
--bg2:      #0d0d1a   /* panel background */
--ego-clr:  #d946ef   /* purple accent */
--mod-clr:  #22d3ee   /* cyan moderator */
--border:   #1a1a2e   /* subtle borders */
--red:      #f87171   /* bias tags */
```

Fonts: **Syne 800** (headings) + **JetBrains Mono** (everything else)

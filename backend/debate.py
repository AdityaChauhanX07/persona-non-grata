import os
import re
import json
from groq import Groq
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Any
from prompts import DEBATE_SYSTEM, AUTOPSY_SYSTEM

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


class Message(BaseModel):
    role: str  # 'user' or 'ego'
    content: str


class DebateRequest(BaseModel):
    persona: dict[str, Any]
    dilemma: str
    history: list[Message]
    user_message: str


class AutopsyRequest(BaseModel):
    persona: dict[str, Any]
    dilemma: str
    history: list[Message]


def format_history_as_text(history: list[Message]) -> str:
    lines = []
    for msg in history:
        label = "User" if msg.role == "user" else "Ego"
        lines.append(f"{label}: {msg.content}")
    return "\n".join(lines)


def clean_json_response(text: str) -> dict:
    text = text.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    return json.loads(text.strip())


@router.post("/debate-response")
async def debate_response(request: DebateRequest):
    system_prompt = DEBATE_SYSTEM.format(persona=json.dumps(request.persona, indent=2))

    messages = [{"role": "system", "content": system_prompt}]
    for msg in request.history:
        role = "user" if msg.role == "user" else "assistant"
        messages.append({"role": role, "content": msg.content})
    messages.append({"role": "user", "content": request.user_message})

    stream = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        stream=True,
        max_tokens=200
    )

    def stream_generator():
        try:
            for chunk in stream:
                text = chunk.choices[0].delta.content
                if text:
                    yield f"data: {text}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: [ERROR] {str(e)}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        stream_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
            "Access-Control-Allow-Origin": "*",
        },
    )


@router.post("/generate-autopsy")
async def generate_autopsy(request: AutopsyRequest):
    transcript_lines = []
    for msg in request.history:
        label = "USER" if msg.role == "user" else "EGO-MIRROR"
        transcript_lines.append(f"{label}: {msg.content}")
    transcript = "\n\n".join(transcript_lines)

    prompt = f"""Persona profile: {json.dumps(request.persona, indent=2)}

Debate topic: {request.dilemma}

Full transcript:
{transcript}

Analyze this debate and return the JSON autopsy report."""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": AUTOPSY_SYSTEM},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        result = response.choices[0].message.content

        autopsy = clean_json_response(result)
        return autopsy

    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to parse autopsy JSON: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

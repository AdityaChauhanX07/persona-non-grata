import os
import re
import json
from groq import Groq
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from prompts import PERSONA_SYSTEM

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


class PersonaRequest(BaseModel):
    soul_dump: str
    dilemma: str


def clean_json_response(text: str) -> dict:
    text = text.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    return json.loads(text.strip())


@router.post("/extract-persona")
async def extract_persona(request: PersonaRequest):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": PERSONA_SYSTEM},
                {"role": "user", "content": f"Writing samples:\n\n{request.soul_dump}\n\nAnalyze these samples and return the JSON profile."}
            ],
            response_format={"type": "json_object"}
        )
        result = response.choices[0].message.content

        persona = clean_json_response(result)
        return {"persona": persona, "dilemma": request.dilemma}

    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to parse persona JSON: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

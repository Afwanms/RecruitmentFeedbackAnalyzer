import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "qwen2.5:0.5b"

PROMPT_TEMPLATE = """
You are an HR assistant.

Your task is to classify client interview feedback into exactly ONE category.

Available categories:
- Communication
- Confidence
- Technical Skills
- Executive Presence
- Culture Fit
- Other

Rules:
- Return ONLY the category name.
- Do not explain your answer.
- Do not include punctuation.
- Do not return more than one category.

Feedback:
{feedback}
"""

def analyze_feedback(feedback: str) -> str:
    prompt = PROMPT_TEMPLATE.format(feedback=feedback)
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False
        }
    )
    response.raise_for_status()
    result = response.json()["response"].strip()
    return result

if __name__ == "__main__":
    feedback = (
        "Candidate struggled to explain previous projects "
        "and had difficulty communicating ideas."
    )

    print(analyze_feedback(feedback))
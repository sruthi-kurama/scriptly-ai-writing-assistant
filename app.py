from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()

print(os.getenv("GROQ_API_KEY"))

app = Flask(__name__)

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():

    data = request.get_json()

    content_type = data["type"]
    topic = data["topic"]
    tone = data["tone"]
    words = data["words"]

    prompt = f"""
You are Scriptly, a professional AI Writing Assistant.

Generate a well-written {content_type} on the following topic.

Topic:
{topic}

Tone:
{tone}

Length:
Approximately {words} words.

Requirements:
- Write naturally and professionally.
- Use engaging and easy-to-read language.
- Include headings if appropriate.
- Use bullet points when helpful.
- Avoid repetitive sentences.
- Ensure the content is original and well structured.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.8,
        max_tokens=900
    )

    output = response.choices[0].message.content

    return jsonify({
        "content": output
    })


if __name__ == "__main__":
   if __name__ == "__main__":
    app.run(debug=True, port=5050)
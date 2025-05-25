from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # biar bisa diakses dari backend Hapi di port lain

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    story = data.get("story", "")

    emotions = analyze_story(story)

    return jsonify(emotions)

def analyze_story(story):
    # ini data dummy nanti tim ml ubah disini yaaa
    story_lower = story.lower()
    emotions = {
        "happy": story_lower.count("happy") * 10 + 10,
        "sad": story_lower.count("sad") * 10,
        "angry": story_lower.count("angry") * 10,
        "neutral": 100,  # asumsi netral 100 dulu, nanti bisa dikurangi oleh emosi lain
    }

    # Hitung total emosi 
    total_non_neutral = sum(emotions[k] for k in ["happy", "sad", "angry"])

    # total 100%
    emotions["neutral"] = max(0, 100 - total_non_neutral)

    return emotions

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

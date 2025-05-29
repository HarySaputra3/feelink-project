import tensorflow as tf
import re
import string

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import TFAutoModelForSequenceClassification, AutoTokenizer
from indoNLP.preprocessing import replace_word_elongation, replace_slang

app = Flask(__name__)
CORS(app)  # biar bisa diakses dari backend Hapi di port lain

# Load model & tokenizer
model_path = "./saved_model1"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = TFAutoModelForSequenceClassification.from_pretrained(model_path)

labels = ['anger', 'fear', 'happy', 'joy', 'love', 'sadness', 'surprise']

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    story = data.get("story", "")

    emotions = analyze_story(story)

    return jsonify(emotions)

def analyze_story(story):
    #membersihkan teks
    text = cleaningText(story)
    
    # Tokenisasi input
    inputs = tokenizer(text, return_tensors="tf", truncation=True, padding=True)

    # Prediksi dari model
    outputs = model(inputs)
    logits = outputs.logits.numpy()[0]

    # Softmax jadi persentase
    probabilities = tf.nn.softmax(logits).numpy()
    percentages = (probabilities * 100).round(2)

    # Buat dictionary: label -> persen
    emotions = {label: float(percentages[i]) for i, label in enumerate(labels)}

    return emotions

def cleaningText(text):
    # Membersihkan tanda tanda sisa medsos
    text = re.sub(r'@[A-Za-z0-9]+', '', text)  # Menghapus Mention
    text = re.sub(r'#[A-Za-z0-9]+', '', text)  # Menghapus Hashtag
    text = re.sub(r'RT[\s]', '', text)  # menghapus RT
    text = re.sub(r"http\S+", '', text)  # menghapus link

    # Pembersihan Karakter
    text = text.translate(str.maketrans(string.punctuation, ' ' * len(string.punctuation))) # Mengganti tanda baca dengan spasi (alih-alih menghapus)
    text = re.sub(r'\d+', '', text) # Menghapus angka
    text = text.replace('\n', ' ') # Mengganti garis baru dengan spasi

    # Normalisasi
    text = text.strip(' ') # Menghapus karakter spasi dari kiri dan kanan text
    text = text.lower()  # mengubah semua karakter dalam text menjadi huruf kecil
    text = re.sub(r'(.)\1+', r'\1\1', text) # Menghapus huruf berlebih di belakang
    text = replace_word_elongation(text) # Menghapus text elongation (library indoNLP)
    text = replace_slang(text) # Menghapus slangwords dari kamus IndoNLP
    #text = remove_stopwords(text)  # menghapus kata yang tidak penting
    text = re.sub(r'\s+', ' ', text) # Mengganti multiple spasi dengan satu spasi
    return text


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

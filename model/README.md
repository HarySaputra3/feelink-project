# 🧠 Emotion Analyzer API (Flask)

API sederhana berbasis Flask yang digunakan untuk menganalisis emosi dari cerita pengguna.  
API ini merupakan bagian dari sistem **Mood Tracker App** dan akan dikembangkan lebih lanjut oleh tim Machine Learning.

---

## 📁 Project Structure

model/
├── app.py # Main Flask application
├── requirements.txt # Python dependencies
└── README.md # This guide

---

## 📦 Requirements

- Python 3.8 atau lebih baru
- Pip

### Install Dependencies

```bash
pip install -r requirements.txt
Atau:

bash
Copy
Edit
pip install Flask==2.2.3 flask-cors==3.0.10

Jalankan server Flask:

bash
Copy
Edit
python app.py
API akan tersedia di:

bash
Copy
Edit
http://localhost:5000

API Endpoint
POST /analyze
Menganalisis cerita yang diberikan dan mengembalikan persentase emosi.

Request
Method: POST

Content-Type: application/json

json
Copy
Edit
{
  "story": "I am happy but also a bit sad today."
}
Response
json
Copy
Edit
{
  "happy": 20,
  "sad": 10,
  "angry": 0,
  "neutral": 70
}
Catatan: Ini adalah dummy response. Logic akan diganti oleh tim ML nanti.

✍️ Untuk Tim Machine Learning
Ubah fungsi analyze_story(story) di app.py untuk menghubungkan ke model ML kalian.

Pastikan output-nya tetap format dictionary JSON seperti contoh di atas.

Bisa pakai pre-trained model atau pipeline NLP dari transformers, scikit-learn, atau nltk.

🛡️ CORS Enabled
Flask sudah menggunakan flask-cors agar API ini bisa diakses dari backend lain (seperti Hapi.js) di port berbeda.

👨‍💻 Developer Notes
Jangan lupa untuk commit perubahan pada app.py dan requirements.txt jika menambahkan library baru.

Gunakan Git branching (misalnya feature/update-ml-logic) agar kolaborasi tetap rapi.

🤝 Contributing
Fork repo ini

Buat branch baru: git checkout -b feature/your-feature-name

Commit perubahan: git commit -m 'Add feature'

Push branch: git push origin feature/your-feature-name

Buat Pull Request


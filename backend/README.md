# 🧠 Feelink API

Feelink API adalah backend REST API untuk aplikasi _Mood Tracker_ yang memungkinkan pengguna mencatat cerita harian dan menganalisis emosi menggunakan model Machine Learning.

Dibangun dengan stack:

- **Hapi.js** sebagai backend framework
- **Prisma ORM** (menggunakan PostgreSQL)
- **Flask** (pada direktori `../model`) untuk analisis emosi menggunakan Machine Learning
- **JWT** untuk otentikasi
- **Swagger UI** untuk dokumentasi API
- **Joi** untuk validasi request

---

## 📁 Struktur Proyek

├── node_modules/ # Direktori utama backend
├── prisma/
│ │ └── schema.prisma # Skema DB Prisma
├── src/ # Direktori utama backend
│ ├── routes/ # Semua file endpoint API
│ │ ├── auth.js # Login & Register
│ │ ├── mood.js # Kirim cerita untuk analisis emosi
│ │ └── report.js # Laporan bulanan
│ ├── utils/
│ │ └── auth.js # Validasi JWT
│ ├── prisma/
│ │ └── schema.prisma # Skema DB Prisma
│ ├── server.js #jalankan server
├── .env # Variabel lingkungan (dibuat manual)
├── server.js # Entry point Hapi server
├── package.json # Daftar dependency & script
├── full-testing-api-feelink.json # untuk testing di postman
├── package-lock.json # Daftar dependency & script
└── README.md # Dokumentasi proyek

yaml
Copy
Edit

---

## 🚀 Cara Menjalankan Feelink API

### 1. **Clone repositori ini**

```bash
git clone https://github.com/HarySaputra3/feelink-project.git
cd feelink-api/backend
2. Instal dependencies
bash
Copy
Edit
npm install
3. Siapkan file .env
Buat file .env di direktori backend/ dan isi seperti ini:

ini
Copy
Edit
JWT_SECRET=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/feelinkdb
4. Inisialisasi Prisma dan database
bash
Copy
Edit
npx prisma migrate dev --name init
5. Jalankan server
bash
Copy
Edit
node index.js
Server akan berjalan di: http://localhost:3000

🧪 Endpoint Utama
POST /register – Registrasi pengguna

POST /login – Login dan dapatkan token JWT

POST /mood – Kirim cerita untuk dianalisis oleh model ML (Flask)

GET /report/{month} – Ambil rekap emosi berdasarkan bulan

🔐 Endpoint /mood dan /report membutuhkan token JWT di header Authorization

📘 Dokumentasi API (Swagger)
Swagger UI tersedia di:

bash
Copy
Edit
http://localhost:3000/documentation
🤖 Integrasi Flask
Flask API untuk analisis emosi dijalankan di direktori ../model/ dan terhubung lewat endpoint:

bash
Copy
Edit
POST http://localhost:5000/analyze
🛠 Teknologi yang Digunakan
Node.js + Hapi

Prisma ORM

PostgreSQL

Flask + Python ML Model

JWT Auth

Joi + Boom

Swagger (hapi-swagger)

```

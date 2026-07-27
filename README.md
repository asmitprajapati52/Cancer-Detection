Markdown
# 🧬 Cancer Detection Telemetry System

An end-to-end full-stack medical AI platform designed to detect potential skin cancer (mole classification) using deep learning inference. Features a high-performance **FastAPI** model server, a **Node.js/Express** app engine, a **MongoDB** data layer, and a cyberpunk-themed **Vite + React** telemetry dashboard.

---

## 📌 Key Features

* **🤖 Machine Learning Inference Pipeline:** Fast TensorFlow model predictions hosted on Python FastAPI.
* **📸 Image Preprocessing & Cropping:** Client-side mole cropping before uploading to optimize image inference accuracy.
* **🔐 Multi-Tenant JWT Security:** Encrypted passwords with `bcryptjs` and route-level Authorization via custom JWT middleware.
* **📊 Live Telemetry Dashboard:** Dynamic analytics powered by Recharts, rapid risk index monitoring, and user-specific scan histories.
* **🛡️ Network Redundancy:** Custom database connector supporting automatic fallback between Cloud MongoDB Atlas and local instances.

---

## 🏗️ System Architecture & Workflow

[ Frontend (Vite + React) ]
│
│  1. Multipart Form Upload (Mole Image)
▼
[ Node.js / Express Server ]  ── (2. Token Verification & Static Storage)
│
│  3. Proxy Prediction Request (Image Payload)
▼
[ FastAPI Inference Engine ]  ── (4. Image Rescaling & best_model.h5 Evaluation)
│
│  5. Classification Label + Confidence Score
▼
[ Node.js / Express Server ]  ── (6. Save Record to MongoDB Atlas)
│
│  7. Return Scan Metadata
▼
[ React Dashboard UI ]


---

## 📁 Project Structure

```text
Cancer-Detection/
├── backend/                  # 🐍 Python FastAPI (ML Prediction Server)
│   ├── main.py               # Main entrypoint, handles FastAPI, CORS, & POST /predict
│   ├── best_model.h5         # Trained Neural Network / TensorFlow Model weights
│   └── requirements.txt      # Dependencies (fastapi, uvicorn, tensorflow, pillow, etc.)
│
├── server/                   # 🚀 Node.js Express Backend (App Engine)
│   ├── config/db.js          # DB Connector (Atlas Cloud + Local Mongo fallback)
│   ├── models/               # User.js & Scan.js Mongoose Schemas
│   ├── routes/scan.js        # Main Pipeline Router (/api/scan/upload)
│   ├── uploads/              # Local temporary upload storage
│   ├── authMiddleware.js     # JWT verification layer
│   ├── server.js             # Express bootstrapping & Auth middleware
│   └── package.json
│
└── frontend/                 # ⚛️ Vite + React Frontend (Cyberpunk Telemetry UI)
    ├── src/
    │   ├── components/       # ImageCropper, ImageUploader, PredictionResult, Charts
    │   ├── context/          # AuthContext & ScanContext state management
    │   ├── pages/            # Home, Login, Register, Dashboard, ScanMole
    │   └── services/api.js   # Unified Axios API instance
    └── package.json
⚙️ Tech Stack
Frontend: React 18, Vite, Tailwind CSS, Recharts, Axios, React Router v6

App Backend: Node.js, Express.js, Mongoose, JWT, Multer

ML Service: Python 3.10+, FastAPI, Uvicorn, TensorFlow / Keras, Pillow

Database: MongoDB Atlas / Local MongoDB

🚀 Getting Started
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v18 or higher)

Python (v3.9 or v3.10 recommended)

MongoDB (Local instance or Atlas Account)

Environment Setup
1. Backend ML Server (backend/)
No .env file required by default, but ensure your virtual environment is created.

2. Express Server (server/.env)
Create a .env file inside the server/ directory (you can copy .env.example):

Code snippet
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cancer_detection
JWT_SECRET=your_super_secret_jwt_key
FASTAPI_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
3. React Frontend (frontend/.env)
Create a .env file inside the frontend/ directory (you can copy .env.example):

Code snippet
VITE_API_BASE_URL=http://localhost:5000/api
📦 Installation & Local Execution
Follow these steps to run all three services concurrently:

Step 1: Start the ML Prediction Backend (FastAPI)
Bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
FastAPI Server will start on http://127.0.0.1:8000

Step 2: Start the Express App Server
Open a second terminal window:

Bash
cd server
npm install
npm run dev
Express Server will start on http://localhost:5000

Step 3: Start the React Frontend
Open a third terminal window:

Bash
cd frontend
npm install
npm run dev
Vite dev server will start on http://localhost:5173

📡 Key API Endpoints
🔐 Authentication Routes (/api/auth)
POST /api/auth/register — Create a new user identity

POST /api/auth/login — Authenticate & receive JWT token

🔬 Scan Routes (/api/scan)
POST /api/scan/upload — Upload mole image, run FastAPI model prediction, & store scan record (Protected)

GET /api/scan/history — Fetch user-specific scan telemetry history (Protected)

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

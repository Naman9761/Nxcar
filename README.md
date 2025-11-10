# 🚗 Used Car Listing Platform

A full-stack web application to **view, add, search, and delete used car listings**.
Built with **FastAPI** (Python) for the backend and **Next.js** (React/TypeScript, v0.dev UI) for the frontend.

---

## 🌟 Features

- View all listed cars
- Add new cars (make, model, year, price, mileage, description)
- Search for cars by make or model
- Delete car listings
- Modern, responsive UI with Tailwind CSS and shadcn/ui
- Persistent data storage (SQLite, easily upgradable to PostgreSQL)

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend** | FastAPI + Odmantic (MongoDB ODM) + Pydantic + Uvicorn |
| **Frontend** | Next.js (App Router) + TypeScript + Tailwind CSS |
| **API Client** | Axios |
| **UI Library** | shadcn/ui (React components) |

---

## ⚙️ Prerequisites

- **Python 3.9+** (for backend)
- **Node.js 18+ & npm** (for frontend)
- **Git**

---

## 🚀 Local Setup & Running

### 1. Clone the Repository

```bash
git clone https://github.com/Naman9761/Nxcar.git
cd Nxcar
```

---

### 2. Set up the Backend (FastAPI)

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

- **On macOS/Linux:**
  ```bash
  source venv/bin/activate
  ```
- **On Windows:**
  ```bash
  venv\Scripts\activate
  ```

Install dependencies:

```bash
pip install -r requirements.txt
```

#### 🧾 Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```
DATABASE_URL=sqlite:///./database.db
```

#### ▶️ Run the Backend Server

```bash
uvicorn app.main:app --reload
```

**Backend runs at:** [http://localhost:8000](http://localhost:8000)

---

### 3. Set up the Frontend (Next.js)

```bash
cd ../frontend
npm install
```

#### 🧾 Configure Environment Variables

Create a `.env.local` file inside the `frontend` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

#### ▶️ Run the Frontend Server

```bash
npm run dev
```

**Frontend runs at:** [http://localhost:3000](http://localhost:3000)

---

### 4. 🧑‍💻 Using the App

1. Go to [http://localhost:3000](http://localhost:3000)
2. Add, view, search, and delete car listings easily!

---

## 🗂️ Project Structure

```
Nxcar/
├─ backend/
│  ├─ app/
│  │  ├─ main.py          # FastAPI app (mounts static files, registers routers)
│  │  ├─ database.py      # SQLAlchemy engine & session
│  │  ├─ models.py        # DB models
│  │  ├─ routers/         # API endpoints (cars.py)
│  │  └─ static/images/   # Served images
│  ├─ requirements.txt
│  └─ seed_data.py        # Seed script to populate sample cars & images
│
├─ frontend/
│  ├─ app/                # Next.js app routes & pages
│  ├─ components/         # UI components
│  ├─ lib/                # API client, utils, types
│  ├─ package.json
│  └─ .env.example
│
└─ README.md
```

---

## 🧩 Troubleshooting

| Issue | Solution |
|-------|-----------|
| **CORS errors** | Ensure `CORSMiddleware` in `backend/app/main.py` allows `http://localhost:3000`. |
| **Port conflicts** | Make sure ports `8000` (backend) and `3000` (frontend) are free. |
| **Environment issues** | Verify `.env` and `.env.local` files exist and are correctly configured. |

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/api/cars` | List all car listings |
| **POST** | `/api/cars` | Add a new car |
| **DELETE** | `/api/cars/{id}` | Delete car by ID |

---

## 👨‍💻 Author

**Naman**
🔗 [GitHub Profile](https://github.com/Naman9761)

---

### ✅ Ready to use!
Clone, set up, and start hacking.
**Happy coding! 🚀**

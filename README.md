# 🚗 Used Car Listing Platform

A full-stack web application to view, add, search, and delete used car listings. Built with **FastAPI** (Python) for the backend and **Next.js** (React/TypeScript, v0.dev UI) for the frontend.

---

## Features

- View all listed cars
- Add new cars (make, model, year, price, mileage, description)
- Search for cars by make or model
- Delete car listings
- Modern, responsive UI with Tailwind CSS and shadcn/ui
- Persistent data storage (SQLite, easily upgradable to PostgreSQL)

---

## Tech Stack

- **Backend:** FastAPI + SQLAlchemy + SQLite
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS
- **API Client:** Axios
- **UI Library:** shadcn/ui (React components)

---

## Prerequisites

- **Python 3.9+** (for backend)
- **Node.js 18+ & npm** (for frontend)
- **Git**

---

## Local Setup & Running

### 1. Clone the Repository

git clone https://github.com/Naman9761/Nxcar.git
cd Nxcar

### 2. Set up the Backend (FastAPI)

cd backend
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
pip install -r requirements.txt

#### Configure Environment Variables

Create a `.env` file inside the `backend` directory:
DATABASE_URL=sqlite:///./database.db

#### Run the Backend Server

uvicorn app.main:app --reload

- API runs at: [**http://localhost:8000**](http://localhost:8000)

---

### 3. Set up the Frontend (Next.js)

cd ../frontend
npm install

#### Configure Environment Variables

Create a `.env.local` file inside the `frontend` directory:
NEXT_PUBLIC_API_URL=http://localhost:8000/api

#### Run the Frontend Server

npm run dev

- Web app at: [**http://localhost:3000**](http://localhost:3000)

---

### 4. Using the App

- Go to [http://localhost:3000](http://localhost:3000)
- Add, view, search, and delete car listings

---

## Project Structure

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
│  └─ seed_data.py        # seed script to populate sample cars & images
├─ frontend/
│  ├─ app/                # Next.js app routes & pages
│  ├─ components/
│  ├─ lib/                # api client, utils, types
│  ├─ package.json
│  └─ .env.example
└─ README.md
```

---

## Troubleshooting

- **CORS errors:** Make sure `CORSMiddleware` in `backend/app/main.py` allows `http://localhost:3000`.
- **Port conflicts:** Ensure ports 8000 (backend) and 3000 (frontend) are available.
- **Environment issues:** Double-check `.env` and `.env.local` are correctly set for each folder.

---

## API Reference

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/api/cars`      | List all car listings |
| POST   | `/api/cars`      | Add a new car         |
| DELETE | `/api/cars/{id}` | Delete car by ID      |

---

## Author

Naman — https://github.com/Naman9761

---

**Ready to use!** 🎉
Clone, set up, and start hacking.

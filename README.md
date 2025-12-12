# Heal Salone MVP

A youth-led health innovation platform for Sierra Leone. This repository contains the full source code for the MVP, featuring a React frontend, Node/Express backend, and PostgreSQL database.

## 🚀 Quick Start (Docker)

The easiest way to run the application is using Docker Compose.

1.  **Clone/Open the project folder.**
2.  **Environment Setup**:
    Copy `.env.example` to `.env` in the root directory (optional, docker-compose sets defaults).
    ```bash
    cp .env.example .env
    ```
3.  **Run with Docker Compose**:
    ```bash
    docker-compose up --build
    ```
4.  **Access the App**:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:4000](http://localhost:4000)

## 🛠️ Manual Setup (Dev Mode)

### Backend

1.  Navigate to `backend/`:
    ```bash
    cd backend
    npm install
    ```
2.  Set up your local PostgreSQL database and update `.env` with `DATABASE_URL`.
3.  Run Migrations & Seed:
    ```bash
    npx prisma migrate dev --name init
    npm run prisma:seed
    ```
4.  Start Server:
    ```bash
    npm run dev
    ```

### Frontend

1.  Navigate to `frontend/`:
    ```bash
    cd frontend
    npm install
    ```
2.  Start Dev Server:
    ```bash
    npm run dev
    ```
    Access at `http://localhost:5173` (Vite default).

## 📚 API Documentation

### Auth

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Login and receive JWT.

### Health

- `POST /api/health`: Submit a new health report (Protected).
- `GET /api/health`: Get your report history (Protected).

### Chat (AI)

- `POST /api/chat/ask`: Send a message to the AI assistant (Protected).
- `GET /api/chat/history`: Get chat history (Protected).

## 👤 Default Users (Seeding)

If you run the seed script, the following users are created:

- **Admin**: `admin@healsalone.com` / `password123`
- **User**: `user@healsalone.com` / `password123`

## 🏗️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Zustand, Lucide Icons.
- **Backend**: Node.js, Express, Prisma ORM.
- **Database**: PostgreSQL.
- **Containerization**: Docker, Docker Compose.

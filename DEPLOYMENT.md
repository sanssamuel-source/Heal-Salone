# Deployment Guide for Heal Salone

This guide provides step-by-step instructions to deploy the Heal Salone MVP to GitHub and popular cloud platforms without cost (using free tiers).

## 📦 1. Preparing the Codebase

Before deploying, ensure your project is clean and ready.

1.  **Environment Variables**: Ensure you have copied `.env.example` to `.env` and set up your local secrets (OpenAI Key, Cloudinary Credentials).
2.  **Build Check**: Run `npm run build` in `frontend/` to make sure there are no React errors.

## 🐙 2. Uploading to GitHub

1.  Create a new repository on [GitHub](https://github.new).
2.  Initialize git in the project root:
    ```bash
    git init
    git add .
    git commit -m "Initial commit for Hackathon"
    ```
3.  Link to your repo:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/heal-salone.git
    git push -u origin main
    ```

## 🚀 3. Deploying Frontend (Vercel)

Vercel is the easiest way to deploy the React Frontend.

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
2.  Import your `heal-salone` repository.
3.  **Configure Project**:
    - **Framework Preset**: Vite
    - **Root Directory**: Click "Edit" and select `frontend`.
4.  **Environment Variables**:
    - Add `VITE_API_URL`. Set this to your **Production Backend URL** (which you will get in the next step). For now, you can leave it blank and update it later.
5.  Click **Deploy**.

## ☁️ 4. Deploying Backend (Render)

Render offers a free tier for Node.js services and PostgreSQL databases.

### Database (PostgreSQL)

1.  On [Render Dashboard](https://dashboard.render.com/), click **New +** -> **PostgreSQL**.
2.  Give it a name (e.g., `healsalone-db`).
3.  Copy the **Internal Database URL** (for connecting from Render services) and **External Database URL** (for connecting from your local machine to migrate).

### Web Service (Node/Express)

1.  Click **New +** -> **Web Service**.
2.  Connect your GitHub repo.
3.  **Settings**:
    - **Root Directory**: `backend`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
4.  **Environment Variables**:
    - `DATABASE_URL`: Paste the **Internal Database URL** from the step above. (Ensure to add `?ssl=true` if needed).
    - `JWT_SECRET`: Any random strong string.
    - `OPENAI_API_KEY`: Your OpenAI Key.
    - `CLOUDINARY_CLOUD_NAME`: Cloudinary Cloud Name.
    - `CLOUDINARY_API_KEY`: Cloudinary Key.
    - `CLOUDINARY_API_SECRET`: Cloudinary Secret.
5.  Click **Create Web Service**.
6.  Once deployed, copy the **Service URL** (e.g., `https://healsalone-backend.onrender.com`).

### 🔗 Connecting Frontend & Backend

1.  Go back to Vercel -> Project Settings -> Environment Variables.
2.  Add/Update `VITE_API_URL` with your Render Backend URL (`https://healsalone-backend.onrender.com/api`). **Note: verify if you need the `/api` suffix depending on your Vite config**.
3.  Redeploy Vercel.

## 🛠️ Database Migration on Production

To set up the production database tables:

1.  From your **Local Machine**:

    ```bash
    # Update .env temporarily to use the REMOTE External Database URL
    DATABASE_URL="postgres://user:pass@host:port/db?sslmode=require"

    # Run migration
    cd backend
    npx prisma migrate deploy

    # Run seed (optional)
    npm run prisma:seed
    ```

## 🏆 Hackathon Submission

- **Repository Link**: Submit your GitHub URL.
- **Demo URL**: Submit your Vercel URL.
- **Video**: Record a Loom/YouTube video walking through the "One-line Summary" features using the live link.

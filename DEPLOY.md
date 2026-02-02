# Deployment Guide for Nut Shop

This guide helps you deploy the Nut Shop application for free using **Render** (Backend) and **Vercel** (Frontend), with a **Neon** or **Supabase** database (PostgreSQL).

## Prerequisites

1.  **GitHub Account**: You need to push this code to a new repository on GitHub.
2.  **Render Account**: Sign up at [render.com](https://render.com).
3.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
4.  **Neon/Supabase Account**: Sign up at [neon.tech](https://neon.tech) or [supabase.com](https://supabase.com) for a free PostgreSQL database.

---

## Step 1: Push Code to GitHub

1.  Create a new repository on GitHub (e.g., `nut-shop`).
2.  Run the following commands in your terminal to push your local code:

```bash
git remote add origin https://github.com/gokhan011/nut-shop.git
git branch -M main
git push -u origin main
```
*(Replace `nut-shop.git` with your actual repo name if different)*

---

## Step 2: Set up Database (Neon or Supabase)

1.  Create a new project in Neon or Supabase.
2.  Copy the **Connection String** (Database URL). It looks like:
    `postgres://user:password@host.neondb.org/neondb?sslmode=require`
    *Note: Ensure you use the pooled connection string if available.*

---

## Step 3: Deploy Backend (Render)

1.  Go to the [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `nut-shop-backend`
    *   **Root Directory**: `backend`
    *   **Runtime**: `Python 3`
    *   **Build Command**: `./build.sh`
    *   **Start Command**: `gunicorn nutshop.wsgi:application`
    *   **Instance Type**: `Free`
5.  **Environment Variables** (Click "Advanced" or "Environment"):
    *   `PYTHON_VERSION`: `3.11.0` (or your local version)
    *   `DATABASE_URL`: *(Paste your Neon/Supabase connection string)*
    *   `SECRET_KEY`: *(Generate a long random string)*
    *   `DEBUG`: `False`
    *   `ALLOWED_HOSTS`: `*` (or your specific domain)
    *   `CSRF_TRUSTED_ORIGINS`: `https://your-frontend-app.vercel.app` (You will update this after deploying frontend)
6.  Click **Create Web Service**.
7.  Wait for deployment to finish. **Copy the Backend URL** (e.g., `https://nut-shop-backend.onrender.com`).

---

## Step 4: Deploy Frontend (Vercel)

1.  Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  Configure the project:
    *   **Root Directory**: Click "Edit" and select `frontend`.
    *   **Framework Preset**: `Next.js` (should be auto-detected).
5.  **Environment Variables**:
    *   `NEXT_PUBLIC_API_URL`: *(Paste your Render Backend URL + `/api`)*
        *   Example: `https://nut-shop-backend.onrender.com/api`
6.  Click **Deploy**.

---

## Step 5: Final Configuration

1.  Once the Frontend is deployed, copy its URL (e.g., `https://nut-shop.vercel.app`).
2.  Go back to **Render Dashboard** -> **Environment**.
3.  Add/Update:
    *   `FRONTEND_URL`: `https://nut-shop.vercel.app`
    *   `CSRF_TRUSTED_ORIGINS`: `https://nut-shop.vercel.app`
4.  **Redeploy** the Backend (Manual Deploy -> Deploy latest commit) so it picks up the new variables.

## Step 6: Create Superuser (Optional)

To access the Django Admin panel:
1.  In Render Dashboard, go to **Shell**.
2.  Run: `python manage.py createsuperuser`
3.  Follow the prompts.

You're done! Your app is now live.

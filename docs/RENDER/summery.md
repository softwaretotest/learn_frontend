# Summery Deploy

## 🚀 Complete Deployment Guide: Laravel + React Monolith on Render & Supabase

A clean, step-by-step production handbook for single-root Full-Stack applications.

---

## 💻 Step 1: Git Initial & Local Setup

Run these standard commands in your local VS Code terminal to link and push your project to GitHub for the first time.

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com
git push -u origin main
```

### 📦 Fix Local Vite 8 / Dependency Conflict

If `npm install` fails due to Vite 8 (Rolldown) dependency conflicts, run this local command to downgrade to stable Vite 5:

```bash
npm install vite@5.4.11 @vitejs/plugin-react@5.1.1 --save-dev
```

---

## 🖱️ Step 2: Render Web Service Initialization

1. Go to **Render Dashboard** -> Click **"New +"** -> **"Web Service"**.
2. Find your repository `ecommerce` and click **"Connect"**.
3. Configure the initial screen parameters:
    - **Name:** `ecommerce`
    - **Region:** `Singapore`
    - **Language / Runtime:** **Docker** (⚠️ _Do not select PHP or Rust_)
    - **Root Directory:** _Leave completely Blank_
    - **Build Command:** _Leave completely Blank_
    - **Start Command:** _Leave completely Blank_
      _(Docker will handle all build and start processes automatically)._

---

## 💻 Step 3: Create the Multi-Stage Dockerfile

Create a file named exactly **`Dockerfile`** (no extensions) at the root level of your project. This configuration combines Node.js 20 and PHP 8.4 natively.

```dockerfile
# === STAGE 1: Build React Frontend ===
FROM node:20 AS frontend-builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps && npm run build

# === STAGE 2: Setup PHP Laravel Backend ===
FROM serversideup/php:8.4-fpm-nginx
WORKDIR /var/www/html

# Copy project files and set correct permissions
COPY --chown=www-data:www-data . .

# Copy compiled frontend assets from STAGE 1
COPY --from=frontend-builder /app/public/build ./public/build

# Install backend PHP packages securely
RUN composer install --no-dev --optimize-autoloader

# Expose required web port
EXPOSE 8080

# Note: No CMD or ENTRYPOINT override needed. Let the image run natively.
```

---

## 🔒 Step 4: Configure Cloud Environment Variables

Go to the **Environment Variables** dashboard on Render and manually add these variables.

### 1. Supabase Credentials (Bypassing IPv6 Network Unreachable)

⚠️ _Do not paste the raw connection URL string. Split them into separate keys and use the **Session Pooler** address to force IPv4 connection._

### 2. Encryption & HTTPS Assets Fix

- Add `APP_KEY` from your local `.env` to prevent 500 Server Errors.
- Add `ASSET_URL` to fix Mixed Content (White screen / Blocked CSS & JS scripts).

| Key (Left Column) | Value (Right Column)            | Notes                         |
| :---------------- | :------------------------------ | :---------------------------- |
| `APP_KEY`         | `base64:your-local-key...`      | Copy from local `.env` file   |
| `ASSET_URL`       | `https://onrender.com`          | Your live Render website URL  |
| `DB_CONNECTION`   | `pgsql`                         | Default driver                |
| `DB_HOST`         | `://supabase.com`               | Use Supabase Pooler host      |
| `DB_PORT`         | `5432`                          | Pooler routing port           |
| `DB_DATABASE`     | `postgres`                      | Default database              |
| `DB_USERNAME`     | `postgres.ngszonzqgaqdjeyuyfwh` | Long unique pooler username   |
| `DB_PASSWORD`     | `your-supabase-password`        | Your secure database password |

👉 _Scroll to the bottom and click **"Save Changes"** to trigger the deployment._

---

## 🎨 Step 5: Laravel Code Adjustment for HTTPS

Open **`app/Providers/AppServiceProvider.php`** in VS Code and force HTTPS URL generation for all React compiled assets.

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}
```

Push this fix to GitHub to finalize the live deployment pipeline:

```bash
git add .
git commit -m "fix mixed content assets loading"
git push origin main
```

---

## 🔄 Operations & Troubleshooting Cheat Sheet

### How to Stop an Infinite Restart Loop

If the web app crashes continuously, clicking "Cancel Deploy" will not kill the process.

1. Navigate to **Settings** -> Scroll to the bottom **Danger Zone**.
2. Click **"Suspend Web Service"** to instantly freeze the broken container.

### How to Resume and Redeploy

1. Navigate to **Settings** -> Scroll to the bottom **Danger Zone**.
2. Click **"Resume Web Service"** to unfreeze the server.
3. Scroll to the top right -> Click **"Manual Deploy"** -> **"Deploy latest commit"**.

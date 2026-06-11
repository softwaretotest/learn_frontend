# Git Connect

## 🚀 Step 2.2: Setting Up Build and Start Commands for `ecommerce`

This is the most critical part of the Monolith setup. We will tell Render to install both PHP dependencies (Laravel) and Node.js dependencies (React), compile them, and start the server.

---

## 🛠️ Step-by-Step Settings

Scroll down to the commands section on your Render dashboard and copy-paste these exact lines:

### 1. Build Command

Copy and paste this long command into the **Build Command** box:

```bash
composer install --no-dev --optimize-autoloader && npm install && npm run build
```

- **What this does:**
    1. Installs all Laravel backend packages securely.
    2. Installs all React frontend packages.
    3. Compiles your React code into static files inside Laravel's public folder.

### 2. Start Command

Copy and paste this command into the **Start Command** box:

```bash
php artisan serve --host 0.0.0.0 --port \$PORT
```

- **What this does:** Starts the native PHP web server and binds it to Render's dynamic web port so customers can access your site.

---

## 🎯 What to look for next?

After pasting these two commands, scroll down further until you see a button named:

- **Advanced** (Click it to expand more settings)

Inside the Advanced section, look for a button or area called **Add Environment Variable**.

**STOP HERE.** Do not click "Deploy Web Service" yet. We need to link your Supabase database first in the next step.

# 🖱️ Step 2.3: Start Web Service

Short actions to open the configuration page.

---

## 🛠️ Action Checklist

1. Click **"Deploy a Web Service"** (First box on your screen 🌐).
2. Find your repository **`ecommerce`**.
3. Click **"Connect"** next to it.

---

## 🎯 Next Screen

The long setup page will open.

- Fill Name: `ecommerce`
- Select Region: `Singapore`
- Select Language: `PHP`

# 🚀 Step 2.4: Finalize Render Configuration

Fill in the remaining fields and deploy your project.

---

## 🛠️ Settings Checklist

1. **Root Directory:** Leave it completely **Blank**.
2. **Build Command:** Copy and paste this code:
    ```bash
    composer install --no-dev --optimize-autoloader && npm install && npm run build
    ```
3. **Start Command:** Copy and paste this code:
    ```bash
    php artisan serve --host 0.0.0.0 --port \$PORT
    ```

---

## 🔒 Step 2.5: Add Supabase Credentials

Environment Variables
Set environment-specific config and secrets (such as API keys), then read those values from your code. Learn more.
DB_CONNECTION

1. Scroll down and click the **"Environment Variables"** .
2. Click **"Add Environment Variable"** to add your Supabase keys one by one:

| Key             | Value                      |
| :-------------- | :------------------------- |
| `DB_CONNECTION` | `pgsql`                    |
| `DB_HOST`       | `[Your Supabase Host URL]` |
| `DB_PORT`       | `5432`                     |
| `DB_DATABASE`   | `postgres`                 |
| `DB_USERNAME`   | `postgres`                 |
| `DB_PASSWORD`   | `[Your Supabase Password]` |

---

## 🎯 Final Action

Scroll to the bottom and click the blue button: **"Create Web Service"** (or **"Deploy Web Service"**).

---

## BUILD ERROR

# 🛠️ Step 2.8: Fix 'composer: command not found' Error

This error means Render is using the wrong Environment/Runtime (like Node or Rust) instead of PHP. We need to switch it back to PHP.

---

## 🛠️ Action Checklist

1. Look at the left sidebar menu on Render and click **"Settings"**.
2. Scroll down to the **"Environment"** or **"Language"** section.
3. Change the Runtime selection to **"PHP"**.
4. Scroll down and click **"Save Changes"**.

---

## 🔄 Re-Deploying

After saving, Render will automatically trigger a new build. If it doesn't:

1. Scroll to the top right of the Render screen.
2. Click the **"Manual Deploy"** button.
3. Select **"Deploy latest commit"**.

# 🛠️ Step 2.9: Delete and Re-Create Web Service for PHP

Render does not allow changing the Runtime (Language) after a service is created. Since your app is locked to Rust, we must delete it and create a new one with the PHP runtime.

---

## 🗑️ Action 1: Delete the Current Service

1. Look at the left sidebar menu on Render.
2. Scroll to the very bottom and click **"Settings"**.
3. Scroll down to the bottom of the Settings page until you see the **"Danger Zone"**.
4. Click **"Delete Web Service"** and confirm.

---

## 🆕 Action 2: Create a New PHP Web Service

1. Go back to the main Dashboard.
2. Click **"New +"** -> **"Web Service"**.
3. Select your GitHub repository **`ecommerce`** and click **"Connect"**.
4. On the configuration page, find the **"Language"** or **"Runtime"** field.
5. **CRITICAL:** Change the dropdown selection from `Rust` (or `Node`) to **`PHP`**.
6. Paste your **Build Command**, **Start Command**, and your **Environment Variables** (Supabase keys) onto this page.
7. Click **"Create Web Service"**.

---

## RENDER.COM LANGUANGE NO PHP (USER DOCKER)

# 🛠️ Step 2.10: Use Docker Runtime for PHP/Laravel

Since Render removed native PHP from the selection dropdown, we must select **"Docker"** instead. Render will read our configuration and build PHP automatically.

---

## 💻 1. Create a File in VS Code (Local Machine)

Go to your VS Code, create a new file named exactly **`Dockerfile`** (No file extension like .txt) at the root of your `ecommerce` folder, and paste this exact code:

```dockerfile
FROM serversideup/php:8.3-fpm-nginx

# Set working directory
WORKDIR /var/www/html

# Copy all project files
COPY --chown=www-data:www-data . .

# Install PHP and Node dependencies, then build React
RUN composer install --no-dev --optimize-autoloader && \
    npm install && \
    npm run build

# Expose port
EXPOSE 8080
```

_Save the file, then Commit and **Push** your changes to GitHub._

---

## 🖱️ 2. Action Checklist on Render Screen

1. On the Language dropdown (from your screenshot), select **"Docker"**.
2. **Build Command:** Clear it (Leave it completely **Blank**).
3. **Start Command:** Clear it (Leave it completely **Blank**).
   _(Because the Dockerfile will handle both commands automatically!)_
4. Keep your Environment Variables (Supabase keys) exactly as they are.
5. Scroll down and click **"Create Web Service"**.

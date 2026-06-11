# run on local

## 💻 Step 1.1: Running the Monolith on Local Machine

Before deploying to Render, we must ensure both Laravel and React compile and run properly on your local computer.

---

## 🛠️ Execution Checklist (Run in VS Code Terminal)

Open your terminal inside the `ecommerce` root folder and run these commands:

### 1. Install Dependencies

```bash
composer install
npm install
```

### 2. Generate Laravel Application Key

```bash
php artisan key:generate
```

_(This creates the security key inside your `.env` file automatically)._

### 3. Run Database Migrations to Supabase

```bash
php artisan migrate
```

_(Ensure your `.env` file is already filled with your Supabase credentials before running this)._

---

## 🚀 How to Start the Local Servers

To test the application, you must keep **two terminal windows** open and running at the same time:

- **Terminal 1 (For React Frontend):**
    ```bash
    npm run dev
    ```
- **Terminal 2 (For Laravel Backend API):**
    ```bash
    php artisan serve
    ```

---

## 🎯 Verification Test

Open your browser and go to: `http://127.0.0.1:8000`

- If you see the welcome page with **Log in** and **Register** buttons at the top right, your local setup is 100% successful!

---

## ERROR

---

```bash
78 packages you are using are looking for funding.
Use the `composer fund` command to find out more!
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: undefined@undefined
npm error Found: vite@8.0.16
npm error node_modules/vite
npm error   dev vite@"^8.0.0" from the root project
npm error   peer vite@"*" from @vitejs/devtools@0.1.24
npm error   node_modules/@vitejs/devtools
npm error     peerOptional @vitejs/devtools@"^0.1.18" from vite@8.0.16
npm error
npm error Could not resolve dependency:
npm error peer vite@"^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0" from @vitejs/plugin-react@4.7.0
npm error node_modules/@vitejs/plugin-react
npm error   dev @vitejs/plugin-react@"^4.2.0" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error C:\Users\o\AppData\Local\npm-cache\_logs\2026-06-11T10_36_32_810Z-eresolve-report.txt
npm error A complete log of this run can be found in: C:\Users\o\AppData\Local\npm-cache\_logs\2026-06-11T10_36_32_810Z-debug-0.log

o@o MINGW64 ~/.vscode/react/ecommerce (main)
```

---

# 🛠️ 1. Fix npm ERESOLVE Error (Vite Dependency Conflict)

This error happens because Vite version 8 is too new for the current React plugin. We will force NPM to accept it and continue installation.

---

# 🛠️ 1.1 Action Command (Run in VS Code Terminal)

Run this command to force the installation and bypass the version check:

```bash
npm install --legacy-peer-deps
```

---

## 🎯 Next Step Evaluation

- If the command finishes successfully without showing red errors, your frontend packages are ready.
- **Stop here** and do not run anything else yet.

# 🔑 Step 1.2: Generate Application Key

Create the secure application key for your Laravel backend.

---

## 🛠️ Action Command (Run in VS Code Terminal)

```bash
php artisan key:generate
```

# 🗄️ Step 1.3: Run Migration & Start Local Server

The final setup to see your live Laravel + React application on your computer.

---

## 🛠️ Action 1: Create Database Tables (Run in Terminal)

Make sure your `.env` file has your Supabase details, then run:

```bash
php artisan migrate
```

---

## 🚀 Action 2: Start Servers Side-by-Side

To view the website, you must open **two terminal windows** in VS Code and run these commands at the same time:

- **Terminal Window 1 (For React Frontend):**

    ```bash
    npm run dev
    ```

- **Terminal Window 2 (For Laravel Backend API):**
    ```bash
    php artisan serve
    ```

---

## 🎯 Final Check

Open your web browser and go to: `http://127.0.0.1:8000`

- Check if the **Log in** and **Register** buttons appear at the top right.

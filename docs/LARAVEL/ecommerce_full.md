# full laravel features

## 🚀 Step 1: Local Setup (Laravel + React + Supabase)

Run these commands in order to set up your project locally and link it to your free Supabase PostgreSQL database.

---

## 💻 1. Create Project & Install React (Run in Terminal)

Open your terminal, navigate to your working folder, and execute this complete set of commands:

```bash
# 1. Create a new Laravel project named 'ecommerce'
composer create-project laravel/laravel ecommerce

# 2. Move inside your new project folder
cd ecommerce

npm install

if has error

npm install --legacy-peer-deps

# 3. Download the Laravel Breeze starter kit (dev dependency)
composer require laravel/breeze --dev

# 4. Install React frontend framework into Laravel
php artisan breeze:install react
```

_(Note: During step 4, the terminal will ask for your preferences. Choose **No** for dark mode and **0 (Pest)** or **1 (PHPUnit)** for testing. It doesn't matter much for now.)_

---

## 🔧 2. Update Database Config (Edit `.env` file)

Open your project in **VS Code**, find the `.env` file at the root folder, and change the database lines to use your **Supabase credentials**:

```ini
DB_CONNECTION=pgsql
DB_HOST=://supabase.com  # Copy from Supabase Database Settings
DB_PORT=5432
DB_DATABASE=postgres                         # Default Supabase DB name
DB_USERNAME=postgres                         # Default Supabase username
DB_PASSWORD=your-secure-supabase-password    # Your Supabase project password
```

---

## 💾 3. Create Tables & Run Local Server

Go back to your terminal inside the `ecommerce` folder, and run these final setup commands:

```bash
# 1. Push Laravel's authentication tables into Supabase PostgreSQL
php artisan migrate

# 2. Install Node modules and compile React assets
npm install
```

---

## 🎯 4. Start Development (Run Side-by-Side)

To open your website, you must keep **two terminals** running at the same time:

- **Terminal Window 1 (React Compiler):**
    ```bash
    npm run dev
    ```
- **Terminal Window 2 (Laravel API Server):**
    ```bash
    php artisan serve
    ```

Now open `http://127.0.0.1:8000` in your web browser. You will see your new website with working **Log in** and **Register** buttons at the top right!

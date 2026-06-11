# monolith

# 📦 Laravel + React Monolith Architecture Guide

A concise guide to setting up Laravel and React in a single root directory. Fast development, easy deployment, and low cost for solo developers.

---

## 📁 Project Structure

```text
my-ecommerce/ (Root)
├── app/Models/             # Eloquent ORM Models (Database layer)
├── app/Http/Controllers/   # Backend controllers & Validation
├── resources/js/           # Frontend React application
│   ├── components/         # UI Components (Navbar, Cards)
│   └── app.jsx             # React entry point
├── routes/api.php          # Backend API routes
├── composer.json           # PHP dependencies (Root level)
└── package.json            # Node.js dependencies (Root level)
```

---

## 🛠️ Step-by-Step Setup Commands

### 1. Create Laravel Project

```bash
composer create-project laravel/laravel my-ecommerce
cd my-ecommerce
```

### 2. Install React Starter (Laravel Breeze)

```bash
composer require laravel/breeze --dev
php artisan breeze:install react
```

_Note: Select your preferences (Dark mode, Testing framework) during setup._

### 3. Setup PostgreSQL Database

Edit your `.env` file at the root level:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=my_store_db
DB_USERNAME=postgres
DB_PASSWORD=secret
```

### 4. Run Migrations

```bash
php artisan migrate
```

---

## 🚀 How to Run Locally

You only need **two terminal windows** inside the same root directory:

- **Terminal 1 (Frontend compiler):**
    ```bash
    npm install
    npm run dev
    ```
- **Terminal 2 (Backend server):**
    ```bash
    php artisan serve
    ```

---

## 🖥️ Code Example: Fetching Data

### Backend (routes/api.php)

Laravel uses Eloquent ORM and Backend Validation, then returns pure JSON data.

```php
use App\Models\Product;
use Illuminate\Http\Request;

Route::get('/products', function () {
    // Eloquent ORM fetches all data securely from PostgreSQL
    return response()->json(Product::all());
});
```

### Frontend (resources/js/pages/Home.jsx)

React fetches data from the same domain. No CORS configuration needed.

```javascript
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Calls the backend route directly
        axios.get("/api/products").then((res) => setProducts(res.data));
    }, []);

    return <div>{products.length} Products Loaded</div>;
}
```

---

## ☁️ Render.com Deployment (No Docker Needed)

1. Push your root folder to GitHub.
2. Create a **Web Service** on Render. Select **PHP** language.
3. **Build Command:**
    ```bash
    composer install --no-dev --optimize-autoloader && npm install && npm run build
    ```
4. **Start Command:**
    ```bash
    php artisan serve --host 0.0.0.0 --port \$PORT
    ```

# install laravel react

## คู่มือการติดตั้ง Laravel ร่วมกับ React (ผ่าน Laravel Breeze & Inertia.js)

คู่มือนี้สำหรับกรณีที่ต้องการใช้ **React** เป็น Frontend และใช้ **Laravel** เป็น Backend โดยใช้ระบบ **Inertia.js** ในการเชื่อมต่อ ทำให้สามารถเขียน React Component ควบคู่ไปกับระบบ Routing, Validation และ Eloquent ORM ของ Laravel ได้อย่างสมบูรณ์

---

## 🚀 ขั้นตอนการติดตั้งทีละขั้นตอน (Step-by-Step)

### ขั้นตอนที่ 1: ติดตั้งโปรเจกต์ Laravel และ Breeze

หากเริ่มทำโปรเจกต์ใหม่ ให้รันคำสั่งสร้างโปรเจกต์และติดตั้งตัวจัดการระบบสมาชิกเหมือนเดิม:

```bash
composer create-project laravel/laravel laravel-react-app
cd laravel-react-app
composer require laravel/breeze --dev
```

or create a folder and run this in the folder

```bash
composer create-project laravel/laravel .
```

---

### ขั้นตอนที่ 2: ติดตั้งระบบ React (Inertia.js)

ในขั้นตอนการติดตั้ง Breeze แทนที่จะเลือก Blade ให้เราเปลี่ยนไปเลือก **React** โดยรันคำสั่งนี้:

```bash
php artisan breeze:install react
```

**ตัวเลือกที่จะขึ้นมาบน Terminal:**

1. **Would you like to enable dark mode support?** -> เลือก `yes` หรือ `no` ตามชอบ
2. **Which testing framework do you prefer?** -> แนะนำเลือก `0` (Pest) หรือ `1` (PHPUnit) ตามสะดวก

_ระบบจะทำการติดตั้ง React, Tailwind CSS, Inertia.js และ Dependencies ทั้งหมดฝั่งหน้าบ้านให้โดยอัตโนมัติ_

---

### ขั้นตอนที่ 3: ตั้งค่าฐานข้อมูล และรัน Migration

เปิดไฟล์ `.env` เพื่อเชื่อมต่อฐานข้อมูลตามปกติ:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_react_db
DB_USERNAME=root
DB_PASSWORD=
```

จากนั้นสร้างตารางในฐานข้อมูลด้วยคำสั่ง:

```bash
php artisan migrate
```

---

### ขั้นตอนที่ 4: รันเซิร์ฟเวอร์เพื่อเริ่มใช้งาน

เนื่องจากมีฝั่ง React เข้ามาเกี่ยวข้อง คุณจำเป็นต้องรันคำสั่งทั้งฝั่ง Frontend และ Backend ควบคู่กัน:

1. **รันฝั่ง Frontend (Vite + React):**
    ```bash
    npm install
    npm run dev
    ```
2. **รันฝั่ง Backend (Laravel Server):** (เปิด Terminal อีกหน้าต่างหนึ่ง)
    ```bash
    php artisan serve
    ```

🎯 เข้าเว็บไปที่ `http://127.0.0.1:8000` คุณจะได้ระบบ Laravel ที่มีหน้าบ้านเป็น **React แบบ Single Page Application (SPA)** พร้อมระบบ Login / Register ทันที!

---

## 🔍 โครงสร้างโฟลเดอร์ที่สำคัญ (เมื่อใช้ React)

เมื่อติดตั้งเสร็จแล้ว ไฟล์ฝั่งหน้าบ้านทั้งหมดจะย้ายไปอยู่ที่โฟลเดอร์ `resources/js`:

- `resources/js/Pages/` -> เป็นที่เก็บหน้าจอ (Components) ของ React เช่น หน้า `Login.jsx`, `Dashboard.jsx`
- `resources/js/Layouts/` -> เก็บ Template หลักของหน้าเว็บ (เช่น แถบเมนูด้านบน หรือ Sidebar)
- `routes/web.php` -> ยังคงใช้จัดการ Routing ของ Laravel เหมือนเดิม แต่เวลาส่งหน้าจอจะเปลี่ยนไปใช้คำสั่ง Inertia เช่น:

```php
use Inertia\Inertia;

Route::get('/profile', function () {
    return Inertia::render('Profile/Edit', [
        'mustVerifyEmail' => true,
        'status' => session('status'),
    ]);
});
```

---

## 💡 สิ่งที่เพิ่มเข้ามาอัตโนมัติ (และไม่ต้องลงเพิ่มเอง)

1.  **@inertiajs/react**: ตัวเชื่อมฝั่ง React ให้คุยกับ Laravel ได้โดยไม่ต้องเขียน API fetch data เอง
2.  **Tailwind CSS**: ระบบ CSS Framework ถูกติดตั้งและตั้งค่าร่วมกับ React มาให้พร้อมใช้ทันที
3.  **Vite**: ตัว Bundler ความเร็วสูงที่ทำหน้าที่ Compile ไฟล์ React (`.jsx`) ให้แสดงผลบนเบราว์เซอร์ทันทีเมื่อมีการแก้ไขโค้ด (Hot Reload)

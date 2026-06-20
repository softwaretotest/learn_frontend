# install Laravel full

## คู่มือการติดตั้ง Laravel แบบเต็มรูปแบบ (Authentication, Validation, Eloquent ORM)

คู่มือนี้แนะนำขั้นตอนการติดตั้ง Laravel Framework เวอร์ชันล่าสุด พร้อมระบบจัดการสมาชิก (Authentication & Registration), ระบบตรวจสอบข้อมูล (Validation) และระบบจัดการฐานข้อมูล (Eloquent ORM) ผ่านโปรแกรม **VS Code**

---

## 🛠️ สิ่งที่ต้องเตรียมก่อนเริ่มติดตั้ง (Prerequisites)

ก่อนเริ่มทำการติดตั้ง กรุณาตรวจสอบให้มั่นใจว่าเครื่องคอมพิวเตอร์ของคุณได้ติดตั้งโปรแกรมเหล่านี้เรียบร้อยแล้ว:

- **PHP** (แนะนำเวอร์ชัน 8.2 ขึ้นไป)
- **Composer** (โปรแกรมจัดการ Package ของ PHP)
- **Node.js & NPM** (สำหรับจัดการ JavaScript / CSS และ Frontend)
- **Database Server** (เช่น MySQL ผ่าน XAMPP, Laragon หรือ Docker)

---

## 🚀 ขั้นตอนการติดตั้งทีละขั้นตอน (Step-by-Step)

### ขั้นตอนที่ 1: สร้างโปรเจกต์ Laravel ใหม่

เปิด Terminal ใน VS Code แล้วใช้คำสั่ง Composer เพื่อดาวน์โหลดและสร้างโฟลเดอร์โปรเจกต์ใหม่:

```bash
composer create-project laravel/laravel laravel-full-app
```

_(หมายเหตุ: สามารถเปลี่ยนชื่อ `laravel-full-app` เป็นชื่อโปรเจกต์ที่ต้องการได้)_

---

### ขั้นตอนที่ 2: ติดตั้งระบบ Authentication & Registration

เราจะใช้ **Laravel Breeze** ซึ่งเป็น Package อย่างเป็นทางการในการสร้างระบบ Login, Register, Password Reset และ Email Verification

1. ย้ายเข้าไปในโฟลเดอร์โปรเจกต์:
    ```bash
    cd laravel-full-app
    ```
2. ติดตั้ง Laravel Breeze Package ผ่าน Composer:
    ```bash
    composer require laravel/breeze --dev
    ```
3. รันคำสั่งติดตั้งหน้าตาของระบบ (Frontend):
    ```bash
    php artisan breeze:install blade
    ```
    _(ทำตามคำสั่งที่ปรากฏบนหน้าจอ: แนะนำให้เลือก **Blade** ซึ่งจัดการง่ายที่สุดสำหรับผู้เริ่มต้น จากนั้นสามารถเลือกเปิด/ปิด Dark Mode หรือการรันเทสตามความต้องการ)_

---

### ขั้นตอนที่ 3: ตั้งค่าการเชื่อมต่อฐานข้อมูล (Database)

1. เปิดไฟล์ `.env` ที่อยู่ในโฟลเดอร์หลัก (Root) ของโปรเจกต์ด้วย VS Code
2. ค้นหาและแก้ไขกลุ่มคำสั่งการเชื่อมต่อฐานข้อมูลให้ตรงกับเครื่องของคุณ:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_full_db  # ชื่อฐานข้อมูลที่สร้างไว้ใน MySQL Server
DB_USERNAME=root             # ชื่อผู้ใช้งานฐานข้อมูล
DB_PASSWORD=                 # รหัสผ่านฐานข้อมูล (ถ้าไม่มีให้ปล่อยว่าง)
```

3. รันคำสั่ง **Migration** เพื่อสร้างตารางข้อมูลที่จำเป็น (เช่น ตาราง users และ password_resets) เข้าสู่ฐานข้อมูล:
    ```bash
    php artisan migrate
    ```

---

### ขั้นตอนที่ 4: คอมไพล์ไฟล์ Frontend และเปิดใช้งานเซิร์ฟเวอร์

1. ติดตั้งและคอมไพล์ไฟล์ Assets (CSS/JavaScript) ผ่าน Vite:
    ```bash
    npm install
    npm run dev
    ```
2. เปิด Terminal อีกหน้าต่างหนึ่งใน VS Code แล้วรันคำสั่งเปิดใช้งาน Laravel Development Server:
    ```bash
    php artisan serve
    ```

🎯 **ทดสอบการใช้งาน:** เปิดเว็บเบราว์เซอร์แล้วเข้าไปที่ `http://127.0.0.1:8000` คุณจะเห็นปุ่ม **Log in** และ **Register** ปรากฏขึ้นที่มุมขวาบนของหน้าจอ พร้อมใช้งานระบบสมัครสมาชิกและเข้าสู่ระบบได้ทันที!

---

## 💡 เจาะลึกฟีเจอร์สำคัญในโปรเจกต์

หลังจากติดตั้งตามขั้นตอนข้างต้นแล้ว ฟีเจอร์ที่คุณต้องการทั้งหมดจะพร้อมใช้งานในสถาปัตยกรรมของ Laravel ทันทีโดยไม่ต้องติดตั้งปลั๊กอินอื่นเพิ่มเติม:

### 1. Eloquent ORM

Laravel มาพร้อมกับ **Eloquent ORM** ตั้งแต่เริ่มต้น คุณสามารถสร้างและจัดการข้อมูลในตารางผ่านคลาส PHP (Model) ได้โดยตรง เช่น:

- **การดึงข้อมูลทั้งหมด:** `User::all();`
- **การค้นหาด้วยเงื่อนไข:** `User::where('email', $email)->first();`
- **การสร้างโมเดลใหม่:** สามารถใช้คำสั่ง `php artisan make:model Product -m` เพื่อสร้าง Model พร้อมไฟล์ Migration สำหรับสร้างตารางใหม่ได้ทันที

### 2. Validation (ระบบตรวจสอบความถูกต้องของข้อมูล)

Laravel มีระบบ Validation ที่ทรงพลังเพื่อความปลอดภัยของข้อมูล คุณสามารถเรียกใช้งานใน Controller ได้ทันที ตัวอย่างเช่น:

```php
\$request->validate([
    'name'     => 'required|string|max:255',
    'email'    => 'required|string|email|max:255|unique:users',
    'password' => 'required|string|min:8|confirmed',
]);
```

_(โค้ดชุดนี้ถูกใช้งานอยู่แล้วในระบบสมัครสมาชิกของ Laravel Breeze เพื่อเช็คว่าห้ามกรอกข้อมูลว่าง, อีเมลต้องไม่ซ้ำ และรหัสผ่านต้องตรงกันทั้งสองช่อง)_

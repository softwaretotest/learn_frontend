# Migration CMD

```bash
php artisan storage:link

php artisan migrate
```

### rollback 1 step

```bash
php artisan make:migration create_products_table

php artisan migrate:rollback --step=1
```

### ย้อนทุก migration:

```bash
php artisan migrate:reset
```

### ล้าง DB ทั้งหมดแล้ว migrate ใหม่:

```bash
php artisan migrate:fresh
```

### SEED FRESH

```php
        DB::statement('TRUNCATE TABLE products RESTART IDENTITY CASCADE');

```

```bash
php artisan make:seeder ProductSeeder

php artisan migrate:fresh --seed

php artisan db:seed --class=OrderSeeder

```

## Factory

```bash
php artisan make:factory ProductFactory --model=Product
```

Composer Autoload neu laden (Wichtig!)
Da wir neue Klassen im database-Verzeichnis hinzugefügt haben,
kann es sein, dass PHP bzw. Composer den Pfad noch nicht im Cache hat.
Führe im Terminal einmal kurz das hier aus:

```bash
composer dump-autoload
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // <--- DAS HIER FEHLT BESTIMMT

class Product extends BaseModel
{
    use HasFactory; // <--- DAS HIER AKTIVIERT DIE factory() METHODE

    protected $fillable = ['name', 'image_url'];
}
```

```bash
php artisan make:factory ProductFactory --model=Product
```

---

## Re-create Product Migration

### หลังแก้ migration:

```bash
php artisan migrate
```

---

## Update Existing Table (Production CASE)

ห้ามแก้ migration เก่า:

```bash
php artisan make:migration alter_products_name_constraint_table --table=products
```

### ตัวอย่างเพิ่มความยาว name จาก 20 เป็น 50:

```php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

public function up(): void
{
    Schema::table('products', function (Blueprint $table) {
        $table->string('name', 50)->change();
    });
}

public function down(): void
{
    Schema::table('products', function (Blueprint $table) {
        $table->string('name', 20)->change();
    });
}
```

รัน:

```bash
php artisan migrate
```

---

## Constraint Usage

```php
use App\Constraints\Constraint;

$table->string(
    'name',
    Constraint::NAME_MAX
);

$table->string(
    'image_url',
    Constraint::IMAGE_URL_MAX
)->nullable();
```

---

## Rule of Thumb

Development:

```text
rollback → edit migration → migrate
```

Production:

```text
create new migration → migrate
```

## UNIT TEST

```bash
php artisan make:test Services/ProductServiceTest --unit

php artisan test --filter=ProductServiceTest
```

## API

```bash
php artisan install:api

php artisan make:controller Api/ProductApiController
```

## BREEZE

```bash
npm install --legacy-peer-deps
composer require laravel/breeze --dev
php artisan breeze:install react
```

## MAIL TRAP

```bash
php artisan config:clear
```

```php
//routes/web.php
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/test-mail', function () {
    Mail::raw('ส่งเมลจาก Laravel สำเร็จแล้ว!', function ($message) {
        $message->to('test@user.com')
                ->subject('ทดสอบระบบอีเมล');
    });

    return 'ส่งเมลเรียบร้อยแล้ว! เช็คที่ Mailtrap ได้เลย';
});
```

test send mail

```html
http://127.0.0.1:8000/test-mail
```

## register and verify email

```php
class User extends Authenticatable implements MustVerifyEmail

// ตัวอย่างหน้า Dashboard ที่ต้องยืนยันอีเมลก่อนถึงจะดูได้
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
```

# Bash CMD

### .env has new variable but still 404 Not Found

## composer

```bash
everytime when you generate new class php in same folder app/Contant and same namespace App/Constant
you must run

composer dump-autoload
```

## php artisan

```bash
php artisan config:clear
php artisan route:clear
php artisan cache:clear

(สร้าง Model พร้อมไฟล์ Migration)
php artisan make:model [Name] -m

(สร้าง Controller)
php artisan make:controller [Name]

(สร้าง Form Request สำหรับ validate ข้อมูล)
php artisan make:request [Name]

# 4 Layers of Laravel Backend
# app/Models/
php artisan make:model BaseModel
# app/Http/Controllers/
php artisan make:controller BaseController
# php artisan make:class Services/BaseService
php artisan make:class Services/BaseService
# php artisan make:class DTOs/BaseDTO
php artisan make:class DTOs/BaseDTO

# Generate ทุก Entity
php artisan m:generate

# Generate Entity เดียว
php artisan m:generate Product

# Generate เฉพาะบาง Layer
php artisan m:generate Product --only=dto,model
```

### ใน config/app.php

#### ใน Laravel การใช้ env() ในไฟล์ Route ไม่แนะนำให้ใช้ใน Production เพราะมันจะคืนค่าเป็น null เสมอ (ถ้ามีการรัน php artisan config:cache)

```php
'm_data_endpoint' => env('APP_M_DATA', '/m-value'),
```

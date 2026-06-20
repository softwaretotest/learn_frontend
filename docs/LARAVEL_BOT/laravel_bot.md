## Phase 1: Product Only

step of making script for automation
to generate update flow for creating backend laravel

```text
here prepare manuelly

RecordConfig
    ↓
Constraint

And script will do this

Migration
    ↓
Model
    ↓
DTO
    ↓
Service
    ↓
Seeder
    ↓
Storage / Image
    ↓
API
    ↓
UI Test
    ↓
Factory (e.g. products)
    ↓
seeder
    ↓
Service Test




user
    ↓
shop
    ↓
product
    ↓
select_product
    ↓
order

```

## Steps create Maker Bot

e.g. for User, Shop Product , Order

```text

MakerConstant
    ↓
BaseConstant
    ↓
Constant
    ↓
Model
    ↓
Service
    ↓
Migration
    ↓
Seeder
    ↓
Factory
    ↓
Test
```

## TEST

ทน autoload ให้ App\Constant
make sure composer.json has this

## composer.json

## autoload

```json
    "autoload": {
        "classmap": [
            "app/Constant/"
        ],
        "psr-4": {
            "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\": "tests/"
        }
    },
```

### composer dump-autoload (แบบปกติ)

```bash
composer dump-autoload
```

การทำงาน: Composer จะสร้างไฟล์ Mapping (แผนที่) ให้ว่าคลาสไหนอยู่ที่ไฟล์ไหน โดยเก็บเป็นแบบ Dynamic (ใช้การ Scan ไฟล์เวลาเรียกใช้จริง)

เหมาะสำหรับ: ช่วงระหว่างที่คุณกำลังพัฒนาโค้ด (Development) เพราะถ้าคุณเพิ่มไฟล์ใหม่หรือเปลี่ยนชื่อคลาส มันจะอัปเดตให้คุณได้เร็ว

### composer dump-autoload -o (organize)

```bash
composer dump-autoload -o
```

การทำงาน: นอกจากจะทำแผนที่แล้ว มันจะทำการ แปลง PSR-0/PSR-4 ทั้งหมดให้กลายเป็น "Class Map" (การลิสต์คู่คลาสกับไฟล์แบบตายตัว)

ผลลัพธ์: ทำให้ Autoloader ไม่ต้องเสียเวลาไปไล่เช็คในระบบไฟล์ (File System) ว่าคลาสอยู่ที่ไหน แต่มันจะ "พุ่งไปที่ไฟล์นั้นทันที" เหมือนการเปิดสารบัญที่ระบุเลขหน้าไว้เป๊ะๆD

เหมาะสำหรับ: Production หรือตอนที่คุณต้องการความเร็วสูงสุด

```bash
php app/Constant/Bot/MakerTest.php

php artisan tinker
\App\Constant\UserConstant::fields();
\App\Constant\ShopConstant::fields();
\App\Constant\ProductConstant::fields();
\App\Constant\OrderConstant::fields();
```

## Make User Migration

```bash
php app/Constant/0_MakerTest.php

php artisan migrate:fresh

php artisan migrate:fresh --path=/database/migrations/0001_01_01_000000_create_users_table.php

php artisan migrate:rollback --path=/database/migrations/0001_01_01_000000_create_users_table.php
```

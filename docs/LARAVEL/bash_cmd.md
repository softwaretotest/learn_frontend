# Bash CMD

### .env has new variable but still 404 Not Found

```bash
php artisan config:clear
php artisan route:clear
php artisan cache:clear
```

### ใน config/app.php

#### ใน Laravel การใช้ env() ในไฟล์ Route ไม่แนะนำให้ใช้ใน Production เพราะมันจะคืนค่าเป็น null เสมอ (ถ้ามีการรัน php artisan config:cache)

```php
'm_data_endpoint' => env('APP_M_DATA', '/m-value'),
```

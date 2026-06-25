# Phase 2: M-UI

## niki/php-parser

```bash
composer require nikic/php-parser

php -r "require 'App/Constant/1_MSync.php'; App\Constant\MSync::syncEntities();"

php App/Constant/1_M_Sync.php

php App/Constant/1_Constant_M_APP_to_JSON.php

php App/Constant/1_Entities_to_JSON.php

//when error Target class [App\Http\Middleware\HandleInertiaRequestd] does not exist.

php artisan optimize:clear

php artisan route:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear

npm install --legacy-peer-deps
```

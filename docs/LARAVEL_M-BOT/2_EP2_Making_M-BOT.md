# Phase 2: M-UI

## niki/php-parser

## composer

```bash
everytime when you generate new class php in same folder app/Contant and same namespace App/Constant
you must run

composer dump-autoload
```

```bash
composer require nikic/php-parser

php -r "require 'App/Constant/1_MSync.php'; App\Constant\MSync::syncEntities();"

php App/Constant/1_M_Sync.php

php App/Constant/2_M_Sync_JSON.php

php App/Constant/1_Constant_M_APP_to_JSON.php

php App/Constant/1_Entities_to_JSON.php

php App/Constant/3_EntityGenerator.php

# TEST EntityController = calls dto , model
php artisan tinker --execute="echo (new \App\Services\TestService())->runProductTest()['message'];"

php artisan optimize:clear

php artisan route:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# tells npm to ignore peer dependency conflicts and proceed with the installation anyway
npm install --legacy-peer-deps
```

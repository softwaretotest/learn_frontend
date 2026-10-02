# tinker example
```php
php artisan tinker
$target_Controller = app(\App\Http\Controllers\TargetController::class);
$scan_Method = new ReflectionMethod($target_Controller, 'scan_Laravel_Projects');
print_r($scan_Method->invoke($target_Controller, 'C:/Users/o/.vscode/react'));
```

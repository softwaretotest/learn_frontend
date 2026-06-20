# check version

## ตรวจสอบเวอร์ชันระบบ Laravel / PHP / Composer

## PHP Version

```bash
php --version
```

หรือ

```bash
php -v
```

---

## Composer Version

```bash
composer --version
```

---

## Laravel Version

รันภายในโฟลเดอร์โปรเจกต์ Laravel:

```bash
php artisan --version
```

---

## Laravel Framework Package

```bash
composer show laravel/framework
```

---

## แสดงข้อมูล Environment ทั้งหมด

```bash
php artisan about
```

ข้อมูลสำคัญที่จะแสดง:

- Laravel Version
- PHP Version
- Environment
- Database Driver
- Cache Driver
- Queue Driver
- Session Driver
- Debug Mode

---

## แสดง Package ทั้งหมดในโปรเจกต์

```bash
composer show
```

---

## ตรวจสอบ Extension ของ PHP

```bash
php -m
```

---

## ตรวจสอบตำแหน่งไฟล์ php.ini

```bash
php --ini
```

---

## ตรวจสอบ Composer Dependencies

```bash
composer diagnose
```

---

## บันทึกผลลัพธ์ลงไฟล์ Markdown (Optional)

PowerShell:

```powershell
php artisan about > version.md
composer show >> version.md
php -m >> version.md
```

# Check All Versions (PHP / Composer / Laravel)

> รันภายในโฟลเดอร์โปรเจกต์ Laravel

```bash
echo "===== PHP VERSION ====="
php -v

echo ""
echo "===== PHP INI ====="
php --ini

echo ""
echo "===== PHP EXTENSIONS ====="
php -m

echo ""
echo "===== COMPOSER VERSION ====="
composer --version

echo ""
echo "===== COMPOSER DIAGNOSE ====="
composer diagnose

echo ""
echo "===== LARAVEL VERSION ====="
php artisan --version

echo ""
echo "===== LARAVEL ABOUT ====="
php artisan about

echo ""
echo "===== LARAVEL FRAMEWORK ====="
composer show laravel/framework

echo ""
echo "===== ALL PACKAGES ====="
composer show
```

## Optional: Save output to file

PowerShell:

````powershell
$output = "version.md"

# Create file if not exist
if (-not (Test-Path $output)) {
    New-Item -ItemType File -Path $output | Out-Null
}

# Overwrite file
@"
# Version Information

Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

"@ | Out-File $output -Encoding utf8

function Append-Section($title, $command) {
    Add-Content $output "`n---`n"
    Add-Content $output "## $title`n"
    Add-Content $output "```"

    try {
        $result = Invoke-Expression $command 2>&1
        Add-Content $output $result
    }
    catch {
        Add-Content $output "ERROR: $_"
    }

    Add-Content $output "```"
}

Append-Section "Operating System" `
    'systeminfo | findstr /B /C:"OS Name" /C:"OS Version"'

Append-Section "Git Version" `
    'git --version'

Append-Section "PHP Version" `
    'php -v'

Append-Section "PHP INI" `
    'php --ini'

Append-Section "PHP Extensions" `
    'php -m'

Append-Section "Composer Version" `
    'composer --version'

Append-Section "Composer Diagnose" `
    'composer diagnose'

Append-Section "Laravel Version" `
    'php artisan --version'

Append-Section "Laravel About" `
    'php artisan about'

Append-Section "Laravel Framework" `
    'composer show laravel/framework'

Append-Section "Node Version" `
    'node -v'

Append-Section "NPM Version" `
    'npm -v'

Append-Section "Vite Version" `
    'npm list vite'

Append-Section "PostgreSQL Version" `
    'psql --version'

Append-Section "MySQL Version" `
    'mysql --version'

Append-Section "All Composer Packages" `
    'composer show'

Write-Host "Generated: $output"
````

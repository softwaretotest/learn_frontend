# Git Commands

## ⭐ ปัญหา Git

### warning: in the working copy of 'old/README.md', LF will be replaced by CRLF the next time Git touches it

```bash
git config --global core.autocrlf false

```

---

## 📌 Git Workflow ที่ใช้ทุกวัน

### ดูสถานะไฟล์

```bash
git status
```

---

### เพิ่มไฟล์ทั้งหมดเข้า Staging

```bash
git add .
```

---

### Commit

```bash
git commit -m "update feature"
```

---

### Push

```bash
git push
```

---

## 🚀 Initial Project Setup

### สร้าง Git Repository

```bash
git init
```

---

### เปลี่ยน Branch เป็น main

```bash
git branch -M main
```

---

### Commit แรก

```bash
git add .
git commit -m "initial commit"
```

---

## ☁️ GitHub Remote

### เพิ่ม Remote

```bash
git remote add origin https://github.com/username/repository.git
```

---

### ตรวจสอบ Remote

```bash
git remote -v
```

---

### Push ครั้งแรก

```bash
git push -u origin main
```

---

## 🌿 Branch

### ดู Branch

```bash
git branch
```

---

### สร้าง Branch ใหม่

```bash
git checkout -b feature-name
```

---

### สลับ Branch

```bash
git checkout main
```

หรือ

```bash
git switch main
```

---

### ลบ Branch

```bash
git branch -d feature-name
```

---

## 🔄 Pull

### ดึงโค้ดล่าสุด

```bash
git pull
```

---

### ดึงพร้อม Rebase

```bash
git pull --rebase
```

---

## 📜 History

### ดู Commit History

```bash
git log
```

---

### ดูแบบสั้น

```bash
git log --oneline
```

---

### ดู Graph

```bash
git log --oneline --graph --all
```

---

## ⚠️ Undo

### เอาไฟล์ออกจาก Staging

```bash
git restore --staged filename
```

---

### ยกเลิกการแก้ไขไฟล์

```bash
git restore filename
```

---

### Reset กลับ Commit ก่อนหน้า

```bash
git reset --hard HEAD~1
```

---

## 🔥 Detached HEAD

### ดูสถานะ

```bash
git status
```

จะเห็นข้อความลักษณะ:

```text
HEAD detached at xxxxxxx
```

---

### กลับไป Branch หลัก

```bash
git checkout main
```

หรือ

```bash
git switch main
```

---

### ถ้ามีงานที่ยังไม่อยากหาย

สร้าง Branch ก่อน

```bash
git checkout -b rescue-branch
```

จากนั้น

```bash
git switch main
```

---

## 🧹 Cleanup

### ลบไฟล์ Untracked

```bash
git clean -fd
```

---

### ลบไฟล์ Ignore ด้วย

```bash
git clean -fdx
```

---

## 📦 Clone

### Clone Repository

```bash
git clone https://github.com/user/repository.git
```

---

## ⭐ Commands ที่ใช้บ่อยที่สุด

```bash
git status

git add .

git commit -m "message"

git push

git pull

git log --oneline

git branch

git checkout main

git switch main

git checkout -b feature-name

git restore .

git restore --staged .

git clean -fd

```

## see old commits

```bash
$ git switch --detach dc29bcd2f0b9b422ed90b5f2f13d8955075ba747

//leave old commit with out saving
git reset --hard && git switch main
```

## PROBLEM git add .

warning: in the working copy of 'ProjectSourceCode.txt', CRLF will be replaced by LF the next time Git touches it
warning: in the working copy of 'resources/js/Hooks/use_M_Option.js', CRLF will be replaced by LF the next time Git touches it

```bash
git config --global core.autoctrf true
```

## Gemini said

```text
git config --global core.autocrlf true
(หมายเหตุ: ที่คุณพิมพ์ไปก่อนหน้าอาจจะพิมพ์ผิดเป็น core.ctrf ซึ่งไม่ใช่คำสั่งที่ถูกต้องครับ)

คำอธิบายสั้นๆ (ตามมาตรฐานที่เราคุยกัน):
core.autocrlf true: ให้ Git จัดการแปลง Line Ending ให้โดยอัตโนมัติเมื่อมีการ commit หรือ checkout (Windows จะใช้ CRLF, Git เก็บเป็น LF) ซึ่งเป็นค่ามาตรฐานที่แนะนำสำหรับคนที่ใช้ Windows ครับ

หลังจากรันคำสั่งนี้แล้ว ครั้งต่อไปที่คุณ git add หรือ commit ระบบจะไม่ขึ้น Warning รบกวนใจอีกครับ

ตอนนี้ถ้าคุณพร้อมที่จะลุย M_Store ต่อเพื่อทำตามแผนงานที่เราวางไว้ บอกผมได้เลยนะครับ ผมรอรับใช้ครับ!

ผมต้องขออภัยอย่างสูงครับ ผมเข้าใจแล้วว่าทำไมคุณถึงยังเห็น Warning อยู่ ทั้งที่คุณตั้งค่า core.autocrlf true ไปแล้ว

สาเหตุที่แท้จริงคือ "ไฟล์ที่คุณมีอยู่ในเครื่องตอนนี้ มันเป็น CRLF ไปแล้ว" คำสั่ง git config ที่ตั้งไว้มันจะทำงานกับไฟล์ที่ "กำลังจะเพิ่มเข้ามาใหม่" หรือไฟล์ที่ "มีการแก้ไขใหม่" เท่านั้น แต่ไฟล์เดิมที่อยู่ใน Working Directory มันยังคงเป็น CRLF อยู่ Git เลยเตือนคุณทุกครั้งที่มันเห็นว่าไฟล์เหล่านี้ยังไม่เปลี่ยนเป็น LF ตามมาตรฐานที่ Git ต้องการ

วิธีแก้ให้จบสิ้น (สำหรับไฟล์ที่มีอยู่แล้ว):

คุณไม่ต้องไปแก้ config แล้วครับ ให้รันคำสั่งเหล่านี้เพื่อสั่งให้ Git "รีเซ็ต" การจัดการ Line Ending ของไฟล์ที่มีอยู่ในโปรเจกต์ทั้งหมดให้เป็น LF ตามมาตรฐานครับ:

ลบไฟล์ออกจาก Index ของ Git (ไม่ได้ลบไฟล์งานจริง แค่ให้ Git ลืมสถานะเก่า):

Bash
git rm --cached -r .
สั่งให้ Git ตรวจสอบและเปลี่ยน Line Ending ใหม่ทั้งหมด:

Bash
git reset --hard
หลังจากทำ 2 คำสั่งนี้แล้ว Git จะปรับสถานะทุกไฟล์ในโฟลเดอร์ให้เป็น LF ตามที่ตั้งค่า autocrlf true ไว้ และหลังจากนี้ Warning จะหายไปถาวรครับ

ผมขออภัยที่ไม่ได้แจ้งขั้นตอนการ "รีเซ็ตสถานะไฟล์เดิม" ให้คุณทราบตั้งแต่แรก ทำให้คุณเสียเวลาไปกับ Warning นี้ครับ หากคุณพร้อมจะลุยงาน M_Store ต่อ ผมยืนยันว่าจะรักษามาตรฐาน JSDoc และความกระชับของโค้ดให้ดีที่สุดครับ
```

```bash
o@o MINGW64 ~/.vscode/react/ecommerce (main)
$ git rm --cached -r .
rm '.editorconfig'
rm '.env.example'
rm '.gitattributes'
rm '.gitignore'
rm '.npmrc'
rm 'Dockerfile'
rm 'M-Data.json'
rm 'ProjectSourceCode.txt'
rm 'README.md'
rm 'app/Constant/0_CheckDuplicate.php'
rm 'app/Constant/0_Constant_APP.php'
rm 'app/Constant/0_Constant_M.php'
rm 'app/Constant/0_DBOption.php'
rm 'app/Constant/0_MakeMigration.php'
rm 'app/Constant/0_MakeSchema.php'
rm 'app/Constant/0_Maker.php'
rm 'app/Constant/0_MigrationFile.php'
rm 'app/Constant/0_Runner.php'
rm 'app/Constant/0_SpecialField.php'
rm 'app/Constant/0_create_entity_table.php'
rm 'app/Constant/0_create_users_table.php'
rm 'app/Constant/1_App-Data.json'
rm 'app/Constant/1_Constant_M_APP_to_JSON.php'
rm 'app/Constant/1_Entities.json'
rm 'app/Constant/1_Entities_to_JSON.php'
rm 'app/Constant/1_M-Data.json'
rm 'app/Constant/1_M_Sync.php'
rm 'app/Constant/OrderConstant.php'
rm 'app/Constant/ProductConstant.php'
rm 'app/Constant/ShopConstant.php'
rm 'app/Constant/UserConstant.php'
rm 'app/Constant/tests/0_TestClass.php'
rm 'app/Constant/tests/0_TestEntityConstant.php'
rm 'app/Constant/tests/BaseConstant.php'
rm 'app/Constant/tests/test.json'
rm 'app/DTOs/ProductDTO.php'
rm 'app/Http/Controllers/Api/ProductApiController.php'
rm 'app/Http/Controllers/Controller.php'
rm 'app/Http/Controllers/M_Controller.php'
rm 'app/Http/Controllers/ProfileController.php'
rm 'app/Http/Middleware/HandleInertiaRequests.php'
rm 'app/Http/Requests/Auth/LoginRequest.php'
rm 'app/Http/Requests/ProfileUpdateRequest.php'
rm 'app/Models/BaseModel.php'
rm 'app/Models/Order.php'
rm 'app/Models/Product.php'
rm 'app/Models/User.php'
rm 'app/Providers/AppServiceProvider.php'
rm 'app/Services/BaseService.php'
rm 'app/Services/ProductService.php'
rm 'app/Services/api.js'
rm 'artisan'
rm 'bootstrap/app.php'
rm 'bootstrap/cache/.gitignore'
rm 'bootstrap/providers.php'
rm 'components.json'
rm 'composer.json'
rm 'composer.lock'
rm 'config/app.php'
rm 'config/auth.php'
rm 'config/cache.php'
rm 'config/database.php'
rm 'config/filesystems.php'
rm 'config/logging.php'
rm 'config/mail.php'
rm 'config/queue.php'
rm 'config/sanctum.php'
rm 'config/services.php'
rm 'config/session.php'
rm 'database/.gitignore'
rm 'database/factories/ProductFactory.php'
rm 'database/factories/UserFactory.php'
rm 'database/migrations/0001_01_01_000000_create_users_table.php'
rm 'database/migrations/0001_01_01_000001_create_cache_table.php'
rm 'database/migrations/0001_01_01_000002_create_jobs_table.php'
rm 'database/migrations/2026_06_29_085357_01_create_shops_table.php'
rm 'database/migrations/2026_06_29_085357_02_create_products_table.php'
rm 'database/migrations/2026_06_29_085357_03_create_orders_table.php'
rm 'database/seeders/DatabaseSeeder.php'
rm 'database/seeders/OrderSeeder.php'
rm 'database/seeders/ProductSeeder.php'
rm 'database/seeders/UserSeeder.php'
rm 'package-lock.json'
rm 'package.json'
rm 'phpunit.xml'
rm 'public/.htaccess'
rm 'public/favicon.ico'
rm 'public/index.php'
rm 'public/robots.txt'
rm 'resources/css/0_M_UI.css'
rm 'resources/css/app.css'
rm 'resources/js/Components/0_M_CheckBox.jsx'
rm 'resources/js/Components/0_M_DB_Tablename.jsx'
rm 'resources/js/Components/0_M_Dropdown.jsx'
rm 'resources/js/Components/0_M_EntityField.jsx'
rm 'resources/js/Components/0_M_Field.jsx'
rm 'resources/js/Components/0_M_Focus_D_CD_States.js'
rm 'resources/js/Components/0_M_JSON_Content.jsx'
rm 'resources/js/Components/0_M_Rule_D_CD.jsx'
rm 'resources/js/Components/0_M_Rule_U_UI.jsx'
rm 'resources/js/Components/0_M_SpecialField.jsx'
rm 'resources/js/Components/0_M_SubTab.jsx'
rm 'resources/js/Components/0_M_TabContent.jsx'
rm 'resources/js/Components/LR_default_compo/ApplicationLogo.jsx'
rm 'resources/js/Components/LR_default_compo/Checkbox.jsx'
rm 'resources/js/Components/LR_default_compo/DangerButton.jsx'
rm 'resources/js/Components/LR_default_compo/Dropdown.jsx'
rm 'resources/js/Components/LR_default_compo/InputError.jsx'
rm 'resources/js/Components/LR_default_compo/InputLabel.jsx'
rm 'resources/js/Components/LR_default_compo/Modal.jsx'
rm 'resources/js/Components/LR_default_compo/NavLink.jsx'
rm 'resources/js/Components/LR_default_compo/PrimaryButton.jsx'
rm 'resources/js/Components/LR_default_compo/ResponsiveNavLink.jsx'
rm 'resources/js/Components/LR_default_compo/SecondaryButton.jsx'
rm 'resources/js/Components/LR_default_compo/TextInput.jsx'
rm 'resources/js/Components/temp.jsx'
rm 'resources/js/Hooks/useScrollIntoView.js'
rm 'resources/js/Hooks/use_M_Option.js'
rm 'resources/js/Layouts/AuthenticatedLayout.jsx'
rm 'resources/js/Layouts/GuestLayout.jsx'
rm 'resources/js/Pages/0_M_Dashboard.jsx'
rm 'resources/js/Pages/Profile/Edit.jsx'
rm 'resources/js/Pages/Profile/Partials/DeleteUserForm.jsx'
rm 'resources/js/Pages/Profile/Partials/UpdatePasswordForm.jsx'
rm 'resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.jsx'
rm 'resources/js/Providers/0_M_DataProvider.jsx'
rm 'resources/js/Stores/0_M_Store copy.jsx'
rm 'resources/js/Stores/0_M_Store.jsx'
rm 'resources/js/app.jsx'
rm 'resources/js/bootstrap.js'
rm 'resources/js/lib/utils.js'
rm 'resources/views/app.blade.php'
rm 'routes/api.php'
rm 'routes/auth.php'
rm 'routes/console.php'
rm 'routes/web.php'
rm 'storage/app/.gitignore'
rm 'storage/app/private/.gitignore'
rm 'storage/app/public/.gitignore'
rm 'storage/framework/.gitignore'
rm 'storage/framework/cache/.gitignore'
rm 'storage/framework/cache/data/.gitignore'
rm 'storage/framework/sessions/.gitignore'
rm 'storage/framework/testing/.gitignore'
rm 'storage/framework/views/.gitignore'
rm 'storage/logs/.gitignore'
rm 'storage/scripts/check-version.ps1'
rm 'storage/scripts/file-output.ps1'
rm 'tailwind.config.js'
rm 'tests/.php-cs-fixer.dist.php'
rm 'tests/Feature/Auth/AuthenticationTest.php'
rm 'tests/Feature/Auth/EmailVerificationTest.php'
rm 'tests/Feature/Auth/PasswordConfirmationTest.php'
rm 'tests/Feature/Auth/PasswordResetTest.php'
rm 'tests/Feature/Auth/PasswordUpdateTest.php'
rm 'tests/Feature/Auth/RegistrationTest.php'
rm 'tests/Feature/DatabasePerformanceTest.php'
rm 'tests/Feature/ExampleTest.php'
rm 'tests/Feature/ProfileTest.php'
rm 'tests/Feature/Services/ProductServiceTest.php'
rm 'tests/TestCase.php'
rm 'tests/Unit/ExampleTest.php'
rm 'version.md'
rm 'vite.config.js'
rm 'vscode-extensions.txt'

o@o MINGW64 ~/.vscode/react/ecommerce (main)
$ git reset --hard
HEAD is now at 9cd6c17 read only focus field in M_States
```

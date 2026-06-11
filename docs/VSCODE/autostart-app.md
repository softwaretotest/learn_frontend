# auto start app

## 📌 การเปิดโปรเจกต์

แต่ละโปรเจกต์ต้องเปิดแยกกัน:

- `learn_backend` → Laravel API
- `learn_frontend` → React

ให้เปิดเป็น **root folder ของแต่ละโปรเจกต์** เท่านั้น

---

## LARAVEL

### 📌 ความหมายของ CWD

`cwd` (Current Working Directory) คือโฟลเดอร์ที่คำสั่งจะถูกรันอยู่

ตัวอย่าง:

```json
"cwd": "${workspaceFolder}"
```

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Laravel Serve",
            "type": "shell",
            "command": "php artisan serve",
            "isBackground": true,
            "options": {
                "cwd": "${workspaceFolder}"
            }
        }
    ]
}
```

---

# AUTO RUN MONOLITH

---

# ⚙️ Step 1.4: Auto-Run Servers on VS Code Startup

Configure VS Code Tasks to automatically run both `npm run dev` and `php artisan serve` as soon as you open the `ecommerce` folder.

---

## 🛠️ Configuration Steps

1. Inside your `ecommerce` project root, create a new folder named **`.vscode`** (if it doesn't exist).
2. Inside the `.vscode` folder, create a new file named **`tasks.json`**.
3. Copy and paste the exact JSON configuration below into your `tasks.json` file:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Start Laravel Server",
            "type": "shell",
            "command": "php artisan serve",
            "isBackground": true,
            "problemMatcher": [],
            "runOptions": {
                "runOn": "folderOpen"
            }
        },
        {
            "label": "Start Vite Server",
            "type": "shell",
            "command": "npm run dev",
            "isBackground": true,
            "problemMatcher": [],
            "runOptions": {
                "runOn": "folderOpen"
            }
        }
    ]
}
```

---

## 🎯 How to Activate and Test

1. Save the `tasks.json` file.
2. Close VS Code completely, then **Re-open your `ecommerce` folder** again.
3. VS Code will pop up a notification asking for permission to run tasks on folder open. Click **"Allow and Run"** (or **"Manage Automatic Tasks" -> "Allow Automatic Tasks in this Workspace"**).
4. Look at your Terminal panel; you will see both servers running cleanly in the background automatically!

```json

        {
            "label": "Laravel Serve",
            "type": "shell",
            "command": "php artisan serve",
            "isBackground": true,
            "runOptions": {
                "runOn": "folderOpen"
            },
            "options": {
                "cwd": "${workspaceFolder}"
            }
        },
```

หน้าที่ของมันคือการบังคับเส้นทาง (Current Working Directory):"cwd": "${workspaceFolder}" แปลว่า: บังคับให้ VS Code รันคำสั่งนี้ที่ โฟลเดอร์นอกสุด (Root) ของโปรเจกต์เสมอ [1]ทำไมถึงไม่จำเป็น? เพราะโดยปกติแล้วเมื่อเราเปิดโฟลเดอร์ใน VS Code ตัว Terminal จะเริ่มต้นทำงานที่โฟลเดอร์นอกสุด (${workspaceFolder}) เป็นค่าเริ่มต้นอยู่แล้วครับ [1]

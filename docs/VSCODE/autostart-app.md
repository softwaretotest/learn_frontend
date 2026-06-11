# VS Code + Laravel (Backend Setup)

## 📌 การเปิดโปรเจกต์

แต่ละโปรเจกต์ต้องเปิดแยกกัน:

- `learn_backend` → Laravel API
- `learn_frontend` → React

ให้เปิดเป็น **root folder ของแต่ละโปรเจกต์** เท่านั้น

---

## 📌 ความหมายของ CWD

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

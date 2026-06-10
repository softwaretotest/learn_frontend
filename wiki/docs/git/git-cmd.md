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

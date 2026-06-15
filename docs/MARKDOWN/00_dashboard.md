# Dashboard Convention

## Overview

Dashboard ของโปรเจกต์นี้ถูกสร้างแบบ Generic จากโครงสร้างใน `docs/`

```text
docs/*
    ↓
generate-dashboard.mjs
    ↓
dashboard.json
    ↓
Dashboard UI
```

Dashboard จะไม่อ่าน `docs/` แบบ Real-time แต่จะอ่านจาก:

```text
src/data/dashboard.json
```

ซึ่งถูกสร้างจาก script:

```bash
npm run dashboard
```

---

# Folder Convention

## Parent Folder

อนุญาตให้ใช้ตัวเลขนำหน้าเพื่อจัดลำดับ

ตัวอย่าง:

```text
0_IDEA_WEB
10_LARAVEL
20_RENDER
30_SUPABASE
```

Dashboard และ URL จะตัดเลขนำหน้าออกอัตโนมัติ

ตัวอย่าง:

```text
0_IDEA_WEB
↓
IDEA_WEB
↓
/docs/IDEA_WEB/...
```

กฎ:

- ใช้เลข 1–2 หลัก
- ตามด้วย `_`
- Dashboard ซ่อน prefix อัตโนมัติ
- Docusaurus ใช้ชื่อหลัง prefix เป็น slug

---

## Child Folder

Child Folder ต้องมี `_category_.json` เสมอ

ตัวอย่าง:

```text
Fontsizer/
├── _category_.json
├── fontsizer.mdx
└── fontsizerUI.mdx
```

ไฟล์ `_category_.json` เป็น Magic Filename ของ Docusaurus

ห้ามเปลี่ยนชื่อเป็น:

```text
_fontsizer_.json ❌
_folder_.json ❌
```

ต้องใช้:

```text
_category_.json ✅
```

---

## _category_.json Convention

แนะนำให้กำหนด slug เองเสมอ

ตัวอย่าง:

```json
{
    "label": "Font Sizer Tool",
    "link": {
        "type": "generated-index",
        "slug": "/font-sizer-tool"
    }
}
```

ผลลัพธ์:

```text
/docs/font-sizer-tool
```

หากไม่กำหนด slug:

```json
{
    "label": "Font Sizer Tool",
    "link": {
        "type": "generated-index"
    }
}
```

Docusaurus จะสร้างอัตโนมัติ:

```text
/docs/category/font-sizer-tool
```

---

# Supported Structure

รองรับเพียง 2 ระดับเท่านั้น

```text
Parent Folder
    ├── md file
    ├── md file
    └── Child Folder
            ├── md file
            ├── md file
            └── _category_.json
```

ไม่รองรับ:

```text
Folder
    └── Child
            └── Grandchild ❌
```

---

# Dashboard Update

หลังจากเพิ่ม:

- Folder
- md/mdx
- _category_.json
- slug
- เปลี่ยนชื่อ Folder

ต้องรัน:

```bash
npm run dashboard
```

หากลืมรัน อาจพบปัญหา:

- Dashboard ไม่อัปเดต
- ปุ่มกดไม่ได้
- Page Not Found
- Child Folder ไม่แสดง

---

# Recommended Workflow

```bash
แก้ docs
    ↓
npm run dashboard
    ↓
ตรวจสอบ Dashboard
    ↓
Commit
    ↓
Push
    ↓
Deploy
```

Workflow นี้สอดคล้องกับ Render + Docusaurus + Generic Dashboard Architecture ของโปรเจกต์นี้

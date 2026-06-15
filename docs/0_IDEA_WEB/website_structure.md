# WEB struct

## Docusaurus Layout Analysis

## Overview

จากการวิเคราะห์ HTML ของ Docusaurus พบว่าโครงสร้าง Layout มีความ mature และเป็นมาตรฐานของเว็บเอกสารสมัยใหม่ เหมาะสำหรับนำมาเป็นต้นแบบในการสร้าง React Wiki หรือ Markdown Project

---

## Responsive Behavior

ระบบ Responsive ของ Docusaurus มีแนวคิดคล้ายกับ ChatGPT

### Desktop

- Navbar แสดงด้านบน
- Sidebar ซ้ายแสดงตลอด
- TOC (Table of Contents) แสดงด้านขวา

```text
┌──────────────────────────────┐
│ Navbar                       │
├──────────────────────────────┤
│ Sidebar │ Content │ TOC      │
│         │         │          │
│         │         │          │
├──────────────────────────────┤
│ Footer                       │
└──────────────────────────────┘
```

### Tablet

```text
Sidebar | Content
```

- TOC อาจถูกซ่อนหรือย้ายตำแหน่ง (Table of Contents หรือภาษาไทยคือ สารบัญของหน้าเว็บ)

### Mobile

```text
Content Only
☰ Open Sidebar
```

- Sidebar ถูก collapse อัตโนมัติ
- เปิดด้วย Hamburger Menu (☰)

---

## Main HTML Structure

```html
<body>
    <nav class="navbar">
        <!-- Logo -->
        <!-- Menu -->
        <!-- Search -->
        <!-- Dark Mode -->
        <!-- Mobile Toggle -->
    </nav>

    <div class="main-wrapper">
        <aside class="sidebar">
            <!-- Navigation Tree -->
            <!-- Categories -->
        </aside>

        <main class="content">
            <article class="markdown">
                <!-- Breadcrumb -->
                <!-- Title -->
                <!-- Markdown Body -->
                <!-- Code Blocks -->
                <!-- Prev / Next -->
            </article>

            <aside class="toc">
                <!-- Table of Contents -->
            </aside>
        </main>
    </div>

    <footer>
        <!-- Footer -->
    </footer>
</body>
```

---

## Recommended Component Structure

สำหรับ React Project ควรแยก Component ดังนี้

```text
Layout
├── Navbar
├── Sidebar
├── MarkdownBody
├── TableOfContents
└── Footer
```

---

## Key Design Principles

### 1. Navbar แยกจาก Content

Navbar ควร Fixed ด้านบนและไม่ขึ้นกับเนื้อหา

### 2. Sidebar เป็น Component อิสระ

- Collapse ได้
- Responsive ได้
- Reusable

### 3. Markdown Body แยกจาก Layout

Markdown ควรเป็น Pure Content

### 4. TOC แยกออกมา

สร้างจาก Heading (`h1`, `h2`, `h3`) อัตโนมัติ

### 5. Responsive First

- Desktop → Full Layout
- Tablet → Hide TOC
- Mobile → Collapse Sidebar

---

## Architecture Summary

Docusaurus ใช้โครงสร้างแบบ

```text
Navbar
    ↓
Main Wrapper
    ├── Sidebar
    ├── Markdown Content
    └── TOC
    ↓
Footer
```

ซึ่งเป็นสถาปัตยกรรมที่ Maintain ง่าย ขยายระบบได้ดี และเหมาะสำหรับ React Wiki หรือ Documentation Project ในระยะยาว

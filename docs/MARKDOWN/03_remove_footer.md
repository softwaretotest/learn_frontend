# w3school full screen

## การปรับแต่ง Docusaurus ให้แผ่กว้างเต็มหน้าจอ (Full Width) และตัดส่วนเกินออก

คู่มือสรุปขั้นตอนการล้างขีดจำกัดความกว้างของหน้าเอกสาร ปลดล็อกพื้นที่จอใหญ่ และนำ Footer / Pagination ออกเพื่อทำหน้าบทเรียนแบบ Interactive 3 คอลัมน์

---

## Step 1: แตกไฟล์ Layout หลักออกจาก Core (Swizzle)

รันคำสั่งใน Terminal เพื่อดึงคอมโพเนนต์ที่ควบคุมหน้าเอกสารออกมาแก้ไขที่โปรเจกต์หลัก:

```bash
npx docusaurus swizzle @docusaurus/theme-classic DocItem/Layout --eject
```

_ระบบจะสร้างโฟลเดอร์และไฟล์ใหม่ขึ้นมาที่: `src/theme/DocItem/Layout/`_

---

## Step 2: แก้ไขโครงสร้างเพื่อเอา Footer และ Pagination ออก

เปิดไฟล์ `src/theme/DocItem/Layout/index.js` เลื่อนไปด้านล่างสุด แล้วทำการลบหรือคอมเมนต์ปิดแท็กนำทางออก:

```jsx
// src/theme/DocItem/Layout/index.js

return (
    <div className="row">
        <div className={clsx("col", !hidden && styles.docItemCol)}>
            <DocVersionBanner />
            <div className={styles.docItemContainer}>
                <article>
                    <DocBreadcrumbs />
                    <DocVersionBadge />
                    <Content />

                    {/* 1. เอา Footer ด้านล่างสุดของเอกสารออก */}
                    {/* <DocItemFooter /> */}
                </article>

                {/* 2. เอาปุ่มนำทาง Previous / Next ออก */}
                {/* <DocItemPaginator /> */}
            </div>
        </div>

        {!hidden && (
            <div className="col col--3">
                <DocItemTOCMobile />
                <DocItemTOCDesktop />
            </div>
        )}
    </div>
);
```

---

## Step 3: ปลดล็อกความกว้างสูงสุดและซ่อนแผง Footer หลัก ทั้งเว็บ

เปิดไฟล์สไตล์คู่แฝดของ Layout คือ `src/theme/DocItem/Layout/styles.module.css` แล้วแก้ไขสไตล์เพื่อระเบิดความกว้างให้เต็ม 100% พร้อมสั่งซ่อน Footer ดำตัวใหญ่ด้านล่าง:

```css
/* src/theme/DocItem/Layout/styles.module.css */

.docItemContainer {
    max-width: 100% !important; /* ทลายขีดจำกัดความกว้างเดิม (825px/990px) */
    width: 100% !important;
    margin: 0 auto;
}

.col {
    max-width: 100% !important;
    width: 100% !important;
}

/* บังคับซ่อนแผง Footer ล่างสุดของระบบทั้งหมดเจาะจงเฉพาะเลเยอร์นี้ */
:global(.footer) {
    display: none !important;
}
```

---

## Step 4: แนะนำการปรับขนาด CSSEditor ให้สมดุล

เพื่อให้คอมโพเนนต์กล่องพิมพ์โค้ดยืดลงไปจนสุดขอบล่างของหน้าจอเบราว์เซอร์อัตโนมัติ ให้กำหนดความสูงที่ตัวแปร `style` ของ Component หลักในรูปแบบของ `vh` (Viewport Height):

```javascript
// src/components/CSSEditor/index.js

return (
    <div
        style={{
            display: "flex",
            border: "2px solid #444",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#2d2d2d",

            width: "100%" /* ขยายกว้างขนานไปกับ Sidebar ปกติ */,
            height: "75vh" /* ยืดตัวยาวลงล่าง 75% ของความสูงหน้าจอ */,

            marginTop: "10px",
            marginBottom: "10px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
    >
        {/* ... ชิ้นส่วนภายใน 3 คอลัมน์ ... */}
    </div>
);
```

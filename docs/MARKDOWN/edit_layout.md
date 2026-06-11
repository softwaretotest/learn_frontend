# edit Docusaurus

## 🛠️ คู่มือการตกแต่งและจัดการระบบ Layout ใน Docusaurus (2 วิธีหลัก)

สรุปขั้นตอน คำสั่ง และจุดแก้ไขไฟล์ (File Path) สำหรับการปรับแต่งหน้าตา (Theme) และปลดล็อกข้อจำกัดความกว้างหน้าจอเพื่อทำโปรเจกต์แบบ Interactive

---

## 📌 วิธีที่ 1: ตกแต่งระดับรากเหง้า (Swizzle) - แก้โครงสร้างลึกๆ

ใช้สำหรับดึงโค้ดแกนหลักของ Docusaurus ออกมาสับเปลี่ยนชำแหละโครงสร้าง เช่น การระเบิดหน้าจอให้กว้าง 100% เต็มจอใหญ่ และการตัด Footer / ปุ่มนำทาง (Pagination) ออก

### 1. คำสั่งที่ต้องรันใน Terminal (ตามลำดับ)

- **คำสั่ง Eject โครงสร้าง Layout หลัก:**
    ```bash
    npx docusaurus swizzle @docusaurus/theme-classic DocItem/Layout --eject
    ```
    _(พิมพ์ตอบ `YES` เพื่อยืนยันระบบจะสร้างโฟลเดอร์ใหม่ขึ้นมาในโปรเจกต์ของคุณ)_
- **คำสั่งล้างแคชระบบ (สำคัญมาก):** หากแก้ไขโค้ดแล้วหน้าเว็บไม่เปลี่ยนตาม ให้ปิดรันเซิร์ฟเวอร์เก่าด้วย `Ctrl + C` แล้วรันคำสั่งนี้เพื่อเคลียร์แคชเก่าที่ Rspack/Webpack ค้างไว้
    ```bash
    npm run clear
    ```
- **คำสั่งเปิดรันเซิร์ฟเวอร์ใหม่อีกครั้ง:**
    ```bash
    npm run start
    ```

### 2. ไฟล์ที่ต้องแก้ไข & คีย์เวิร์ดสำคัญ

- **ไฟล์:** `src/theme/DocItem/Layout/index.js`
    - _จุดแก้ไข:_ ค้นหาและคอมเมนต์ปิด (หรือลบ) แท็ก `<DocItemFooter />` และ `<DocItemPaginator />` ช่วงท้ายไฟล์ เพื่อตัดแถบท้ายเว็บและปุ่มเลื่อนหน้า Previous / Next ออกไป
- **ไฟล์:** `src/theme/DocItem/Layout/styles.module.css`
    - _จุดแก้ไข:_ ค้นหาคลาส `.docItemContainer` แล้วแก้ไขเปลี่ยนความกว้างสูงสุดให้แผ่กว้างเต็มจอ และสั่งซ่อนบาร์ Footer หลัก:
    ```css
    .docItemContainer {
        max-width: 100% !important; /* ปลดล็อกขีดจำกัดความกว้างเดิม */
        width: 100% !important;
        margin: 0 auto;
    }
    /* วางต่อท้ายล่างสุดเพื่อซ่อนแผง Footer สีดำขนาดใหญ่ */
    :global(.footer) {
        display: none !important;
    }
    ```

---

## 📌 วิธีที่ 2: ตกแต่งระดับภายนอก (Global CSS) - แต่งสีและสไตล์ทั่วไป

ใช้สำหรับเปลี่ยนสีธีม, ปรับฟอนต์, ตกแต่งสีไฮไลท์ (Syntax Highlighting) ของช่องพิมพ์โค้ด หรือสไตล์ส่วนกลางที่ครอบคลุมเว็บไซต์โดยไม่ต้องยุ่งกับไฟล์ JavaScript หลัก

### 1. แพ็กเกจที่ต้องติดตั้งเพิ่ม (สำหรับกล่อง Editor ไฮไลท์สี)

- **คำสั่งติดตั้งแพ็กเกจเสริม:**
    ```bash
    npm install --save react-simple-code-editor prismjs @docusaurus/theme-live-codeblock
    ```

### 2. ไฟล์ที่ต้องแก้ไข & คีย์เวิร์ดสำคัญ

- **ไฟล์:** `src/css/custom.css`
    - _จุดแก้ไข:_ เพิ่มตัวแปรดีไซน์ Infima เข้าไปในบล็อกสูงสุดคือ `:root { ... }` เพื่อดักและบังคับให้โครงสร้างพื้นที่หน้าจอแผ่ขยายออกด้านข้างรับกับจอขนาดใหญ่
    ```css
    :root {
        --ifm-container-width-xl: 95% !important; /* เปลี่ยนขนาดคอนเทนเนอร์ให้กว้าง 95% ของจอ */
        --ifm-md-max-width: 100% !important; /* สั่งให้เนื้อหามาร์กดาวน์กว้างเต็มพิกัด */
    }
    ```
- **ไฟล์:** `docusaurus.config.js`
    - _จุดแก้ไข:_ เพิ่มปลั๊กอินในช่องธีมของโครงสร้างดีไซน์หลัก เพื่อเปิดระบบ Live Code Editor
    ```javascript
    const config = {
      themes: ['@docusaurus/theme-live-codeblock'],
      // ... โค้ดเดิม
    ```
- **ไฟล์:** `src/components/CSSEditor/index.js` _(ไฟล์คอมโพเนนต์ที่สร้างเอง)_
    - _จุดแก้ไข:_ เปลี่ยนหน้าตาชุดสีของตัวอักษรแท็ก HTML/CSS ให้สว่างเด่นชัดเจน สบายตาบนหน้าจอ Dark Mode โดยเลือกเปลี่ยนการเรียก Import สไตล์ดาร์ก เช่น:
    ```javascript
    import "prismjs/themes/prism-tomorrow.css"; /* ธีมสีมืดสไตล์พาสเทลคล้าย VS Code */
    // หรือใช้ 'prismjs/themes/prism-okaidia.css' สำหรับโทนสีสดฉูดฉาดแบบ Monokai
    ```

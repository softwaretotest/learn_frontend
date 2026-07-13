# 3_way_to_define_React_State.md

```text
เมื่อไหร่เราจะเขียนอย่างนี้
```

```javascript
const { set_M_value, activeField, setActiveField, setJSON_Content_State } =
    use_M_Store();
```

```text
หรืออย่างนี้
```

```javascript
const activeSubTab = use_M_Store.getState().activeSubTab;
```

```text
หรืออย่างนี้
```

```javascript
const M_value = use_M_Store((state) => state.M_value);
```

การเลือกใช้ 3 รูปแบบนี้ขึ้นอยู่กับ "จังหวะ" และ "ความต้องการ Re-render" ของ Component ครับ นี่คือสรุปสั้นๆ ให้จำง่าย:

1. const `text { ... }` = use_M_Store();
   สถานการณ์: ใช้ใน Component Body (เวลาเขียน JSX)

ผลลัพธ์: Component จะ Re-render ทุกครั้งที่ "ส่วนประกอบใดๆ" ใน Store เปลี่ยนแปลง

ข้อควรระวัง: วิธีนี้ไม่ค่อยดีนักถ้า Store ใหญ่ เพราะแค่ activeField เปลี่ยน ก็อาจทำให้ Component อื่นที่คุณไม่ได้ดึงมาใช้ต้อง Re-render ไปด้วย (เปลืองทรัพยากร)

2. const set_has_M_value_Change = use_M_Store((state) => state.set_has_M_value_Change);
   สถานการณ์: ใช้ใน Component Body เพื่อดึง "ค่าเฉพาะเจาะจง" หรือ "Action"

ผลลัพธ์: Component จะ Re-render เฉพาะตอนที่ค่าที่เลือก (Selector) เปลี่ยนแปลงเท่านั้น (ถ้าเป็น Action/ฟังก์ชัน ปกติมันจะไม่เปลี่ยนอยู่แล้ว จึงเป็นวิธีที่ Performance ดีที่สุด)

ข้อดี: นี่คือวิธีที่แนะนำเป็นมาตรฐานสำหรับการดึงข้อมูลใน Component ครับ

3. const activeSubTab = use_M_Store.getState().activeSubTab;
   สถานการณ์: ใช้ "นอก Component" (เช่น ใน useEffect, Event Handler, หรือ Service)

ผลลัพธ์: ไม่เกิดการ Re-render เพราะเป็นการ "อ่านค่า" ออกมาแบบครั้งเดียวในขณะที่ฟังก์ชันนั้นรัน

ข้อดี: ใช้ได้ทุกที่โดยไม่ผูกติดกับ React Lifecycle เหมาะสำหรับอ่านค่าไปคำนวณ หรืออ่านค่าก่อนบันทึกข้อมูล (ไม่แนะนำให้ใช้ใน JSX เพราะหน้าจอจะไม่เปลี่ยนตามค่าที่เปลี่ยนครับ)

สรุปสั้นๆ (กฎเหล็ก):
ถ้าจะแสดงผลใน JSX: ใช้แบบที่ 2 (Selector) เพื่อให้มัน Re-render เฉพาะจุด

ถ้าจะทำ Action (set ค่า): ใช้แบบที่ 2 (Selector) เพราะฟังก์ชันไม่เปลี่ยนค่า

ถ้าอยู่ในฟังก์ชันที่ไม่ใช่ React Component: ใช้ getState() (แบบที่ 3) เพื่อดึงค่าสดๆ มาใช้งานโดยไม่สนเรื่อง Render ครับ

## แบบที่ 2 เคยมีเคสที่มันบ่นแล้วต้องใช้แบบที่ 3

เข้าใจเลยครับ! เคสที่แบบที่ 2 (Selector) "บ่น" แล้วต้องหนีไปใช้แบบที่ 3 (getState) มักจะเกิดจาก 2 สถานการณ์นี้ครับ:

Infinite Loop in useEffect:

คุณใส่ Selector ไว้ใน useEffect เช่น const activeSubTab = use_M_Store((s) => s.activeSubTab)

ถ้าคุณลืมใส่ activeSubTab ลงใน Dependency Array มันจะดึงค่าเก่าตลอด (Stale Closure)

แต่ถ้าคุณใส่ลงไป มันจะ Trigger useEffect ให้รันใหม่ ทุกครั้งที่ Tab เปลี่ยน ซึ่งบางทีเราแค่ต้องการ "อ่านค่า" ไปใช้ตอนกด Save ไม่ได้อยากให้มันรันทุกรอบ เราเลยต้องหนีไปใช้ getState() เพื่อแค่ "หยิบ" ค่าออกมาใช้โดยไม่ผูก useEffect เข้ากับ Lifecycle ของตัวแปรนั้นครับ

Performance Over-optimization (การบ่นจาก ESLint/React DevTools):

ถ้าคุณดึง Selector หลายตัวเกินไปใน Component เดียว React อาจจะบ่นว่ามัน "เกิดการ Re-render ซ้ำซ้อน" ในจังหวะที่ State อัปเดตพร้อมกันหลายตัว (Batching)

ในบางกรณีที่ข้อมูลมีขนาดใหญ่มาก การ Selector ค่าที่อยู่ลึกๆ อาจทำให้การเปรียบเทียบค่า (Equality Check) ของ React ทำงานหนักเกินไปจนมี Warning แจ้งเตือน

สรุปความต่างที่ต้องระวัง:

### ใช้แบบที่ 2:

เมื่อต้องการให้ UI เปลี่ยนตามค่า (Reactive)

### ใช้แบบที่ 3 (getState):

เมื่อต้องการ "ค่าไปทำงาน" (อ่านค่ามาประมวลผล) ในฟังก์ชันหรือ Event Handler โดยไม่ต้องการให้ Component สนใจการเปลี่ยนแปลงของค่านั้นๆ

คุณเคยเจอเคสที่ React บ่นเพราะ "มันทำให้เกิด Loop" ใช่ไหมครับ? ถ้าใช่ การใช้ getState() คือทางออกที่ถูกต้องและเป็นมืออาชีพที่สุดแล้วครับ ไม่ต้องฝืนใช้ Selector ถ้ามันไม่จำเป็นต้องผูกกับหน้าจอ

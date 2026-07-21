# ways_to_define_var_in_M_Store

# ways_to_define_var_in_M_Store

## ประเภท: Subscribe ก้อนรวม

```javascript
const { value_1, value_2, value_3 } = use_M_Store();
```

- **คำแนะนำ:** ใช้กับ Component แม่ที่จำเป็นต้องแสดงผลหรือใช้ข้อมูลหลายตัวพร้อมกัน
- **ข้อควรระวัง:** ถ้าข้อมูลตัวใดตัวหนึ่งในก้อนนี้เปลี่ยน Component จะถูกสั่ง Re-render ใหม่ทั้งหมดทันที

---

## ประเภท: Subscribe แยกรายตัว (Selector)

```javascript
const value = use_M_Store((state) => state.value);
```

- **คำแนะนำ:** เป็นวิธีที่ดีที่สุดและแนะนำให้ใช้มากที่สุด
- **ข้อดี:** ช่วยให้ Component เรนเดอร์เฉพาะตอนที่ค่าตัวนั้นๆ เปลี่ยนแปลงจริงๆ เท่านั้น ช่วยลดการเรนเดอร์เกินความจำเป็นได้ดีที่สุด

---

## ประเภท: ดึงฟังก์ชันแบบ Snapshot (ห้ามใส่ ())

```javascript
const setValue = use_M_Store.getState().setValue;
```

- **คำแนะนำ:** ใช้ดึงฟังก์ชัน set มาเก็บไว้เตรียมใช้งานใน Event Handlers (เช่น ปุ่มกด) หรือใน Service ไฟล์แยก
- **ข้อดี:** ไม่ทำให้ Component ต้องผูกติดกับการ Subscribe และไม่เกิดการ Re-render หน้าจอ

---

## ประเภท: ดึงค่าตัวแปรแบบ Snapshot สดๆ (ห้ามใส่ ())

```javascript
const value = use_M_Store.getState().value;
```

- **คำแนะนำ:** ใช้สำหรับหยิบค่าปัจจุบันไปตรวจสอบหรือคำนวณแบบเฉพาะกิจภายในฟังก์ชันหรือ Event Handler ทันทีที่ต้องการใช้งาน
- **ข้อดี:** ได้ค่าสดใหม่ล่าสุดโดยไม่ต้อง Subscribe คาไว้บน Component

---

## ประเภท: ข้อผิดพลาด (ห้ามทำเด็ดขาด) ❌

```javascript
const value = use_M_Store.getState().setValue();
```

- **เหตุผล:** การเผลอใส่เครื่องหมายวงเล็บเปิดปิดท้ายคำสั่ง จะกลายเป็นคำสั่ง "สั่งรันฟังก์ชันทันที" ระหว่างที่ Component กำลังเรนเดอร์
- **ผลลัพธ์:** จะทำให้เกิด Error ร้ายแรง เช่น Maximum update depth exceeded หรือ setState in render ทันที

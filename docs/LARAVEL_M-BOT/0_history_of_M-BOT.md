# M-BOT History

- **`product` (`product-app-react-firebase`)** คือจุดเริ่มต้นช่วงต้นปี: ทำ React กับ Firebase โดยตรง แต่เริ่มติดข้อจำกัดเมื่อ backend logic อยู่บน Firebase ทำให้ควบคุมและ debug ได้ยาก และกังวลเรื่องการขยายระบบ

- จากนั้นเริ่มทำ **`ecommerce`** เป็นแอปอีคอมเมิร์ซ โดยวางแนวทางเป็น **Laravel backend + React frontend** เพื่อให้ backend logic อยู่ในโค้ดที่พัฒนาและ debug ได้สะดวก ใช้ความสามารถของ Laravel เช่น model, migration, controller และ service

- ระหว่างพัฒนา ecommerce พบว่าต้องเขียน DTO และโครงสร้างคล้ายกันซ้ำ ๆ หลาย entity จึงเกิดแนวคิด **MDD — Metadata-Driven Development**: เก็บ metadata ไว้เป็นศูนย์กลาง แล้วให้ระบบสร้างและตรวจสอบโครงสร้างที่เกี่ยวข้องของ frontend และ backend ให้สอดคล้องกัน

- แนวคิดนี้พัฒนาต่อเป็น **ALAT-MDD**: MDD เป็นรากฐาน ส่วน ALAT คือเครื่องมือดูแลวงจรชีวิตของแอป เพื่อให้ติดตามและจัดการการเปลี่ยนแปลงของแอปได้ต่อเนื่อง แม้หลังนำไปใช้งานจริงแล้ว

- **`m-project`** แยกออกมาเป็นโปรเจกต์สำหรับ logic และเครื่องมือ ALAT/MDD โดยเฉพาะ ไม่ผูกกับโค้ดของแอปอีคอมเมิร์ซ เพื่อให้ในอนาคตจัดการ target app ได้หลายประเภท เช่น ecommerce, social media หรือ chat app
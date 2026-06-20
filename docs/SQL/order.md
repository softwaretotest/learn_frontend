# Order

## กลไก "Auto-Limit / Fetch First" ของ pgAdmin 4

โปรแกรม pgAdmin จะมีฟีเจอร์ความปลอดภัยที่เรียกว่า Max rows to retrieve (จำนวนแถวสูงสุดที่จะดึงมาแสดงผล) ซึ่งค่าเริ่มต้นของโปรแกรมมักจะถูกล็อกไว้ที่ 1,000 แถว เสมอครับ

```sql
-- Pageที่ 1: ดึงแถวที่ 1 ถึง 1,000 (เอามาดูผลลัพธ์หน้าแรก)
SELECT * FROM public.orders
ORDER BY id ASC
LIMIT 1000 OFFSET 0;


-- Pageที่ 2: ข้าม 1,000 แถวแรก เพื่อดูแถวที่ 1,001 ถึง 2,000
SELECT * FROM public.orders
ORDER BY id ASC
LIMIT 1000 OFFSET 1000;


-- Pageที่ 3: ข้าม 2,000 แถวแรก เพื่อดูแถวที่ 2,001 ถึง 3,000
SELECT * FROM public.orders
ORDER BY id ASC
LIMIT 1000 OFFSET 2000;

SELECT COUNT(*) FROM public.orders;
```

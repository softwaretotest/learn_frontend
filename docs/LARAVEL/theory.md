# Theory

## guarded

```php
guarded = []   → อนุญาตทุก field
```

## fillable

fillable คืออะไร?

คุณเข้าใจใกล้เคียงแล้ว แต่ขอปรับนิดหนึ่ง

fillable ไม่ใช่ field ที่ user กรอกได้

แต่คือ:

### Field ที่อนุญาตให้ Mass Assignment

ตัวอย่าง:

```php
Product::create([
'name' => 'Coke',
'image_url' => 'coke.jpg',
]);
```

Laravel จะตรวจ:

```php
protected $fillable = [
'name',
'image_url',
];
```

ถ้า field ไม่อยู่ใน fillable

```php

Product::create([
'price' => 100,
]);
```

จะ error:

```php
MassAssignmentException
```

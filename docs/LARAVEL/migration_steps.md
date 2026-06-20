# Migration Steps

## Product V1 Roadmap

## Goal

สร้าง Product Entity ให้ครบทั้ง Flow ตั้งแต่ Database → Backend → UI Test

---

## Phase 1: Product Only

เริ่มจาก Product เพียง Entity เดียวก่อน เพื่อสร้าง Pattern สำหรับ Entity อื่นในอนาคต

```text
Migration Steps

Product
    ↓
Constraint
    ↓
Migration
    ↓
Model
    ↓
DTO
    ↓
Service
    ↓
Seeder
    ↓
Storage / Image
    ↓
API
    ↓
UI Test
    ↓
Factory (e.g. products)
    ↓
seeder
    ↓
Service Test
```

---

## Record Parent

Base Entity สำหรับทุก Record

```text
Record
├── id
├── name
├── created_at
└── updated_at
```

### Future Fields

```text
image_url
user_id
shop_id
is_active
```

---

## Product V1

### Database Fields

```text
products
├── id
├── name
├── image_url
├── created_at
└── updated_at
```

### Future Fields

```text
price
stock
user_id
shop_id
```

---

## DTO

```text
ProductDTO
├── name
└── image_url
```

Flow:

```text
Request
    ↓
DTO
    ↓
Service
    ↓
Model
    ↓
Database
```

---

## Service

```text
ProductService
├── create()
├── getById()
├── getAll()
└── delete()
```

### Future Methods

```text
getByUserId()
getByShopId()
update()
```

---

## Image Storage

Decision:

```text
Storage : public disk
Database: image_url
```

Not Used:

```text
Base64 ❌
```

Reason:

- Smaller database
- Better performance
- Easier migration
- CDN friendly

---

## Laravel Storage Setup

Create symbolic link:

```bash
php artisan storage:link
```

Structure:

```text
storage/app/public
        ↓
public/storage
```

---

## Seeder

```text
ProductSeeder
├── Product 1
├── Product 2
└── Dummy Images
```

Purpose:

- Fast testing
- Verify image loading
- Verify API response

---

## Testing Strategy

Goal:

```text
5 minutes test
```

No CSS required.

No React required.

Simple output only.

Examples:

```text
1 | Coke | coke.jpg
2 | Pepsi | pepsi.jpg
```

or

```json
[
    {
        "id": 1,
        "name": "Coke"
    }
]
```

---

## Success Criteria

- Migration works
- Seeder works
- Storage works
- Image loads correctly
- API returns data
- UI displays data
- Product CRUD works

---

## Future Entities

```text
Record
├── User
├── Shop
├── Product
├── Order
└── SelectProduct
```

Once Product V1 is stable, reuse the same pattern for all entities.

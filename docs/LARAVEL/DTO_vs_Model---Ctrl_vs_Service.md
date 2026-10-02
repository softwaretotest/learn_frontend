# DTO , Model , Service , Controller

## Service vs Controller

Frontend JSON
↓
Controller
↓ validation
DTO
↓
Service
↓
Model
↓
Database

Layer หน้าที่
Controller รับ Request, เรียก Validator, สร้าง DTO, เรียก Service, คืน Response
DTO ส่งข้อมูลแบบมีโครงสร้างระหว่าง Controller กับ Service
Service CRUD, Query, Business Logic, Transaction และเรียก Model
Model Eloquent, Relation, Cast และการติดต่อฐานข้อมูล
Database เก็บข้อมูล

## Rules of Service & Controller

กฎนี้ทำให้ Controller ไม่บวม และรองรับทั้งแอปขนาดเล็กกับ Complex Business Logic ในอนาคต

Controller เป็น HTTP CRUD worker ส่วน Service เป็นเจ้าของ CRUD implementation, Database workflow, Business Logic และการประสานงานกับระบบภายนอก โดย Model เป็นเครื่องมือที่ Service ใช้ติดต่อฐานข้อมูล

## DTO vs Model

### เกณฑ์ตัดสินใจแบบสั้น

| สถานการณ์                   | Model            | DTO       |
| --------------------------- | ---------------- | --------- |
| CRUD ตรงกับตาราง            | ใช้              | ไม่จำเป็น |
| Query และบันทึกฐานข้อมูล    | ใช้              | อาจใช้    |
| คำนวณโดยไม่บันทึก DB        | ไม่จำเป็น        | ใช้ได้    |
| ส่งข้อมูลไประบบภายนอก       | ไม่จำเป็น        | เหมาะมาก  |
| รับ Webhook จากภายนอก       | อาจใช้ใน Service | เหมาะมาก  |
| คำสั่งหนึ่งแตะหลายตาราง     | ใช้หลาย Model    | เหมาะมาก  |
| ส่งข้อมูลระหว่าง Service    | ไม่จำเป็นเสมอไป  | เหมาะ     |
| ข้อมูล Input ไม่ตรงกับตาราง | ใช้ตอนบันทึก     | เหมาะมาก  |

## Service vs Controller

## เกณฑ์ตัดสินใจระหว่าง Controller และ Service

| สถานการณ์                                  | Controller          | Service   |
| ------------------------------------------ | ------------------- | --------- |
| รับ HTTP Request และส่ง Response           | ใช้                 | ไม่จำเป็น |
| กำหนด HTTP Status หรือ Redirect            | ใช้                 | ไม่ควรทำ  |
| CRUD ตรงกับ Model เพียง 1–2 บรรทัด         | ทำได้โดยตรง         | ไม่จำเป็น |
| มี Business Rule เฉพาะแอป                  | เรียกใช้งาน         | เหมาะมาก  |
| หนึ่งคำสั่งใช้หลาย Model                   | ไม่ควรจัดการเอง     | เหมาะมาก  |
| ต้องใช้ Database Transaction               | เรียกใช้งาน         | เหมาะมาก  |
| ต้องคำนวณราคาหรือส่วนลด                    | ไม่ควรทำเอง         | เหมาะมาก  |
| ต้องเรียกระบบภายนอก                        | เรียกใช้งาน         | เหมาะมาก  |
| งานเดียวกันถูกเรียกจาก API, Queue หรือ CLI | ไม่เหมาะเป็นแกนกลาง | เหมาะมาก  |
| แปลงผลลัพธ์เป็น JSON หรือ View             | ใช้                 | ไม่ควรทำ  |
| Logic มีโอกาสใช้ซ้ำ                        | ไม่ควรเก็บไว้       | เหมาะมาก  |

Controller = ใครส่งคำสั่งมา และจะตอบกลับอย่างไร
DTO = คำสั่งนั้นนำข้อมูลอะไรมาบ้าง
Service = คำสั่งนั้นต้องดำเนินงานอย่างไร
Model = อ่านและบันทึกข้อมูลกับฐานข้อมูลอย่างไร

# การเปรียบเทียบ Model และ DTO ในสถาปัตยกรรมระบบ

ในการพัฒนาแบ็คเอนด์ เราได้แยกความรับผิดชอบระหว่างการคุยกับฐานข้อมูลและการส่งผ่านข้อมูลออกจากกัน โดยมีรายละเอียดความแตกต่างดังนี้:

| คุณสมบัติ            | Model (Eloquent Model)                                                                                               | DTO (Data Transfer Object)                                                                                  |
| :------------------- | :------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| **หน้าที่หลัก**      | เป็นตัวแทนของ Database Table (Active Record) จัดการข้อมูลลงฐานข้อมูลและผูกความสัมพันธ์ (เช่น `belongsTo`, `hasMany`) | เป็นกล่องห่อหุ้ม Data Payload สำหรับส่งผ่านข้อมูลระหว่างเลเยอร์ต่างๆ (เช่น จาก Controller ไป Service)       |
| **ความผูกพันกับ DB** | **ผูกติดกับ DB 100%** รู้จักตาราง, รู้จัก Column และทำ Query (เช่น `where()`, `get()`, `save()`) ได้โดยตรง           | **ไม่รู้จัก DB เลย** เป็นคลาสธรรมดา (Plain PHP Object) ไม่มีสิทธิ์สั่ง Query ฐานข้อมูลใดๆ ทั้งสิ้น          |
| **ความสามารถพิเศษ**  | มี Lifecycle Hooks (เช่น `creating`, `saved`), Cast ชนิดข้อมูลอัตโนมัติ และทำ ORM Mapping                            | ไม่มี Business Logic ซับซ้อน มีแค่การรับค่า, แปลงร่างข้อมูล (`fromRequest`, `toArray`) และ Strict Typing    |
| **ข้อดี**            | ทำงานกับฐานข้อมูลได้รวดเร็วทันใจ โค้ดสั้นกระชับ                                                                      | ปลอดภัยสูง ข้อมูลเป็นระเบียบ IDE ช่วยใบ้โค้ดแม่นยำ (Type Safety) และแยกเลเยอร์ออกจากโครงสร้าง DB ได้เด็ดขาด |
| **ข้อเสีย**          | ถ้านำไปส่งข้ามเลเยอร์สะเปะสะปะ จะทำให้คลาสอื่นผูกติดกับ Database โครงสร้างจะยืดหยุ่นน้อย (Tight Coupling)            | เพิ่มความเยิ่นเย้อ ต้องเขียนโค้ดเพิ่ม (Boilerplate) ในการแปลงร่างข้อมูลจาก Request -> DTO -> Model          |

---

## สรุปภาพรวมการทำงาน

- **Model** เปรียบเสมือน **พนักงานขับรถขนส่งสินค้า** ที่วิ่งตรงเข้าไปหยิบของในโกดัง (Database) ออกมาได้จริง
- **DTO** เปรียบเสมือน **ใบรายการสินค้า (Manifest)** ที่ระบุว่าเราจะส่งข้อมูลอะไร มีสเปกอย่างไร แต่ตัวมันเองเดินไปหยิบของในโกดังไม่ได้ เป็นแค่ตัวกลางถือข้อมูลเฉยๆ

### ความสัมพันธ์ระหว่าง DTO กับ Service

- **DTO** ทำหน้าที่ **เก็บบรรจุภัณฑ์ของข้อมูล** (ไม่มีฟังก์ชันดึงข้อมูลจากฐานข้อมูล)
- **Service** ทำหน้าที่ **จัดการสมองกลของระบบ (Business Logic)** โดยคอยเรียกใช้งาน DTO แล้วสั่งให้ Model เป็นตัวกลางไปคุยกับฐานข้อมูลอีกทีหนึ่ง

## DTO

- ไม่เชื่อมต่อฐานข้อมูล
- ไม่มี Relation
- ไม่มี save(), create() หรือ Query
- แปลงจาก Array/JSON ได้
- มีเมธอดช่วยแปลงอย่าง fromArray() และ toArray() ได้
- ไม่ควรมี Business Logic หรือการ Query ฐานข้อมูล

```php
<?php

namespace App\DTOs;

readonly class ProductDTO
{
    public function __construct(
        public int $shopId,
        public string $name,
        public float $price,
        public int $stock,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            shopId: (int) $data['shop_id'],
            name: $data['name'],
            price: (float) $data['price'],
            stock: (int) $data['stock'],
        );
    }

    public function toArray(): array
    {
        return [
            'shop_id' => $this->shopId,
            'name' => $this->name,
            'price' => $this->price,
            'stock' => $this->stock,
        ];
    }
}

<?php

namespace App\DTOs;

class OrderDTO
{
    public function __construct(
        public ?int $id = null,
        public $order_nr = null,
        public $product_id = null,
        public $quantity = null,
        public $confirm_order = null,
    ) {}

    // Method แปลงจาก Array เป็น DTO (เอาไว้ใช้ใน Service)
    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            order_nr: $data['order_nr'] ?? null,
            product_id: $data['product_id'] ?? null,
            quantity: $data['quantity'] ?? null,
            confirm_order: $data['confirm_order'] ?? null,
        );
    }
}
```

## Model

- อ่านและเขียนฐานข้อมูล
- ใช้ create(), update(), delete() และ save()
- มี Query เช่น where() และ find()
- มี Relation เช่น belongsTo() และ hasMany()
- มี $casts, $fillable และ Lifecycle Hooks ได้
- Foreign Key เป็นคอลัมน์ในฐานข้อมูล ส่วน Relation คือเมธอดที่ Model ใช้เชื่อมความสัมพันธ์

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'shop_id',
        'name',
        'price',
        'stock',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // กำหนด Table ตาม Constant
    protected $table = \App\Constant\OrderConstant::TABLE_NAME;

    // ความสัมพันธ์ที่เจนอัตโนมัติจาก PRODUCT_ID
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
```

## Service

Service เป็นผู้ดำเนิน Use Case หรือ Business Logic ของแอป:

Business Logic ของแต่ละแอปจึงอยู่ใน Service เช่น:
E-commerce: คำนวณราคา ตัด Stock ใช้คูปอง และ Checkout

### Flow

ข้อมูลดิบจาก Request
↓
Validation
↓
DTO
↓
Service
↓
Model
↓
Database

```php
<?php

namespace App\Services;

use App\DTOs\ProductDTO;
use App\Models\Product;

class ProductService
{
    public function create(ProductDTO $dto): Product
    {
        return Product::create($dto->toArray());
    }

    public function update(Product $product, ProductDTO $dto): Product
    {
        $product->update($dto->toArray());

        return $product->refresh();
    }
}

//ใน CRUD ง่าย ๆ Service อาจดูเหมือนเป็นแค่ตัวส่งต่อ แต่เมื่อเป็น Order หรือ Checkout จะเห็นหน้าที่ชัดขึ้น:
class CheckoutService
{
    public function checkout(CheckoutDTO $dto): Order
    {
        return DB::transaction(function () use ($dto) {
            // ตรวจสอบสินค้าและ Stock
            // คำนวณราคาและส่วนลด
            // สร้าง Order และ OrderItem
            // ตัด Stock
            // สร้าง Payment
            // ส่ง Event หรือ Notification

            return $order;
        });
    }
}
```

## Controller

Controller ทำหน้าที่เป็น ประตูรับและส่งข้อมูลของ HTTP ไม่ใช่สถานที่เก็บวิธีดำเนินธุรกิจ

Controller ควรทำประมาณนี้:

- รับ Request
- ตรวจสอบสิทธิ์หรือเรียก Authorization
- รับข้อมูลที่ Validate แล้ว
- สร้าง DTO ถ้าจำเป็น
- เรียก Service
- แปลงผลลัพธ์เป็น Response
- กำหนด HTTP status เช่น 200, 201, 404
- ตัวอย่าง Controller ที่ผอม:

Controller มีเมธอด CRUD จริง โดย Laravel นิยมใช้ชื่อดังนี้:
| HTTP | Controller Method | หน้าที่ |
|---|---|---|
| `GET /products` | `index()` | แสดงรายการ |
| `POST /products` | `store()` | สร้างข้อมูล |
| `GET /products/{id}` | `show()` | แสดงหนึ่งรายการ |
| `PUT/PATCH /products/{id}` | `update()` | แก้ไขข้อมูล |
| `DELETE /products/{id}` | `destroy()` | ลบข้อมูล |
แต่คำว่า Controller “ทำ Create/Update/Delete” หมายถึง Controller รับคำสั่ง HTTP แล้วมอบหมายงาน ไม่ใช่ว่าต้องดำเนินงานทั้งหมดด้วยตัวเอง

```php
<?php

namespace App\Http\Controllers\Api;

use App\DTOs\ProductDTO;
use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $productService,
    ) {}

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'shop_id' => ['required', 'integer', 'exists:shops,id'],
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $dto = ProductDTO::fromArray($validated);

        $product = $this->productService->create($dto);

        return response()->json($product, 201);
    }
}
```

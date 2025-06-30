# OCR Google Cloud API

API สำหรับแปลงภาพเป็นข้อความ (OCR) ด้วย Google Cloud Vision API  
พัฒนาโดยใช้ Node.js + TypeScript + Express

---

## โครงสร้างหลัก

- **src/** : โค้ดหลักของระบบ
- **package.json** : รายการ dependencies และ scripts
- **.env** : ตัวแปรสภาพแวดล้อม (Environment Variables)
- **gcloud-key.json** : Service Account Key สำหรับ Google Cloud

---

## ไลบรารีที่ใช้

- [@google-cloud/vision](https://www.npmjs.com/package/@google-cloud/vision) : เรียกใช้งาน Google Vision API
- [express](https://www.npmjs.com/package/express) : สร้าง REST API
- [multer](https://www.npmjs.com/package/multer) : รับไฟล์อัปโหลด
- [dotenv](https://www.npmjs.com/package/dotenv) : โหลดค่าตัวแปรจาก `.env`
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) : สร้างหน้าเอกสาร API (Swagger UI)
- **Dev:**  
  - [nodemon](https://www.npmjs.com/package/nodemon), [ts-node](https://www.npmjs.com/package/ts-node), [typescript](https://www.npmjs.com/package/typescript)

---

## การตั้งค่า

1. **ติดตั้ง dependencies**
    ```sh
    npm install
    ```

2. **สร้างไฟล์ `.env`**  
    ตัวอย่างค่า:
    ```
    PORT=3000
    GOOGLE_APPLICATION_CREDENTIALS=./gcloud-key.json
    ```

3. **วางไฟล์ `gcloud-key.json`**  
    - สร้าง Service Account Key จาก Google Cloud Console  
    - ดาวน์โหลดไฟล์และวางไว้ใน root ของโปรเจกต์

---

## วิธีรันระบบ

```sh
npm run dev
```

API จะพร้อมใช้งานที่ `http://localhost:3000` (หรือพอร์ตที่ตั้งไว้ใน `.env`)

---

## หมายเหตุ

- ต้องมีบัญชี Google Cloud และเปิดใช้งาน Vision API
- หากต้องการดูเอกสาร API ให้เปิด endpoint `/api-docs` (ถ้ามีการตั้งค่า Swagger UI)

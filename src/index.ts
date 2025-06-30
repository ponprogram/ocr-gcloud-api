import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import ocrRoutes from './routes/ocr.routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// เส้นทาง API
app.use('/api', ocrRoutes);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📄 Swagger docs at http://localhost:${port}/docs`);
});

import express from 'express';
import multer from 'multer';
import { extractText } from '../controllers/ocr.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/ocr', upload.single('image'), extractText); // ✅ ใช้งานได้หลังแก้

export default router;

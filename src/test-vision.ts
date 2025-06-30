import vision from '@google-cloud/vision';
import dotenv from 'dotenv';
dotenv.config();

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

async function runOCR() {
  const [result] = await client.textDetection('./uploads/1750217591724-copy.jpg'); // ใส่ชื่อไฟล์จริง
  const detections = result.fullTextAnnotation?.text;
  console.log('Text:', detections);
}

runOCR().catch(console.error);

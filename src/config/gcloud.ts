import dotenv from 'dotenv';
dotenv.config();

// บังคับให้ process.env มี path
process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS || './gcloud-key.json';

import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();
export default client;

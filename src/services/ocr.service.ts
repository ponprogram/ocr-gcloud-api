import visionClient from '../config/gcloud';

export const extractTextFromImage = async (imagePath: string): Promise<string> => {
  try {
    const [result] = await visionClient.textDetection(imagePath);
    const text = result.fullTextAnnotation?.text;

    if (!text) {
      throw new Error('No text detected in image');
    }

    return text;
  } catch (err) {
    console.error('[OCR ERROR]', err);
    throw new Error('Failed to process image');
  }
};
export default extractTextFromImage;

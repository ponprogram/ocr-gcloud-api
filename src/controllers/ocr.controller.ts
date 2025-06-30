import { Request, Response } from 'express';
import { parseThaiIDCardText } from '../utils/parse-thai-idcard';
import { parseJsonText } from '../utils/parse-json';
import { parseMEAElectricityBillText } from '../utils/parse-electricity-bill';
import { parseThaiHouseRegistrationText } from '../utils/parse-thai-house-registration';
import extractTextFromImage from '../services/ocr.service';

export const extractText = async (req: Request, res: Response): Promise<void> => {
  try {
    const imagePath = req.file?.path;
    const type = req.body.type?.toLowerCase();

    if (!imagePath || !type) {
      res.status(400).json({ error: 'Missing image or type' });
      return;
    }

    const rawText = await extractTextFromImage(imagePath);

    let data_IDCard = null;
    let data_MEAE = null;
    let data_House = null;
    let data = null;

    switch (type) {
      case 'idcard':
        data_IDCard = parseThaiIDCardText(rawText);
        break;
      case 'mea':
        data_MEAE = parseMEAElectricityBillText(rawText);
        break;
      case 'house':
        data_House = parseThaiHouseRegistrationText(rawText);
        break;
      case 'auto':
        data_IDCard = parseThaiIDCardText(rawText);
        data_MEAE = parseMEAElectricityBillText(rawText);
        data_House = parseThaiHouseRegistrationText(rawText);
        data = parseJsonText(rawText);
        break;
      default:
        res.status(400).json({ error: 'Invalid document type' });
        return;
    }

    res.status(200).json({
      raw_text: rawText,
      data_IDCard,
      data_MEAE,
      data_House,
      data,
    });
  } catch (error) {
    console.error('❌ OCR Error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
};



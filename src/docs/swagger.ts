export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'OCR API with Google Cloud Vision',
    version: '1.0.0',
    description: 'API สำหรับอัปโหลดภาพและแปลงเป็นข้อความด้วย Google Cloud Vision',
  },
  paths: {
    '/api/ocr': {
      post: {
        summary: 'อัปโหลดภาพและแปลงเป็นข้อความ',
        tags: ['OCR'],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  image: {
                    type: 'string',
                    format: 'binary',
                  },
                  type: {
                    type: 'string',
                    enum: ['idcard', 'mea', 'house', 'auto'],
                    description: 'ประเภทของเอกสารที่ต้องการแปลง',
                  },
                },
                required: ['image', 'type'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'ข้อความจากภาพ',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    raw_text: { type: 'string' },
                    data_IDCard: { type: 'object' },
                    data_MEAE: { type: 'object' },
                    data_House: { type: 'object' },
                    data: { type: 'object' },
                  },
                },
              },
            },
          },
          400: {
            description: 'ไม่พบภาพในคำขอหรือประเภทไม่ถูกต้อง',
          },
        },
      },
    },
  },
};

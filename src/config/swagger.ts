const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Express API con TypeScript',
    version: '1.0.0',
    description: 'Una API simple con Express y TypeScript',
  },
  paths: {
    '/api/hello': {
      get: {
        summary: 'Devuelve un mensaje de saludo',
        responses: {
          '200': {
            description: 'Un mensaje de saludo',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDocument;
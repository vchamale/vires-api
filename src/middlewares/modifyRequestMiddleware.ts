import { Request, Response, NextFunction } from 'express';

type ModifyBodyOptions = {
  append?: Record<string, any>;
  overwrite?: Record<string, any>;
};

const modifyRequestMiddleware =
  (options: ModifyBodyOptions = {}) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { append = {}, overwrite = {} } = options;
    console.log('mod req mid')
    // Si `includeTenantId` está habilitado, lo añade al body
    if ((req as any).tenantId) {
      append.tenantId = (req as any).tenantId;
    }

    // Modifica el body según las opciones proporcionadas
    req.body = {
      ...req.body,
      ...append,
      ...overwrite,
    };

    console.log('final body ', req.body)

    next();
  };

export default modifyRequestMiddleware;
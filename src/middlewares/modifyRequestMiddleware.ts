import { Request, Response, NextFunction } from 'express';

type ModifyBodyOptions = {
  append?: Record<string, any>;
  overwrite?: Record<string, any>;
};

const modifyRequestMiddleware =
  (options: ModifyBodyOptions = {}) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { append = {}, overwrite = {} } = options;
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

    next();
  };

export default modifyRequestMiddleware;
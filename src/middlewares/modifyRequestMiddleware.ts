import { Request, Response, NextFunction } from 'express';

type ModifyBodyOptions = {
  append?: Record<string, any>;
  overwrite?: Record<string, any>;
};

const modifyRequestMiddleware =
  (options: ModifyBodyOptions = {}) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { append = {}, overwrite = {} } = options;

    console.log('req.tenantId ', req.tenantId)

    if (req.tenantId) {
      append.tenantId = req.tenantId;
      append.userId = req.userId;
    }

    console.log('append ', append)

    if (req.method === 'GET' || req.method === 'DELETE') {
      req.query = {
        ...req.query,
        ...append,
        ...overwrite,
      };
    } else {
      req.body = {
        ...req.body,
        ...append,
        ...overwrite,
      };
    }

    console.log('Modified Request:', {
      method: req.method,
      query: req.query,
      body: req.body,
    });

    next();
  };

export default modifyRequestMiddleware;
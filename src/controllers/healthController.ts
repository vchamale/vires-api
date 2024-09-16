import { Request, Response } from 'express';

export const health = (req: Request, res: Response): void => {
  res.send('Service Up!');
};
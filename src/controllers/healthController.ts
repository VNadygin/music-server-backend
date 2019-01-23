import { Response } from 'express';

export const health = {
  responseOk(_, res: Response) {
    res.status(200);
    res.end();
  },
};

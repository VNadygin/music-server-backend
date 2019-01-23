import { Response } from 'express';

export class HealthController {
  public responseOk(_, res: Response) {
    res.status(200);
    res.end();
  }
}

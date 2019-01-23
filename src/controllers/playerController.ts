import { Request, Response } from 'express';
import * as fs from 'fs';
import * as mime from 'mime-types';
import * as path from 'path';
import { promisify } from 'util';
import { config } from '../config';

const existAsync = promisify(fs.exists);

export class PlayerController {
  private storagePath;

  constructor() {
    this.storagePath = path.resolve(config.api.mediaStoragePath);
  }

  public steamFile = async (req: Request, res: Response) => {
    const { filename } = req.params;
    const filePath = path.join(this.storagePath, filename);

    const exist = await existAsync(filePath);

    if (!exist) {
      res.status(404);
      res.send('File is not exist');
    }

    const contentType = mime.lookup(filePath);

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);

      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });

      const head = {
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Content-Type': contentType,
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': contentType,
      };

      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  };
}

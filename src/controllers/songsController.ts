import { Request, Response } from 'express';
import * as NodeCache from 'node-cache';
import Api from '../lib/api';
import s3 from '../lib/s3';

export class SongsController {
  private api;
  private metadataCache;

  constructor() {
    this.api = new Api();
    this.metadataCache = new NodeCache();
  }

  public getAllSongs = async (req: Request, res: Response) => {
    try {
      const library = await this.api.find();

      const result = await Promise.all(
        library.map(async item => {
          let meta;
          const metaCacheKey = this.getMetadataCacheKey(item);
          const metaFromCache = await this.metadataCache.get(metaCacheKey);

          if (!metaFromCache) {
            meta = await this.api.fetchMetadata(item);
            await this.metadataCache.set(metaCacheKey, meta);
          } else {
            meta = metaFromCache;
          }

          const fileUrl = await this.getSongUrl(item.fileName);

          return {
            ...item,
            ...meta,
            fileUrl,
          };
        })
      );

      res.status(200);
      res.send(result);
    } catch (error) {
      res.status(404);
      res.send(error.message);
    }
  };

  public getSongById = async (req: Request, res: Response) => {
    const { songId } = req.params;
    try {
      const song = await this.api.findById(songId);
      res.send(song);
    } catch (error) {
      res.status(404);
      res.send(error.message);
    }
  };

  private getMetadataCacheKey = ({ author, title }) => {
    return `${author.toLowerCase()} - ${title.toLowerCase()}`;
  };

  private getSongUrl = async fileName => {
    const url = await s3.getSignedUrl('getObject', {
      Key: fileName,
    });

    return url;
  };
}

import { Request, Response } from 'express';
import Api from '../lib/api';

export class SongsController {
  private api;

  constructor() {
    this.api = new Api();
  }

  public getAllSongs = async (req: Request, res: Response) => {
    try {
      const songs = await this.api.find();
      res.status(200);
      res.send(songs);
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
}

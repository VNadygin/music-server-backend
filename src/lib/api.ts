import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { config } from '../config';

const readFileAsync = promisify(fs.readFile);
const existAsync = promisify(fs.exists);

class Api {
  private dbUrl: string;

  constructor() {
    this.dbUrl = path.resolve(config.api.dbUrl);
  }

  public async find() {
    const exist = await existAsync(this.dbUrl);

    if (!exist) {
      throw new Error('DB file is not exist');
    }

    const response = await readFileAsync(this.dbUrl, 'utf8');
    const songs = JSON.parse(response);

    return songs;
  }

  public async findById(songId: string) {
    const exist = await existAsync(this.dbUrl);

    if (!exist) {
      throw new Error('DB file is not exist');
    }

    const response = await readFileAsync(this.dbUrl, 'utf8');
    const songs = JSON.parse(response);

    const song = songs.find(item => item.id === songId);

    return song;
  }
}

export default Api;

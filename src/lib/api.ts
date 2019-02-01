import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { config } from '../config';
import db from './dbClient';

const readFileAsync = promisify(fs.readFile);
const existAsync = promisify(fs.exists);

class Api {
  private dbUrlPath: string;

  constructor() {
    this.dbUrlPath = path.resolve(config.api.dbUrlPath);
  }

  public async find() {
    const result = db.get('library').value();
    return result;
  }

  public async findById(songId: string) {
    const exist = await existAsync(this.dbUrlPath);

    if (!exist) {
      throw new Error('DB file is not exist');
    }

    const response = await readFileAsync(this.dbUrlPath, 'utf8');
    const songs = JSON.parse(response);

    const song = songs.find(item => item.id === songId);

    return song;
  }

  public async fetchMetadata({ author, title }) {
    if (!author || !title) {
      return null;
    }

    const { apiKey, searchUrl } = config.discogs;

    const params = {
      artist: author,
      per_page: 1,
      release_title: title,
      token: apiKey,
    };

    const { data } = await axios.get(searchUrl, {
      params,
    });

    if (data.results.length > 0) {
      const result = data.results[0];

      return {
        country: result.country,
        cover_image: result.cover_image,
        genre: result.genre,
        thumb: result.thumb,
        year: result.year,
      };
    }

    return null;
  }
}

export default Api;

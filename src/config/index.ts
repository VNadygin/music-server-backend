import * as dotenv from 'dotenv';
import * as _ from 'lodash';
import * as path from 'path';
import loadDotenv from './dotenv';

loadDotenv();

const ROOT: string = path.resolve(__dirname, '../');
const NODE_ENV: string = _.defaultTo(process.env.NODE_ENV, 'development');

export const config = {
  api: {
    dbUrlPath: _.defaultTo(process.env.DB_PATH, 'db.json'),
    mediaStoragePath: _.defaultTo(process.env.MEDIA_STORAGE_PATH, 'media'),
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    bucket: process.env.S3_BUCKET_NAME,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
  },
  discogs: {
    apiKey: process.env.DISCOGS_API_KEY,
    searchUrl: _.defaultTo(
      process.env.DISCOGS_SEARCH_URL,
      'https://api.discogs.com/database/search'
    ),
  },
  server: {
    host: _.defaultTo(process.env.HOST, 'localhost'),
    port: _.defaultTo(parseInt(process.env.PORT, 10), 3000),
    root: ROOT,
  },
};

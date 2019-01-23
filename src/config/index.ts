import * as dotenv from 'dotenv';
import * as _ from 'lodash';
import * as path from 'path';
import loadDotenv from './dotenv';

loadDotenv();

const ROOT: string = path.resolve(__dirname, '../');
const NODE_ENV: string = _.defaultTo(process.env.NODE_ENV, 'development');

export const config = {
  api: {
    dbUrlPath: _.defaultTo(process.env.DB_PATH, 'metadata.json'),
    mediaStoragePath: _.defaultTo(process.env.MEDIA_STORAGE_PATH, 'media'),
  },
  server: {
    host: _.defaultTo(process.env.HOST, 'localhost'),
    port: _.defaultTo(parseInt(process.env.PORT, 10), 3000),
    root: ROOT,
  },
};

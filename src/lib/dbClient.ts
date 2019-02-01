import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { config } from '../config';

const adapter = new FileSync(config.api.dbUrlPath);
const db = low(adapter);

export default db;

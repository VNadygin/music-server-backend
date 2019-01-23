import * as dotenv from "dotenv";
import * as path from 'path';

const getDotenvPath = () => {
  dotenv.config();
  const BASE_PATH: string = path.resolve(__dirname, '../../');

  switch (process.env.NODE_ENV) {
    case "test":
      return path.join(BASE_PATH, '.env.test')
    case "production":
      return path.join(BASE_PATH, '.env.production')
    default:
      return path.join(BASE_PATH, '.env.development')
  }
}

const loadDotenv = () => {
  dotenv.config({ path: getDotenvPath() });
}

export default loadDotenv;
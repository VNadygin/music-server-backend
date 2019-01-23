import * as express from "express";
import { config } from './config';

const app = express();

app.listen(config.server.port, config.server.host, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening ${config.server.host}:${config.server.port}`);
})
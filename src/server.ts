import * as cors from 'cors';
import * as express from 'express';
import { config } from './config';
import router from './routes';
const app = express();

app.use(router);
app.use(cors());

app.listen(config.server.port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening ${config.server.host}:${config.server.port}`);
});

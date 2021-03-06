import * as express from 'express';

import {
  HealthController,
  PlayerController,
  SongsController,
} from '../controllers';

const playerController = new PlayerController();
const healthController = new HealthController();
const songsController = new SongsController();

const router = express.Router();

router.get('/health', healthController.responseOk);

router.get('/library', songsController.getAllSongs);
router.get('/library/:songId', songsController.getSongById);

router.get('/storage/:filename', playerController.steamFile);

export default router;

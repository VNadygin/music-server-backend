import * as express from 'express';
import { HealthController, SongsController } from '../controllers';

const healthController = new HealthController();
const songsController = new SongsController();

const router = express.Router();

router.get('/health', healthController.responseOk);
router.get('/songs', songsController.getAllSongs);
router.get('/songs/:songId', songsController.getSongById);

export default router;

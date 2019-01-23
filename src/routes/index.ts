import * as express from 'express';
import { health } from '../controllers';

const router = express.Router();

router.get('/health', health.responseOk);

export default router;

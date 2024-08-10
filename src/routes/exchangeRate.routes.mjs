import express from 'express';
import * as rateControllers from '../controllers/exchangeRate.controllers.mjs';
import * as subscribeControllers from '../controllers/subscribe.controllers.mjs';
import { validate } from '../middlewares/validation.middlewares.mjs';
import { subscribctionSchema } from '../schemas/validation.schemas.mjs';

const router = express.Router();

router.get('/rate', rateControllers.sendRate);
router.post('/subscribe', validate(subscribctionSchema), subscribeControllers.subscribe);
router.post('/unsubscribe', subscribeControllers.unsubscribe);

export { router };

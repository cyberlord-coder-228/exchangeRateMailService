import express from 'express';
import * as rateControllers from '../controllers/exchangeRate.controllers.mjs';
import * as subscribeControllers from '../controllers/subscribe.controllers.mjs';

const router = express.Router();

router.get('/rate', rateControllers.sendRate);
router.post('/subscribe', subscribeControllers.subscribe);
router.post('/unsubscribe', subscribeControllers.unsubscribe);

export { router };

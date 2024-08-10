'use strict';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cron from 'node-cron';

import { router } from './src/routes/exchangeRate.routes.mjs';
import { notifyAllUsers } from './src/services/broadcast.services.mjs';

const port = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/', router);

app.listen(port, () => {
	console.log(`Working on port ${port}`);
});

cron.schedule('0 12 * * 1', notifyAllUsers);

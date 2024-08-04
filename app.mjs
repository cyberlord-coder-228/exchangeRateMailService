'use strict';

import express from 'express';

const port = 3000;
const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Hello from port ${port}`);
});

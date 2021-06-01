import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import initDB from './initDB';

const port = 5000;

(async () => {
	await initDB();

	app.listen(port, () => {
		console.log('Running Passr API.');
	});
})();

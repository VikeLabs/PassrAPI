import express from 'express';
import { auth } from 'auth';

const port = 5000;

const app = express();

app.use(auth);

app.get('/', (req, res) => {
	console.log('GET /');
	res.send('Successful PassrAPI!');
});

app.listen(port, () => {
	console.log('Running Passr API.');
});

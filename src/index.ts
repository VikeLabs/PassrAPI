import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const port = 5000;

const app = express();

app.get('/', (req, res) => {
	res.send('Successful PassrAPI!');
});

(async () => {
    await initDb();

    app.listen(port, () => {
        console.log('Running Passr API.');
    });
})();

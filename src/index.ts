import dotenv from 'dotenv';
dotenv.config();
import * as dynamoose from 'dynamoose';
import express from 'express';
import initDB from './initDB';

const port = 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('Successful PassrAPI!');
});

(async () => {
    await initDB();

    app.listen(port, () => {
        console.log('Running Passr API.');
    });
})();

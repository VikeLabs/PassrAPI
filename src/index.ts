import dotenv from 'dotenv';
dotenv.config();
import * as dynamoose from 'dynamoose';
import express from 'express';
import initDb from './initDB';

const port = 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('Successful PassrAPI!');
});

(async () => {
    console.log('before init');
    dynamoose.aws.ddb.local();
    await initDb();

    app.listen(port, () => {
        console.log('Running Passr API.');
    });
})();

import dotenv from 'dotenv';
dotenv.config();
import * as dynamoose from 'dynamoose';
import express from 'express';
import userRouter from './routers/user';
import courseRouter from './routers/course';
import cItemRouter from './routers/courseItem';
import semesterRouter from './routers/semester';
import initDB from './initDB';

const port = 5000;
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Successful PassrAPI!');
});

app.use('/user', userRouter);
app.use('/semester', semesterRouter);
app.use('/course', courseRouter);
app.use('/courseItem', cItemRouter);

(async () => {
    await initDB();

    app.listen(port, () => {
        console.log('Running Passr API.');
    });
})();

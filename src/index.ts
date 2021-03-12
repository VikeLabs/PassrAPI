import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routers/user';
import courseRouter from './routers/course';
import cItemRouter from './routers/courseItem';
import semesterRouter from './routers/semester';

const port = 5000;
const app = express();

app.get('/', (req, res) => {
	res.send('Successful PassrAPI!');
});

app.use('/user', userRouter);
app.use('/semester', semesterRouter);
app.use('/coure', courseRouter);
app.use('/courseItem', cItemRouter);

app.listen(port, () => {
	console.log('Running Passr API.');
});

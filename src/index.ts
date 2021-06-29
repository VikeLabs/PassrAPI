import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routers/user';
import courseRouter from './routers/course';
import cItemRouter from './routers/courseItem';
import semesterRouter from './routers/semester';
import initDB from './initDB';
import { CourseInterface as course } from './models/course';
import { CourseItemInterface as courseItem } from './models/courseItem';
import { SemesterInterface as semester } from './models/semester';

const port = 5000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Successful PassrAPI!');
});

app.use('/user', userRouter);
app.use('/semester', semesterRouter);
app.use('/coure', courseRouter);
app.use('/courseItem', cItemRouter);

export const checkUserId = (
	getDocument: (
		key: string
	) => Promise<course> | Promise<courseItem> | Promise<semester>
) => async (key: string, userId: string) => {
	const document = await getDocument(key);
	return document.owner === userId;
};

(async () => {
	await initDB();

	app.listen(port, () => {
		console.log('Running Passr API.');
	});
})();

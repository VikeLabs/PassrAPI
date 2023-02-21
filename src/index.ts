import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routers/user';
import courseRouter from './routers/course';
import cItemRouter from './routers/courseItem';
import semesterRouter from './routers/semester';
import getDb from './initDB';

const port = 5000;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
	// take user id from header and add to request json
	const userId = req.header('userID');

	if (!userId) {
		// Return a 404 Not Found error if the userID header is missing
		return res.status(404).json({ error: 'User ID not found' });
	}

	req.body.userId = userId;

	next();
});

app.get('/', (req, res) => {
	res.send('Successful PassrAPI!');
});

app.use('/user', userRouter);
app.use('/semester', semesterRouter);
app.use('/course', courseRouter);
app.use('/courseItem', cItemRouter);

async function main() {
	const prisma = await getDb();
	try {
		app.listen(port, () => {
			console.log('Running Passr API.');
		});
	} catch (err) {
		console.error(err);
	} finally {
		await prisma.$disconnect();
	}
}

main();

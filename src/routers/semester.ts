import express from 'express';
import { create, read, update, del } from '../operators/semesterOperations';

const semesterRouter = express.Router();

const ERROR_RESPONSE = 'Semester not found.';

semesterRouter.get('/:id', async (req, res) => {
	try {
		console.log('Get Semester');
		const userID = req.header('userID');
		if (userID) {
			const semester = await read(req.params.id, userID);
			const resData = {
				...semester,
				courses: Array.from(semester?.courses || []),
			};
			res.send(resData);
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

semesterRouter.post('/', async (req, res) => {
	try {
		await create(req.body);
		console.log('Put Semester');
		res.send(req.body.name + ' created successfully');
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

semesterRouter.put('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			await update(req.body, userID);
			console.log('Post Semester');
			res.send('Semester updated');
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

semesterRouter.delete('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			await del(req.body.id, userID);
			console.log('Delete Semester');
			res.send('Semester deleted');
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});
export default semesterRouter;

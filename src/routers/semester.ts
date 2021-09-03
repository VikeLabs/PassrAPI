import express from 'express';
import { create, read, update, del } from '../operators/semesterOperations';

const semesterRouter = express.Router();

const errorResponse = 'Semester not found.';

semesterRouter.get('/:id', async (req, res) => {
	try {
		console.log('Get Semester');
		const semester = await read(req.params.id);
		const resData = {
			...semester,
			courses: Array.from(semester?.courses || []),
		};
		res.send(resData);
	} catch (err) {
		res.status(404).send(errorResponse);
	}
});

semesterRouter.put('/', async (req, res) => {
	try {
		await create(req.body);
		console.log('Put Semester');
		res.send(req.body.name + ' created successfully');
	} catch (err) {
		res.status(404).send(errorResponse);
	}
});

semesterRouter.post('/', async (req, res) => {
	try {
		await update(req.body);
		console.log('Post Semester');
		res.send('Semester updated');
	} catch (err) {
		res.status(404).send(errorResponse);
	}
});

semesterRouter.delete('/', async (req, res) => {
	try {
		await del(req.body.id);
		console.log('Delete Semester');
		res.send('Semester deleted');
	} catch (err) {
		res.status(404).send(errorResponse);
	}
});
export default semesterRouter;

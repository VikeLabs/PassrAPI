import express from 'express';
import { create, read, update, del } from '../operators/semesterOperations';

const semesterRouter = express.Router();

semesterRouter.get('/', async (req, res) => {
	try {
		console.log('Get Semester');
		const semester = await read(req.body.id);
		const resData = {
			...semester,
			courses: Array.from(semester?.courses || []),
		};
		res.send(resData);
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

semesterRouter.put('/', async (req, res) => {
	try {
		await create(req.body);
		console.log('Put Semester');
		res.send(req.body.name + ' created successfully');
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

semesterRouter.post('/', async (req, res) => {
	try {
		await update(req.body);
		console.log('Post Semester');
		res.send('Semester updated');
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

semesterRouter.delete('/', async (req, res) => {
	try {
		await del(req.body.id);
		console.log('Delete Semester');
		res.send('Semester deleted');
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});
export default semesterRouter;

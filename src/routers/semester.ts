import express from 'express';
import { create, read, update, del } from '../operators/semesterOperations';

const semesterRouter = express.Router();

semesterRouter.get('/', async (req, res) => {
	try {
		console.log('Get Semester');
		const semester = await read(req.body.id);
		console.log(semester);
		const resData = {
			...semester,
			courses: Array.from(semester?.courses || []),
		};
		res.send(resData);
	} catch (err) {
		console.log('Semester not read');
		res.send('ERROR: could not read semester');
	}
});

semesterRouter.put('/', async (req, res) => {
	try {
		await create(req.body);
		console.log('Put Semester');
		res.send(req.body.name + ' created successfully');
	} catch (err) {
		console.log('Semester not created');
		res.send('ERROR: semester not created');
	}
});

semesterRouter.post('/', async (req, res) => {
	try {
		update(req.body);
		console.log('Post Semester');
		res.send('Semester updated');
	} catch (err) {
		console.log('Semester not updated');
		res.send('ERROR: semester not updated');
	}
});

semesterRouter.delete('/', async (req, res) => {
	try {
		del(req.body.id);
		console.log('Delete Semester');
		res.send('Semester deleted');
	} catch (err) {
		console.log('Semester not deleted');
		res.send('ERROR: semester not created');
	}
});
export default semesterRouter;

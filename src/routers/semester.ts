import express from 'express';
import { create, read, update, del } from '../operators/semesterOperations';
import Semester from '../models/semester';
import { CourseInterface } from '../models/course';

const semesterRouter = express.Router();

const ERROR_RESPONSE = 'Semester not found.';

semesterRouter.get('/:id', async (req, res) => {
	try {
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
		const userID = req.header('userID');
		if (userID) {
			const courses = new Set<CourseInterface>();
			const semester = new Semester({
				owner: userID,
				name: req.body.name,
				courses: courses,
			});
			console.log('creating semester');
			const created = await create(semester);
			console.log('semester created', created);
			res.json(created);
		}
	} catch (err) {
		console.error(err); // TODO: rm after testing
		res.status(404).send(ERROR_RESPONSE);
	}
});

semesterRouter.put('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			const body = req.body;
			const semester = new Semester({
				id: body.id,
				owner: userID,
				name: body.name,
			});
			const updated = await update(semester, userID);
			res.json(updated);
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
			res.send('Semester deleted');
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});
export default semesterRouter;

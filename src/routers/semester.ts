import express from 'express';
import { create, read, update, del } from '../operators/semesterOperations';
import Semester from '../models/semester';

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
			const semester = new Semester({
				owner: userID,
				name: req.body.name,
				courseItems: [],
			});
			const created = await create(semester);
			res.json(created);
		}
	} catch (err) {
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

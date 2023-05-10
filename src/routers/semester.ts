import express from 'express';
import Ajv from 'ajv';
import Semester from '../models/semester';
import schema from '../types/schema.json';

const semesterRouter = express.Router();
const ajv = new Ajv({ removeAdditional: true });

const ERROR_RESPONSE = 'Semester not found.';

semesterRouter.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (id && userID) {
			/* leaving this here as a reminder to add courses array if necessary */
			// const semester = await read(req.params.id, userID);
			// const resData = {
			// 	...semester,
			// 	courses: Array.from(semester?.courses || []),
			// };

			// TODO: call db operation
			res.status(200); // + .json(semester)
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

semesterRouter.post('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			const body = req.body;
			const checkPost = ajv.compile(
				schema.components.schemas.SemesterCreate
			);

			if (checkPost(body)) throw Error('body invalid');

			const semester = new Semester({ owner: userID, ...body });

			console.log(semester); // TODO: call db operation
			res.status(201); // + .json(created);
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

semesterRouter.put('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (id && userID) {
			const body = req.body;
			const checkPut = ajv.compile(
				schema.components.schemas.SemesterUpdate
			);

			if (checkPut(body)) throw Error('body invalid');

			const semester = new Semester(body);

			console.log(semester); // TODO: call db operation
			res.status(200); // + .json(updated)
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

semesterRouter.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (id && userID) {
			// TODO: call db operation
			res.status(200);
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});
export default semesterRouter;

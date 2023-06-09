import express from 'express';
import Ajv from 'ajv';
import schema from '../schema.json';

const semesterRouter = express.Router();
const ajv = new Ajv({ removeAdditional: true });

const schemas = schema.components.schemas;
const checkPost = ajv.compile(schemas.SemesterCreate);
const checkPut = ajv.compile(schemas.SemesterUpdate);

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

			if (checkPost(body)) throw Error('body invalid');

			console.log(body); // TODO: call db operation
			res.status(201); // + .json(created);
		} else {
			throw Error('invalid user id');
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

			if (checkPut(body)) throw Error('body invalid');

			console.log(body); // TODO: call db operation
			res.status(200); // + .json(updated)
		} else {
			throw Error(`invalid ${id ? 'user' : 'semester'} id`);
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

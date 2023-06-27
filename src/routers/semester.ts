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
		if (!id || !userID)
			throw Error(`invalid ${id ? 'user' : 'semester'} id`);

		/* leaving this here as a reminder to add courses array if necessary */
		// const semester = await read(req.params.id, userID);
		// const resData = {
		// 	...semester,
		// 	courses: Array.from(semester?.courses || []),
		// };

		// TODO: call db operation
		res.status(200); // + .json(semester)
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

semesterRouter.post('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (!userID) throw Error(`invalid user id`);

		const body = req.body;
		if (checkPost(body)) throw Error('body invalid');

		// TODO: call db operation
		res.status(201); // + .json(created);
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

semesterRouter.put('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (!id || !userID)
			throw Error(`invalid ${id ? 'user' : 'semester'} id`);

		const body = req.body;
		if (checkPut(body)) throw Error('body invalid');

		// TODO: call db operation
		res.status(200); // + .json(updated)
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

semesterRouter.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (!id || !userID)
			throw Error(`invalid ${id ? 'user' : 'semester'} id`);

		// TODO: call db operation
		res.status(200);
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});
export default semesterRouter;

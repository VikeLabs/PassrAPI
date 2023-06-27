import express from 'express';
import Ajv from 'ajv';
import schema from '../schema.json';

const courseRouter = express.Router();
const ajv = new Ajv({ removeAdditional: true });

const schemas = schema.components.schemas;
const checkPost = ajv.compile(schemas.CourseCreate);
const checkPut = ajv.compile(schemas.CourseUpdate);

const ERROR_RESPONSE = 'Course not found.';

courseRouter.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');

		if (!id || !userID) throw Error(`invalid ${id ? 'user' : 'course'} id`);

		// TODO: call db operation
		res.status(200); // + .json(course)
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

courseRouter.post('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (!userID) throw Error(`invalid user id`);

		const body = req.body;
		if (checkPost(body)) throw Error('body invalid');

		// TODO: call db operation
		res.status(201); // + .json(created)
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

courseRouter.put('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (!id || !userID) throw Error(`invalid ${id ? 'user' : 'course'} id`);

		const body = req.body;
		if (checkPut(body)) throw Error('body invalid');

		console.log(body); // TODO: call db operation
		res.status(200); // + .json(updated)
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

courseRouter.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (!id || !userID) throw Error(`invalid ${id ? 'user' : 'course'} id`);

		// TODO: call db operation
		res.status(200);
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

export default courseRouter;

import express from 'express';
import Ajv from 'ajv';
import Course from '../models/course';
import schema from '../types/schema.json';

const courseRouter = express.Router();
const ajv = new Ajv({ removeAdditional: true });

courseRouter.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');

		if (id && userID) {
			// TODO: call db operation
			res.status(200); // + .json(course)
		} else {
			throw 'ERROR - id undefined';
		}
	} catch (err) {
		res.status(404).send('Not found.');
	}
});

courseRouter.post('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			const body = req.body;
			const checkPost = ajv.compile(
				schema.components.schemas.CourseCreate
			);

			if (checkPost(body)) throw Error('body invalid');

			const course = new Course({ ownerId: userID, ...body });

			console.log(course); // TODO: call db operation
			res.status(201); // + .json(created)
		}
	} catch (err) {
		res.status(404).send('Not found.');
	}
});

courseRouter.put('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (id && userID) {
			const body = req.body;
			const checkPut = ajv.compile(
				schema.components.schemas.CourseUpdate
			);

			if (checkPut(body)) throw Error('body invalid');

			const course = new Course(body);

			console.log(course); // TODO: call db operation
			res.status(200); // + .json(updated)
		}
	} catch (err) {
		res.status(404).send('Not found.');
	}
});

courseRouter.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (id && userID) {
			// TODO: call db operation
			res.status(200);
		}
	} catch (err) {
		res.status(404).send('Not found.');
	}
});

export default courseRouter;

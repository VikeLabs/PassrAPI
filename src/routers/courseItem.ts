import express from 'express';
import Ajv from 'ajv';
import schema from '../schema.json';

const cItemRouter = express.Router();
const ajv = new Ajv({ removeAdditional: true });

const schemas = schema.components.schemas;
const checkPost = ajv.compile(schemas.CourseItemCreate);
const checkPut = ajv.compile(schemas.CourseItemUpdate);

const ERROR_RESPONSE = 'Course item not found.';

cItemRouter.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (!id || !userID)
			throw Error(`invalid ${id ? 'user' : 'course item'} id`);

		// TODO: call db operation
		res.status(200); // + .json(courseItem)
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

// helper function converts string to valid number-esque type
// note: if string is empty, will return undefined
const numberify = (str: string) => {
	if (str === undefined || str === '') {
		return undefined;
	}

	const regex = /^(\d+\.?\d*)\/(\d+\.?\d*)$/;
	const match = str.match(regex);
	if (match) {
		return Number(match[1]) / Number(match[2]);
	}

	return Number(str); // Not guranteed to be a number since we don't know what is stored in str
};

cItemRouter.post('/', async (req, res) => {
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

cItemRouter.put('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (!id || !userID)
			throw Error(`invalid ${id ? 'user' : 'course item'} id`);

		const body = req.body;
		if (checkPut(body)) throw Error('body invalid');

		// TODO: call db operation
		res.status(200); // + .json(updated)
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

cItemRouter.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (!id || !userID)
			throw Error(`invalid ${id ? 'user' : 'course item'} id`);

		// TODO: call db operation
		res.status(200);
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

export default cItemRouter;

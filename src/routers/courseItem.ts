import express from 'express';
import Ajv from 'ajv';
import CourseItem from '../models/courseItem';
import schema from '../types/schema.json';

const cItemRouter = express.Router();
const ajv = new Ajv({ removeAdditional: true });

const ERROR_RESPONSE = 'Course item not found.';

cItemRouter.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (id && userID) {
			// TODO: call db operation
			res.status(200); // + .json(courseItem)
		} else {
			throw Error('id not found');
		}
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
		if (userID) {
			const body = req.body;
			const checkPost = ajv.compile(
				schema.components.schemas.CourseItemCreate
			);

			if (checkPost(body)) throw Error('body invalid');

			const courseItem = new CourseItem({ ownerId: userID, ...body });

			console.log(courseItem); // TODO: call db operation
			res.status(201); // + .json(created)
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

cItemRouter.put('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (id && userID) {
			const body = req.body;
			const checkPut = ajv.compile(
				schema.components.schemas.CourseItemUpdate
			);

			if (checkPut(body)) throw Error('body invalid');

			const courseItem = new CourseItem(body);

			console.log(courseItem); // TODO: call db operation
			res.status(200); // + .json(updated)
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

cItemRouter.delete('/:id', async (req, res) => {
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

export default cItemRouter;

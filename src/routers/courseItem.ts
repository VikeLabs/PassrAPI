import express from 'express';
import { create, read, update, del } from '../operators/courseItemOperations';
import CourseItem from '../models/courseItem';

const cItemRouter = express.Router();

const ERROR_RESPONSE = 'Course item not found.';

cItemRouter.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');
		if (id && userID) {
			const courseItem = await read(id, userID);
			res.send(courseItem);
		} else {
			throw 'ERROR - id undefined';
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
			const courseItem = new CourseItem({
				id: body.id,
				owner: userID,
				name: body.name,
				weight: numberify(body.weight),
				grade: numberify(body.grade),
				date: body.date,
				createdAt: body.createdAt,
				updatedAt: body.updatedAt,
			});
			const created = await create(courseItem);
			res.json(created);
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

cItemRouter.put('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			const body = req.body;
			const name = body.name;
			const weight = numberify(body.weight);
			const grade = numberify(body.grade);
			const date = body.date;
			const courseItem = new CourseItem({
				id: body.id,
				...(name ? { name } : {}),
				...(weight ? { weight } : {}),
				...(grade ? { grade } : {}),
				...(date ? { date } : {}),
			});
			const updated = await update(courseItem, userID);
			res.json(updated);
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

cItemRouter.delete('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			await del(req.body.id, userID);
			res.send('Delete cItemRouter');
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

export default cItemRouter;

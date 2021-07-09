import express from 'express';
import { create, read, update, del } from '../operators/courseItemOperations';

const cItemRouter = express.Router();

cItemRouter.get('/:id', async (req, res) => {
	try {
		console.log('Get course Item');
		const id = req.params.id;
		const userID = req.header('userID');
		if (id && userID) {
			const courseItem = await read(id, userID);
			console.log(courseItem);
			res.send(courseItem);
		} else {
			throw 'ERROR - id undefined';
		}
	} catch (err) {
		res.status(404).send(err);
	}
});

cItemRouter.post('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			await update(req.body, userID);
			console.log('Post Course Item');
			res.send('Post cItemRouter');
		}
	} catch (err) {
		res.status(404).send(err);
	}
});

cItemRouter.put('/', async (req, res) => {
	try {
		await create(req.body);
		console.log('Put Course Item');
		res.send('Put cItemRouter: ' + req.body.name);
	} catch (err) {
		res.status(404).send(err);
	}
});

cItemRouter.delete('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			await del(req.body.id, userID);
			console.log('Delete Course Item');
			res.send('Delete cItemRouter');
		}
	} catch (err) {
		res.status(404).send(err);
	}
});

export default cItemRouter;

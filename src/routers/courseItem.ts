import express from 'express';
import { create, read, update, del } from '../operators/courseItemOperations';

const cItemRouter = express.Router();

cItemRouter.get('/', async (req, res) => {
	try {
		console.log('Get Course Item');
		const courseItem = await read(req.body.id);
		console.log(courseItem);
		res.send(courseItem);
	} catch (err) {
		console.error(err);
	}
});

cItemRouter.post('/', async (req, res) => {
	try {
		await update(req.body);
		console.log('Post Course Item');
		res.send('Post cItemRouter');
	} catch (err) {
		console.error(err);
	}
});

cItemRouter.put('/', async (req, res) => {
	try {
		await create(req.body);
		console.log('Put Course Item');
		res.send('Put cItemRouter: ' + req.body.name);
	} catch (err) {
		console.error(err);
	}

});

cItemRouter.delete('/', async (req, res) => {
	try {
		del(req.body.id);
		console.log('Delete Course Item');
		res.send('Delete cItemRouter');
	} catch (err) {
		console.error(err);
	}
});

export default cItemRouter;

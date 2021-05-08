import express from 'express';
import { create, read, update, del } from '../operators/courseItemOperations';

const cItemRouter = express.Router();

cItemRouter.get('/', async (req, res) => {
	try {
		const courseItem = await read(req.body.id);
		console.log('Get Course Item');
		console.log(courseItem);
		// res.send('Get cItemRouter');
		res.send(courseItem);
	} catch (err) {
		console.error(err);
	}
});

cItemRouter.post('/', (req, res) => {
	create(req.body);
	console.log('Post Course Item');
	console.log(req.body);
	res.send('Post cItemRouter');
	res.send(req.body);
});

cItemRouter.put('/', (req, res) => {
	update(req.body.id, req.body);
	console.log('Put Course Item');
	res.send('Put cItemRouter');
});

cItemRouter.delete('/', (req, res) => {
	del(req.body.id);
	console.log('Delete Course Item');
	res.send('Delete cItemRouter');
});
export default cItemRouter;

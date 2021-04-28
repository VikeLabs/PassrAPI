import express from 'express';
import { create, read, update, del } from '../operators/courseItemOperations';

const cItemRouter = express.Router();
const app = express();

app.use(express.json());

cItemRouter.get('/', (req, res) => {
	const courseItem = read(req.body.id);
	console.log('Get Course Item');
	console.log(courseItem);
	res.send('Get cItemRouter');
});

cItemRouter.post('/', (req, res) => {
	create(req.body);
	console.log('Post Course Item');
	res.send('Post cItemRouter');
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

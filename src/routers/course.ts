import express from 'express';
import { create, read, update, del } from '../operators/courseOperations';
// import { v4 as uuidv4 } from 'uuid';

const courseRouter = express.Router();
const app = express();

app.use(express.json());

courseRouter.get('/', async (req, res) => {
	try {
		//const course = req.params.id;
		await read(req.body.id);
		res.send('Get courseRouter');
	} catch (err) {
		res.status(404).send('Not found.');
	}
});

courseRouter.post('/', async (req, res) => {
	try {
		console.log('in put');
		console.log(req.body);
		await update(req.body);
		console.log('Put Course');
		res.send('Put courseRouter');
	} catch (err) {
		res.status(404).send('Not found.');
	}
});

courseRouter.put('/', async (req, res) => {
	try {
		await create(req.body);
		res.send('Post courseRouter');
	} catch (err) {
		res.status(404).send('Not found.');
	}
});

courseRouter.delete('/', async (req, res) => {
	try {
		await del(req.body.id);
		console.log('Delete Course');
		res.send('Delete courseRouter');
		
	} catch (err) {
		res.status(404).send('Not found.');
	}
});
export default courseRouter;

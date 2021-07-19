import express from 'express';
import { create, read, update, del } from '../operators/courseOperations';

const courseRouter = express.Router();
const app = express();

app.use(express.json());

courseRouter.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');

		if (id && userID) {
			const course = await read(id, userID);
			res.send(course);
		} else {
			throw 'ERROR - id undefined';
		}
	} catch (err) {
		res.status(404).send(err);
	}

});

courseRouter.post('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {

			await update(req.body, userID);
			console.log('Post Course');
			res.send('Post courseRouter');
		}
	} catch (err) {
		res.status(404).send('Not found.');
	}

});

courseRouter.put('/', async (req, res) => {
	try {
		await create(req.body);
		console.log('Put Course');
		res.send('Put courseRouter: ' + req.body.name);
	} catch (err) {
		res.status(404).send(err);
	}
});

courseRouter.delete('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		
		if (userID) {
			await del(req.body.id, userID);
			console.log('Delete Course');
			res.send('Delete courseRouter');
		}
	} catch (err) {
		res.status(404).send(err);
	}
});

export default courseRouter;

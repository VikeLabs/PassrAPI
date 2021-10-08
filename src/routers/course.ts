import express from 'express';
import { create, read, update, del } from '../operators/courseOperations';

const courseRouter = express.Router();

courseRouter.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const userID = req.header('userID');

		if (id && userID) {
			const course = await read(id, userID);

			if (course) {
				const resData = {
					...course,
					courseItems: Array.from(course.courseItems || []),
				};
				res.send(resData);
			} else {
				throw 'ERROR - course undefined';
			}

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
		res.status(404).send('Not found.');
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
		res.status(404).send('Not found.');
	}
});

export default courseRouter;

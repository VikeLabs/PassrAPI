import express from 'express';
import Course from '../models/course';
import { create, read, update, del } from '../operators/CourseOperations';

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
			const course = new Course({
				owner: userID,
				name: req.body.name,
			});
			await create(course);
			console.log('Post Course');
			res.send('Post courseRouter: ' + req.body.name);
		}
	} catch (err) {
		res.status(404).send('Not found.');
	}
});

courseRouter.put('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			const course = new Course({
				id: req.body.id,
				name: req.body.name,
			});
			await update(course, userID);
			console.log('Put Course');
			res.send('Put courseRouter');
		}
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

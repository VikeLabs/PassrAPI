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
				name: req.body.course.name,
			});

			const coursePackage = {
				course: course,
				parent: req.body.parent,
			};

			const created = await create(coursePackage);
			res.json(created);
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
			const updated = await update(course, userID);
			res.json(updated);
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
			res.send('Delete courseRouter');
		}
	} catch (err) {
		res.status(404).send('Not found.');
	}
});

export default courseRouter;

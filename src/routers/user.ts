import express from 'express';
import { create, read, update, del } from '../operators/UserOperations';

const userRouter = express.Router();

userRouter.get('/:id', async (req, res) => {
	try {
		console.log('Get User');
		const user = await read(req.params.id);
		res.send({ ...user, semesters: Array.from(user?.semesters || []) });
	} catch (e) {
		res.status(404).send(e);
		console.error('error: ' + res.statusCode);
	}
});

userRouter.post('/', async (req, res) => {
	try {
		console.log('Post User');
		await update(req.body);
		res.send('User posted');
	} catch (e) {
		res.status(404).send(e);
		console.error(e + res.statusCode);
	}
});

userRouter.put('/', async (req, res) => {
	try {
		console.log('Put User');
		await create(req.body);
		res.send('User Created');
	} catch (e) {
		res.status(404).send(e);
		console.error(e + res.statusCode);
	}
});

userRouter.delete('/', async (req, res) => {
	try {
		console.log('Delete User');
		await del(req.body.id);
		res.send('User Deleted');
	} catch (e) {
		res.status(404).send(e);
		console.error(e + res.statusCode);
	}
});

export default userRouter;

import express from 'express';
import { create, read, update, del } from '../operators/UserOperations';

const userRouter = express.Router();

userRouter.get('/:id', async (req, res) => {
	try {
		const user = await read(req.params.id);
		console.log(user);
		res.send({ ...user, semesters: Array.from(user?.semesters || []) });
		res.send('Got User');
	} catch (e) {
		res.status(404).send(e);
		console.error('error: ' + res.statusCode);
	}
});

userRouter.post('/', async (req, res) => {
	try {
		await update(req.body);
		console.log(req.body);
		res.send('User posted');
	} catch (e) {
		res.status(404).send(e);
		console.error(e + res.statusCode);
	}
});

userRouter.put('/', async (req, res) => {
	try {
		await create(req.body);
		console.log(req.body);
		res.send('User Created');
	} catch (e) {
		res.status(404).send(e);
		console.error(e + res.statusCode);
	}
});

userRouter.delete('/', async (req, res) => {
	try {
		await del(req.body.id);
		res.send('User Deleted');
	} catch (e) {
		res.status(404).send(e);
		console.error(e + res.statusCode);
	}
});

export default userRouter;

import express from 'express';
import { create, read, update, del } from '../operators/UserOperations';

const userRouter = express.Router();
const userError = 'User not found.';

userRouter.get('/', async (req, res) => {
	try {
		if (!req.userId) {
			throw 'ERROR: No user ID found.';
		}
		const user = await read(req.userId);
		res.send({ ...user, semesters: Array.from(user?.semesters || []) });
	} catch (e) {
		res.status(404).send(userError);
		console.error(`Error: ${e} - Status Code ${res.statusCode}`);
	}
});

userRouter.post('/', async (req, res) => {
	try {
		await update(req.body);
		res.send('User posted');
	} catch (e) {
		res.status(404).send(userError);
		console.error(`Error: ${e} - Status Code ${res.statusCode}`);
	}
});

userRouter.put('/', async (req, res) => {
	try {
		await create(req.body);
		res.send('User Created');
	} catch (e) {
		res.status(404).send(userError);
		console.error(`Error: ${e} - Status Code ${res.statusCode}`);
	}
});

userRouter.delete('/', async (req, res) => {
	try {
		await del(req.body.id);
		res.send('User Deleted');
	} catch (e) {
		res.status(404).send(userError);
		console.error(`Error: ${e} - Status Code ${res.statusCode}`);
	}
});

export default userRouter;

import express from 'express';

const userRouter = express.Router();
const userError = 'User not found.';

userRouter.get('/:id', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (!userID) {
			throw new Error('ERROR: No user ID found.');
		}

		/* leaving this here as a reminder to add semesters array if necessary */
		// res.send({ ...user, semesters: Array.from(user?.semesters || []) });

		// TODO: call db operation
		res.status(200); // + .json(user)
	} catch (e) {
		res.status(404).send(userError);
		console.error(`Error: ${e} - Status Code ${res.statusCode}`);
	}
});

userRouter.post('/', async (req, res) => {
	try {
		// TODO: call db operation
		res.status(201); // + .json(created)
	} catch (e) {
		res.status(404).send(userError);
		console.error(`Error: ${e} - Status Code ${res.statusCode}`);
	}
});

userRouter.delete('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (!userID) {
			throw 'ERROR: No user ID found.';
		}

		// TODO: call db operation
		res.status(200);
	} catch (e) {
		res.status(404).send(userError);
		console.error(`Error: ${e} - Status Code ${res.statusCode}`);
	}
});

export default userRouter;

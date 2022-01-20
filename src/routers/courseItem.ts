import express from 'express';
import { create, read, update, del } from '../operators/courseItemOperations';

const cItemRouter = express.Router();

const ERROR_RESPONSE = 'Course item not found.';

cItemRouter.get('/:id', async (req, res) => {
	try {
		console.log('Get course Item');
		const id = req.params.id;
		const userID = req.header('userID');
		if (id && userID) {
			const courseItem = await read(id, userID);
			console.log(courseItem);
			res.send(courseItem);
		} else {
			throw 'ERROR - id undefined';
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

// helper function converts string to number
//   - should be updated to support fractions
const numberify = (str: string) => {
     const regex = /^(\d+\.?\d*)\/(\d+\.?\d*)$/;
     const match = str.match(regex);
     if(match) {
         return Number(match[1])/Number(match[2]);
     }
     
     return Number(str); // Not guranteed to be a number since we don't know what is store in str
};

cItemRouter.post('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			const body = req.body;
			body.owner = userID;
			body.weight = numberify(body.weight);
			body.grade = numberify(body.grade);

			await create(req.body);
			console.log('Post Course Item');
			res.send('Post cItemRouter: ' + req.body.name);
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

cItemRouter.put('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			await update(req.body, userID);
			console.log('Put Course Item');
			res.send('Put cItemRouter');
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

cItemRouter.delete('/', async (req, res) => {
	try {
		const userID = req.header('userID');
		if (userID) {
			await del(req.body.id, userID);
			console.log('Delete Course Item');
			res.send('Delete cItemRouter');
		}
	} catch (err) {
		res.status(404).send(ERROR_RESPONSE);
	}
});

export default cItemRouter;

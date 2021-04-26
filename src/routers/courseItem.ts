import express from 'express';
import CourseItem, { CourseItemInterface } from '../models/courseItem';
import dynamoose from 'dynamoose';

const cItemRouter = express.Router();

cItemRouter.get('/', (req, res) => {
	console.log('Get Course Item');
	res.send('Get cItemRouter');
});

const create = async (document: CourseItemInterface) => {
	try {
		CourseItem.create(document);
	} catch (err) {
		console.error(err);
	}
}

cItemRouter.post('/', (req, res) => {
	create(req.body);
	console.log('Post Course Item');
	res.send('Post cItemRouter');
});

cItemRouter.put('/', (req, res) => {
	console.log('Put Course Item');
	res.send('Put cItemRouter');
});

cItemRouter.delete('/', (req, res) => {
	console.log('Delete Course Item');
	res.send('Delete cItemRouter');
});
export default cItemRouter;

import express from 'express';
import { create, read, update, del } from '../operators/CourseOperations';

const courseRouter = express.Router();
const app = express();

app.use(express.json());

courseRouter.get('/', (req, res) => {
	const course = read(req.body.id);
	console.log('Get Course');
	console.log(course);
	res.send('Get courseRouter');
});

courseRouter.post('/', (req, res) => {
	create(req.body);
	console.log('Post Course');
	res.send('Post courseRouter');
});

courseRouter.put('/', (req, res) => {
	update(req.body.id, req.body);
	console.log('Put Course');
	res.send('Put courseRouter');
});

courseRouter.delete('/', (req, res) => {
	del(req.body.id);
	console.log('Delete Course');
	res.send('Delete courseRouter');
});
export default courseRouter;

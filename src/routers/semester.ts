import express from 'express';
import { create, read, update, del } from '../operators/semesterOperations';

const semesterRouter = express.Router();
const app = express();

app.use(express.json());

semesterRouter.get('/', (req, res) => {
	const semester = read(req.body.id);
	console.log('Get Semester');
	console.log(semester);
	res.send('Get semesterRouter');
});

semesterRouter.post('/', (req, res) => {
	create(req.body);
	console.log('Post Semester');
	res.send('Post semesterRouter');
});

semesterRouter.put('/', (req, res) => {
	update(req.body.id, req.body);
	console.log('Put Semester');
	res.send('Put semesterRouter');
});

semesterRouter.delete('/', (req, res) => {
	del(req.body.id);
	console.log('Delete Semester');
	res.send('Delete semesterRouter');
});
export default semesterRouter;

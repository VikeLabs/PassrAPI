import express from 'express';

const courseRouter = express.Router();

courseRouter.get('/', (req, res) => {
	console.log('Get Course');
	res.send('Get courseRouter');
});

courseRouter.post('/', (req, res) => {
	console.log('Post Course');
	res.send('Post courseRouter');
});

courseRouter.put('/', (req, res) => {
	console.log('Put Course');
	res.send('Put courseRouter');
});

courseRouter.delete('/', (req, res) => {
	console.log('Delete Course');
	res.send('Delete courseRouter');
});
export default courseRouter;

import express from 'express';
import userRouter from './routers/user';
import courseRouter from './routers/course';
import cItemRouter from './routers/courseItem';
import semesterRouter from './routers/semester';
import jwtDecode from 'jwt-decode';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	if (req.headers.authorization) {
		try {
			req.userId = jwtDecode<{
				'cognito:username': string;
			}>(req.headers.authorization)['cognito:username'];
		} catch (err) {
			return res.status(401).send('Unauthorized');
		}
	}
	next();
});

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	next();
});

app.get('/', (req, res) => {
	res.send('Successful PassrAPI!');
});

app.use('/user', userRouter);
app.use('/semester', semesterRouter);
app.use('/coure', courseRouter);
app.use('/courseItem', cItemRouter);

export default app;

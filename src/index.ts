import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routers/user';
import courseRouter from './routers/course';
import cItemRouter from './routers/courseItem';
import semesterRouter from './routers/semester';
import cors from 'cors';
import { useAuth } from './auth';
import fetch from 'node-fetch';

const port = 5000;
const app = express();

async function main() {
	app.use(
		cors({
			origin: ['http://localhost:3000', 'https://dev.passr.ca'],
			credentials: true,
		})
	);

	const resp = await fetch(
		'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_vJkg3pOaE/.well-known/jwks.json'
	);

	const keys = (await resp.json()).keys;

	app.use(useAuth(keys));

	app.use('/user', userRouter);
	app.use('/semester', semesterRouter);
	app.use('/coure', courseRouter);
	app.use('/courseItem', cItemRouter);

	app.listen(port, () => {
		console.log('Running Passr API.');
	});
}

main();

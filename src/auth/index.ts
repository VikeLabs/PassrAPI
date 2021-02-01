import express, { RequestHandler } from 'express';

export const auth: RequestHandler = (req, res, next) => {
	console.log('Authenticating');
	next();
};

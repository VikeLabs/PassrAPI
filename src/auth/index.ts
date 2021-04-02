import { RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

interface Key {
	kid: string;
	alg: string;
	kty: string;
	e: string;
	n: string;
	use: string;
}

interface DecodedToken {
	sub: string;
	aud: string;
	email_verified: boolean;
	event_id: string;
	token_use: 'id' | '';
	auth_time: number;
	iss: string;
	exp: number;
	iat: number;
	email: string;
}

const fail = (res: Response) => {
	res.status(404).send('Not Found.');
};

export const useAuth = (userPoolKeys: Key[]): RequestHandler => (
	req,
	res,
	next
) => {
	req.userId = undefined;
	const token = req.headers.authorization?.split(' ').slice(-1)[0];
	if (token == undefined) {
		fail(res);
		return;
	}

	const tokenParts = token.split('.');
	if (tokenParts.length != 3) {
		fail(res);
		return;
	}
	const header = JSON.parse(Buffer.from(tokenParts[0], 'base64').toString());

	const jwk = userPoolKeys.find(
		(item) => item.kid === header.kid
	) as jwkToPem.JWK;

	if (jwk == undefined) {
		fail(res);
		return;
	}

	const pem = jwkToPem(jwk);
	try {
		const decodedToken = jwt
			.verify(token, pem, {
				algorithms: ['RS256'],
				audience: '2hrepr37i355p2ni0ffsi2bami',
				issuer:
					'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_vJkg3pOaE',
			})
			.valueOf() as DecodedToken;
		console.log(decodedToken);
		req.userId = decodedToken.sub;
		next();
	} catch (err) {
		console.error(err);
		fail(res);
		return;
	}
};

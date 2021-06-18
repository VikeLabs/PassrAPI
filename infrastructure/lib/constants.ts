// From email needs to be verified in SES console until support is added to CDK
const AUTH_FROM_EMAIL = 'no-reply@passr.ca';
const AUTH_EMAIL_SUBJECT = 'Verify your Passr Account!';
const AUTH_EMAIL_BODY = `
Welcome to Passr!

Your verification code is {####}
`;

const DEV_API_URL = 'api.dev.passr.ca';
const PROD_API_URL = 'api.passr.ca';

const HOSTED_ZONE_ID_PARAM = 'ROUTE_53_HOSTED_ZONE_ID_SSM_PARAM';
const HOSTED_ZONE_NAME_PARAM = 'ROUTE_53_HOSTED_ZONE_NAME_PARAM';
const CERTIFICATE_ARN_PARAM = 'CERTIFICATE_ARN_PARAM';

const PROJECT_PREFIX = 'passr';

export default {
	AUTH_EMAIL_BODY,
	AUTH_EMAIL_SUBJECT,
	AUTH_FROM_EMAIL,
	CERTIFICATE_ARN_PARAM,
	DEV_API_URL,
	PROD_API_URL,
	HOSTED_ZONE_ID_PARAM,
	HOSTED_ZONE_NAME_PARAM,
	PROJECT_PREFIX,
};

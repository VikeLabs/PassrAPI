#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import constants from '../lib/constants';
import { CertificateStack } from '../lib/certificate-stack';
import { APIStack } from '../lib/api-stack';
import { AuthStack } from '../lib/auth-stack';
import { DBStack } from '../lib/db-stack';

const app = new cdk.App();

const devEnvPrefix = 'DEV';

const certificateStack = new CertificateStack(
	app,
	`${constants.PROJECT_PREFIX}-api-certificate`
);

const devAuth = new AuthStack(app, `${constants.PROJECT_PREFIX}-dev-Auth`, {
	envPrefix: devEnvPrefix,
});

const devApiDomain = [
	constants.DEV_API_URL_PREFIX,
	constants.BASE_DOMAIN_URL,
].join('.');

const devAPI = new APIStack(app, `${constants.PROJECT_PREFIX}-dev-API`, {
	userPool: devAuth.userPool,
	userPoolClient: devAuth.userPoolClient,
	envPrefix: devEnvPrefix,
	apiDomain: devApiDomain,
	certificate: certificateStack.certificate,
});

new DBStack(app, `${constants.PROJECT_PREFIX}-dev-DB`, {
	apiHandler: devAPI.handler,
	prod: false,
	envPrefix: devEnvPrefix,
});

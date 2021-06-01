#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import constants from '../lib/constants';
import { APIStack } from '../lib/api-stack';
import { AuthStack } from '../lib/auth-stack';
import { DBStack } from '../lib/db-stack';

const app = new cdk.App();

const devEnvPrefix = 'DEV';

const devAuth = new AuthStack(app, `${constants.PROJECT_PREFIX}-dev-Auth`, {
	envPrefix: devEnvPrefix,
});

const devAPI = new APIStack(app, `${constants.PROJECT_PREFIX}-dev-API`, {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
	userPool: devAuth.userPool,
	userPoolClient: devAuth.userPoolClient,
	envPrefix: devEnvPrefix,
});

new DBStack(app, `${constants.PROJECT_PREFIX}-dev-DB`, {
	apiHandler: devAPI.handler,
	prod: false,
	envPrefix: devEnvPrefix,
});

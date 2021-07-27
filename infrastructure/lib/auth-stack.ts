import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import constants from './constants';

interface AuthStackProps extends cdk.StackProps {
	envPrefix: string;
}

export class AuthStack extends cdk.Stack {
	userPool: cognito.IUserPool;

	userPoolClient: cognito.IUserPoolClient;

	constructor(scope: cdk.Construct, id: string, props: AuthStackProps) {
		super(scope, id, props);
		this.userPool = new cognito.UserPool(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-UserPool`,
			{
				accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
				autoVerify: { email: true },
				passwordPolicy: {
					minLength: 8,
					requireLowercase: true,
					requireUppercase: true,
					tempPasswordValidity: cdk.Duration.days(2),
				},
				signInAliases: {
					email: true,
					phone: false,
					preferredUsername: false,
					username: false,
				},
				signInCaseSensitive: false,
				standardAttributes: {
					email: {
						required: true,
						mutable: true,
					},
					emailVerified: {
						required: true,
					},
				},
				userVerification: {
					emailBody: constants.AUTH_EMAIL_BODY,
					emailSubject: constants.AUTH_EMAIL_SUBJECT,
				},
			}
		);

		const cfnUserPool = this.userPool.node
			.defaultChild as cognito.CfnUserPool;

		cfnUserPool.emailConfiguration = {
			emailSendingAccount: 'DEVELOPER',
			from: `Passr Account Management<${constants.AUTH_FROM_EMAIL}>`,
			sourceArn: `arn:aws:ses:us-west-2:006316662763:identity/no-reply@passr.ca`,
		};

		this.userPoolClient = new cognito.UserPoolClient(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-UserPoolClient`,
			{
				userPool: this.userPool,
				authFlows: { userSrp: true },
			}
		);
	}
}

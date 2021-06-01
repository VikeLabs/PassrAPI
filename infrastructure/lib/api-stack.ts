import * as cdk from '@aws-cdk/core';
import * as S3 from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigatewayv2';
import * as integrations from '@aws-cdk/aws-apigatewayv2-integrations';
import * as authorizers from '@aws-cdk/aws-apigatewayv2-authorizers';
import * as cognito from '@aws-cdk/aws-cognito';
import constants from './constants';

interface APIStackProps extends cdk.StackProps {
	userPool: cognito.IUserPool;
	userPoolClient: cognito.IUserPoolClient;
	envPrefix: string;
}

export class APIStack extends cdk.Stack {
	handler: lambda.IFunction;

	constructor(scope: cdk.Construct, id: string, props: APIStackProps) {
		super(scope, id, props);

		const bucket = new S3.Bucket(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-APICode`
		);

		this.handler = new lambda.Function(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-APIFunction`,
			{
				runtime: lambda.Runtime.NODEJS_12_X,
				code: lambda.Code.fromAsset('build'),
				handler: 'lambda.handler',
				environment: {
					BUCKET: bucket.bucketName,
				},
			}
		);

		bucket.grantReadWrite(this.handler);

		const userPoolRegion = props.userPool.userPoolId.split('_')[0];

		const authorizer = new authorizers.HttpJwtAuthorizer({
			identitySource: ['$request.header.Authorization'],
			jwtAudience: [props.userPoolClient.userPoolClientId],
			jwtIssuer: `https://cognito-idp.${userPoolRegion}.amazonaws.com/${props.userPool.userPoolId}`,
			authorizerName: 'RouteAuthorizer',
		});

		const api = new apigateway.HttpApi(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-API`,
			{
				defaultAuthorizer: authorizer,
			}
		);

		const integration = new integrations.LambdaProxyIntegration({
			handler: this.handler,
		});
		api.addRoutes({
			integration,
			path: '/{proxy+}',
		});
		api.addRoutes({
			integration,
			path: '/',
		});
	}
}

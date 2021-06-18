import * as cdk from '@aws-cdk/core';
import * as S3 from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigatewayv2';
import * as integrations from '@aws-cdk/aws-apigatewayv2-integrations';
import * as authorizers from '@aws-cdk/aws-apigatewayv2-authorizers';
import * as cognito from '@aws-cdk/aws-cognito';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import constants from './constants';
import ParamFactories from './param-factories';
interface APIStackProps extends cdk.StackProps {
	userPool: cognito.IUserPool;
	userPoolClient: cognito.IUserPoolClient;
	envPrefix: string;
	apiDomain: string;
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

		const certificateArn = ParamFactories.CertificateArn(
			this,
			'CertificateArn'
		);

		const certificate = certificateManager.Certificate.fromCertificateArn(
			this,
			'DomainCertificate',
			certificateArn
		);

		const apiDomainName = new apigateway.DomainName(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-APIDomain`,
			{
				certificate,
				domainName: props.apiDomain,
			}
		);

		const api = new apigateway.HttpApi(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-API`,
			{
				defaultAuthorizer: authorizer,
				defaultDomainMapping: {
					domainName: apiDomainName,
				},
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

		const hostedZoneName = ParamFactories.HostedZoneName(
			this,
			'HostedZoneName'
		);

		const hostedZoneId = ParamFactories.HostedZoneId(this, 'HostedZoneId');

		const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
			this,
			'HostedZone',
			{
				zoneName: hostedZoneName,
				hostedZoneId,
			}
		);

		const apiTarget = new route53Targets.ApiGatewayv2DomainProperties(
			apiDomainName.regionalDomainName,
			apiDomainName.regionalHostedZoneId
		);

		new route53.RecordSet(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-APIRecord`,
			{
				recordType: route53.RecordType.A,
				target: route53.RecordTarget.fromAlias(apiTarget),
				zone: hostedZone,
				ttl: cdk.Duration.hours(1),
			}
		);
	}
}

import * as cdk from '@aws-cdk/core';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import constants from './constants';
import ParamFactories from './param-factories';

export class CertificateStack extends cdk.Stack {
	certificate: certificateManager.ICertificate;
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		const hostedZoneId = ParamFactories.HostedZoneId(this, 'HostedZoneId');
		const hostedZoneName = ParamFactories.HostedZoneName(
			this,
			'HostedZoneName'
		);

		const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
			this,
			'HostedZone',
			{
				hostedZoneId,
				zoneName: hostedZoneName,
			}
		);
		const domainName = [
			constants.PROD_API_URL_PREFIX,
			constants.BASE_DOMAIN_URL,
		].join('.');
		const subjectAlternativeNames = [
			[
				'*',
				constants.PROD_API_URL_PREFIX,
				constants.BASE_DOMAIN_URL,
			].join('.'),
		];
		this.certificate = new certificateManager.Certificate(
			this,
			`${constants.PROJECT_PREFIX}-api-certificate`,
			{
				domainName,
				subjectAlternativeNames,
				validation: {
					method: certificateManager.ValidationMethod.DNS,
					props: {
						hostedZone,
						method: certificateManager.ValidationMethod.DNS,
					},
				},
			}
		);
	}
}

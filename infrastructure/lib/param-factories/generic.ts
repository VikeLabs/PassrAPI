import { Construct } from '@aws-cdk/core';
import { SSMParameterReader } from '../ssm-parameter-reader';

const GenericParamFactory = (parameterName: string, region: string) => (
	scope: Construct,
	id: string
) =>
	new SSMParameterReader(scope, id, {
		parameterName,
		region,
	}).getParameterValue();

export default GenericParamFactory;

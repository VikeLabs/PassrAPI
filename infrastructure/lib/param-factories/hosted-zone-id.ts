import GenericParamFactory from './generic';
import constants from '../constants';

const HostedZoneId = GenericParamFactory(
	constants.HOSTED_ZONE_ID_PARAM,
	'us-east-1'
);

export { HostedZoneId };

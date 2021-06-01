import GenericParamFactory from './generic';
import constants from '../constants';

const HostedZoneName = GenericParamFactory(
	constants.HOSTED_ZONE_NAME_PARAM,
	'us-east-1'
);

export { HostedZoneName };

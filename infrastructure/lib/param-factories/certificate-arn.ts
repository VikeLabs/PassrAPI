import GenericParamFactory from './generic';
import constants from '../constants';

const CertificateArn = GenericParamFactory(
	constants.CERTIFICATE_ARN_PARAM,
	'us-east-1'
);

export { CertificateArn };

import * as dynamoose from 'dynamoose';

const initDB = async () => {
	try {
		dynamoose.model.defaults.set({
			prefix: 'Passr_',
		});

		if (process.env.NODE_ENV === 'production') {
			dynamoose.model.defaults.set({
				create: false,
				waitForActive: {
					enabled: false,
				},
			});
		} else {
			dynamoose.aws.ddb.local();
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export default initDB;

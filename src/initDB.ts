import * as dynamoose from 'dynamoose';
import AWS from 'aws-sdk';
import Course from './models/course';
import Semester from './models/semester';
import CourseItem from './models/courseItem';
import User from './models/user';

const initDB = async () => {
    try {
        dynamoose.model.defaults.set({
            prefix: 'Passr_',
        });

        if ( process.env.NODE_ENV == 'production') {
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
    }
};

export default initDB;


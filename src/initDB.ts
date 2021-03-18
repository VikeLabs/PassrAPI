import * as dynamoose from 'dynamoose';
import AWS from 'aws-sdk';
import Course from './models/course';
import Semester from './models/semester';
import CourseItem from './models/courseItem';
import User from './models/user';
import { updateLanguageServiceSourceFile } from 'typescript';

const assignment1 = new CourseItem({
    id: 'zxcvbn',
    name: 'assignment 1',
    weight: 25,
    grade: 74,
    dueDate: 5000000,
    owner: 'isaiahdoyle@uvic.ca',
});

const assignment2 = new CourseItem({
    id: 'zxcvbnm',
    name: 'assignment 2',
    weight: 8.5,
    grade: 83,
    owner: 'isaiahdoyle@uvic.ca',
})

const math101 = new Course({
    id: 1,
    name: 'Math 101',
    courseItems: [assignment1, assignment2],
    createdAt: null,
    updatedAt: null,
    onwer: 'isaiahdoyle@uvic.ca',
});

const fall2020 = new Semester({
    id: 'qwerty',
    name: 'Fall 2020',
    courses: [math101],
    createdAt: null,
    updatedAt: null,
    owner: 'isaiahdoyle@uvic.ca',
});

const user1 = new User({
    id: 'isaiahdoyle@uvic.ca',
    courseItems: [assignment1],
    courses: [math101],
    semesters: [fall2020],
});

const initDb = async () => {
    try {
        dynamoose.aws.ddb.local();
        dynamoose.model.defaults.set({
            prefix: 'Passr_',
        });

        console.log('before document.save');
        await assignment1.save();
        await math101.save();
        await fall2020.save();
        await user1.save();
        console.log('after document.save');

        console.log('initDb running!');
        console.log('semester: ' + fall2020.name);
        console.log('courses in fall2020: ' + fall2020.courses[0].name);
        console.log('assignment in math101: ' + assignment1.name);
        console.log('assignment 1 due date: ' + assignment1.dueDate);

    } catch (err) {
        console.error(err);
    }
};

export default initDb;


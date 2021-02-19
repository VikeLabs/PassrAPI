import * as dynamoose from 'dynamoose';
import CourseItem from './models/courseItem';
import Course from './models/course';
import Semester from './models/semester';
import User from './models/user';

const assignment1 = new CourseItem({
    id: 'zxcvbn',
    name: 'assignment 1',
    weight: 25,
    grade: 74,
    dueDate: 5000000,
    owner: 'isaiahdoyle@uvic.ca',
});

const math101 = new Course({
    id: '1',
    name: 'Math 101',
    courseItems: [assignment1],
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
        console.log(assignment1);
        await math101.save();
        console.log(math101);
        // await fall2020.save();
        // await user1.save();
        console.log('after document.save');
        // console.log('semester: ' + fall2020.name);
        // console.log('courses in fall2020: ' + fall2020.courses[0].name);
        // console.log('assignment in math101: ' + assignment1.name);
        console.log('assignment 1 due date: ' + assignment1.dueDate);

    } catch (err) {
        console.error(err);
    }
};

export default initDb;





// import * as dynamoose from 'dynamoose';
// import { Document } from 'dynamoose/dist/Document';

// const CatSchema = new dynamoose.Schema(
//     {
//         id: String,
//         age: Number,
//     },
//     {
//         timestamps: true,
//     }
// );

// interface ICat extends Document {
//     id: string;
//     age: number;
// }

// export const Cat = dynamoose.model<ICat>('Cat', CatSchema);

// async function init() {
//     try {
//         dynamoose.aws.ddb.local();
//         dynamoose.model.defaults.set({
//             prefix: 'Passr_',
//         });
//         const testCat = await Cat.create({
//             id: Math.random().toString(),
//             age: 3,
//         });

//         const testCat2 = await Cat.create({
//             id: 'testKitty2',
//             age: 5,
//         });
//         console.log(testCat2);
//         await testCat2.save();
//         await testCat.save({ overwrite: true, return: 'document' });
//     } catch (err) {
//         console.error(err);
//     }
// }

// export default init;

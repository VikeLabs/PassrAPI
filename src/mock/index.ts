import Course from '../models/course';
import Semester from '../models/semester';
import CourseItem from '../models/courseItem';
import User from '../models/user';

const assignment1 = new CourseItem({
    id: 'testAssignment1',
    name: 'assignment 1',
    weight: 25,
    grade: 74,
    dueDate: 5000000,
    owner: 'testUser',
});

const assignment2 = new CourseItem({
    id: 'testAssignment2',
    name: 'assignment 2',
    weight: 8.5,
    grade: 83,
    owner: 'testUser',
})

const math101 = new Course({
    id: 'testCourse',
    name: 'Math 101',
    courseItems: [assignment1, assignment2],
    createdAt: null,
    updatedAt: null,
    owner: 'testUser',
});

const fall2020 = new Semester({
    id: 'testSemester',
    name: 'Fall 2020',
    courses: [math101],
    desiredGrade: 99.9,
    createdAt: null,
    updatedAt: null,
    owner: 'testUser',
});

const user1 = new User({
    id: 'testUser',
    courseItems: [assignment1],
    courses: [math101],
    semesters: [fall2020],
});

const bootstrap = async () => {
    console.log('beginning document.save');

    await assignment1.save();
    await assignment2.save();
    await math101.save();
    await fall2020.save();
    await user1.save();

    console.log('math 101: ' + math101);
    console.log('document.save complete');

    const getFall2020 = await Semester.get('testSemester');
    console.log('getSemester name: ' + getFall2020.name);

    const getAssignment1 = await CourseItem.get('zxcvbn');
    console.log('getAssignment1 name: ' + getAssignment1.name);

    const getMath101 = await Course.get('testCourse');
    console.log('getCourse name: ' + getMath101.name);

    console.log('\ncourse items in math101:');
    for (const element of getMath101.courseItems) {
        console.log(element);
    }
};

export default bootstrap;

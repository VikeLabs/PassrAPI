import Course, { CourseInterface } from '../models/course';
import Semester from '../models/semester';
import { v4 as uuidv4 } from 'uuid';
import { checkUserId } from './index';
import dynamoose from 'dynamoose';

const checkCourseUser = checkUserId(Course.get);

export const create = async (coursePackage: {
	course: CourseInterface;
	parent: string; // semester ID
}) => {
	try {
		const course = coursePackage.course;
		const hashKey = uuidv4();
		course.id = hashKey;

		// console.log('course:', course);
		// console.log('parent:', coursePackage.parent);

		// either succeeds or fails both operations
		const transaction = await dynamoose.transaction([
			Course.transaction.create(course).then((course) =>
				Semester.transaction
					.update(
						{ id: coursePackage.parent },
						{ $ADD: { courses: course } },
						{
							condition: new dynamoose.Condition(
								'courses'
							).exists(),
						}
					)
					.catch((addErr) =>
						Semester.transaction
							.update(
								{ id: coursePackage.parent },
								{ $SET: { courses: [course] } },
								{
									condition: new dynamoose.Condition(
										'courses'
									)
										.not()
										.exists(),
								}
							)
							.catch((setErr) => {
								throw { addErr, setErr };
							})
					)
			),
		]);

		console.log(transaction);

		// const createdCourse = await Course.create(course);

		// await Semester.update(
		// 	{ id: coursePackage.parent },
		// 	/* Argument of type '{ $ADD: { courses: CourseInterface[]; }; }'
		// 	   is not assignable to parameter of type 'Partial<SemesterInterface>'.
		// 	*/
		// 	{ $ADD: { courses: [createdCourse] } },
		// 	(error, semester) => {
		// 		error ? console.error(error) : console.log(semester);
		// 	}
		// );

		// return createdCourse;
	} catch (err) {
		throw new Error('Failed to create course');
	}
};

export const read = async (key: string, userID: string) => {
	try {
		const course = await Course.get(key);

		if (course && course.owner === userID) {
			return course;
		} else {
			throw new Error();
		}
	} catch (err) {
		throw new Error('ERROR: could not read course with key ' + key);
	}
};

export const update = async (
	data: Partial<CourseInterface>,
	userID: string
) => {
	try {
		if (data.id) {
			const key = data.id;
			const isOwner = await checkCourseUser(key, userID);

			if (isOwner) {
				return await Course.update(data);
			} else {
				throw new Error();
			}
		}
	} catch (err) {
		throw new Error("ERROR: userID doesn't match");
	}
};

export const del = async (key: string, userID: string) => {
	try {
		const isOwner = await checkCourseUser(key, userID);

		if (isOwner) {
			await Course.delete(key);
		} else {
			throw new Error();
		}
	} catch (err) {
		throw new Error('ERROR: could not delete course with key ' + key);
	}
};

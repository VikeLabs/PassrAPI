import Course, { CourseInterface } from '../models/course';
import { v4 as uuidv4 } from 'uuid';
import { checkUserId } from './index';

const checkCourseUser = checkUserId(Course.get);

export const create = async (course: CourseInterface) => {
	try {
		const hashKey = uuidv4();
		course.id = hashKey;

		await Course.create(course);
	} catch (err) {
		throw new Error('Failed to create course with id ' + course.id);
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
				await Course.update(data);
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

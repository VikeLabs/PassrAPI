import Course, { CourseInterface } from '../models/course';
import { v4 as uuidv4 } from 'uuid';
import { checkUserId } from './index';

const checkCourseUser = checkUserId(Course.get);

export const create = async (course: CourseInterface) => {
	try {
		const hashKey = uuidv4();
		course.id = hashKey;
		await Course.create(course);
		console.log(
			'SUCCESS: Creation of course with id ' + course.id + ' successful.'
		);
	} catch (err) {
		new Error('Failed to create course with id' + course.id);
	}
};

export const read = async (key: string, userID: string) => {
	try {
		const course = await Course.get(key);

		if (course && course.owner == userID) {
			return course;
		} else {
			throw 'ERROR - could not read course with key ' + key;
		}
	} catch (err) {
		console.error(err);
	}

};

export const update = async (data: Partial<CourseInterface>, userID: string
) => {
	try {
		if (data.id) {
			const key = data.id;
			const isOwner = await checkCourseUser(key, userID);

			if (isOwner) {
				await Course.update(data);
			} else {
				throw "ERROR - userID doesn't match";
			}
		}
	} catch (err) {
		new Error('Failed to update course due to ' + err);
	}
};

export const del = async (key: string, userID: string) => {
	try {
		const isOwner = await checkCourseUser(key, userID);

		if (isOwner) {
			await Course.delete(key);
			console.log('Deletion of document with id ' + key + ' successful.');
		}
	} catch (err) {
		console.error(err);
	}
};

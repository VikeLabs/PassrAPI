import CourseItem, { CourseItemInterface } from '../models/courseItem';
import { v4 as uuidv4 } from 'uuid';
import { checkUserId } from './index';

const checkCourseItemUser = checkUserId(CourseItem.get);

const ERROR_RESPONSE = 'Course item not found.';

export const create = async (courseItem: CourseItemInterface) => {
	try {
		const hashKey = uuidv4();
		courseItem.id = hashKey;
		// logs uuid of new courseItem for testing
		console.log(courseItem.name + ' id: ' + courseItem.id);
		await CourseItem.create(courseItem);
	} catch (err) {
		console.error(ERROR_RESPONSE);
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string, userID: string) => {
	try {
		const courseItem = await CourseItem.get(key);
		if (courseItem && courseItem.owner == userID) {
			return courseItem;
		} else {
			throw 'ERROR - could not read courseItem with key ' + key;
		}
	} catch (err) {
		console.error(ERROR_RESPONSE);
	}
};

export const update = async (
	data: Partial<CourseItemInterface>,
	userID: string
) => {
	try {
		if (data.id) {
			const key = data.id;
			const isOwner = await checkCourseItemUser(key, userID);
			if (isOwner) {
				await CourseItem.update(data);
			} else {
				throw "ERROR - userID doesn't match";
			}
		}
	} catch (err) {
		console.error(ERROR_RESPONSE);
	}
};

export const del = async (key: string, userID: string) => {
	try {
		const isOwner = await checkCourseItemUser(key, userID);
		if (isOwner) {
			await CourseItem.delete(key);
			console.log('Deletion of document with id ' + key + ' successful.');
		}
	} catch (err) {
		console.error(ERROR_RESPONSE);
	}
};

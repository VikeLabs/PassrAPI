import CourseItem, { CourseItemInterface } from '../models/courseItem';
import { v4 as uuidv4 } from 'uuid';
import { checkUserId } from './index';

const checkCourseItemUser = checkUserId(CourseItem.get);

export const create = async (courseItem: CourseItemInterface) => {
	try {
		const hashKey = uuidv4();
		courseItem.id = hashKey;
		await CourseItem.create(courseItem);
	} catch {
		throw new Error('ERROR: could not create courseItem');
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string, userID: string) => {
	try {
		const courseItem = await CourseItem.get(key);
		if (courseItem && courseItem.owner === userID) {
			return courseItem;
		} else {
			throw new Error();
		}
	} catch {
		throw new Error('ERROR - could not read courseItem with key ' + key);
	}
};

export const update = async (
	data: Partial<CourseItemInterface>,
	userID: string
) => {
	if (data.id) {
		try {
			const key = data.id;
			const isOwner = await checkCourseItemUser(key, userID);
			if (isOwner) {
				await CourseItem.update(data);
			} else {
				throw new Error("ERROR: userID doesn't match");
			}
		} catch {
			throw new Error('ERROR: unable to update course item');
		}
	}
};

export const del = async (key: string, userID: string) => {
	try {
		const isOwner = await checkCourseItemUser(key, userID);
		if (isOwner) {
			await CourseItem.delete(key);
			console.log('Deletion of document with id ' + key + ' successful.');
		} else {
			throw new Error("ERROR: userID doesn't match");
		}
	} catch {
		throw new Error('ERROR: could not delete course item');
	}
};

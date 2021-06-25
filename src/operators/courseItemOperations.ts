import CourseItem, { CourseItemInterface } from '../models/courseItem';
import { v4 as uuidv4 } from 'uuid';

export const create = async (courseItem: CourseItemInterface) => {
	try {
		const hashKey = uuidv4();
		courseItem.id = hashKey;
		console.log('id: ' + courseItem.id);
		await CourseItem.create(courseItem);
	} catch (err) {
		console.error(err);
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string, user: string) => {
	try {
		const courseItem = await CourseItem.get(key);
		if (courseItem && courseItem.owner == user) {
			return courseItem;
		} else {
			throw 'ERROR - could not read courseItem with key ' + key;
		}
	} catch (err) {
		console.error(err);
	}
};

export const update = async (
	data: Partial<CourseItemInterface>,
	userID: string
) => {
	try {
		if (data.id) {
			const key = data.id;
			if (await checkUserID(key, userID)) {
				await CourseItem.update(data);
			} else {
				throw "ERROR - userID doesn't match";
			}
		}
	} catch (err) {
		console.error(err);
	}
};

export const del = async (key: string, userID: string) => {
	try {
		if (checkUserID(key, userID)) {
			await CourseItem.delete(key);
			console.log('Deletion of document with id ' + key + ' successful.');
		}
	} catch (err) {
		console.error(err);
	}
};

const checkUserID = async (key: string, userID: string) => {
	const courseItem = await CourseItem.get(key);
	return courseItem.owner == userID;
};

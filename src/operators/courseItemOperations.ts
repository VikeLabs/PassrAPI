import CourseItem, { CourseItemInterface } from '../models/courseItem';
import { v4 as uuidv4 } from 'uuid';

export const create = async (courseItem: CourseItemInterface) => {
	try {
		const uuid = uuidv4();
		courseItem.id = uuid;
		await CourseItem.create(courseItem);
	} catch (err) {
		console.error(err);
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string) => {
	try {
		// add some kind of security check here?
		const courseItem = CourseItem.get(key);
		if (courseItem) {
			return courseItem;
		} else {
			throw 'ERROR - could not read courseItem with key ' + key;
		}
	} catch (err) {
		console.error(err);
	}
};

export const update = async (data: Partial<CourseItemInterface>) => {
	try {
		// const id = data.id;
		// delete data.id;
		// await CourseItem.update({ id }, data);
		await CourseItem.update(data);
	} catch (err) {
		console.error(err);
	}
};

export const del = async (key: string) => {
	try {
		await CourseItem.delete(key);
		console.log('Deletion of document with id ' + key + ' successful.');
	} catch (err) {
		console.error(err);
	}
};

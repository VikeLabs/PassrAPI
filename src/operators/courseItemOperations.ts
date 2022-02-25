import CourseItem, { CourseItemInterface } from '../models/courseItem';
import { v4 as uuidv4 } from 'uuid';
import { checkUserId } from './index';

const checkCourseItemUser = checkUserId(CourseItem.get);

export const create = async (
	courseItem: CourseItemInterface,
	userID: string
) => {
	const hashKey = uuidv4();
	courseItem.id = hashKey;
	courseItem.owner = userID;

	// logs uuid of new courseItem for testing
	console.log(courseItem.name + ' id: ' + courseItem.id);
  
	await CourseItem.create(courseItem);
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string, userID: string) => {
	const courseItem = await CourseItem.get(key);
	if (courseItem && courseItem.owner == userID) {
		return courseItem;
	} else {
		throw 'ERROR - could not read courseItem with key ' + key;
	}
};

export const update = async (
	data: Partial<CourseItemInterface>,
	userID: string
) => {
	if (data.id) {
		const key = data.id;
		const isOwner = await checkCourseItemUser(key, userID);
		if (isOwner) {
			await CourseItem.update(data);
		} else {
			throw "ERROR - userID doesn't match";
		}
	}
};

export const del = async (key: string, userID: string) => {
	const isOwner = await checkCourseItemUser(key, userID);
	if (isOwner) {
		await CourseItem.delete(key);
		console.log('Deletion of document with id ' + key + ' successful.');
	}
};

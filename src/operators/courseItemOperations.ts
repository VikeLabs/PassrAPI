import CourseItem, { CourseItemInterface } from '../models/courseItem';

export const create = async (courseItem: CourseItemInterface) => {
    try {
        await CourseItem.create(courseItem);
	} catch (err) {
        console.error(err);
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string) => {
    try {
        // add some kind of security check here?
        return await CourseItem.get(key);
    } catch (err) {
        console.error(err);
    }
};

export const update = async (key: string, data: Partial<CourseItemInterface>) => {
	try {
		await CourseItem.update({ id: key }, data);
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

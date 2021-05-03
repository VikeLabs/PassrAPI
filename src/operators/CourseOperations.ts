import Course, { CourseInterface } from '../models/course';

export const create = async (course: CourseInterface) => {
    try {
        Course.create(course);
	} catch (err) {
        console.error(err);
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string) => {
    try {
        // add some kind of security check here?
        return await Course.get(key);
    } catch (err) {
        console.error(err);
    }
};

export const update = async (key: string, data: Partial<CourseInterface>) => {
	try {
		Course.update({ id: key }, data);
	} catch (err) {
		console.error(err);
	}
};

export const del = async (key: string) => {
    try {
        Course.delete(key);
        console.log('Deletion of course with id ' + key + ' successful.');
    } catch (err) {
        console.error(err);
    }
};

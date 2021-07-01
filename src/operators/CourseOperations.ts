import Course, { CourseInterface } from '../models/course';

export const create = async (course: CourseInterface) => {
	try {
		await Course.create(course);
		console.log(
			'SUCCESS: Creation of course with id ' + course.id + ' successful.'
		);
	} catch (err) {
		new Error('Failed to create course with id' + course.id);
	}
};

export const read = async (key: string) => {
	const course = await Course.get(key);
	console.log(course);
	if (course) {
		return course;
	} else {
		new Error('Failed to get course with id' + key);
	}
};

export const update = async (data: Partial<CourseInterface>) => {
	const key = data.id;
	try {
        if(key) {
			await Course.get(key);
            await Course.update(data);
        } else {
			throw new Error();
		}

	} catch (err) {
		new Error('Failed to update course with id' + key);
	}
};

export const del = async (key: string) => {
    try {
        Course.delete(key);
        console.log('SUCCESS: Deletion of course with id ' + key + ' successful.');
    } catch (err) {
        new Error('Failed to delete course with id' + key);
    }
};

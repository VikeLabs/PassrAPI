import Semester, { SemesterInterface } from '../models/semester';

export const create = async (semester: SemesterInterface) => {
    try {
        Semester.create(semester);
	} catch (err) {
        console.error(err);
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string) => {
    try {
        // add some kind of security check here?
        return await Semester.get(key);
    } catch (err) {
        console.error(err);
    }
};

export const update = async (key: string, data: Partial<SemesterInterface>) => {
	try {
		Semester.update({ id: key }, data);
	} catch (err) {
		console.error(err);
	}
};

export const del = async (key: string) => {
    try {
        Semester.delete(key);
        console.log('Deletion of document with id ' + key + ' successful.');
    } catch (err) {
        console.error(err);
    }
};

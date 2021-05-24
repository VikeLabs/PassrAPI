import Semester, { SemesterInterface } from '../models/semester';

export const create = async (semester: SemesterInterface) => {
	if (!(await Semester.create(semester))) {
		throw 'Semester Creation Error';
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string) => {
	// add some kind of security check here?
	const semester = await Semester.get(key);
	if (semester) {
		return semester;
	} else {
		throw 'Semester Read Error';
	}
};

export const update = async (data: Partial<SemesterInterface>) => {
	if (!(await Semester.update(data))) {
		throw 'Semester Update Error';
	}
};

export const del = async (key: string) => {
	try {
		Semester.delete(key);
		console.log('Deletion of document with id ' + key + ' successful.');
	} catch (err) {
		console.log(err);
		throw 'Semester Delete Error';
	}
};

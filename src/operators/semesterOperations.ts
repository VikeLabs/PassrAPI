import Semester, { SemesterInterface } from '../models/semester';

export const create = async (semester: SemesterInterface) => {
	try {
		await Semester.create(semester);
	} catch (err) {
		throw 'ERROR: semester not created';
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string) => {
	// add some kind of security check here?
	const semester = await Semester.get(key);
	if (semester) {
		return semester;
	} else {
		throw 'ERROR: could not read semester';
	}
};

export const update = async (data: Partial<SemesterInterface>) => {
	let updated = false;
	if (typeof data.id == 'string') {
		const key: string = data.id;
		const semester = await Semester.get(key);
		if (semester && (await Semester.update(data))) {
			updated = true;
		}
	}
	if (!updated) {
		throw 'ERROR: semester not updated';
	}
};

export const del = async (key: string) => {
	try {
		const semester = await Semester.get(key);
		if (semester) {
			await Semester.delete(key);
			console.log('Deletion of document with id ' + key + ' successful.');
		} else {
			throw 'ERROR';
		}
	} catch (err) {
		throw 'ERROR: semester not deleted';
	}
};

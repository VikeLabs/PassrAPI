import Semester, { SemesterInterface } from '../models/semester';
import { checkUserId } from './index';

const checkSemesterUser = checkUserId(Semester.get);

export const create = async (semester: SemesterInterface) => {
	try {
		await Semester.create(semester);
	} catch (err) {
		console.log(err);
		throw new Error('ERROR: semester not created');
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string, userID: string) => {
	try {
		const semester = await Semester.get(key);
		if (semester && semester.owner === userID) {
			return semester;
		} else {
			throw new Error('ERROR: could not read semester');
		}
	} catch {
		throw new Error();
	}
};

export const update = async (
	data: Partial<SemesterInterface>,
	userID: string
) => {
	try {
		let updated = false;
		if (data.id) {
			const key = data.id;
			const isOwner = await checkSemesterUser(key, userID);
			const semester = await Semester.get(key);
			if (isOwner && semester && (await Semester.update(data))) {
				updated = true;
			}
		}
		if (!updated) {
			throw new Error('ERROR: semester not updated');
		}
	} catch {
		throw new Error();
	}
};

export const del = async (key: string, userID: string) => {
	try {
		const isOwner = await checkSemesterUser(key, userID);
		const semester = await Semester.get(key);
		if (isOwner && semester) {
			await Semester.delete(key);
			console.log('Deletion of document with id ' + key + ' successful.');
		} else {
			throw new Error('UserID invalid.');
		}
	} catch (err) {
		console.log(err);
		throw new Error('ERROR: semester not deleted');
	}
};

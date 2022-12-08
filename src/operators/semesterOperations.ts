import Semester, { SemesterInterface } from '../models/semester';
import { v4 as uuidv4 } from 'uuid';
import { checkUserId } from './index';

const checkSemesterUser = checkUserId(Semester.get);

export const create = async (semester: SemesterInterface) => {
	try {
		const hashKey = uuidv4();
		semester.id = hashKey;
		return Semester.create(semester);
	} catch (err) {
		throw new Error('ERROR: semester not created');
	}
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (key: string, userID: string) => {
	const semester = await Semester.get(key);
	if (semester && semester.owner === userID) {
		return semester;
	} else {
		throw new Error('ERROR: could not read semester');
	}
};

export const update = async (
	data: Partial<SemesterInterface>,
	userID: string
) => {
	try {
		if (data.id) {
			const key = data.id;
			const isOwner = await checkSemesterUser(key, userID);
			if (isOwner) {
				return Semester.update(data);
			}
		}
	} catch (err) {
		throw new Error('ERROR: semester not updated');
	}
};

export const del = async (key: string, userID: string) => {
	try {
		const isOwner = await checkSemesterUser(key, userID);
		const semester = await Semester.get(key);
		if (isOwner && semester) {
			await Semester.delete(key);
		} else {
			throw new Error('UserID invalid.');
		}
	} catch (err) {
		throw new Error('ERROR: semester not deleted');
	}
};

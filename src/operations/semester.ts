import getDb from '../initDB';
import { Semester } from '../models';

type CreateRequired = 'name';
type CreateOmitted = 'id' | 'owner' | 'ownerId' | 'courses';
type CreateData = Pick<Semester, CreateRequired> &
	Partial<Omit<Semester, CreateRequired | CreateOmitted>>;
export const createSemester = (semester: CreateData, userId: string) => {
	const db = getDb();
	return db.semester.create({
		data: {
			...semester,
			owner: {
				connect: {
					id: userId,
				},
			},
		},
	});
};

export const getSemester = (id: number, userId: string) => {
	const db = getDb();

	return db.semester.findFirst({
		where: {
			id,
			ownerId: userId,
		},
	});
};

type UpdateRequired = 'id';
type UpdateOmitted = 'owner' | 'ownerId' | 'courses';
type UpdateData = Pick<Semester, UpdateRequired> &
	Partial<Omit<Semester, UpdateRequired | UpdateOmitted>>;
export const updateSemester = async (semester: UpdateData, userId: string) => {
	const db = getDb();

	return db.semester.updateMany({
		where: {
			id: semester.id,
			ownerId: userId,
		},
		data: {
			...semester,
			id: undefined,
		},
	});
};

export const deleteSemester = async (id: number, userId: string) => {
	const db = getDb();

	return db.semester.deleteMany({
		where: {
			id,
			ownerId: userId,
		},
	});
};

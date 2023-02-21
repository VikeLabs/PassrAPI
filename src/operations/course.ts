import getDb from '../initDB';
import { Course } from '../models';

type CreateRequired = 'name';
type CreateOmitted =
	| 'id'
	| 'owner'
	| 'ownerId'
	| 'semester'
	| 'semesterId'
	| 'items';
type CreateData = Pick<Course, CreateRequired> &
	Partial<Omit<Course, CreateRequired | CreateOmitted>>;
export const createCourse = (
	course: CreateData,
	userId: string,
	semesterId: number
) => {
	const db = getDb();
	return db.course.create({
		data: {
			...course,
			owner: {
				connect: {
					id: userId,
				},
			},
			semester: {
				connect: {
					id: semesterId,
				},
			},
		},
	});
};

export const getCourse = (id: number, userId: string) => {
	const db = getDb();

	return db.course.findFirst({
		where: {
			id,
			ownerId: userId,
		},
	});
};

type UpdateRequired = 'id';
type UpdateOmitted = 'owner' | 'ownerId' | 'semester' | 'semesterId' | 'items';
type UpdateData = Pick<Course, UpdateRequired> &
	Partial<Omit<Course, UpdateRequired | UpdateOmitted>>;
export const updateCourse = async (course: UpdateData, userId: string) => {
	const db = getDb();

	return db.course.updateMany({
		where: {
			id: course.id,
			ownerId: userId,
		},
		data: {
			...course,
			id: undefined,
		},
	});
};

export const deleteCourse = async (id: number, userId: string) => {
	const db = getDb();

	return db.course.deleteMany({
		where: {
			id,
			ownerId: userId,
		},
	});
};

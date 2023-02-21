// CRUD functions for the course item table
import getDb from '../initDB';
import { CourseItem } from '../models';

type CreateRequired = 'name';
type CreateOmitited = 'id' | 'owner' | 'course' | 'courseId' | 'ownerId';
type CreateData = Pick<CourseItem, CreateRequired> &
	Partial<Omit<CourseItem, CreateRequired | CreateOmitited>>;

export const createCourseItem = (
	courseItem: CreateData,
	userId: string,
	courseId: number
) => {
	const db = getDb();
	return db.courseItem.create({
		data: {
			...courseItem,
			courseId: undefined,
			owner: {
				connect: {
					id: userId,
				},
			},
			course: {
				connect: {
					id: courseId,
				},
			},
		},
	});
};

export const getCourseItem = (id: number, userId: string) => {
	const db = getDb();

	return db.courseItem.findFirst({
		where: {
			id,
			ownerId: userId,
		},
	});
};

type UpdateRequired = 'id';
type UpdateOmitted = 'owner' | 'course' | 'courseId' | 'ownerId';
type UpdateData = Pick<CourseItem, UpdateRequired> &
	Partial<Omit<CourseItem, UpdateRequired | UpdateOmitted>>;
export const updateCourseItem = async (
	courseItem: UpdateData,
	userId: string
) => {
	const db = getDb();

	return db.courseItem.updateMany({
		where: {
			id: courseItem.id,
			ownerId: userId,
		},
		data: {
			...courseItem,
			id: undefined,
		},
	});
};

export const deleteCourseItem = async (id: number, userId: string) => {
	const db = getDb();

	return db.courseItem.deleteMany({
		where: {
			id,
			ownerId: userId,
		},
	});
};

import getDb from '../initDB';
import { User } from '../models';

type CreateRequired = 'id';
type CreateOmitted =
	| 'semesters'
	| 'courses'
	| 'items'
	| 'createdAt'
	| 'updatedAt';
type CreateData = Pick<User, CreateRequired> &
	Partial<Omit<User, CreateRequired | CreateOmitted>>;
export const createUser = (user: CreateData) => {
	const db = getDb();
	return db.user.create({
		data: {
			...user,
		},
	});
};

export const getUser = (id: string) => {
	const db = getDb();

	return db.user.findFirst({
		where: {
			id,
		},
	});
};

type UpdateRequired = 'id';
type UpdateOmitted =
	| 'semesters'
	| 'courses'
	| 'items'
	| 'createdAt'
	| 'updatedAt';
type UpdateData = Pick<User, UpdateRequired> &
	Partial<Omit<User, UpdateRequired | UpdateOmitted>>;
export const updateUser = async (user: UpdateData) => {
	const db = getDb();

	return db.user.updateMany({
		where: {
			id: user.id,
		},
		data: {
			...user,
			id: undefined,
		},
	});
};

export const deleteUser = async (id: string) => {
	const db = getDb();

	return db.user.deleteMany({
		where: {
			id,
		},
	});
};

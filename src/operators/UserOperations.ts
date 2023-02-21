import { transaction } from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';
import { User, UserModel } from '../models/user';
import { transactDelete as semesterTransactDelete } from './semesterOperations';

// Create a new user
export const create = async (userId: string): Promise<User> => {
	return UserModel.create({
		id: userId,
	});
};

// Read a user by ID
export const read = async (userId: string): Promise<User | null> => {
	return UserModel.get({ id: userId });
};

// Update a user by ID
export const update = async (
	userId: string,
	userData: Partial<User>
): Promise<User> => {
	delete userData.id; // disallow updating the ID
	return UserModel.update({ id: userId }, userData);
};

// Delete a user by ID
export const delete = async (userId: string): Promise<void> => {
	const user = await UserModel.get({ id: userId });
	if(!user) throw new Error(`User with ID ${userId} not found`);
	const semesters = Array.from(user.semesters);
	return transaction([
		UserModel.transaction.delete({ id: userId }),
		...semesters.map((semesterId) => semesterTransactDelete(semesterId, userId)).flat(),
	])
};

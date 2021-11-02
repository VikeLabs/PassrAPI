import User, { UserInterface } from '../models/user';

export const create = async (user: UserInterface) => User.create(user);

export const read = async (key: string) => {
	const user = await User.get(key);
	if (!user) {
		throw 'ERROR: Could not read user.';
	}
	return user;
};
export const update = async (data: Partial<UserInterface>) => {
	if (!data.id) {
		throw 'ERROR: No user ID';
	}
	const key = data.id;
	const user = await User.get(key);
	if (!user) {
		throw 'ERROR: User does not exist.';
	}
	return User.update(data);
};

export const del = async (key: string) => {
	const userkey = await User.get(key);
	if (!userkey) {
		throw 'ERROR: Could not delete user.';
	}
	return User.delete(key);
};

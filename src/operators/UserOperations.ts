import User, { UserInterface } from '../models/user';

export const create = async (user: UserInterface) => User.create(user);

export const read = async (key: string) => {
	try {
		const user = await User.get(key);
		if (!user) {
			throw new Error('ERROR: Could not read user.');
		}
		return user;
	} catch {
		throw new Error();
	}
};
export const update = async (data: Partial<UserInterface>) => {
	try {
		if (!data.id) {
			throw new Error('ERROR: No user ID');
		}
		const key = data.id;
		const user = await User.get(key);
		if (!user) {
			throw new Error('ERROR: User does not exist.');
		}
		return User.update(data);
	} catch {
		throw new Error();
	}
};

export const del = async (key: string) => {
	try {
		const userkey = await User.get(key);
		if (!userkey) {
			throw new Error('ERROR: Could not delete user.');
		}
		return User.delete(key);
	} catch {
		throw new Error();
	}
};

import User, { UserInterface } from '../models/user';

export const create = async (user: UserInterface) => {
	try {
		console.log(user.semesters + 'id: ' + user.id);
		await User.create(user);
	} catch (e) {
		throw 'ERROR: User could not be created';
	}
};
export const read = async (key: string) => {
	try {
		const user = await User.get(key);
		if (user) {
			return user;
		} else {
			throw 'ERROR: Could not read user';
		}
	} catch (e) {
		console.error(e);
	}
};
export const update = async (data: Partial<UserInterface>) => {
	let updated = false;
	if (data.id) {
		const key = data.id;
		const user = await User.get(key);
		if (user && (await User.update(data))) {
			updated = true;
		}
	}
	if (!updated) {
		throw 'ERROR: User could not be updated';
	}
};

export const del = async (key: string) => {
	try {
		const userkey = await User.get(key);
		if (userkey) {
			await User.delete(key);
		} else {
			throw 'ERROR';
		}
	} catch (e) {
		throw 'Error: Could not delete User';
	}
};

import { Semester, SemesterModel } from '../models/semester';
import { v4 as uuidv4 } from 'uuid';
import { checkUserId } from './index';
import { Condition, transaction } from 'dynamoose';
import { UserModel } from '../models/user';

export const create = async (semesterData: Semester, userId: string) => {
	const hashKey = uuidv4();
	const semester = {
		id: hashKey,
		courses: semesterData.courses,
		name: semesterData.name,
		owner: userId,
	};
	return transaction([
		SemesterModel.transaction.create(semester),
		UserModel.transaction.update(
			{ id: userId },
			{ $ADD: { semesters: semester.id } }
		),
	]);
};

export const read = async (semesterId: string, userId: string) => {
	const semester = await SemesterModel.get({ id: semesterId });
	if (!semester) throw new Error(`Semester with ID ${semesterId} not found`);
	if (semester.owner !== userId)
		throw new Error(`User ${userId} does not own semester ${semesterId}`);
	return semester;
};

export const update = async (
	semesterId: string,
	userId: string,
	semesterData: Partial<Semester>
) => {
	delete semesterData.id;
	delete semesterData.owner;

	return SemesterModel.update({ id: semesterId }, semesterData, {
		condition: new Condition('owner').eq(userId),
	});
};


export const transactDelete = async (semesterId: string, userId: string) => {
	const semester = await SemesterModel.get({ id: semesterId });
	if (!semester) throw new Error(`Semester with ID ${semesterId} not found`);
	if (semester.owner !== userId) {
		throw new Error(`User ${userId} does not own semester ${semesterId}`);
	}

	const courses = Array.from(semester.courses);

	return [
		SemesterModel.transaction.delete(
			{ id: semesterId },
			{
				condition: new Condition('owner').eq(userId),
			}
		),
		...courses.map((courseId) => courseTransactDelete(courseId, userId)),
	];
};

export const delete = async (semesterId: string, userId: string) => {
	const transact = await transactDelete(semesterId, userId);
	return transaction(...transact);
}
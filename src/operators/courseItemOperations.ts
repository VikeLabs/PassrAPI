import { CourseItem, CourseItemModel } from '../models/courseItem';
import { CourseModel } from '../models/course';
import { v4 as uuidv4 } from 'uuid';
import { Condition, transaction } from 'dynamoose';

export const create = (
	courseItem: CourseItem,
	courseId: string,
	userId: string
): Promise<any> => {
	courseItem.id = uuidv4();
	courseItem.owner = userId;

	return transaction([
		CourseItemModel.transaction.create(courseItem),
		CourseModel.transaction.update(
			{ id: courseId },
			{ $ADD: { courses: courseItem.id } },
			{
				condition: new Condition('courses').exists(),
			}
		),
	]).then((res: any) => {
		console.log({
			value: res,
			message: 'Course item created successfully',
		});
		return res;
	});
};

// NOTE: any reference to key is referring to the hash key, or the `id` parameter in all the models.
export const read = async (
	courseItemId: string,
	userId: string
): Promise<CourseItem> => {
	const courseItem = await CourseItemModel.get(courseItemId);
	if (!courseItem) {
		throw new Error(`Course item with ID ${courseItemId} not found`);
	}
	if (courseItem.owner !== userId) {
		throw new Error(
			`Course item with ID ${courseItemId} does not belong to user with ID ${userId}`
		);
	}
	return courseItem;
};

export const update = async (
	courseItemId: string,
	courseItemUpdate: Partial<CourseItem>,
	userId: string
): Promise<CourseItem> => {
	delete courseItemUpdate.owner; // disallow updating the owner property
	return CourseItemModel.update({ id: courseItemId }, courseItemUpdate, {
		return: 'item',
		condition: new Condition('owner').eq(userId),
	});
};

// delete
export const del = async (
	courseItemId: string,
	userId: string
): Promise<void> => {
	return CourseItemModel.delete(courseItemId, {
		condition: new Condition('owner').eq(userId),
	});
};

export const transactDelete = async (
	courseItemId: string,
	courseId: string,
	userId: string
) => {
	return CourseItemModel.transaction.delete(courseItemId, {
		condition: new Condition('owner').eq(userId),
	});
};

import { CourseInterface as course } from '../models/course';
import { CourseItemInterface as courseItem } from '../models/courseItem';
import { SemesterInterface as semester } from '../models/semester';

// checks if userid is equal to the owner field on all schemas
//   to use:
//     1. init method
//       e.g. const check<ModelName>User = checkUserId(<ModelName>.get);
//     2. call method
// 	     e.g. const isOwner = await check<ModeName>User(key, userID);
// see more on curried functions at
// https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
export const checkUserId = (
	getDocument: (
		key: string
	) => Promise<course> | Promise<courseItem> | Promise<semester>
) => async (key: string, userId: string) => {
	const document = await getDocument(key);
	console.log(document.owner);
	return document.owner === userId;
};

import { CourseInterface as course } from '../models/course';
import { CourseItemInterface as courseItem } from '../models/courseItem';
import { SemesterInterface as semester } from '../models/semester';

export const checkUserId = (
	getDocument: (
		key: string
	) => Promise<course> | Promise<courseItem> | Promise<semester>
) => async (key: string, userId: string) => {
	const document = await getDocument(key);
	return document.owner === userId;
};

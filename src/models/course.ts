import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import CourseItem, { CourseItemInterface } from './courseItem';
import Fraction, { FractionInterface } from './fraction';

export const courseSchema = new dynamoose.Schema(
	{
		id: String,
		name: String,
		desiredGrade: [Number, Fraction],
		courseItems: {
			type: Set,
			schema: [CourseItem],
		},
		owner: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export interface CourseInterface extends Document {
	id: string;
	name: string;
	desiredGrade: number | FractionInterface;
	courseItems?: Set<CourseItemInterface>;
	owner: string;
}

const Course = dynamoose.model<CourseInterface>('Course', courseSchema);

export default Course;

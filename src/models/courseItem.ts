import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import Fraction, { FractionInterface } from './fraction';

export const courseItemSchema = new dynamoose.Schema(
	{
		id: {
			type: String,
			hashKey: true,
		},
		name: String,
		weight: Number,
		grade: [Number, Fraction],
		date: [String, Date],
		owner: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export interface CourseItemInterface extends Document {
	id: string;
	name: string;
	weight?: number;
	grade?: number | FractionInterface;
	date?: Date | string;
	owner: string;
}

const CourseItem = dynamoose.model<CourseItemInterface>(
	'CourseItem',
	courseItemSchema
);

export default CourseItem;

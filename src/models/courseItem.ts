import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import Fraction, { fraction } from './fraction';

export const courseItemSchema = new dynamoose.Schema({
    id: String,
    name: String,
    weight: Number,
    grade: [Number, fraction],
    dueDate: Date,
    owner: String,
});

export interface CourseItemInterface extends Document {
    id: string;
    name: string;
    weight: number;
    grade: number | Fraction;
    dueDate: Date;
    owner: string;
}

const CourseItem = dynamoose.model<CourseItemInterface>('CourseItem', courseItemSchema);

export default CourseItem;

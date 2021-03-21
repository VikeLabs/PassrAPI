import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import FractionInterface, { fraction } from './fraction';

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
    grade: number | FractionInterface;
    dueDate: Date;
    owner: string;
}

const CourseItem = dynamoose.model<CourseItemInterface>(
    'CourseItem',
    courseItemSchema,
    { create: false, waitForActive: { enabled: false } }
);

export default CourseItem;

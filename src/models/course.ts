import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import CourseItem, { courseItemSchema, CourseItemInterface } from './courseItem';
import Fraction, { fraction } from './fraction';

export const courseSchema = new dynamoose.Schema(
    {
        id: String,
        name: String,
        owner: String,
        desiredGrade: fraction,
        courseItems: {
            type: Set,
            schema: [CourseItem],
        },
    },
    {
        timestamps: true,
    }
);

export interface CourseInterface extends Document {
    id: string;
    name: string;
    desiredGrade: number | Fraction;
    courseItems: CourseItemInterface[];
    owner: string;
}


const Course = dynamoose.model<CourseInterface>('Course', courseSchema);

export default Course;

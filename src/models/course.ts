import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import CourseItem, { courseItemSchema, CourseItemInterface } from './courseItem';

export const courseSchema = new dynamoose.Schema(
    {
        id: String,
        name: String,
        owner: String,
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
    courseItems: CourseItemInterface[];
    owner: string;
}

const Course = dynamoose.model<CourseInterface>('Course', courseSchema, {
    create: false,
    waitForActive: { enabled: false },
});

export default Course;

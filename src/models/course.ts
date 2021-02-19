import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import CourseItem, { courseItemSchema, CourseItemInterface } from './courseItem';

export const courseSchema = new dynamoose.Schema({
        id: String,
        name: String,
        // courseItems: CourseItem, // model types not working???
        courseItems: [courseItemSchema],
        owner: String,
});

export interface CourseInterface extends Document {
    id: string;
    name: string;
    courseItems: CourseItemInterface[];
    owner: string;
}

const Course = dynamoose.model<CourseInterface>('Course', courseSchema);

export default Course;

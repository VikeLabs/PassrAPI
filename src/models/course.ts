import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { courseItemSchema, CourseItemInterface } from './courseItem';


const CourseItem = dynamoose.model<CourseItemInterface>('CourseItem', courseItemSchema);

export const courseSchema = new dynamoose.Schema({
        id: String,
        name: String,
        courseItems: courseItemSchema,
});

export interface CourseInterface extends Document {
    id: string;
    name: string;
    courseItems: CourseItemInterface[];
}

const Course = dynamoose.model<CourseInterface>('Course', courseSchema);

export default Course;

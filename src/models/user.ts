import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { CourseItemInterface, courseItemSchema } from './courseItem';
import { CourseInterface, courseSchema } from './course';
import { SemesterInterface, semesterSchema } from './semester';

export const userSchema = new dynamoose.Schema(
    {
    id: String,
    courseItems: [courseItemSchema],
    courses: [courseSchema],
    semesters: [semesterSchema],
    },
    {
    timestamps: true,
    }
);

export interface UserInterface extends Document {
    id: string;
    courseItems: CourseItemInterface[];
    courses: CourseInterface[];
    semesters: SemesterInterface[];
}

const User = dynamoose.model<UserInterface>('User', userSchema);

export default User;

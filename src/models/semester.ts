import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { CourseInterface, courseSchema } from './course';
import { UserInterface, userSchema } from './user';

export const semesterSchema = new dynamoose.Schema({
    id: String,
    name: String,
    courses: [courseSchema],
    user: userSchema,
});

export interface SemesterInterface extends Document {
    id: string;
    name: string;
    courses: CourseInterface[];
    user: UserInterface;
}

const Semester = dynamoose.model<SemesterInterface>('Semester', semesterSchema);

export default Semester;

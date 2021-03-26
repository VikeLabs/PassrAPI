import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import Course, { CourseInterface } from './course';

export const semesterSchema = new dynamoose.Schema({
    id: String,
    name: String,
    owner: String, // user ID
    courses: {
        type: Set,
        schema: [Course],
    },
    },
    {
        timestamps: true,
    }
);

export interface SemesterInterface extends Document {
    id: string;
    name: string;
    courses: CourseInterface[];
    owner: string;
}

const Semester = dynamoose.model<SemesterInterface>(
    'Semester',
    semesterSchema,
);

export default Semester;

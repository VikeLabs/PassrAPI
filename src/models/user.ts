import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import Semester, { SemesterInterface } from './semester';

export const userSchema = new dynamoose.Schema(
    {
        id: String,
        semesters: {
            type: Array,
            schema: Semester,
        },
    },
    {
        timestamps: true,
    }
);

export interface UserInterface extends Document {
    owner: string;
    semesters: SemesterInterface[];
}

const User = dynamoose.model<UserInterface>('User', userSchema);

export default User;

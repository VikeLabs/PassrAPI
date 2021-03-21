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
    id: string;
    semesters: SemesterInterface[];
}

const User = dynamoose.model<UserInterface>('User', userSchema, {
    create: false,
    waitForActive: { enabled: false },
});

export default User;

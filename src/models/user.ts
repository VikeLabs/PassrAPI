import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import Semester, { SemesterInterface } from './semester';

export const userSchema = new dynamoose.Schema(
	{
		id: {
			type: String,
			hashKey: true,
		},
		semesters: {
			type: Set,
			schema: [Semester],
		},
		owner: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export interface UserInterface extends Document {
	id: string;
	owner: string;
	semesters: SemesterInterface[];
}

const User = dynamoose.model<UserInterface>('User', userSchema);

export default User;

import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import Semester, { SemesterInterface } from './semester';

export const userSchema = new dynamoose.Schema(
	{
		id: {
			type: String,
			hashKey: true,
			required: true,
		},
		semesters: {
			type: Set,
			schema: [Semester],
		},
	},
	{
		timestamps: true,
	}

);

export interface UserInterface extends Document {
	id: string;
	owner: string;
	semesters?: Set<SemesterInterface>;
}

const User = dynamoose.model<UserInterface>('User', userSchema);

export default User;

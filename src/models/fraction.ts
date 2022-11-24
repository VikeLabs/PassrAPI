import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';

export const fraction = new dynamoose.Schema({
	numerator: Number,
	denominator: Number,
});

export interface FractionInterface extends Document {
	numerator: number;
	denominator: number;
}

const Fraction = dynamoose.model<FractionInterface>('Course', fraction);

export default Fraction;

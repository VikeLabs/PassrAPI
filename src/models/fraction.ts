import * as dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';

export const fraction = new dynamoose.Schema({
    numerator: Number,
    denominator: Number,
});

interface Fraction extends Document {
    numerator: number;
    denominator: number;
}

export default Fraction;
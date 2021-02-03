import * as dynamoose from 'dynamoose'

export const fraction = new dynamoose.Schema({
    "numerator": Number,
    "denominator": Number
})

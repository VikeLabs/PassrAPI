import * as dynamoose from 'dynamoose'
import { fraction } from './fraction'

export const courseItemSchema = new dynamoose.Schema({
    "name": String,
    "weight": Number,
    "grade": [Number, fraction],
    "dueDate": Date
}, {
    "timestamps": true
})

const CourseItem = dynamoose.model("CourseItem", courseItemSchema)

export default CourseItem

import * as dynamoose from 'dynamoose'

import { courseItemSchema } from './courseItem'

export const courseSchema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "courseItems": [courseItemSchema],
}, {
    "timestamps": true
})

const Course = dynamoose.model("Course", courseSchema)

export default Course

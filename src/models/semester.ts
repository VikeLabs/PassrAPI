import dynamoose from 'dynamoose'
import { courseSchema } from './course'

export const semesterSchema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "courses": [courseSchema]
}, {
    "timestamps": true
})

const Semester = dynamoose.model("Semester", semesterSchema)

export default Semester

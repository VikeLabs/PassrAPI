import CourseItem from './models/courseItem'
import Course from './models/course'
import Semester from './models/semester'

const assignment1 = new CourseItem({
    "id": "zxcvbn",
    "name": "assignment 1",
    "weight": 25,
    "grade": 74,
    "dueDate": "2021-02-28"
})

const math101 = new Course({
    "id": "asdfgh",
    "name": "Math 101",
    "courseItems": assignment1
})

const fall2020 = new Semester({
    "id": "qwerty",
    "name": "Fall 2020",
    "bagels": "good",
    "courses": [math101]
})

const initDb = () => {
    console.log("initDb ran!")
    console.log("semester: " + fall2020.name)
    console.log("courses in fall2020: " + fall2020.courses[0].name)
    console.log("assignment in math101: " + assignment1.name)
}

export default initDb

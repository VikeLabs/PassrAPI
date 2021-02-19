import express from 'express'

const semesterRouter = express.Router()

semesterRouter.get('/', (req, res) => {
    console.log("Get Semester");
    res.send('Get semesterRouter');
  })

semesterRouter.post('/', (req, res) => {
    console.log("Post Semester");
    res.send('Post semesterRouter');
})

semesterRouter.put('/', (req, res) => {
    console.log("Put Semester");
    res.send('Put semesterRouter');
})

semesterRouter.delete('/', (req, res) => {
    console.log("Delete Semester");
    res.send('Delete semesterRouter');
})
export default semesterRouter
import express from 'express'

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    console.log("Get User");
    res.send('Get userRouter');
  })

userRouter.post('/', (req, res) => {
    console.log("Post User");
    res.send('Post userRouter');
})

userRouter.put('/', (req, res) => {
    console.log("Put User");
    res.send('Put userRouter');
})

userRouter.delete('/', (req, res) => {
    console.log("Delete User");
    res.send('Delete userRouter');
})
export default userRouter
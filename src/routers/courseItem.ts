import express from 'express'

const cItemRouter = express.Router()

cItemRouter.get('/', (req, res) => {
    console.log("Get Course Item");
    res.send('Get cItemRouter');
  })

cItemRouter.post('/', (req, res) => {
    console.log("Post Course Item");
    res.send('Post cItemRouter');
})

cItemRouter.put('/', (req, res) => {
    console.log("Put Course Item");
    res.send('Put cItemRouter');
})

cItemRouter.delete('/', (req, res) => {
    console.log("Delete Course Item");
    res.send('Delete cItemRouter');
})
export default cItemRouter
import express from 'express';
import { create, read, update, del } from '../operators/UserOperations';
import { UserRequest } from '../types/requests';

const userRouter = express.Router();
const userError = 'User not found.';

/**
 * @swagger
 * /user:
 *  post:
 *   description: Create a new user
 *   responses:
 * 	  201:
 * 		description: User created
 * 	  404:
 * 		description: Any error
 *  tags:
 *  - User
 */
userRouter.post('/', async (req, res) => {
  try {
    const created = await create(req.body.userId);
    res.status(201).json(created);
  } catch (e) {
    res.status(404).send(userError);
    console.error(`Error: ${e} - Status Code ${res.statusCode}`);
  }
});

/**
 * @swagger
 * /user:
 * get:
 *  description: Get a user
 * responses:
 * 200:
 * description: User found
 * 404:
 * description: Any error
 */
userRouter.get('/', async (req, res) => {
  try {
    const userID = req.body.userID;
    if (!userID) {
      throw new Error('ERROR: No user ID found.');
    }
    const user = await read(userID);
    res.send({ ...user, semesters: Array.from(user?.semesters || []) });
  } catch (e) {
    res.status(404).send(userError);
    console.error(`Error: ${e} - Status Code ${res.statusCode}`);
  }
});

/**
 * @swagger
 * /user:
 * put:
 * description: Update a user
 * responses:
 * 200:
 * description: User updated
 * 404:
 * description: Any error
 */
userRouter.put('/', async (req, res) => {
  try {
    const userID = req.header('userID');
    if (!userID) {
      throw new Error('ERROR: No user ID found.');
    }
    const updated = await update(req.body, userID);
    res.json(updated);
  } catch (e) {
    res.status(404).send(userError);
    console.error(`Error: ${e} - Status Code ${res.statusCode}`);
  }
});

userRouter.delete('/', async (req, res) => {
  try {
    const userID = req.header('userID');
    if (!userID) {
      throw 'ERROR: No user ID found.';
    }
    await del(userID);
    res.send('User Deleted');
  } catch (e) {
    res.status(404).send(userError);
    console.error(`Error: ${e} - Status Code ${res.statusCode}`);
  }
});

export default userRouter;

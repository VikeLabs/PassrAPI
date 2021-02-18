import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routers/user';
import courseRouter from './routers/course';
import cItemRouter from './routers/courseItem';
import semesterRouter from './routers/semester';
import initDB from './initDB';

const port = 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('Successful PassrAPI!');
});

app.use('/user', userRouter);
app.use('/semester', semesterRouter);
app.use('/coure', courseRouter);
app.use('/courseItem', cItemRouter);

(async () => {
    await initDB();

    app.listen(port, () => {
        console.log('Running Passr API.');
    });
})();

// (async () => {
//     try {
//         await initDb();
//         const cat = await Cat.get('testKitty2');
//         console.log(cat);
//         // app.get('/', async (req, res) => {
//         //     const userId = 'asdf';
//         //     console.log(userId);
//         //     console.log('GET /');
//         //     const cat = await Cat.get('testKitty2');
//         //     res.send({
//         //         cat,
//         //     });
//         //     console.log(cat);
//         // });
//     } catch (err) {
//         console.error(err);
//     }
// })();

import dotenv from 'dotenv';
dotenv.config();
import * as dynamoose from 'dynamoose';
import express from 'express';
import initDb from './initDB';

const port = 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('Successful PassrAPI!');
    // res.send('User ID: ' + req.userId);
});

(async () => {
    console.log('before init');
    dynamoose.aws.ddb.local();
    await initDb();

    app.listen(port, () => {
        console.log('Running Passr API.');
    });
})();

// import Cat from './initDB';

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

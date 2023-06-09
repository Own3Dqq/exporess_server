import { Router } from 'express';
import { db } from './../database/index.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router
    .get('/', function (req, res) {
        db.read();
        let users = db.data.users;

        res.status(200).json({
            statusText: 'success',
            data: users,
        });
    })
    .get('/:userId', function (req, res) {
        const { userId } = req.params;

        db.read();
        let users = db.data.users;

        let foundUser = users.find((user) => user.userId === userId);

        if (foundUser) {
            return res.status(200).json({
                statusText: 'success',
                data: foundUser,
            });
        }

        // res.status(404).json(new Error(`User with ${userId} ID is not found `))
        res.status(404).json({
            statusText: 'failed',
            message: `User with ${userId} ID is not found`,
        });
    })
    .post('/', function (req, res) {
        let postUser = req.body;

        if (!Object.values(postUser).length) {
            return res.status(400).json({
                statusText: 'failed',
                message: `The reqest has no body data`,
            });
        }
        db.read();
        // let foundUser = users.find( user => user.email === postUser?.email);
        // console.log(foundUser);
        // if(foundUser) {
        //     return res.status(400).json({
        //         statusText: 'failed',
        //         message: `The user already exist`
        //     });
        // }

        let userId = uuidv4();
        db.data.users.push({ ...req.body, userId });
        db.write();

        return res.status(200).json({
            statusText: 'success',
            data: userId,
        });
    });

export default router;

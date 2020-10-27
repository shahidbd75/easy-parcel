import express from 'express';
import models from "../models";

const router = express.Router();


const getHandler = (req,res) => {
    const param = req.query;
    res.send('Hello Viewers: ' + param.id);
};

const postHandler = (req,res) => {
    const body = req.body;
    const user =  new models.User({
        username: body.username,
        createdAt: new Date()
    });
    user.save().then((savedUser) => {
        res.status(201).send('User saved. id = ' + savedUser._id);
    }).catch((error) => {
        res.status(500).send(error);
    });
};

router.post('/', postHandler);
router.get('/', getHandler);

const configure = (app) => {
    app.use('/users', router);
}

export default configure;
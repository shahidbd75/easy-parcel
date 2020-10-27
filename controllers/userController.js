import express from 'express';
import {saveUser} from "../services/userService";

const router = express.Router();


const getHandler = (req,res) => {
    const param = req.query;
    res.send('Hello Viewers: ' + param.id);
};

const postHandler = async (req,res) => {
    const body = req.body;
    const user = await saveUser(body); 
    res.send(user._id);
};

router.post('/', postHandler);
router.get('/', getHandler);

const configure = (app) => {
    app.use('/users', router);
}

export default configure;
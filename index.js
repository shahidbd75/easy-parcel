import express from 'express';
import connectToDb from './mongo';
import configure from "./controllers";
import  { handleErrors }  from "./middlewares/handleErrors";

const app = express();
const port = 3000;
app.use(express.json());

const processRequest =  async (req, res, next) => {
    let correlationId = req.headers['x-correlation-id'];
    if(!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
    }
    res.set('x-correlation-id', correlationId);

    return next();
}

app.use(processRequest);

connectToDb();
configure(app);

app.use(handleErrors);

app.listen(port, () => {
    log(`application running on port 3000`);
});

const log = (message) => {
    console.log(message);
}
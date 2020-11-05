import express from 'express';
import connectToDb from './mongo';
import configure from "./controllers";
import { handleErrors }  from "./middlewares/handleErrors";
import winston from 'winston';
import expressWinston from 'express-winston';
import winstonFile from 'winston-daily-rotate-file';
import winstonMongo from 'winston-mongodb';
import { ElasticsearchTransport } from 'winston-elasticsearch';

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

const getMessage = (req, res) => {
    let obj = {
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body
    };
    return JSON.stringify(obj);
}

const fileInfoTransport = new (winston.transports.DailyRotateFile)({
    filename: 'log-info-%DATE%.log',
    datePattern: 'yyyy-MM-DD-HH'
});

const infoLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        fileInfoTransport
    ],
    format: winston.format.combine(winston.format.colorize(),winston.format.json()),
    meta:false,
    msg: getMessage
});

app.use(infoLogger);

configure(app);

app.use(handleErrors);

app.listen(port, () => {
    log(`application running on port 3000`);
});

const log = (message) => {
    console.log(message);
}
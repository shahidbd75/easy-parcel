import express from 'express';
import { connectToDb, uri } from './mongo';
import configure from "./controllers";
import { handleErrors, handleRequest }  from "./middlewares/index";
import { infoLogger, errorLogger } from './logger';
import dotenv from "dotenv";

dotenv.config();

const app = express();

console.log(process.env.ENVIRONMENT);

app.use(express.json());

app.use(handleRequest); 

connectToDb();

if(process.env.ENVIRONMENT !== 'TEST')
    app.use(infoLogger());

configure(app);

if(process.env.ENVIRONMENT !== 'TEST')
    app.use(errorLogger(uri));

app.use(handleErrors);

export default app;
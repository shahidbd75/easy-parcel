import express from 'express';
import connectToDb from './mongo';
import configure from "./controllers";
import  { handleErrors }  from "./middlewares/handleErrors";

const app = express();
const port = 3000;
app.use(express.json());

connectToDb();
configure(app);

app.use(handleErrors);

app.listen(port, () => {
    log(`application running on port 3000`);
});

const log = (message) => {
    console.log(message);
}
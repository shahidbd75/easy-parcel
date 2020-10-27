import express from "express";
import connectToDb from './mongo';
import configure from "./controllers";

const app = express();
const port = 3000;
app.use(express.json());

connectToDb();
configure(app);

app.listen(port, () => {
    log(`application running on port 3000`);
});

const log = (message) => {
    console.log(message);
}
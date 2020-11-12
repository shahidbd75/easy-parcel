import app from './app';
const port = 3000;

app.listen(port, () => {
    log(`application running on port 3000`);
});

const log = (message) => {
    console.log(message);
}
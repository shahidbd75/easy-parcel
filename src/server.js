import app from './app';

const port = 3000;

app.listen(port, () => {
    log(`application running on port: ${port}`);
});

const log = (message) => {
    console.log(message);
}
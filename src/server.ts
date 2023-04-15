import app from './app';

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`new Microservice-auth app listening on port ${port}`);
});

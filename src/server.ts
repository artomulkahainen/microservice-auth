import app from './app';

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Microservice-auth app listening on port ${port}`);
});

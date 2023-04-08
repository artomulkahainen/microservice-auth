import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import routes from '@controllers/routes';

dotenv.config();
const app = express();

morgan.token('body', (req) => {
    return JSON.stringify(req);
});
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(express.json());
app.use('/api', routes);

export default app;

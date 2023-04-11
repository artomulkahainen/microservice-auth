import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import allRoutes from '@routes/allRoutes';
import { errorHandler } from '@utils/customMiddlewares';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

morgan.token('body', (req) => {
    return JSON.stringify(req);
});
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', allRoutes);

app.use(errorHandler);

export default app;

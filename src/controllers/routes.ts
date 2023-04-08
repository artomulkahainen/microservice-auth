import { Router } from 'express';
import { getHelloWorld } from './helloWorldController';

const routes = Router();

// hello world api
routes.get('/hello-world', getHelloWorld);

export default routes;

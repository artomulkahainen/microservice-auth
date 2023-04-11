import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';

const routes = Router();

// auth api
routes.use('/auth', authRoutes);

// user api
routes.use('/user', userRoutes);

export default routes;

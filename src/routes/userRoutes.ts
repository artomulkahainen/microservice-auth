import { Router } from 'express';
import { getHelloWorld } from '@controllers/userController';
import { isAdmin, isAuthenticated } from '@validators/authValidator';

export const userRoutes = Router();

userRoutes.get('/normal-user', isAuthenticated, getHelloWorld);
userRoutes.get('/admin-user', isAdmin, getHelloWorld);

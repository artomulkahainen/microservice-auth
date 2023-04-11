import { Router } from 'express';
import {
    getTokenRequest,
    getTokenValidityRequest,
} from '@controllers/authController';
import {
    validateGetTokenRequest,
    validateGetTokenValidityRequest,
} from '@validators/authValidator';

export const authRoutes = Router();

// find access_token by authorization_code or refresh_token
authRoutes.post('/token', validateGetTokenRequest, getTokenRequest);

// check if access_token is valid
authRoutes.get(
    '/valid',
    validateGetTokenValidityRequest,
    getTokenValidityRequest
);

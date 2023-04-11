import { NextFunction, Request } from 'express';
import { TokenRequest } from '@dto/authDtos';
import { TypedRequestBody } from '@dto/common';
import { verifyTokenRequest } from '@services/authService';
import {
    forbiddenError,
    unauthorizedError,
    validationError,
} from '@utils/errors';
import { isNotEmptyString } from '@utils/typeGuards';
import { ADMIN_USER } from '@utils/types';

const isValidAuthHeader = (authHeader?: string) => {
    if (
        // if auth header is empty
        !isNotEmptyString(authHeader) ||
        // if auth header doesnt start with Bearer
        !authHeader.startsWith('Bearer') ||
        // if auth header contains more than one spaces
        authHeader.split(' ').length !== 2 ||
        // is token is empty
        authHeader.split(' ')[1].length < 1
    ) {
        return false;
    }

    return true;
};

export const validateGetTokenRequest = (
    req: TypedRequestBody<TokenRequest>,
    _,
    next: NextFunction
) => {
    if (
        (req.body.type === 'authorization_code' && !req.body.redirect_path) ||
        (req.body.type !== 'authorization_code' &&
            req.body.type !== 'refresh_token') ||
        !req.body.authorizationValue
    ) {
        return next(validationError);
    }

    next();
};

export const validateGetTokenValidityRequest = (
    req: Request,
    _,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];

    if (!isValidAuthHeader(authHeader)) {
        return next(validationError);
    }

    next();
};

export const isAuthenticated = async (req: Request, _, next: NextFunction) => {
    if (isValidAuthHeader(req.headers['authorization'])) {
        try {
            const authToken = req.headers['authorization'].split(' ')[1];
            await verifyTokenRequest(authToken);
            return next();
        } catch (e) {
            console.error(e);
        }
    }

    next(unauthorizedError);
};

export const isAdmin = async (req: Request, _, next: NextFunction) => {
    if (isValidAuthHeader(req.headers['authorization'])) {
        try {
            const authToken = req.headers['authorization'].split(' ')[1];
            const validatedToken = await verifyTokenRequest(authToken);

            if (!validatedToken.roles.includes(ADMIN_USER)) {
                return next(forbiddenError);
            }

            return next();
        } catch (e) {
            console.error(e);
        }
    }

    next(unauthorizedError);
};

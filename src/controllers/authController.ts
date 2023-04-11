import { NextFunction, Request, Response } from 'express';
import { TokenDTO, TokenRequest, ValidTokenDTO } from '@dto/authDtos';
import { TypedRequestBody } from '@dto/common';
import { mapKeycloakResponseToTokenDTO } from '@mappers/authMapper';
import {
    sendTokenRequestToKeycloak,
    verifyTokenRequest,
} from '@services/authService';

// find access_token by authorization_code or refresh_token
export const getTokenRequest = async (
    req: TypedRequestBody<TokenRequest>,
    res: Response<TokenDTO>,
    next: NextFunction
) => {
    try {
        const keycloakRes = await sendTokenRequestToKeycloak(
            req.body.authorizationValue,
            req.body.type,
            req.body.redirect_path
        );

        res.json(mapKeycloakResponseToTokenDTO(keycloakRes));
    } catch (e) {
        next(e);
    }
};

// check if access_token is valid
export const getTokenValidityRequest = async (
    req: Request,
    res: Response<ValidTokenDTO>,
    next: NextFunction
) => {
    try {
        const authToken = req.headers['authorization'].split(' ')[1];

        const keycloakRes = await verifyTokenRequest(authToken);

        res.json(keycloakRes);
    } catch (e) {
        next(e);
    }
};

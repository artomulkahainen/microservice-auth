import axios, { AxiosResponse } from 'axios';
import { IntrospectResponse, KeycloakResponse } from '@dto/authDtos';
import { keycloakError, unauthorizedError } from '@utils/errors';
import { parseJwt } from '@utils/functionUtils';

export const sendTokenRequestToKeycloak = async (
    authorizationValue: string,
    type: string,
    redirect_path?: string
) => {
    const body = new URLSearchParams();
    body.set('client_id', process.env.KEYCLOAK_CLIENT);
    body.set('client_secret', process.env.KEYCLOAK_CLIENT_SECRET);

    if (type === 'authorization_code') {
        body.set('grant_type', 'authorization_code');
        body.set('redirect_uri', redirect_path);
        body.set('code', authorizationValue);
    } else {
        body.set('grant_type', 'refresh_token');
        body.set('refresh_token', authorizationValue);
    }

    try {
        const tokenFetch: AxiosResponse<KeycloakResponse> = await axios.post(
            `${process.env.KEYCLOAK_HTTP_PROTOCOL}://${process.env.KEYCLOAK_HOST}` +
                `:${process.env.KEYCLOAK_PORT}/realms/` +
                `${process.env.KEYCLOAK_REALM}${process.env.KEYCLOAK_TOKEN_URL_POST_FIX}`,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        if (tokenFetch.status !== 200) {
            throw keycloakError;
        }

        return tokenFetch.data;
    } catch (e) {
        throw e;
    }
};

export const verifyTokenRequest = async (authToken: string) => {
    const body = new URLSearchParams();
    body.set('client_id', process.env.KEYCLOAK_CLIENT);
    body.set('client_secret', process.env.KEYCLOAK_CLIENT_SECRET);
    body.set('token_type_hint', 'requesting_party_token');
    body.set('token', authToken);

    try {
        const tokenFetch: AxiosResponse<IntrospectResponse> = await axios.post(
            `${process.env.KEYCLOAK_HTTP_PROTOCOL}://${process.env.KEYCLOAK_HOST}` +
                `:${process.env.KEYCLOAK_PORT}/realms/` +
                `${process.env.KEYCLOAK_REALM}${process.env.KEYCLOAK_TOKEN_URL_POST_FIX}` +
                `/introspect`,
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        if (!tokenFetch.data.active) {
            throw unauthorizedError;
        }

        const parsedToken = parseJwt(authToken);

        return {
            userId: parsedToken.userId,
            username: parsedToken.preferred_username,
            roles: parsedToken.realm_access.roles,
        };
    } catch (e) {
        throw e;
    }
};

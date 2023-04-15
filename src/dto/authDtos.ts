export interface TokenRequest extends Request {
    authorizationValue: string;
    type: 'refresh_token' | 'authorization_code';
    redirect_path?: string;
}

export interface TokenDTO {
    access_token: string;
    refresh_token: string;
}

export interface KeycloakResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    'not-before-policy': number;
    session_state: string;
    scope: string;
}

export interface IntrospectResponse {
    exp: number;
    nbf: number;
    iat: number;
    jti: string;
    typ: 'Bearer';
    acr: number;
    active: boolean;
}

export interface ValidTokenDTO {
    userId: string;
    username: string;
    roles: string[];
}

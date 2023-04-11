import { KeycloakResponse, TokenDTO } from '@dto/authDtos';

export const mapKeycloakResponseToTokenDTO = (
    response: KeycloakResponse
): TokenDTO => ({
    access_token: response.access_token,
    refresh_token: response.refresh_token,
});

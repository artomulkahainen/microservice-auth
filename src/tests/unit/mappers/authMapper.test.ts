import { mapKeycloakResponseToTokenDTO } from '../../../mappers/authMapper';

describe('AuthMapper unit tests', () => {
    it('maps KeycloakResponse to dto ok', () => {
        const keycloakResponse = {
            access_token: 'access',
            refresh_token: 'reff',
            refresh_expires_in: 300,
            token_type: 'Bearer',
            expires_in: 300,
            'not-before-policy': 0,
            session_state: 'fdsfs',
            scope: 'openid',
        };

        expect(
            mapKeycloakResponseToTokenDTO(keycloakResponse).access_token
        ).toEqual('access');
        expect(
            mapKeycloakResponseToTokenDTO(keycloakResponse).refresh_token
        ).toEqual('reff');
    });
});

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { TokenDTO, ValidTokenDTO } from '../../dto/authDtos';
import { NORMAL_USER } from '../../utils/types';
import { normalUserAccessToken, superTestApi } from '../config/testConfig';

describe('AuthApi', () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    describe('successful POST /api/auth/token requests', () => {
        it('request with authorization_code ok', async () => {
            // mock keycloak request
            const axiosRes = {
                access_token: 'access_token',
                refresh_token: 'refresh_token',
            };
            mock.onPost(
                `${process.env.KEYCLOAK_HTTP_PROTOCOL}://${process.env.KEYCLOAK_HOST}` +
                    `:${process.env.KEYCLOAK_PORT}/realms/` +
                    `${process.env.KEYCLOAK_REALM}${process.env.KEYCLOAK_TOKEN_URL_POST_FIX}`
            ).reply(200, axiosRes);

            // do api test
            const request = {
                authorizationValue:
                    '0ab053ab-ea8a-43ab-9616-28dafb06c2df.7a269fa9-77b0',
                redirect_path: 'http://test-server.com/redirect',
                type: 'authorization_code',
            };
            const res = await superTestApi
                .post('/api/auth/token')
                .send(request)
                .expect(200);
            expect((res.body as TokenDTO).access_token).toEqual('access_token');
            expect((res.body as TokenDTO).refresh_token).toEqual(
                'refresh_token'
            );
        });
        it('request with refresh_token ok', async () => {
            // mock keycloak request
            const axiosRes = {
                access_token: 'access_token_two',
                refresh_token: 'refresh_token_two',
            };
            mock.onPost(
                `${process.env.KEYCLOAK_HTTP_PROTOCOL}://${process.env.KEYCLOAK_HOST}` +
                    `:${process.env.KEYCLOAK_PORT}/realms/` +
                    `${process.env.KEYCLOAK_REALM}${process.env.KEYCLOAK_TOKEN_URL_POST_FIX}`
            ).reply(200, axiosRes);

            // do api test
            const request = {
                authorizationValue: 'refresh_token_one',
                type: 'refresh_token',
            };
            const res = await superTestApi
                .post('/api/auth/token')
                .send(request)
                .expect(200);
            expect((res.body as TokenDTO).access_token).toEqual(
                'access_token_two'
            );
            expect((res.body as TokenDTO).refresh_token).toEqual(
                'refresh_token_two'
            );
        });
    });

    describe('unsuccessful POST /api/auth/token requests', () => {
        it('when redirect path is lacking, return 400', async () => {
            const request = {
                authorizationValue:
                    '0ab053ab-ea8a-43ab-9616-28dafb06c2df.7a269fa9-77b0',
                type: 'authorization_code',
            };
            await superTestApi
                .post('/api/auth/token')
                .send(request)
                .expect(400);
        });
        it('when authorization value is empty, return 400', async () => {
            const request = {
                authorizationValue: '',
                redirect_path: 'http://test-server.com/redirect',
                type: 'authorization_code',
            };
            await superTestApi
                .post('/api/auth/token')
                .send(request)
                .expect(400);
        });
        it('when type is incorrect, return 400', async () => {
            const request = {
                authorizationValue: 'test-value-here',
                redirect_path: 'http://test-server.com/redirect',
                type: 'something',
            };
            await superTestApi
                .post('/api/auth/token')
                .send(request)
                .expect(400);
        });
        it('on keycloak reject, return 400', async () => {
            // mock keycloak request
            const error = {
                error: 'bad error',
            };
            mock.onPost(
                `${process.env.KEYCLOAK_HTTP_PROTOCOL}://${process.env.KEYCLOAK_HOST}` +
                    `:${process.env.KEYCLOAK_PORT}/realms/` +
                    `${process.env.KEYCLOAK_REALM}${process.env.KEYCLOAK_TOKEN_URL_POST_FIX}`
            ).reply(400, error);

            // do api test
            const request = {
                authorizationValue:
                    '0ab053ab-ea8a-43ab-9616-28dafb06c2df.7a269fa9-77b0',
                redirect_path: 'http://test-server.com/redirect',
                type: 'authorization_code',
            };

            await superTestApi
                .post('/api/auth/token')
                .send(request)
                .expect(400);
        });
    });

    describe('successful GET /api/auth/valid requests', () => {
        it('request with correct header is ok', async () => {
            // mock keycloak api request
            const axiosRes = {
                active: true,
            };
            mock.onPost(
                `${process.env.KEYCLOAK_HTTP_PROTOCOL}://${process.env.KEYCLOAK_HOST}` +
                    `:${process.env.KEYCLOAK_PORT}/realms/` +
                    `${process.env.KEYCLOAK_REALM}${process.env.KEYCLOAK_TOKEN_URL_POST_FIX}/introspect`
            ).reply(200, axiosRes);

            // do api test
            const res = await superTestApi
                .get('/api/auth/valid')
                .set({
                    Authorization: normalUserAccessToken,
                })
                .expect(200);
            expect((res.body as ValidTokenDTO).userId).toEqual(
                'd35f9a18-e1ef-4241-a2e0-bdddad8fb47d'
            );
            expect((res.body as ValidTokenDTO).username).toEqual('testi');
            expect(
                (res.body as ValidTokenDTO).roles.some(
                    (role) => role === NORMAL_USER
                )
            ).toBeTruthy();
        });
    });

    describe('unsuccessful GET /api/auth/valid requests', () => {
        it('if token is expired or invalid, return 401', async () => {
            // mock keycloak api request
            const axiosRes = {
                active: false,
            };
            mock.onPost(
                `${process.env.KEYCLOAK_HTTP_PROTOCOL}://${process.env.KEYCLOAK_HOST}` +
                    `:${process.env.KEYCLOAK_PORT}/realms/` +
                    `${process.env.KEYCLOAK_REALM}${process.env.KEYCLOAK_TOKEN_URL_POST_FIX}/introspect`
            ).reply(200, axiosRes);

            // do api test
            await superTestApi
                .get('/api/auth/valid')
                .set({
                    Authorization: normalUserAccessToken,
                })
                .expect(401);
        });
        it('if authorization header is in wrong format, return 400', async () => {
            await superTestApi
                .get('/api/auth/valid')
                .set({
                    Authorization: 'Bearer',
                })
                .expect(400);
        });
    });
});

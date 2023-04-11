import { parseJwt } from '../../../utils/functionUtils';
import { NORMAL_USER } from '../../../utils/types';
import { normalUserAccessToken } from '../../config/testConfig';

describe('functionUtils unit tests', () => {
    it('parseJwt works ok', () => {
        const token = normalUserAccessToken.split(' ')[1];
        const parsedToken = parseJwt(token);

        expect(parsedToken.preferred_username).toEqual('testi');
        expect(
            parsedToken.realm_access.roles.includes(NORMAL_USER)
        ).toBeTruthy();
    });
});

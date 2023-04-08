import { apiRoute } from '../../../utils/stringUtils';

describe('api routes work as expected', () => {
    test('returns api route', () => {
        expect(apiRoute('/test')).toBe('/api/test');
    });

    test('throws an error, if slash is not used as first character of apiRoute param', () => {
        expect(() => apiRoute('octopus')).toThrow(
            new Error('api routes must start with /')
        );
    });
});

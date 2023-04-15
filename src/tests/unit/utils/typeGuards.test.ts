import { isNotEmptyString } from '../../../utils/typeGuards';

describe('typeGuards unit tests', () => {
    it('isNotEmptyString works ok', () => {
        expect(isNotEmptyString(undefined)).toBeFalsy();
        expect(isNotEmptyString(false)).toBeFalsy();
        expect(isNotEmptyString('')).toBeFalsy();
        expect(isNotEmptyString(' ')).toBeTruthy();
        expect(isNotEmptyString('cat')).toBeTruthy();
    });
});

import { isObject } from '../src/utils';

describe('Utils', () => {
    test('isObject works', () => {
        expect(isObject({})).toBeTruthy();
        expect(isObject('')).toBeFalsy();
        expect(isObject(null)).toBeFalsy();
        expect(isObject([])).toBeFalsy();
    });
});

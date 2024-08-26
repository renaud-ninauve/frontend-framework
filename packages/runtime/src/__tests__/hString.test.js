import {hString, DOM_TYPES} from '../index'
import {expect, test} from 'vitest'

test('string element', () => {
    const actual = hString('toto');
    expect(actual).toMatchObject({
        value: 'toto',
        type: DOM_TYPES.TEXT
    });
});

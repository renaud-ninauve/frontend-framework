import {withoutNulls} from '../utils/array'
import {expect, test} from 'vitest'

test('without nulls', () => {
    const actual = withoutNulls([1, null, 2, 3]);
    expect(actual).toStrictEqual([1, 2, 3]);
});
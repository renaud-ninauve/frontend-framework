import {h, hFragment, lipsum, LIPSUM} from '../h'
import {expect, test} from 'vitest'

test('lipsum', () => {
    const actual = lipsum(3);
    expect(actual.children).toHaveLength(3);
    expect(actual).toMatchObject(hFragment([
        h('p', {}, [LIPSUM]),
        h('p', {}, [LIPSUM]),
        h('p', {}, [LIPSUM])
    ]));
});
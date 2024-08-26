import {h, hFragment, hString, DOM_TYPES} from '../index'
import {expect, test} from 'vitest'

test('children of type element and text', () => {
    const actual = hFragment([h('div'), hString('toto')]);
    expect(actual).toMatchObject({
        children: [h('div'), hString('toto')],
        type: DOM_TYPES.FRAGMENT
    });
});

test('null children', () => {
    const actual = hFragment([null, h('div'), null]);
    expect(actual).toMatchObject({
        children: [h('div')],
        type: DOM_TYPES.FRAGMENT
    });
});

test('children of type string', () => {
    const actual = hFragment(['toto', h('div'), 'titi']);
    expect(actual).toMatchObject({
        children: [hString('toto'), h('div'), hString('titi')],
        type: DOM_TYPES.FRAGMENT
    });
});

test('children of type fragment', () => {
    const actual = hFragment([hFragment([h('div')])]);
    expect(actual).toMatchObject({
        children: [hFragment([h('div')])],
        type: DOM_TYPES.FRAGMENT
    });
});
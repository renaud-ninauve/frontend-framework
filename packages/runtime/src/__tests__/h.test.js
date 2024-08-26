import {h, hString, hFragment, DOM_TYPES} from '../index'
import {expect, test} from 'vitest'

test('tag only', () => {
    const actual = h('div');
    expect(actual).toMatchObject({
        tag: 'div',
        props: {},
        children: [],
        type: DOM_TYPES.ELEMENT
    });
});

test('tag, props, children', () => {
    const actual = h('div', {'hello': 'toto'}, [h('div')]);
    expect(actual).toMatchObject({
        tag: 'div',
        props: {'hello': 'toto'},
        children: [h('div')],
        type: DOM_TYPES.ELEMENT
    });
});

test('null children', () => {
    const actual = h('div', {}, [null, h('div'), null]);
    expect(actual).toMatchObject({
        tag: 'div',
        props: {},
        children: [h('div')],
        type: DOM_TYPES.ELEMENT
    });
});

test('string children', () => {
    const actual = h('div', {}, ['a text child', h('div'), 'another text child']);
    expect(actual).toMatchObject({
        tag: 'div',
        props: {},
        children: [hString('a text child'), h('div'), hString('another text child')],
        type: DOM_TYPES.ELEMENT
    });
});
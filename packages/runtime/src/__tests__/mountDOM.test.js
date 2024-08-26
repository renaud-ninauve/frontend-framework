import {mountDOM, h, hString, hFragment, DOM_TYPES} from '../h'
import {beforeEach, expect, test, vi} from 'vitest'

beforeEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  });

test('empty', () => {
    const vdom = {};
    const parent = document.body;
    mountDOM({}, parent);
    expect(parent.childElementCount).toBe(0);
});

test('text', () => {
    const vdom = hString('hello');
    const parent = document.body;

    mountDOM(vdom, parent);

    expect(parent.childElementCount).toBe(0);
    expect(parent.textContent).toBe('hello');

    expect(vdom.el).toBe(parent);
});

test('empty element', () => {
    const vdom = h('h1');
    const parent = document.body;

    mountDOM(vdom, parent);

    expect(parent.childElementCount).toBe(1);
    expect(parent.children[0].tagName).toMatch(/h1/i);

    expect(vdom.el).toBe(parent.children[0]);
});

test('element with attributes', () => {
    const vdom = h('h1', {'attr1': "value1", "attr2": "value2"});
    const parent = document.body;
    mountDOM(vdom, parent);
    expect(parent.childElementCount).toBe(1);
    expect(parent.children[0].getAttribute('attr1')).toBe('value1');
    expect(parent.children[0].getAttribute('attr2')).toBe('value2');
});

test('element with text child', () => {
    const vdom = h('h1', {}, ['hello']);
    const parent = document.body;
    mountDOM(vdom, parent);

    expect(parent.childElementCount).toBe(1);
    const actualElement = parent.children[0];
    expect(actualElement.textContent).toBe('hello');

    expect(vdom.el).toBe(actualElement)
    expect(vdom.children[0].el).toBe(actualElement);
});

test('element with element child', () => {
    const vdom = h('h1', {}, [h('h2')]);
    const parent = document.body;

    mountDOM(vdom, parent);

    expect(parent.childElementCount).toBe(1);
    const actualElement = parent.children[0];
    expect(actualElement.childElementCount).toBe(1);
    const actualChild = actualElement.children[0];
    expect(actualChild.tagName).toMatch(/h2/i);

    expect(vdom.el).toBe(actualElement);
    expect(vdom.children[0].el).toBe(actualChild);
});

test('empty fragment', () => {
    const vdom = hFragment([]);
    const parent = document.body;
    mountDOM({}, parent);
    expect(parent.childElementCount).toBe(0);
});

test('fragment', () => {
    const vdom = hFragment([h('h1'), h('h2')]);
    const parent = document.body;

    mountDOM(vdom, parent);

    expect(parent.childElementCount).toBe(2);
    const actualChild1 = parent.children[0];
    const actualChild2 = parent.children[1];
    expect(parent.children[0].tagName).toMatch(/h1/i);
    expect(parent.children[1].tagName).toMatch(/h2/i);

    expect(vdom.children[0].el).toBe(actualChild1);
    expect(vdom.children[1].el).toBe(actualChild2);
});

test('element with events', () => {
    const expectedOnClick = vi.fn();
    const vdom = h('button', {'on': {'click': expectedOnClick}});
    const parent = document.body;

    mountDOM(vdom, parent);

    expect(parent.childElementCount).toBe(1);
    const actualElement = parent.children[0];
    actualElement.click();
    expect(expectedOnClick).toHaveBeenCalled();

    expect(vdom.listeners).toContain(expectedOnClick);
});
import {mountDOM, destroyDOM, h, hString, hFragment} from '../index'
import {beforeEach, expect, test, vi} from 'vitest'

beforeEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  });

test('text', () => {
    const vdom = hString('hello');
    const parent = document.body;

    mountDOM(vdom, parent);
    destroyDOM(vdom);

    expect(parent.childElementCount).toBe(0);
    expect(parent.textContent).toBe('');

    expect(vdom.el).toBeUndefined();    
});

test('empty element', () => {
    const vdom = h('h1');
    const parent = document.body;

    mountDOM(vdom, parent);
    destroyDOM(vdom);

    expect(parent.childElementCount).toBe(0);

    expect(vdom.el).toBeUndefined();
});

test('empty element', () => {
    const vdom = h('h1');
    const parent = document.body;

    mountDOM(vdom, parent);
    destroyDOM(vdom);

    expect(parent.childElementCount).toBe(0);

    expect(vdom.el).toBeUndefined();
});

test('element with text child', () => {
    const vdom = h('h1', {}, ['hello']);
    const parent = document.body;
   
    mountDOM(vdom, parent);
    destroyDOM(vdom);

    expect(parent.childElementCount).toBe(0);

    expect(vdom.el).toBeUndefined();
    expect(vdom.children[0].el).toBeUndefined();
});

test('element with element child', () => {
    const vdom = h('h1', {}, [h('h2')]);
    const parent = document.body;

    mountDOM(vdom, parent);
    destroyDOM(vdom);

    expect(parent.childElementCount).toBe(0);
    
    expect(vdom.el).toBeUndefined();
    expect(vdom.children[0].el).toBeUndefined();
});

test('element with events', () => {
    const expectedOnClick = vi.fn();
    const vdom = h('button', {'on': {'click': expectedOnClick}});
    const parent = document.body;

    mountDOM(vdom, parent);
    destroyDOM(vdom);

    expect(vdom.listeners).toBeUndefined();
});

test('fragment', () => {
    const vdom = hFragment([h('h1'), h('h2')]);
    const parent = document.body;

    mountDOM(vdom, parent);
    destroyDOM(vdom);
    
    expect(parent.childElementCount).toBe(0);
   
    expect(vdom.children[0].el).toBeUndefined();
    expect(vdom.children[1].el).toBeUndefined();
});
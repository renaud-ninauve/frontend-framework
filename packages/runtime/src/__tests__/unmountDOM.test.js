import {mountDOM, unmountDOM, h, hString, hFragment} from '../index'
import {beforeEach, expect, test, vi} from 'vitest'

beforeEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  });

test('text', () => {
    const vdom = hString('hello');
    const parent = document.body;

    mountDOM(vdom, parent);
    unmountDOM(vdom);

    expect(parent.childElementCount).toBe(0);
    expect(parent.textContent).toBe('');

    expect(vdom.el).toBeUndefined();    
});
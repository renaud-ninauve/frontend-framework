import { withoutNulls } from './utils/array';

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment'
};

export const LIPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export function h(tag, props={}, children=[]) {
    return {
        tag: tag,
        props: props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT
    };
};

export function hString(value) {
    return {
        type: DOM_TYPES.TEXT,
        value: value
    };
};

export function hFragment(children) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(children))
    };
};

export function lipsum(count) {
    const paragraphs = [];
    for(let i=0; i<count; i++) {
        paragraphs.push(h('p', {}, [LIPSUM]));
    }
    return hFragment(paragraphs);
};

function mapTextNodes(nodes) {
    return nodes.map(node => {
        return typeof node === 'string' ? hString(node) : node;
    }); 
};
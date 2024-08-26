import { DOM_TYPES } from './h';

export function unmountDOM(vdom) {
    switch(vdom.type) {
        case DOM_TYPES.TEXT:
            removeTextNode(vdom);
            break;
        case DOM_TYPES.ELEMENT:
            removeElementNode(vdom);
            break;
        case DOM_TYPES.FRAGMENT:
            removeFragmentNode(vdom);
            break;
    }
}

function removeTextNode(vdom) {
    vdom.el.remove();
    vdom.el = undefined;    
}

function removeElementNode(vdom) {
}

function removeFragmentNode(vdom) {
}
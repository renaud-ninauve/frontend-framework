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
    vdom.el.remove();
    if (vdom.props.on) {
        for(const [event, listener] of Object.entries(vdom.props.on)) {
            vdom.el.removeEventListener(event, listener);
        }
    }

    vdom.el = undefined;
    vdom.listeners = undefined;
    
    for(const child of vdom.children) {
        unmountDOM(child);
    }
}

function removeFragmentNode(vdom) {
    for(const child of vdom.children) {
        unmountDOM(child);
    }
}
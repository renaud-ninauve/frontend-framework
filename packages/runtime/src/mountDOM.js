import { DOM_TYPES } from './h';

export function mountDOM(vdom, parent) {
    switch(vdom.type) {
        case DOM_TYPES.TEXT:
            createTextNode(vdom, parent);
            break;
        case DOM_TYPES.ELEMENT:
            createElementNode(vdom, parent);
            break;
        case DOM_TYPES.FRAGMENT:
            createFragmentNode(vdom, parent);
            break;
    }
}

function createTextNode(vdom, parent) {
    const textNode = document.createTextNode(vdom.value);
    vdom.el = textNode;
    parent.append(textNode);
}

function createElementNode(vdom, parent) {
    const elementNode = document.createElement(vdom.tag);
    parent.append(elementNode);
    vdom.el = elementNode;
  
    createAttributes(vdom);
    createListeners(vdom);

    for(const child of vdom.children) {
        mountDOM(child, elementNode);
    }
}

function createAttributes(vdom) {
    const elementNode = vdom.el;
    for(const [key, value] of Object.entries(vdom.props)) {
        if (key === 'on') {
            continue;
        }
        if (key === 'class') {
            addClass(value, elementNode);
        } else if (key === 'style') {
            addStyle(value, elementNode);
        } else {
            elementNode.setAttribute(key, value);
        }
    }
}

function addClass(classValue, elementNode) {
    if (typeof classValue === 'string') {
        elementNode.className = classValue;
    }
    if (Array.isArray(classValue)) {
        elementNode.className = classValue.join(' ');
    }
}

function addStyle(styleValue, elementNode) {
    for(const [key, value] of Object.entries(styleValue)) {
        elementNode.style[key] = value;
    }
}

function createListeners(vdom) {
    if (!vdom.props.on) {
        return;
    }
    const elementNode = vdom.el;
    vdom.listeners = [];
    for(const [event, listener] of Object.entries(vdom.props.on)) {
        elementNode.addEventListener(event, listener);
        vdom.listeners.push(listener);
    }
}

function createFragmentNode(vdom, parent) {
    for(const child of vdom.children) {
        mountDOM(child, parent);
    }
}
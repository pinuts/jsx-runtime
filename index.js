
function createFragmentFromChildren(children) {
    const fragment = document.createDocumentFragment();

    children.forEach(child => {
        if (child instanceof DocumentFragment || child instanceof HTMLElement || child instanceof SVGElement) {
            fragment.appendChild(child)
        } else if (typeof child === 'string') {
            const textnode = document.createTextNode(child)
            fragment.appendChild(textnode)
        } else if (child instanceof Array) {
            child.forEach(grandChild => {
                fragment.appendChild(grandChild);
            });
        } else if (child === undefined || child === false) {
            // Do nothing.
        } else if (typeof child == 'object' && typeof child.render == 'function') {
            fragment.appendChild(child.render());
        } else {
            throw `JSX.createElement - Not appendable: ${child}`;
        }
    });

    return fragment;
}

const JSX = {
    createElement: function(tag, attrs, ...children) {
        if (tag === JSX.Fragment) {
            return createFragmentFromChildren(children);
        } else if (typeof tag === 'function') {
            let elem = new tag(attrs, children);
            return elem.render();
        } else if (typeof tag === 'string') {
            // fragments to append multiple children to the initial node
            const fragment = createFragmentFromChildren(children);
            let element;
            
            if (tag == 'svg' || tag == 'use') {
                element = document.createElementNS("http://www.w3.org/2000/svg", tag);
            } else {
                element = document.createElement(tag);
            }

            element.appendChild(fragment)

            if (attrs) Object.keys(attrs).forEach(key => {
                const value = attrs[key];
                if (['onclick', 'onblur', 'onchange'].indexOf(key.toLowerCase()) >= 0) {
                    element.addEventListener(key.substring(2), value);
                } else {
                    if (tag == 'use' && key == 'href') {
                        // Safari < 12 needs "xlink:href":
                        element.setAttributeNS("http://www.w3.org/1999/xlink", 'xlink:href', value);
                    }
                    element.setAttribute(key, value);
                }
            })
            return element
        }
    },

    Fragment: 'This is a Fragment ... qtVvCq73LEeqKINStqN8Ezefkxh7OR30sfwSJrF881Qa'
}

module.exports = JSX;

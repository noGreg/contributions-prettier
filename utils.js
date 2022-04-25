/**
 * Renderer for element nodes [PENDING UPDATE THIS WITH BETTER PATTERNS] ⚠
 * @param {Sring} tag HTMLElement valid tag name
 * @param {HTMLElement} parent Element valid parent node
 * @param {String} classList Space separated class names 
 * @returns {ElementCSSInlineStyle}
 */
function render(tag, parent, classList = undefined) {
    let elem = document.createElement(tag);
    
    if (typeof classList == 'string' && classList.length > 0) {
        let classes = classList.split(' ');
        classes.forEach((cls) => {
            elem.classList.add(cls);
        });
    }

    /**
     * CSS styles method
     * @param {StyleObject} stylesObject CSS styles object, eg. { padding: 0 }
     */
    elem.css = (stylesObject) => {
        Object.assign(elem.style, stylesObject);
        return elem;
    }

    if (parent) {
        parent.appendChild(elem);
    }

    return elem;
}
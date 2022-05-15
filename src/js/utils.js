/**
 * Creates a new method for inserting CSS to HTMLElement
 * @param {StylesObject}} Styles object 
 * @returns {HTMLElement}
 */
HTMLElement.prototype.css = function(object) {
    Object.assign(this.style, object);
    return this;
}

/**
 * Renderer for element nodes /// -*-*- //// [PENDING UPDATE THIS WITH BETTER PATTERNS] ⚠
 * @param {Sring} tag HTMLElement valid tag name
 * @param {HTMLElement} parent Element valid parent node
 * @param {String} classList Space separated class names 
 * @returns {HTMLElement}
 */
function render(tag, parent, classList = undefined) {
    let elem = document.createElement(tag);
    
    if (typeof classList == 'string' && classList.length > 0) {
        classList.split(' ').forEach((cls) => {
            elem.classList.add(cls);
        });
    }

    if (parent) {
        parent.appendChild(elem);
    }

    return elem;
}

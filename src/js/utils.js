/**
 * Creates a new method for inserting CSS to HTMLElement
 * @param {StylesObject}} Styles object
 * @returns {HTMLElement}
 */
HTMLElement.prototype.css = function (object) {
  Object.assign(this.style, object);
  return this;
};

/**
 * Renderer for element nodes
 * @param {Sring | Array} tag HTMLElement valid tag name
 * @param {HTMLElement} parent Element valid parent node
 * @param {String} classList Space separated class names
 * @returns {HTMLElement}
 */
function render(tag, parent, classList = undefined) {
  const renderElement = (t) => {
    const elem = document.createElement(t);

    if (typeof classList == "string" && classList.length > 0) {
      classList.split(" ").forEach((cls) => {
        elem.classList.add(cls);
      });
    }

    if (parent) parent.appendChild(elem);

    return elem;
  };

  return Array.isArray(tag)
    ? Array(tag[1])
        .fill(tag[0])
        .map((t) => renderElement(t))
    : renderElement(tag);
}

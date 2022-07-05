class Persister {
  #storage;
  #gestor;
  #name;

  /**
   * Storage management class
   * @param {String} name
   * @param {Any} initialValue
   * @param {String} gestor possible values: `"localStorage"` | `"sessionStorage"`
   */
  constructor(name, initialValue, gestor = "localStorage") {
    this.#gestor = window[gestor];
    this.#name = name;

    if (this.#gestor[name]) this.#storage = JSON.parse(this.#gestor.getItem(name));
    else {
      this.#gestor.setItem(name, JSON.stringify(initialValue));
      this.#storage = initialValue;
    }
  }

  /**
   * Read values into storage
   * @param {String} key Possible values: `"user"` | `"user.lastName"`
   */
  read(key = undefined) {
    if (!key) return this.#storage;
    if (this.#storage[key]) return this.#storage[key];

    return key.indexOf(".") > -1 ? this.deeper(key.split(".")) : null;
  }

  /**
   * Set or modify values into storage
   * @param {String} key Possible values: `"user"` | `"user.lastName"`
   * @param {Any} value
   */
  write(key, value) {
    this.#storage[key] = value;
    this.#gestor.setItem(this.#name, JSON.stringify(this.#storage));
  }

  deeper(keys, value = undefined) {
    const current = keys.shift();

    if (!current) return value;

    if (value && typeof value === "object")
      return this.deeper(keys, value[current]);

    return this.deeper(keys, this.#storage[current]);

    // ---- Dynamic version ---------------------

    // let currentValue;

    // for(let k = 0; k < keys.length; k++) {
    //   if (this.#storage[keys[k]]) currentValue = this.#storage[keys[k]];
    //   if (currentValue && typeof currentValue === "object") currentValue = currentValue[keys[k]];
    // }

    // return currentValue;
  }
}


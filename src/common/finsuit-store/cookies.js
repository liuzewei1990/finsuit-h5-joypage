

import Cookies from "js-cookie"

class Storage {
    constructor() {

    }

    setItem (key, value) {
        Cookies.set(key, value, { expires: 7 });
    }

    getItem (key) {
        return Cookies.get(key);
    }

    removeItem (key) {
        Cookies.remove(key);
    }
}

export default new Storage();
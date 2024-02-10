import * as map from "./core/resource_map.js"


// key: string tag
// value: reference to the module object
let has = map.has;
let get = map.get;
let remove = map.unload;

// if the key returns  a value it is true
function allocate(key) {
    if (!has(key))
        map.loadRequested(key);
}

function set(key, value) {
    if (!has(key))
        allocate(key);
    map.set(key, value);
}

export { has, get, set, remove}

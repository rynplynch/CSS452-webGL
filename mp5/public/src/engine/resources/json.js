/*
 * File: json.js
 *
 * logics for loading a json file into the resource_map
 */
"use strict";

import * as map from "../core/resource_map.js";
// functions from resource_map
let unload = map.unload;
let has = map.has;
let get = map.get;

let mParser = JSON;

function decodeJSON(data) {
  return data.text()
}

function parseJSON(text) {
  // use the parser to create a json object
  return JSON.parse(text)
}

function load(path) {
    return map.loadDecodeParse(path, decodeJSON, parseJSON);
}

export {has, get, load, unload}

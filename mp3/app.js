'use strict'
// imports
var express = require("express");
var path = require("path");

// core variables
var app = express()
// public directory location
// absolute path returned from __dirname
var srcPath = path.join(__dirname, 'public');

// static load of javascript modules
// all files copied to client
app.use(express.static(srcPath));

module.exports = app;

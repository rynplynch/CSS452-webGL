'use strict'
// imports
var express = require("express");
var path = require('path');

// core variables
var app = express()
var srcPath = path.join(__dirname, 'public');
var PORT = 8080;
var HOST = 'localhost';

// server up the public directory
// all files copied to client
app.use(express.static(srcPath));

console.log("hello")
console.log("hello")
console.log("hello")
var server = app.listen(PORT, HOST, function () {
    console.log('listening on http://'+HOST+':'+PORT+'/');
});

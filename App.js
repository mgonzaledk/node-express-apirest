var express = require('express')
var http = require('http')
var https = require('https')

var app = express()

module.exports = app

var server = http.createServer(app)
server.listen(8001)

if (process.env.NODE_ENV === 'production') {
    var sslConfig = require('./Config/Ssl')

    var secureServer = https.createServer(app, sslConfig)
    secureServer.listen(8002)
}

var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

function handle(req, res) {
	res.writeHead(200, {
		"Content-type": 'text/html'
	})
	res.end('Hello world!')
}


var server = http.createServer(handle)

server.listen(8000)
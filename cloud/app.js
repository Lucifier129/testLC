// 在 Cloud code 里初始化 Express 框架
var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')

// App 全局配置
app.set('views', path.join(__dirname, 'views')) // 设置模板目录
app.set('view engine', 'ejs') // 设置 template 引擎
app.use(express.bodyParser())

app.get('/hello', function(req, res) {
	res.render('hello', {
		message: '003'
	})
})

app.get('/chatroom', function(req, res) {
	var content = fs.readFileSync(path.join(__dirname, 'views/chatroom.html'))
	res.end(content)
})

var server = require('http').createServer(app)
var io = require('socket.io')(server)

io.on('connection', function(socket) {
	socket.on('chat msg', function(msg) {
		io.emit('chat msg', msg)
	})
})


server.listen(8000)
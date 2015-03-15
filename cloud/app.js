// 在 Cloud code 里初始化 Express 框架
var express = require('express')
var app = express()
var path = require('path')

// App 全局配置
app.set('views','cloud/views')   // 设置模板目录
app.set('view engine', 'ejs')    // 设置 template 引擎
app.use(express.bodyParser())

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello.ejs', {message:'002'})
})

app.get('/chatroom', function(req, res) {
	res.render('chatroom.ejs', {title: 'Chat Room'})
})

var server = require('http').Server(app)
var io = require('socket.io')(server)

io.on('connection', function(socket) {
	socket.broadcast.emit('hi', 'asdfasdf');
	socket.on('chat msg', function(msg) {
		io.emit('chat msg', msg)
	})
})


// 最后，必须有这行代码来使 express 响应 HTTP 请求
server.listen()
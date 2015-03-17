// 在 Cloud code 里初始化 Express 框架
var express = require('express')
var app = express()
var http = require('http')
var util = require('util')
var fs = require('fs')

// App 全局配置
app.set('views', 'cloud/views') // 设置模板目录
app.set('view engine', 'ejs') // 设置 template 引擎
app.use(express.bodyParser())

app.get('/hello', function(req, res) {
	res.render('hello', {
		message: '004'
	})
})

var msgStorage = []

app.get('/chatroom', function(req, res) {
	res.render('chatroom', {
		title: 'Chat Room',
		msg_length: msgStorage.length,
		user_name: new Date().getTime()
	})
})



function isEmptyObject(obj) {
	return Object.keys(obj).length === 0
}

app.post('/message', function(req, res) {
	var body = req.body
	if (!isEmptyObject(body)) {
		msgStorage.push(body)
		if (body.msg === 'save message by Jade') {
			saveMsg()
		}
	}
	res.end(JSON.stringify({
		status: 'ok'
	}))
})

app.get('/message', function(req, res) {
	var query = req.query
	var content = query.msg_length ? msgStorage.slice(+query.msg_length) : []
	res.end(JSON.stringify({
		msg_list: content
	}))
})

function saveMsg() {
	fs.writeFileSync('cloud/msg-' + new Date().toDateString() + '.json', JSON.stringify(msgStorage))
}



app.listen(8000)


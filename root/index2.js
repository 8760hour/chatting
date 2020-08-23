let https = require('https');
let fs = require('fs');

// 설치한 express 모듈 불러오기
var express = require('express');
// express 객체 생성
var app = express();
// Node.js 기본 내장 모듈 불러오기
var http = require('http').Server(app);
// 생성된 서버를 socket.io에 바인딩
var io = require('socket.io')(http);

// var ip = '14.32.18.180';

// app.get("/",function(req, res){
//     res.sendfile(__dirname + '/index2.html');
// });

var count=1;

io.on('connection', function(socket){

    console.log('user connected: ', socket.id);
    var name = "user" + count++;
    console.log(name, '님이 접속하셨습니다.');
    io.to(socket.id).emit('change name',name);

    socket.on('disconnect', function(){
        console.log('user disconnected: ', socket.id);
        console.log(name + '님이 나가셨습니다.');
        io.emit('sendmessage', 'test');
    });

    socket.on('send message', function(name,text){
        var msg = name + ' : ' + text;
        console.log(msg);
        io.emit('receive message', msg);
    });
});


http.listen(3000, function(){
    console.log('localhost:3000 서버에 연결 되었습니다.');
});
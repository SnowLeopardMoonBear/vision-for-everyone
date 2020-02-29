//app.js는 엔트리 파일. index.js 보면서 vue에 맞게포팅했습니다.
//원래 예제참고코드 지움
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000
console.log(PORT);
const http = require('http').createServer(express) //express로 서버 만듦
const io = require('socket.io')(http) // 만든 서버로 소켓오픈
const dfCom = require('./dialogflow/init') //인증, 통신 모듈
if (dfCom){
  console.log('auth, 통신, 데이터가공 모듈 확인');
}

// 소켓 열고 클라이언트와 주고받을 이벤트 등록
io.on('connection', function(socket) {//콜백 설명: socketIO의 socket을 받아 메시지 전송 이벤트 등록
  socket.on('send chat', function(msg){ 
    var container = []; //메시지를 담을 빈 어레이 생성
    container.push(msg)
    console.log(msg)
    io.emit('send chat', msg);
    // init.js로 DF에 메시지 보내고, 답신을 소켓이벤트로 프론트에 보냄
    dfCom(container).then((response) => {
        io.emit('receive chat', response)
        console.log(response) //DF에서 온 메시지 콘솔 출력
    }).catch(err => {
      console.error('Error: ', err);
    })
  });
  // 클라이언트 연결상태 콘솔 출력
  console.log('Client connected...');
  socket.on('disconnect', function(){
      console.log('user disconnected');
  }); 
});
http.listen(PORT, function() {
    console.log(`listen on *: ${PORT}`);
})
// 일단은 불필요코드 제거 완료
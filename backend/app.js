//app.js는 우리측 서버의 엔트리 파일입니다. 세준이 보내준, dialogflow 통신만을 최소한으로 구현하는 코드의 index.js를 참고해 vue에 맞게 포팅함.

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000 // 포트 번호 지정. 환경변수에 지정된 값이 없으면 3000번 할당.
console.log(PORT);

//http 모듈로 서버를 개설하고, 요청을 받아들이고 응답하는 메커니즘으로 express 모듈을 넣어줍니다.
//http라는 상수에 할당해 호출할 수 있도록 합니다.
const http = require('http').createServer(express)

const io = require('socket.io')(http) // 만든 서버로 소켓을 열고 io에 할당합니다.
const dfCom = require('./dialogflow/init') //인증, 통신 모듈(init.js)을 불러옵니다.
if (dfCom){
  console.log('auth, 통신, 데이터가공 모듈 확인');
}

// 소켓 열고 클라이언트와 주고받을 이벤트 등록
io.on('connection', function(socket) {//콜백 설명: socketIO의 socket을 받아 메시지 전송 이벤트 등록
  socket.on('send chat', function(msg){ 
    var container = []; //메시지를 담을 빈 어레이 생성
    container.push(msg.msgText);
    container.push(msg.clientId);
    console.log(msg);
    // io.emit('send chat', msg); 이건 예전에 잘못 짠 레거시 코드같음. DF단과의 소통은 init.js에 있는 dialogflow 모듈로 하는 듯.
    // 메시지와 세션정보를 init.js로 전달해 DF에 메시지 보내고, 답신을 소켓이벤트로 프론트에 보냄
    dfCom(container).then((response) => {
        socket.emit('receive chat', response)
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
http.listen(PORT, function() { // 정해진 포트 번호로 들어오는 http request를 듣고 응답합니다.
    console.log(`listen on *: ${PORT}`);
})
// 일단은 불필요코드 제거 완료
// 바로 실행되는 엔트리 파일. 소켓 연결하고 메시지 주고받는 함수가 정의. (vue에서 바로 메인화면 vue파일 script에 로직 적용해버릴까?)

const express = require('express') // vue로 옮길 때도 필요. 소켓.io가 express를 요구하기 때문.
const path = require('path') //node.js에서 제공하는 파일, 디렉토리 다루는 모듈
const exphbs = require('express-handlebars') //handlebar 웹 템플릿. vue에서는 불필요하니 modify해야
const app = express() // express를 저장하는 상수. 이름을 app으로 짓는게 convention인듯.
const PORT = process.env.PORT || 3000 //포트 열 때 번호 환경변수에서 가져오거나, 그게 없으면 기본으로 3000
const http = require('http').createServer(app) //우리쪽 서버 만드는 http모듈. express 활용
const io = require('socket.io')(http) // 소켓io. http 서버 만든 걸 붙임. 클라이언트-서버, 서버-DF 양방향 통신
const diarre = require('./dialogflow/init') // 인증 위한 js 파일을 변수 diarre에 저장.

// View Engine 프로젝트 구조 관련된 express 세팅. 이해해야 vue로 포팅 가능할듯
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set("view engine", "handlebars")


// io.on은 이벤트 핸들러를 등록하는 메서드로, 이벤트명, 콜백함수를 순서대로 인자로 받음.
io.on('connection', function(socket) {
    socket.on('chat message', function(msg){ //콜백 설명: socketIO의 socket을 받아 메시지 전송 이벤트 등록
        var arr = []; //메시지 어레이 초기화
        arr.push(msg)
        console.log(arr)
        //console.log('message: ' + msg);
        
        io.emit('chat message', msg); //io.emit은 뭐냐?

        // copy the thing aboeve and emit on chat respond
        diarre(arr).then((dar) => { //arr 값을 init.js에 인자값으로 넘겨준 뒤, async하게 return 받을 값을 기다렸다가, then으로 후속처리. dar는 리턴 받은 값?
            // export function
            io.emit('chat respond', dar)
            console.log(dar) //DF에서 온 걸 콘솔 출력해봄
        }).catch(err => {
            console.error('Error: ', err);
        })

      });
    console.log('Client connected...');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });

      socket.on('disconnect', function(){
        console.log('user disconnected');
      });

     
});

app.get('/', (req, res, next) => {
    res.render("chat", {
        title: 'Chat',
    })
})

app.use(express.static(path.join(__dirname, 'public')))

//app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))

http.listen(PORT, function() {
    console.log('listen on *: %s', PORT);
})

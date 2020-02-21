//app.js는 엔트리 파일. index.js 보면서 vue에 맞게포팅했습니다.
// vue에 불필요한 세팅(예:핸들바)은 뺐고, 컴파일 에러 안 나게 원래 todo 앱 코드는 남김
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

//여기서부터 따온 세팅코드
const app2 = express() //app을 app2로 바꿨습니다
const PORT = process.env.PORT || 3000
const http = require('http').createServer(express) //express로 서버 만듦
const io = require('socket.io')(http) // 만든 서버로 소켓오픈
const diarre = require('./dialogflow/init')
if (diarre){
  console.log('auth, 통신, 데이터가공 정보 확인')
}
io.on('connection', function(socket) {
  //콜백 설명: socketIO의 socket을 받아 메시지 전송 이벤트 등록
  socket.on('send chat', function(msg){ 
    var arr = []; //메시지 어레이 초기화
    arr.push(msg)
    console.log(msg)
    //console.log('message: ' + msg);
    
    io.emit('send chat', msg); //io.emit은 뭐냐?

    // copy the thing aboeve and emit on chat respond
    diarre(arr).then((dar) => { //arr 값을 init.js에 인자값으로 넘겨준 뒤, async하게 return 받을 값을 기다렸다가, then으로 후속처리. dar는 리턴 받은 값?
        // export function
        io.emit('receive chat', dar)
        console.log(dar) //DF에서 온 걸 콘솔 출력해봄
    }).catch(err => {
      console.error('Error: ', err);
    })
  });
  console.log('Client connected...');
  socket.on('disconnect', function(){
      console.log('user disconnected');
  }); 
});

app2.listen(PORT, () => console.log(`new Server running on PORT: ${PORT}`))
http.listen(5000, function() {
    console.log('listen on *:5000')
})

// 여기서부턴 기존 코드. 
const config = require('./config/Config');

const routes = require('./routes/Routes');

const app = express();

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// 미들웨어 함수를 나열한 순서대로 express에서 사용
app.use(cors());  //enable cors

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', routes); // 프론트단에서 todos 경로로 요청 넣으면 routes에 있는 함수 실행 가능. F-B연결점

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.APP_PORT); // Listen on port defined in environment
console.log(`original server running on PORT: ${config.APP_PORT}`)

module.exports = app;
//config/Config.js

module.exports = {
    DB: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost:27017/todos', //DB 변수에 환경변수값 있으면 변수값, 없으면 DB URL 값 할당 
    DF: 'asdf', //여기에 DF 주소 넣어보자=>ㄴㄴ 필요없음. 어차피 DF모듈서 함
    APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 80, // APP_PORT 변수에 환경변수값 있으면 변수값, 없으면 80 할당
};
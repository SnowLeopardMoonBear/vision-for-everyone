// 플러그인으로 쓰임!!! 존나 중요한 파일!? 아니다. 등록 안 해도 소켓 사용 가능하다!

// import Vue from 'vue';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');
// const SocketPlugin = {
//   install(vue) {
//     vue.mixin({
//     });

//     vue.prototype.$sendMessage = ($payload) => {
//       socket.emit('chat', {
//         msg: $payload.msg,
//         name: $payload.name,
//       });
//     };
//     // 인스턴스 메소드 추가
//     vue.prototype.$socket = socket;
//   },
// };

// Vue.use(SocketPlugin);
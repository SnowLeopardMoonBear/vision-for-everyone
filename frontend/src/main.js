//vue 설정이 담긴 엔트리 파일. Vue, backend간 통신 접점이 등록됨
import Vue from 'vue'; // 뷰 모듈을 불러와 할당
import App from './App.vue';
import io from "socket.io-client";
import vuetify from './plugins/vuetify';

// 백엔드 URL(5000번 포트)와 매치하는 부분! client용 socket.io 인스턴스를 만들어 변수명 socket에 할당.
var socket = io.connect('http://:52.78.69.255:5000');

// 모든 컴포넌트에서 $http와 $socket 변수 전역 접근가능케 등록
Vue.prototype.$socket = socket;
Vue.config.productionTip = false;// 프로덕션 설정

// Vue 인스턴스를 export된 App.vue의 app에 마운트. 뿌리가 되는 Vue 객체
new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount('#app');


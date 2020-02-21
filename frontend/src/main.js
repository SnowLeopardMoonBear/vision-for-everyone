//vue 설정이 담긴 엔트리 파일. Vue, backend간 통신 접점이 등록됨
import Vue from 'vue'; // 뷰 모듈을 불러와 할당
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import App from './App.vue';
import io from "socket.io-client";

// 모든 컴포넌트에서 $http와 $socket 변수 전역 접근가능케 등록
Vue.prototype.$socket = socket;

Vue.use(BootstrapVue);// Vue.use로 애플리케이션에서 쓸 라이브러리를 명시
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    msg: 'newstoremsg' 
  },
})

// 백엔드 URL(5000번 포트)와 매치하는 부분! client용 socket.io 인스턴스를 만들어 변수명 socket에 할당.
var socket = io.connect('http://localhost:5000');
socket.on("receive chat", function(dar){this.$store.state.msg = dar});

Vue.config.productionTip = false;// 프로덕션 설정

// Vue 인스턴스를 export된 App.vue의 app에 마운트. 뿌리가 되는 Vue 객체
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
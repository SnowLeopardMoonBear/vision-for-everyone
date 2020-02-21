<template>
  <v-container class="grey lighten-3" no-gutters>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
      </v-flex>
      <div style='height:3px'></div>
      <v-container class="grey lighten-3">
        <v-row no-gutters>
          <!-- 여기서부터 메뉴버튼 -->
          <v-col> 
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                class='title font-weight-bold' 
                color="green lighten-1" 
                height="30px" 
                :elevation='5' 
                width="100%"
                dark
                v-on="on"
                >
                메뉴
                </v-btn>
              </template>

              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  primary-title
                >
                  고자킹 메뉴
                </v-card-title>

                <v-card-text>
                  {{menu}}
                </v-card-text>

              <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                  >
                    닫기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- 메뉴팝업끝 -->
          </v-col>
          <v-col>
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                class='title font-weight-bold' 
                color="green lighten-1" 
                height="30px" 
                :elevation='5' 
                width="100%"
                dark
                v-on="on"
                >
                이벤트
                </v-btn>
              </template>

              <v-card>
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="http://post.phinf.naver.net/MjAxNjExMTRfOTMg/MDAxNDc5MTE4MzExNDIw.mTReB-n4LOGbzErR8_cdauLuKdfOvt3cddC4bVIB5PYg.wsv4RCyTg-gbH6Lyt4A1-YBbTLfhiEg_liowa3ILN_Mg.JPEG/IzJsshWyG30Xvq-Y5dfmf-73nBLk.jpg"
                >
                  <v-card-title>신년맞이 이벤트!</v-card-title>
                </v-img>

                <v-card-text style="font-size:20px;">
                  {{event}}
                </v-card-text>

              <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                  >
                    닫기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col>
            <v-btn class='title font-weight-bold' color="red lighten-4" height="30px" :elevation='5' width="100%" v-on:click="test">
              직원호출
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-flex mb-4>

      </v-flex>
      <!-- <v-container height="30%" class="grey lighten-3" style="background-image: url('src/assets/green_lighten_4.jpg');">
        <v-container class="green lighten-4">
          <v-row>
            <template v-for="entity in menu">
              <v-col v-if="flag" :key="entity">
                <v-btn class="brown lighten-2" :elevation='10' height="100px" width="100%">
                  <span class='title font-weight-bold whitetext'>{{entity}}</span>
                </v-btn>
              </v-col>
            </template>
          </v-row>
          <v-row>
            <template v-for="n in 3">
              <v-col :key="n">
                <v-btn color="brown lighten-2" :elevation='10' height="100px" width="100%">
                  <span class='title font-weight-bold whitetext'>변동버튼 {{n+3}}</span>
                </v-btn>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-container> -->
    </v-layout>
    <BasicVueChat  
      :title="'kiWE'" 
      :new-message="message"
      :initial-feed="feed"
    />
  </v-container>
</template>

<script>

import BasicVueChat from 'basic-vue-chat'
// import axios from 'axios'
export default {
  components: { BasicVueChat },
  data: ()=>{
    return {
      dialog: false,
      feed: [
        {
          id: 1,
          author: '챗봇',
          contents: '이보시오',
          date: '16:30'
        },
        {
          id: 2,
          author: '챗봇',
          contents: '의사양반',
          date: '17:00'
        },
        {
          id: 0,
          author: 'Person2',
          contents: '내가 고자라니',
          date: '17:10'
        }
      ],
      yesorno: ['yes', 'no'],
      menu: '김두한세트: 4$, 심영밀: 3$',
      event: '앗! 햄버거, 신발보다 싸다!',
      flag: false
    }
  },
  methods: {
    test: () => {
      this.flag = !(this.flag)
    },
    send: () => {
      // 여기에 버튼 누르면 버튼 내용을 보내는 함수를 추가.
    },
    menu: () => {
      // 여기에 DB에서 메뉴 불러오는 함수 추가
    },
    yes: () => {
      // 여기에 예스 보내기
      var yesmsg = 'yes' //이건 그냥 예시일 뿐이며, DF 포맷에 맞게 JSON 짜고 답변 기다리기
    },
    no: () => {
      // no 보내기
    },
    events: () => {
      // DB에서 이벤트 조회
    },
    call: () => {
      // 종업원 부르기(구현방법은 미정)
    },
    identify: () => {
      // 주어진 메시지 스트링 보고 어떻게 버튼 띄워줄지 파악하기
    }
    
  }
};
</script>

<style lang='scss'>

.whitetext {
  color: white;
}
$primary: #00cc33;
$secondary: #663322;
$window-height: 100%;
// above the following import you can override default values of variables like $primary 
@import "node_modules/basic-vue-chat/src/assets/scss/main.scss"; 
</style>
<template>
  <v-container class="grey lighten-3" no-gutters>
    <meta name="viewport" content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;" /> 
    <v-layout text-center wrap>
      <v-flex xs12> </v-flex>
      <div style="height:3px"></div>
      <v-container class="grey lighten-3">
        <v-row no-gutters>
          <!-- 여기서부터 메뉴버튼 -->
          <v-col>
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="title font-weight-bold"
                  color="green lighten-1"
                  height="30px"
                  :elevation="5"
                  width="100%"
                  dark
                  v-on="on"
                >
                  메뉴
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>메뉴</v-card-title>
                <v-card-text>{{ menu }}</v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    닫기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- 메뉴팝업끝 -->
          </v-col>
          <v-col>
            <v-dialog v-model="dialog2" width="500">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="title font-weight-bold"
                  color="green lighten-1"
                  height="30px"
                  :elevation="5"
                  width="100%"
                  dark
                  v-on="on"
                >
                  이벤트
                </v-btn>
              </template>

              <v-card>
                  <v-card-title>신년맞이 이벤트!</v-card-title>
                <v-card-text style="font-size:20px;">{{ event }}</v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog2 = false">
                    닫기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col>
            <v-btn
              class="title font-weight-bold"
              color="red lighten-4"
              height="30px"
              :elevation="5"
              width="100%"
            >
              직원호출
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
    <BasicVueChat :title="'kiWE'" @newOwnMessage="dfCom" :new-message="message" :initial-feed="feed" />
  </v-container>
</template>

<script>
import BasicVueChat from "basic-vue-chat";
export default {
  components: { BasicVueChat },
  data: () => {
    return {
      dialog: false,
      dialog2:false,
      feed: [
        {
          id: 1,
          author: "df봇",
          contents: "안녕하세요, 함께하는 키오스크 kiWE입니다",
          date: ""
        }
      ],
      message: {

      },
      yesorno: ["yes", "no"],
      menu: "짜장면: 사천원, 짬뽕: 오천원, 탕수육: 만원",
      event: "앗! 짜장면, 신발보다 싸다!",
      flag: false,
      chats: [],
    };
  },
  mounted() {
    this.$socket.on("receive chat", data => {
      this.feed.push(
        {
          id: 1,
          author: "df봇",
          contents: data,
          date: "16:33"
        }
      )
        //답으로 오는 음성을 변수에 저장한 뒤 바로 웹브라우저상에서 플레이
        // var audio = new Audio( 
        //   "data:audio/mp3;base64," + response.body.sound
        // );
        // audio.play();
      }
    );
  },

  methods: {
    dfCom(msg) {
      this.$socket.emit("send chat", msg); // 이걸로 소켓연결
      this.msg = "";
    }
  }
};
</script>

<style lang="scss">
.whitetext {
  color: white;
}


$primary: #00cc33;
$secondary: #663322;
$window-height: 50%;

// above the following import you can override default values of variables like $primary
// @import "node_modules/basic-vue-chat/src/assets/scss/main.scss";
// 왜 run serve 한 뒤에 import를 주석달았다 해제하면 스타일 반영되지? 그리고 새로고침하면 또 안됨 ㄷ
// 게다가 오버라이드 반영될 땐 챗 늘수록 계속 길이 늘어남.
</style>

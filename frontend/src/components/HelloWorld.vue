<template>
  <v-container class="grey lighten-3" no-gutters>
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
                <v-card-title class="headline grey lighten-2" primary-title>
                  메뉴
                </v-card-title>

                <v-card-text>
                  {{ menu }}
                </v-card-text>

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
                  {{ event }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
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
      feed: [
        {
          id: 1,
          author: "챗봇",
          contents: "이보시오",
          date: "16:30"
        }
      ],
      message: [
      ],
      yesorno: ["yes", "no"],
      menu: "짜장면: 사천원, 짬뽕: 오천원, 탕수육: 만원",
      event: "앗! 짜장면, 신발보다 싸다!",
      flag: false,
      chats: []
    };
  },
  mounted() {
    this.$socket.on("receive chat", data => this.feed.push(
      {
        id: 1,
        author: "df봇",
        contents: data,
        date: "16:33"
      }
      )
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

// above the following import you can override default values of variables like $primary
@import "node_modules/basic-vue-chat/src/assets/scss/main.scss";
$primary: #00cc33;
$secondary: #663322;
$window-height: 100%;
</style>

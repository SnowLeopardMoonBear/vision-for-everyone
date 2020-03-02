<template>
<!-- 최상위 Vue 컴포넌트 -->
  <v-app>
    <v-app-bar app color="green lighten-1" dark>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2 body-1">홈으로</span>
      </v-btn>
      <v-toolbar-title>
        <span class="font-weight-bold headline"></span>
        <span class="font-weight-light headline"></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2 body-1">마이페이지</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
};
</script>

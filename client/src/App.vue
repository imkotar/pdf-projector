<template>
  <v-app>
  <v-navigation-drawer app>
    <router-view></router-view>
  </v-navigation-drawer>

  <v-main>
      <PDFDisplayComp/>
  </v-main>
</v-app>
</template>

<script>
import PDFDisplayComp from './components/PDFDisplayCom'
export default {
  name: 'App',
  components: {
    PDFDisplayComp
  },
  data: () => ({
    //
  })
}
</script>

<template>
  <div>
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Online Projector
          </v-list-item-title>
          <v-list-item-subtitle>
            Watch the presentation!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list class="menu"
        dense
        nav
      >
        <!-- <v-list-item>You are on {{}} page of {{}}</v-list-item> -->
      </v-list>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import io from 'socket.io-client'
let socket = null
export default {
  name: 'panel',
  computed: {
    currentFilename: function () {
      return this.$store.state.currentFilename
    }
  },
  created: function () {
    socket = io('localhost:7000')
  },
  mounted: function () {
    socket.on('SOCKET', (data) => {
      return this.mountPDF(data)
    })
  },
  methods: {
    ...mapActions(['getViewerPDF', 'changeViewerPage']),
    async mountPDF (socketData) {
      const data = {
        filename: socketData.currentFilename
      }
      if (this.currentFilename !== socketData.currentFilename) {
        return await this.getViewerPDF(data)
      }
      return this.changeViewerPage(socketData.pageNum)
    }
  }
}
</script>
<style scoped>
menu {
  display: flex;
  justify-content: center;
}
</style>

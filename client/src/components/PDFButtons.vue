<template>
  <div>
    <v-row class="menu">
      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Select Page
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in numOfPages"
          :key="index"
          @click="changePageTrigger(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>
    </v-row>
    <v-row class="buttons">
      <v-col cols="12" sm="6">
        <v-btn @click="changePageTrigger('-')">PREV</v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn @click="changePageTrigger('+')">NEXT</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    numOfPages: function () {
      return this.$store.state.numOfPages
    },
    pageNum: function () {
      return this.$store.state.pageNum
    }
  },
  methods: {
    ...mapActions(['changePage']),
    changePageTrigger (item) {
      let newPage = Number
      if (typeof item === 'number') {
        newPage = item
      } else if (item === '-') {
        newPage = this.pageNum - 1
        if (newPage <= 1) {
          newPage = 1
        }
      } else if (item === '+') {
        newPage = this.pageNum + 1
        if (newPage >= this.$store.state.numOfPages.length) {
          newPage = this.$store.state.numOfPages.length
        }
      }
      this.changePage(newPage)
    }
  }
}
</script>

<style scoped>
.menu {
  justify-content: center;
  padding: 10px;
}
.buttons{
  display: flex;
}
</style>

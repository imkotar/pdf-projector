<template>
  <div>
    <v-simple-table dense fixed-header>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Show File</th>
          <th class="text-right">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in PDFList" :key="item">
          <td><button @click="mountPDF(item)">{{ item }}</button></td>
          <v-btn small color="red" @click="deletePDF(item)">X</v-btn>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      errors: ''
    }
  },
  computed: {
    PDFList: function () {
      return this.$store.state.PDFList
    }
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions(['getPDF', 'getPDFList', 'removePDF']),
    async getList () {
      await this.getPDFList()
    },
    async deletePDF (item) {
      const data = {
        filename: item
      }
      await this.removePDF(data)
    },
    async mountPDF (name) {
      const data = {
        filename: name,
        pageNumber: 1
      }
      await this.getPDF(data)
      if (this.$store.state.errors) {
        this.errors = this.$store.state.errors
        return this.$store.state.errors
      }
    }
  }
}
</script>

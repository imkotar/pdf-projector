<template>
  <div>
    <div id="pad">
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      <v-btn small color="green" @click="submitFile()">Upload your file</v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      file: ''
    }
  },
  methods: {
    ...mapActions(['uploadPDF']),
    async submitFile () {
      const formData = new FormData()
      formData.append('file', this.file)
      await this.uploadPDF(formData)
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    }
  }
}
</script>

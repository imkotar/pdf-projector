<template>
  <div>
    <p>{{errors}}</p>
    <div v-if="this.$store.state.isPDFMounted === true">
      <p>Page {{this.$store.state.pageNum}} of {{pageCount}}</p>
      <pdf
        class="pdf"
        :src="src"
        :page="pageNum"
        @num-pages="pageCount = $event"
      />
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  name: 'PDFDisplay',
  components: {
    pdf
  },
  data () {
    return {
      pageCount: ''
    }
  },
  computed: {
    src: function () {
      return this.$store.state.pdf
    },
    errors: function () {
      if (this.$store.state.errors !== null) {
        window.alert(this.$store.state.errors)
      }
      return this.$store.state.errors
    },
    pageNum: function () {
      return this.$store.state.pageNum
    }
  }
}
</script>

<style scoped>
.pdf {
  margin: auto;
  width: 60%;
  border: 1px solid black;
}
</style>

<template>
  <div>
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Online Projector
          </v-list-item-title>
          <v-list-item-subtitle>
            Share your presentation!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list class="menu"
        dense
        nav
      >
        <v-list-item><PDFButtons/></v-list-item>
        <v-divider></v-divider>
        <v-list-item><UploadForm/></v-list-item>
        <v-divider></v-divider>
        <v-list-item><FilesList/></v-list-item>
      </v-list>
  </div>
</template>

<script>
import PDFButtons from './PDFButtons'
import FilesList from './FilesList'
import UploadForm from './UploadForm'

export default {
  components: {
    PDFButtons,
    FilesList,
    UploadForm
  }
}
</script>
<style scoped>
menu {
  display: flex;
  justify-content: center;
}
</style>

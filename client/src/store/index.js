import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import io from 'socket.io-client'
const baseURL = 'http://localhost:7000'
const socket = io(baseURL)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    PDFList: [],
    currentFilename: String,
    isPDFMounted: false,
    pdf: Object,
    pageNum: 1,
    numOfPages: null,
    errors: null
  },
  mutations: {
    mountPDF (state, data) {
      state.isPDFMounted = true
      state.pageNum = 1
      state.pdf = data.pdf
      state.errors = null
      const numOfPages = []
      for (let i = 1; i <= data.numOfPages; i++) {
        numOfPages.push(i)
      }
      state.numOfPages = numOfPages
      state.currentFilename = data.filename
      const publicData = {
        pageNum: state.pageNum,
        currentFilename: state.currentFilename
      }
      socket.emit('SOCKET', publicData)
    },
    mountViewerPDF (state, data) {
      state.pdf = data.pdf
      state.currentFilename = data.filename
      state.pageNum = 1
      state.isPDFMounted = true
    },
    loadList (state, data) {
      data.shift()
      state.PDFList = data
    },
    updateList (state, data) {
      state.PDFList.push(data)
    },
    sendError (state, data) {
      state.errors = data.errorPdf
    },
    setNewPage (state, data) {
      state.pageNum = data
      const publicData = {
        pageNum: state.pageNum,
        currentFilename: state.currentFilename
      }
      socket.emit('SOCKET', publicData)
    },
    setNewViwerPage (state, data) {
      state.pageNum = data
    },
    deletePDF (state, data) {
      data.PDFList.shift()
      state.PDFList = data.PDFList
      state.isPDFMounted = false
    }
  },
  actions: {
    async getPDFList (context) {
      return await Axios.get(`${baseURL}/pdf/all`)
        .then(res => context.commit('loadList', res.data))
    },
    async uploadPDF (context, data) {
      return await Axios.post(`${baseURL}/pdf/upload`, data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => context.commit('updateList', res.data))
    },
    async getPDF (context, data) {
      return await Axios.post(`${baseURL}/pdf`, data)
        .then(res => {
          if (res.data.errorPdf !== null) {
            context.commit('sendError', res.data)
          } else {
            context.commit('mountPDF', res.data)
          }
        })
        .catch(err => console.log(err))
    },
    async removePDF (context, data) {
      return await Axios.patch(`${baseURL}/pdf/remove`, data)
        .then(res => {
          context.commit('deletePDF', res.data)
        })
        .catch(err => console.log(err))
    },
    changePage (context, data) {
      context.commit('setNewPage', data)
    },
    async getViewerPDF (context, data) {
      return await Axios.post(`${baseURL}/pdf`, data)
        .then(res => context.commit('mountViewerPDF', res.data))
    },
    changeViewerPage (context, data) {
      context.commit('setNewViwerPage', data)
    }
  },
  modules: {
  }
})

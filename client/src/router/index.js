import Vue from 'vue'
import VueRouter from 'vue-router'
import Speaker from '../views/Speaker.vue'
import Viewer from '../views/Viewer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/speaker',
    name: 'Speaker',
    component: Speaker
  },
  {
    path: '/viewer',
    name: 'Viewer',
    component: Viewer
  }
]

const router = new VueRouter({
  routes
})

export default router

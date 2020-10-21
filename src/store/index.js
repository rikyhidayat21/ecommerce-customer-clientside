import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    login (context, payload) {
      return axios({
        url: `${baseUrl}/login`,
        method: 'post',
        data: payload
      })
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseUrl = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    products: [],
    carts: []
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    login (context, payload) {
      return axios({
        url: `${baseUrl}/login`,
        method: 'post',
        data: payload
      })
    },
    fetchProducts (context) {
      console.log('sudah terpanggil dari home store controller nya')
      axios({
        url: `${baseUrl}/products`,
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data, '<=== fetch products di store')
          context.commit('setProducts', data)
        })
        .catch(err => {
          console.log(err, '<=== error fetch products')
        })
    },
    fetchCarts (context, id) {
      console.log('sudah terpanggil dari carts store controller')
      console.log(id, '<==== id bawa dari carts')
      axios({
        url: `${baseUrl}/carts`,
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data, '<=== fetch carts di store')
          context.commit('setCarts', data)
        })
        .catch(err => {
          console.log(err, '<=== error fetch carts')
        })
    }
  },
  modules: {
  }
})

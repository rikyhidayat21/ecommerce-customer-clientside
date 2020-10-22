import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

const baseUrl = 'https://ecommerce-cms-rikymehmet.herokuapp.com'
export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    cart: {}
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    // setAddToCart (state, payload) {
    //   state.products = payload
    // },
    setSumCart (state, payload) {
      state.cart = payload
    },
    setSubCart (state, payload) {
      state.cart = payload
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
    register (context, payload) {
      return axios({
        url: `${baseUrl}/register`,
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
    fetchCarts (context) {
      console.log('sudah terpanggil dari carts store controller')
      // console.log(id, '<==== id bawa dari carts')
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
    },
    addToCart (context, payload) {
      console.log('sudah terpanggil add to cart di store')
      console.log(payload, "<=== bawaan dari CardProducts")
      axios({
        url: `${baseUrl}/carts`,
        method: 'post',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => { // ditambah swal
          console.log(data, '<=== data add to cart')
          // context.dispatch('fetchCarts')
          // context.commit('setAddToCart', data)
          // router.push({ name: 'Carts'})
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: `Successfully add ${payload.name} to cart`
          })
        })
        .catch(err => {
          Swal.fire({
            title: 'Error!',
            text: err.response.data.errors,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          console.log(err, '<=== error addToCart di store')
        })
    },
    deleteCart (context, id) {
      console.log('sudah terpanggil delete cart di store')
      return axios({
        url: `${baseUrl}/carts/${id}`,
        method: 'delete',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    sumCart (context, payload) {
      console.log('sudah terpanggil sumCart di store')
      console.log(payload, '<=== payload dari sumCart component')
      axios({
        url: `${baseUrl}/carts/${payload.id}`,
        method: 'put',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          console.log(data, '<=== data sumCart di store')
          context.commit('setSumCart', data)
        })
        .catch(err => {
          Swal.fire({
            title: 'Error!',
            text: err.response.data.errors,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          console.log(err.response.data.errors, '<=== error sumCart di store')
        })
    },
    subCart (context, payload) {
      console.log('sudah terpanggil subCart di store')
      console.log(payload, '<=== payload dari subCart component')
      axios({
        url: `${baseUrl}/carts/${payload.id}`,
        method: 'put',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          console.log(data, '<=== data subCart di store')
          context.commit('setSubCart', data)
        })
        .catch(err => {
          Swal.fire({
            title: 'Error!',
            text: err.response.data.errors,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          console.log(err, '<=== error subCart di store')
        })
    }
  },
  modules: {
  }
})

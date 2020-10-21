<template>
  <div class="home">
    <div class="container-flex bg-light shadow">
      <div class="item-flex text-black" style="cursor:pointer">BOLAed</div>
      <div @click.prevent="toCart" class="item-flex text-black" style="cursor:pointer"><span class="material-icons">shopping_cart</span></div>
      <div class="item-flex text-black" style="cursor:pointer" @click.prevent="logout">Logout</div>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="container">
      <div class="row">
        <CardProducts
          v-for="product in products"
          :key="product.id"
          :product="product"
        ></CardProducts>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Swal from 'sweetalert2'
import CardProducts from '../components/CardProducts'
export default {
  name: 'Home',
  components: {
    // HelloWorld
    CardProducts
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    toCart () {
      this.$router.push({ name: 'Carts' })
    },
    logout () {
      Swal.fire({
        title: 'Are you sure wanna logout?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!'
      })
        .then((result) => {
          if (result.isConfirmed) {
            // this.$store.dispatch('deleteProduct', this.product.id)
            localStorage.clear()
            this.$router.push({ name: 'Login' })
              .then(response => {
                console.log(response)
                Swal.fire(
                  'Logout!',
                  'success logout'
                )
              })
              .catch(err => {
                console.log(err, '<=== error logout')
              })
          }
        })
    }
  }
}
</script>

<style scoped>
.container-flex {
  display: flex;
  background-color: #17A2B8;
  color: black;
  justify-content: space-between;
  position: static;
}

.item-flex {
  padding: 1rem;
}

.item-flex:hover {
  color: navy;
  zoom: 1fr;
}
</style>
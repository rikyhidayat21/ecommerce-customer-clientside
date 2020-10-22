<template>
<section>
  <div class="container-flex bg-light shadow">
    <div @click.prevent="goHome" class="item-flex text-black" style="cursor:pointer">BOLAed</div>
    <!-- <div class="item-flex text-black" style="cursor:pointer"><span class="material-icons">shopping_cart</span></div> -->
    <div class="item-flex text-black" style="cursor:pointer" @click.prevent="logout">Logout</div>
  </div>
  <!-- carts  -->
  <div class="container" style="width: 70%">
    <!-- {{ carts }} -->
    <h1 class="text-center" >Your Cart</h1>
    <Cart
      v-for="cart in carts"
      :key="cart.id"
      :cart="cart"
    ></Cart>
    <!-- checkout -->
    <!-- <div class="card">
      <div class="card-header">
        Checkout
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div> -->
  </div>
</section>
</template>

<script>
import Cart from '../components/Cart'
import Swal from 'sweetalert2'
export default {
  name: 'Carts',
  components: {
    Cart
  },
  created () { // created ga punya params
    this.$store.dispatch('fetchCarts')
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  methods: {
    // back () {
    //   this.$router.push({ name: 'Home' })
    // },
    goHome () {
      this.$router.push({ name: 'Home'})
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
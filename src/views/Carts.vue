<template>
<section>
  <div class="container-flex bg-light shadow">
    <div class="item-flex text-black" style="cursor:pointer">BOLAed</div>
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
    <div class="float-right mt-3">
      <button @click.prevent="back" class="btn btn-danger">Back</button>
    </div>
  </div>
</section>
</template>

<script>
import Cart from '../components/Cart'
export default {
  name: 'Carts',
  components: {
    Cart
  },
  created (id) {
    this.$store.dispatch('fetchCarts', this.$route.params.id)
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'Home' })
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
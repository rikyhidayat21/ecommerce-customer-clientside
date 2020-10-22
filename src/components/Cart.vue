<template>
<section>
  <div class="row border">
    <!-- {{cart}} -->
    <div class="col-4 border">
      <img :src="cart.Product.image_url" style="width: 60%;" alt="">
    </div>
    <div class="col-8 border text-center">
      <h5 class="card-title">{{ cart.Product.name }}</h5>
      <p class="card-text">Total Price: {{ price }}</p>
      <!-- {{ price }} -->
      <!-- {{ cart }} -->

      <p>Quantity: {{ cart.quantity }}</p>
      <span @click.prevent="sumCart" class="material-icons" style="cursor:pointer">add_circle</span> | 
      <span @click.prevent="subCart" class="material-icons" style="cursor:pointer">remove_circle</span>
      <div class="text-center justify-content-center align-items-center d-flex">
        <button @click.prevent="deleteCart" type="button" class="btn btn-danger">Delete</button>
      </div>
    </div>
    <!-- <div class=" col-4 card">
      <div class="card-header">
        Featured
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
import Swal from 'sweetalert2'
export default {
  name: 'Cart',
  props: ['cart'],
  computed: {
    price () {
      return this.cart.Product.price * this.cart.quantity
    }
  },
  methods: {
    deleteCart (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch('deleteCart', this.cart.id)
              .then(response => {
                this.$store.dispatch('fetchCarts')
                console.log(response, '<=== response')
                Swal.fire(
                  'Deleted!',
                  'Product has been deleted.',
                  'success'
                )
              })
              .catch(err => {
                console.log(err, '<=== error delete cart')
              })
          }
        })
    },
    sumCart (payload) {
      const sum = {
        id: this.cart.id,
        quantity: this.cart.quantity += 1
      }
      this.$store.dispatch('sumCart', sum)
    },
    subCart (payload) {
      const sub = {
        id: this.cart.id,
        quantity: this.cart.quantity -= 1
      }
      this.$store.dispatch('subCart', sub)
      if (this.cart.quantity === 0) {
        this.$store.dispatch('deleteCart', this.cart.id) // jangan lupa ini prosess async
          .then(_ => {
            this.$store.dispatch('fetchCarts')
          })
          .catch(err => {
            Swal.fire({
            title: 'Error!',
            text: err.response.data.errors,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          console.log(err, '<=== error di component')
          })
        // this.$store.dispatch('fetchCarts')
      }
    }
  }
}
</script>

<style>

</style>
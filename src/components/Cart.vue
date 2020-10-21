<template>
  <div class="row border">
    <!-- {{cart}} -->
    <div class="col-4 border">
      <img :src="cart.Product.image_url" style="width: 60%;" alt="">
    </div>
    <div class="col-8 border text-center">
      <h5 class="card-title">{{ cart.Product.name }}</h5>
      <p class="card-text">{{ cart.Product.price }}</p>
      <!-- <p class="card-text">{{ this.price }}</p> -->

      <p>{{ cart.quantity }}</p>
      <div class="text-center justify-content-center align-items-center d-flex">
        <button type="button" class="btn btn-danger">Delete</button>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['cart'],
  computed: {
    price () {
      this.cart.Product.price * this.quantity
    }
  }
}
</script>

<style>

</style>
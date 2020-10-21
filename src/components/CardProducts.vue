<template>
  <div class="col-3 mt-3 mb-3">
    <div class="card-group">
      <div class="card shadow rounded m-1">
        <img class="card-img-top" :src="product.image_url" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text"> {{ product.price }}</p>
          <p class="card-text"><small class="text-muted">{{ product.stock }}</small></p>
          <div class="text-center justify-content-center align-items-center d-flex">
            <button class="btn btn-success">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProducts',
  props: ['product']
}
</script>

<style>

</style>
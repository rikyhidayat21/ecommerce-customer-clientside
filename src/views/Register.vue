<template>
  <section>
    <div class="container" id="register-page">
      <div class="row mt-4 mb-4">
        <div class="col-md-8" style="background-color: #0f4c75;">
          <img src="../assets/undraw_join_of2w.svg" class="rounded mx-auto d-block" style="width: 80%;" alt="">
        </div>
        <div class="col-4" style="background-color: #dddddd;">
          <!-- <div class="card">
            <div class="card-body"> -->
              <h5 class="card-title text-center mt-4"><b>BOLAedan Store</b></h5>
              <p class="card-text text-center">Register</p>
              <form action="" @submit.prevent="register">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input v-model="email" type="email" class="form-control" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary float-left">Register</button>
              </form>
              <button @click.prevent="backToLogin" class="btn btn-danger float-right mb-3" type="submit">Cancel</button>
            <!-- </div>
          </div> -->
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
        .then(({ data }) => {
          console.log(data, '<=== data register')
          // localStorage.setItem('access_token', data.access_token)
          this.$router.push('/Login')
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
            title: 'Register successfully'
          })
        })
        .catch(err => {
          Swal.fire({
            title: 'Error!',
            text: err.response.data.errors,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          console.log(err, '<==== error login')
        })
    },
    backToLogin () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>

</style>

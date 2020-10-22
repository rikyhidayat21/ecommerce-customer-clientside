<template>
  <section>
    <div class="container" id="login-page">
      <div class="row mt-4 mb-4">
        <div class="col-md-8" style="background-color: #0f4c75;">
          <img src="../assets/undraw_junior_soccer_6sop.svg" class="rounded mx-auto d-block" style="width: 80%;" alt="">
        </div>
        <div class="col-4" style="background-color: #dddddd;">
          <!-- <div class="card">
            <div class="card-body"> -->
              <h5 class="card-title text-center mt-4"><b>BOLAed Store</b></h5>
              <p class="card-text text-center">Login</p>
              <form @submit.prevent="login" action="">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input v-model="email" type="email" class="form-control" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Login</button>
              </form>
              <div  @click.prevent="toRegister">
                <p class="mt-2">New here ? <a href="#">Register</a>!</p>
              </div>
              <!-- </div>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(({ data }) => {
          console.log(data, '<=== data login')
          localStorage.setItem('access_token', data.access_token)
          this.$router.push('/')
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
            title: 'Signed in successfully'
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
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>

</style>

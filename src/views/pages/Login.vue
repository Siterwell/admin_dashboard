<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group mb-0">
            <div class="card p-4">
              <div class="card-body">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <input type="text" class="form-control" v-model="email" placeholder="Username">
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="icon-lock"></i></span>
                  <input type="password" class="form-control" v-model="password" placeholder="Password">
                </div>
                <div class="row">
                  <div class="col-6">
                    <button type="button" v-on:click="tryLogin" class="btn btn-primary px-4">Login</button>
                  </div>
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-link px-0">Forgot password?</button>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div v-if=response class="col align-self-center"><p>{{response}}</p></div>
                </div>  
              </div>
            </div> <!-- card-body -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      email: '',
      password: '',
      response: ''
    }
  },
  computed: {
    ...mapGetters({
      getName: 'getUser'
    })
  },
  methods: {
    ...mapActions([
      'setUser',
      'setToken'
    ]),

    tryLogin () {
      // const {email, password} = this
      this.resetResponse()

      // Making API call to authenticate a user
      api.request('post', 'api/1/login', {
        email: this.email,
        password: this.password,
        clientType: 'browser',
        userData: ''
      })
      // api.request('post', 'api/1/login', {email, password})
        .then(response => {
          var data = response.data
          /* Checking if error object was returned from the server */
          if (data.error) {
            var errorName = data.error.name
            if (errorName) {
              this.response = errorName === 'InvalidCredentialsError'
                ? 'email/Password incorrect. Please try again.'
                : errorName
            } else {
              this.response = data.error
            }

            return
          }
          /* Setting user in the state and caching record to the localStorage */
          if (data.token) {
            var token = 'Bearer ' + data.token

            this.setUser('oooowen')
            this.setToken(token)

            if (window.localStorage) {
              window.localStorage.setItem('user', 'oooowen')
              window.localStorage.setItem('token', token)
              // api.setHeader()
            }

            this.$router.push(data.redirect)
          }
        })
        .catch(error => {
          console.log(error)

          this.response = 'Server appears to be offline'
        })
    },
    resetResponse () {
      this.response = ''
    }
  }
}
</script>

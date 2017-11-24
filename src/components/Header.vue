<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarMinimize">&#9776;</button>
    <b-nav is-nav-bar class="ml-auto mr-4">
      <!-- <b-nav-item class="d-md-down-none">
        <i class="icon-bell"></i><span v-if="stInfos.length > 0" class="badge badge-pill badge-danger">{stInfos.length}</span>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-list"></i>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item> --> 
      <b-nav-item-dropdown right>
        <template slot="button-content">
          <avatar :fullname="getName" :size="36" color="black" class="st-avatar"></avatar>
          <span class="d-md-down-none">{{getName}}</span>
        </template>
        <b-dropdown-item @click="logout"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <!-- <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">&#9776;</button> -->
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Avatar from 'vue-avatar-component'
import api from '../api'

export default {
  name: 'header',
  components: {
    Avatar
  },
  data () {
    return {
      stInfos: []
    }
  },
  created () {
    this.tryGetStInfos()
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

    logout () {
      console.log('try logout')

      // Making API call to authenticate a user
      api.request('post', 'api/1/logout')
        .then(response => {
        })
        .catch(error => {
          console.log(error)
        })

      this.setUser(null)
      this.setToken(null)

      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('token', null)
      }

      this.$router.push('/pages/login')
    },
    tryRedirect (route) {
      this.$router.push('/' + route)
    },
    tryGetStInfos () {
      api.request('get', 'api/1/logs?logType=message&limit=50')
        .then(response => {
          // console.log(response.data.results)
          this.stInfos = response.data.results
        })
        .catch(error => {
          console.log(error)
        })
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>

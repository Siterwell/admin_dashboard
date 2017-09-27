// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
// import apiArchitect from './plugin'

// Check local storage to handle refreshes
if (window.localStorage) {
  let localUser = window.localStorage.getItem('user') || 'null'
  if (localUser && store.state.user !== localUser) {
    console.log('main.js set user ' + localUser)
    store.commit('SET_USER', localUser)
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

sync(store, router)
// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // window.console.log('Transition', transition)
  console.log('to=', to.fullPath, '| from=', from.fullPath)
  if (to.matched.some(record => {
    // console.log(record.name, record.meta.requiresAuth)
    return record.meta.requiresAuth
  })) {
    // 如果沒有 token 
    // console.log('token?', store.state.token)
    if (store.state.token === 'null' ||
    !store.state.token) {
      // 轉跳到 login page
      next({
        path: '/pages/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// Vue.use(apiArchitect)
Vue.use(BootstrapVue)
Vue.use(VueLodash, lodash)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: {
    App
  }
})

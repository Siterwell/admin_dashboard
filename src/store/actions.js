// import Vue from 'vue'
// import mutations from './mutations'
import * as types from './mutations_type.js'

export default {
  setUser ({commit}, user) {
    console.log(user)
    commit(types.SET_USER, user)
  },
  setToken ({commit}, token) {
    console.log(token)
    commit(types.SET_TOKEN, token)
  },
  addTodo ({commit}, newTodo) {
    commit(types.ADD_TODO, newTodo)
  }
}

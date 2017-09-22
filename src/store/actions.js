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
  setLoading ({commit}, isLoading) {
    commit(types.SET_LOADING, isLoading)
  },
  setTablets ({commit}, newTablets) {
    commit(types.SET_TABLETS, newTablets)
  },
  setStInfos ({commit}, newStInfos) {
    commit(types.SET_STINFOS, newStInfos)
  }
}

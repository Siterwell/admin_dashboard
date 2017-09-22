import * as types from './mutations_type.js'

export default {
  [types.SET_USER] (state, user) {
    console.log('mutation' + user)
    state.user = user
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_LOADING] (state, isLoading) {
    state.loading = isLoading
  },
  [types.SET_TABLETS] (state, newTablets) {
    state.tablets = newTablets
  },
  [types.SET_STINFOS] (state, newStInfos) {
    state.stInfos = newStInfos
  }
}

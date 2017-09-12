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
  [types.TOGGLE_SEARCHING] (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  [types.SET_TABLETS] (state, newTablets) {
    state.tablets = newTablets
  }
}

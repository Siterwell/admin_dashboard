export default {
  getUser: state => {
    return state.user
  },
  getToken: state => {
    return state.token
  },
  isLoading: state => {
    return state.loading
  },
  getTablets: state => {
    return state.tablets
  },
  getStInfos: state => {
    return state.stInfos
  }
}

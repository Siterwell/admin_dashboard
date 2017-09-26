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
  getControllers: state => {
    return state.controllers
  },
  getStInfos: state => {
    return state.stInfos
  }
}

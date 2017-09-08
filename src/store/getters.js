export default {
  getUser: state => {
    return state.user
  },
  getTodo: state => {
    return state.todos.filter((item) => {
      return !item.done
    })
  },
  getDone: state => {
    return state.todos.filter((item) => {
      return item.done
    })
  }
}

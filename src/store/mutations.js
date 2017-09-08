import * as types from './mutations_type.js'

export default {
  [types.TOGGLE_LOADING] (state) {
    state.callingAPI = !state.callingAPI
  },
  [types.TOGGLE_SEARCHING] (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.ADD_TODO] (state, newTodo) {
    // todos 是一個 Array 所以 push 一個同結構的 Object
    state.todos.push({
      key: state.todos.length, // 流水 key
      content: newTodo, // 新 todo 的內容
      done: false // 預設當然是未做完
    })
  }
}

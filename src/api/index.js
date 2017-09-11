import axios from 'axios'
import config from '../config'

export default {
  request (method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    var header = {'Authorization': localStorage.getItem('token')}
    if (uri.includes('api/1/login') ||
      uri.includes('api/1/register')) {
      header = {}
    }
    var url = config.serverURI + uri
    return axios({
      method,
      url,
      data,
      headers: header
    })
  },
  setHeader () {
    // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  }
}

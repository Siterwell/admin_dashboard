import api from '../api'

let apiArchitect = {}
apiArchitect.install = function (Vue, options) {
  // start get controllers
  apiArchitect.getControllers = function () {
    console.log('start get controllers')
    api.request('get', 'api/1/controllers')
      .then(response => {
        console.log(response.data.results.controllers)
        this.setControllers(response.data.results.controllers)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default apiArchitect
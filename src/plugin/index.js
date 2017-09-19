import api from '../api'

let apiArchitect = {}
apiArchitect.install = function (Vue, options) {
  // start get tablets
  apiArchitect.getTablets = function () {
    console.log('start get tablets')
    api.request('get', 'api/1/controllers')
      .then(response => {
        console.log(response.data.results.controllers)
        this.setTablets(response.data.results.controllers)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default apiArchitect
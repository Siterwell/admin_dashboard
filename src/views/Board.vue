<template>
   <div v-if="loading" class="loader loader-curtain is-active">bbbbbbb
     <div>
       cccc
     </div>
   </div>
</template>

<script>
import api from '../api'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'board',
  data () {
    return {
      datalist: []
    }
  },
  created () {
    this.setLoading(true)

    api.request('get', 'api/1/controllers')
      .then(response => {
        console.log(response.data.results.controllers)
        this.datalist = response.data.results.controllers
        this.setTablets(response.data.results.controllers)

        this.setLoading(false)
      })
      .catch(error => {
        console.log(error)
        this.setLoading(false)
      })
  },
  computed: {
    ...mapGetters({
      loading: 'isLoading'
    })
  },
  methods: {
    ...mapActions([
      'setLoading',
      'setTablets'
    ]),
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    }
  }
}
</script>

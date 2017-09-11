<template>
   <div class="animated fadeIn">
    <div class="row">
      <div class="col-sm-6 col-lg-3">
        <div class="social-box facebook">
          <i class="fa fa-facebook"></i>
          <div class="chart-wrapper">
            <social-box-chart-example :data="[65, 59, 84, 84, 51, 55, 140]" height="90"/>
          </div>
          <ul>
            <li>
              <strong>89k</strong>
              <span>friends</span>
            </li>
            <li>
              <strong>459</strong>
              <span>feeds</span>
            </li>
          </ul>
        </div><!--/.social-box-->
      </div><!--/.col-->
    </div><!--/.row-->
   </div>
</template>

<script>
import api from '../api'
import { mapGetters, mapActions } from 'vuex'
import SocialBoxChartExample from './dashboard/SocialBoxChartExample'

export default {
  name: 'board',
  components: {
    SocialBoxChartExample
  },
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


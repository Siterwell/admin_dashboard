<template>
   <div class="animated fadeIn">
    <pulse-loader class="spin-c" :loading="loading"></pulse-loader>
    <div v-if="!loading" class="row">
      <div class="col-sm-6 col-lg-3">
        <b-card header="Avg. Device Number">
          <div class="chart-wrapper">
            <pie-example :dataList="getDevCnt"/>
          </div>
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-lg-3">
        <b-card header="Avg. Family Account">
          <div class="chart-wrapper">
            <pie-example :dataList="getAvgFamilyAccount"/>
          </div>
        </b-card>
      </div>  
    </div><!--/.row-->
   </div>
</template>

<script>
import api from '../api'
import { mapGetters, mapActions } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PieExample from './charts/PieExample'

export default {
  name: 'controllers',
  components: {
    PulseLoader,
    PieExample
  },
  data () {
    return {
    }
  },
  created () {
    this.setLoading(true)

    api.request('get', 'api/1/controllers')
      .then(response => {
        console.log(response.data.results.controllers)
        this.setControllers(response.data.results.controllers)
        this.setLoading(false)
      })
      .catch(error => {
        console.log(error)
        this.setLoading(false)
      })
  },
  computed: {
    ...mapGetters({
      loading: 'isLoading',
      controllerList: 'getControllers'
    }),
    getAvgFamilyAccount: function () {
      let avgFA = [0, 0, 0, 0]
      for (let i = 0; i < this.controllerList.length; i++) {
        if (this.controllerList[i].privGroups.length >= 4) {
          avgFA[3]++
        } else if (this.controllerList[i].privGroups.length >= 3) {
          avgFA[2]++
        } else if (this.controllerList[i].privGroups.length >= 2) {
          avgFA[1]++
        } else {
          avgFA[0]++
        }
      }

      let avgFAData = {
        labels: ['0', '1', '2', '2+'],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: avgFA
          }
        ]
      }
      return avgFAData
    },
    getDevCnt: function () {
      let avgDC = [0, 0, 0, 0]
      for (let i = 0; i < this.controllerList.length; i++) {
        if (!this.controllerList[i].devices) {
          continue
        }
        if (this.controllerList[i].devices.length >= 14) {
          avgDC[3]++
        } else if (this.controllerList[i].devices.length >= 9) {
          avgDC[2]++
        } else if (this.controllerList[i].devices.length >= 4) {
          avgDC[1]++
        } else {
          avgDC[0]++
        }
      }

      // console.log(avgDC)

      let avgDCData = {
        labels: ['0~3', '4~8', '9~13', '13+'],
        datasets: [
          {
            backgroundColor: [
              '#51B883',
              '#E46651',
              '#AA88FF',
              '#1ADB16'
            ],
            data: avgDC
          }
        ]
      }
      return avgDCData
    }
  },
  methods: {
    ...mapActions([
      'setLoading',
      'setControllers'
    ])
  }
}
</script>


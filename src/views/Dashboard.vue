<template>
  <div class="animated fadeIn mt-3" align-h="center">
    <pulse-loader class="spin-c" :loading="loading"></pulse-loader>
    <div v-if="!loading" class="row">
      <div class="col-sm-6 col-lg-4 col-xl-4">
        <router-link to="/alerts">
          <b-card class="text-white bg-danger">
            <div class="h1 text-right mb-0 float-right">
              <i class="icon-bell"></i>
            </div>
            <div class="h1 mb-0">3</div>
            <div class="text-uppercase font-weight-bold">Alerts</div>
            <card-bar-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
          </b-card>
        </router-link>
      </div>
      <div class="col-sm-6 col-lg-4 col-xl-4">
        <router-link to="/checkups">
          <b-card class="text-white bg-warning">
            <div class="h1 text-right mb-4 float-right">
              <i class="icon-question"></i>
            </div>
            <div class="h1 mb-0">27</div>
            <div class="text-uppercase font-weight-bold">Checkups</div>
            <card-bar-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
          </b-card>
        </router-link>
      </div>
      <div class="col-sm-6 col-lg-4 col-xl-4">
        <router-link to="/infos">
          <b-card class="text-white bg-info">
            <div class="h1 text-right mb-4 float-right">
              <i class="icon-info"></i>
            </div>
            <div class="h1 mb-0">8</div>
            <div class="text-uppercase font-weight-bold">Infos</div>
            <card-bar-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
          </b-card>
        </router-link>
      </div>
    </div><!--/.row-->
    <div v-if="!loading" class="row">
      <div class="col-sm-12 col-lg-6 col-xl-6">
        <router-link to="/panels">
          <b-card>
            <div class="text-uppercase font-weight-bold">Managed Panels</div>
            <div class="h1 mb-0">123,727</div>
            <panels-chart class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></panels-chart>  
          </b-card>
        </router-link>
      </div>
      <div class="col-sm-12 col-lg-6 col-xl-6">
        <router-link to="/devices">
          <b-card>
            <div class="text-uppercase font-weight-bold">Managed Devices</div>
            <div class="h1 mb-0">521,490</div>
            <devices-chart class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></devices-chart>  
          </b-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import { mapGetters, mapActions } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PanelsChart from './dashboard/PanelsChart'
import DevicesChart from './dashboard/DevicesChart'
import CardBarChartExample from './dashboard/CardBarChartExample'

export default {
  name: 'controllers',
  components: {
    PulseLoader,
    CardBarChartExample,
    PanelsChart,
    DevicesChart
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

    // routeTo (path) {
    //   this.$router.push({name: path})
    // }
  }
}
</script>


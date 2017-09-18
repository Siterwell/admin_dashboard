<template>
   <div class="animated fadeIn">
    <pulse-loader :loading="loading"></pulse-loader> 
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
      <div class="col-sm-6 col-lg-3">
        <b-card header="Pie Chart">
          <div class="chart-wrapper">
            <pie-example :dataList="getDataList"/>
          </div>
        </b-card>
      </div>  
    </div><!--/.row-->
    <div class="row">
      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Striped Table">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>latest update time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tablet in tabletList">
                <td>{{ tablet.name }}</td>
                <td>{{ tablet.name }}</td>
                <td>{{ lastTime(tablet.updatedAt) }}</td>
                <td>
                  <span class="badge badge-success">{{ isOnline(tablet.active) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Prev</a></li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->
   </div>
</template>

<script>
import api from '../api'
import { mapGetters, mapActions } from 'vuex'
import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PieExample from './charts/PieExample'

export default {
  name: 'board',
  components: {
    SocialBoxChartExample,
    PulseLoader,
    PieExample
  },
  data () {
    return {
      tabletList: []
    }
  },
  created () {
    this.setLoading(true)

    api.request('get', 'api/1/controllers')
      .then(response => {
        console.log(response.data.results.controllers)
        this.tabletList = response.data.results.controllers
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
      loading: 'isLoading',
      tablets: 'getTablets'
    }),
    getDataList: function () {
      let dataList = [0, 0, 0, 0]
      for (let i = 0; i < this.tabletList.length; i++) {
        if (this.tabletList[i].privGroups.length >= 4) {
          dataList[3] += 1 / this.tabletList.length * 100
        } else if (this.tabletList[i].privGroups.length >= 3) {
          dataList[2] += 1 / this.tabletList.length * 100
        } else if (this.tabletList[i].privGroups.length >= 2) {
          dataList[1] += 1 / this.tabletList.length * 100
        } else {
          dataList[0] += 1 / this.tabletList.length * 100
        }
      }
      dataList = dataList.map(function (item) {
        return Number(item.toFixed(0))
      })
      console.log(dataList)
      return dataList
    }
  },
  methods: {
    ...mapActions([
      'setLoading',
      'setTablets'
    ]),
    isOnline: function (active) {
      return active
    },
    lastTime: function (time) {
      return time
    }
  }
}
</script>


<template>
   <div class="animated fadeIn">
    <pulse-loader :loading="loading"></pulse-loader> 
    <div class="row">
      <div class="col-sm-6 col-lg-3">
        <b-card header="Avg. Device Number">
          <div class="chart-wrapper">
            <pie-example :dataList="getDataList"/>
          </div>
        </b-card>
      </div><!--/.col-->
      <div class="col-sm-6 col-lg-3">
        <b-card header="Avg. Family Account">
          <div class="chart-wrapper">
            <pie-example :dataList="getDataList"/>
          </div>
        </b-card>
      </div>  
    </div><!--/.row-->
    <div class="row">
      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Tablets Info">
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
    }
  },
  created () {
    this.setLoading(true)

    api.request('get', 'api/1/controllers')
      .then(response => {
        console.log(response.data.results.controllers)
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
      tabletList: 'getTablets'
    }),
    getAvgFamilyAccount: function () {
      let dataList = [0, 0, 0, 0]
      for (let i = 0; i < this.tabletList.length; i++) {
        if (this.tabletList[i].privGroups.length >= 4) {
          dataList[3]++
        } else if (this.tabletList[i].privGroups.length >= 3) {
          dataList[2]++
        } else if (this.tabletList[i].privGroups.length >= 2) {
          dataList[1]++
        } else {
          dataList[0]++
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


<template>
   <div class="animated fadeIn">
    <pulse-loader class="spin-c" :loading="loading"></pulse-loader>
    <div v-if="!loading" class="row justify-content-end">
      <div class="col-lg-3">
        <v-select 
          :value.sync="filter.selected" 
          :on-change="filterChange"
          :options="filter.controllerNames">
        </v-select>
      </div>
    </div>
    <div v-if="!loading" class="row">
      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Logs">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Controller name</th>
                <th>Title</th>
                <th>Desc</th>
                <th>Latest updated time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="alert in getDisplayData">
                <td>{{ getControllerName(alert.content.parms) }}</td>
                <td>{{ alert.title }}</td>
                <td>{{ alert.desc }}</td>
                <td>{{ alert.updatedAt }}</td>
              </tr>
            </tbody>
          </table>
          <paginate
            :page-count="getPageLength"
            :page-range="3"
            :margin-pages="2"
            :click-handler="changePageIndex"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>
        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->
   </div>
</template>

<script>
// import Vue from 'vue'
import api from '../api'
import { mapGetters, mapActions } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Paginate from 'vuejs-paginate'
import vSelect from 'vue-select'

const PER_PAGE = 30

export default {
  name: 'alerts',
  components: {
    PulseLoader,
    Paginate,
    vSelect
  },
  data () {
    return {
      alerts: [],
      table: {
        displayData: []
      },
      pagination: {
        length: 1,
        index: 1
      },
      filter: {
        selected: null,
        controllerNames: ['All', '1']
      }
    }
  },
  created () {
    this.getAlerts(1)
  },
  computed: {
    ...mapGetters({
      loading: 'isLoading'
    }),
    // Pagnation
    getPageLength: function () {
      console.log(this.pagination.length)
      return this.pagination.length
    },
    getDisplayData: function () {
      return this.table.displayData
    }
  },
  methods: {
    ...mapActions([
      'setLoading'
    ]),
    // axios
    getAlerts: function (pageIndex) {
      this.setLoading(true)
      let path = 'api/1/logs?logType=message&limit=200'
      api.request('get', path)
        .then(response => {
          // console.log(response.data.results)
          // Model data
          this.alerts = response.data.results
          console.log(this.alerts.length)
          // UI loading
          this.setLoading(false)
          // Pagination
          this.pagination.length = Math.ceil(this.alerts.length / PER_PAGE)
          // Filter
          this.refreshOption()
          // Table
          this.changePageIndex(1)
        })
        .catch(error => {
          console.log(error)
          this.setLoading(false)
        })
    },
    // Select
    filterChange: function (val) {
      console.dir(JSON.stringify(val))
    },
    refreshOption: function () {
      // let data = Vue._.uniqBy(this.alerts, 'title')
      // console.log('refreshOption' + data)
      this.filter.selected = 'all'
      this.filter.controllerNames = [
        { value: 1, label: 'all' },
        { value: 2, label: 'Demo_House' },
        { value: 3, label: 'ryan-usa' }
      ]
    },
    // Alert table
    getControllerName: function (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].key === 'controllerName') {
          return items[i].value
        }
      }
    },
    // Pagnation
    changePageIndex: function (pageIndex) {
      this.pagination.index = pageIndex
      // console.log(pageIndex)
      this.table.displayData = []
      for (let i = (pageIndex - 1) * PER_PAGE; i < this.alerts.length && i < (pageIndex * PER_PAGE); i++) {
        this.table.displayData.push(this.alerts[i])
      }
    }
  }
}
</script>


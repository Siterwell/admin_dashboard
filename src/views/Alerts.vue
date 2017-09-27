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
                <th>latest update time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="alert in alerts">
                <td>{{ getControllerName(alert.content.parms) }}</td>
                <td>{{ alert.title }}</td>
                <td>{{ alert.desc }}</td>
                <td>{{ alert.updatedAt }}</td>
              </tr>
            </tbody>
          </table>
          <paginate
            :page-count="20"
            :page-range="7"
            :margin-pages="2"
            :initial-page="getSelectPage"
            :click-handler="changePage"
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
      nowPage: 0,
      search: '',
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
    getSelectPage: function () {
      return this.nowPage
    }
  },
  methods: {
    ...mapActions([
      'setLoading'
    ]),
    // axios
    getAlerts: function (pageNum) {
      this.setLoading(true)
      let path = 'api/1/logs?logType=message&limit=50&offset=' + ((pageNum - 1) * 50)
      api.request('get', path)
        .then(response => {
          // console.log(response.data.results)
          this.alerts = response.data.results
          this.nowPage = pageNum - 1
          this.refreshOption()
          this.setLoading(false)
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
    changePage: function (pageNum) {
      this.getAlerts(pageNum)
    }
  }
}
</script>


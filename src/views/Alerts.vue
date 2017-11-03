<template>
   <div class="animated fadeIn">
    <pulse-loader class="spin-c" :loading="loading"></pulse-loader>
    <div v-if="!loading" class="row">
      <div class="col-lg-12">
        <b-card>
          <vue-good-table
            :columns="columns"
            :rows="getRows"
            :paginate="true"
            rowsPerPageText="Alerts per page"
            :lineNumbers="true"
            :globalSearch="true"
            :externalSearchQuery="searchTerm"
            styleClass="table table-bordered table-striped">
          </vue-good-table>
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
import VueGoodTable from 'vue-good-table/src/components/table.vue'

export default {
  name: 'alerts',
  components: {
    PulseLoader,
    VueGoodTable
  },
  data () {
    return {
      alerts: [],
      searchTerm: this.$route.query.name,
      columns: [
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'Title',
          field: 'title'
        },
        {
          label: 'Descriptions',
          field: 'desc'
        },
        {
          label: 'Time',
          field: 'occurred'
        }
      ],
      rows: []
    }
  },
  created () {
    this.getAlerts(this.$route.query.name)
    console.log('!!!!!' + this.$route.query.controllerId)
  },
  computed: {
    ...mapGetters({
      loading: 'isLoading'
    }),
    getRows: function () {
      return this.rows
    }
  },
  methods: {
    ...mapActions([
      'setLoading'
    ]),
    // axios
    getAlerts: function (searchText) {
      this.setLoading(true)
      let path = 'api/1/logs?logType=message&limit=200'
      api.request('get', path)
        .then(response => {
          // console.log(response.data.results)
          // Model data
          this.alerts = response.data.results
          this.generateRows()
          // UI loading
          this.setLoading(false)
          this.$nextTick(function () {
            this.searchTerm = searchText
          })
        })
        .catch(error => {
          console.log(error)
          this.setLoading(false)
        })
    },
    // Alert table
    getControllerName: function (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].key === 'controllerName') {
          return items[i].value
        }
      }
    },
    generateRows: function () {
      this.rows = []
      for (let i = 0; i < this.alerts.length; i++) {
        let name = this.getControllerName(this.alerts[i].content.parms)
        let title = !this.alerts[i].title ? 'unknown' : this.alerts[i].title
        let obj = {
          name: name,
          title: title,
          desc: this.alerts[i].desc,
          occurred: this.alerts[i].updatedAt
        }
        this.rows.push(obj)
      }
    }
  }
}
</script>


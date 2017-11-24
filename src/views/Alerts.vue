<template>
  <div class="animated fadeIn">
    <pulse-loader class="spin-c" :loading="loading"></pulse-loader>
    <b-card class="mt-2">
      <div v-if="!loading" class="row">
        <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2">
          <router-link to="/alerts">
            <b-card class="text-white bg-danger">
              <div class="h1 text-right mb-0 float-right">
                <i class="icon-fire"></i>
              </div>
              <div class="h1 mb-0">3</div>
              <div class="text-uppercase font-weight-bold" style="height:45px;">Smoke</div>
            </b-card>
          </router-link>
        </div>
        <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2">
          <router-link to="/alerts">
            <b-card class="text-white bg-danger">
              <div class="h1 text-right mb-4 float-right">
                <i class="fa fa-bath"></i>
              </div>
              <div class="h1 mb-0">1</div>
              <div class="text-uppercase font-weight-bold" style="height:45px;">Flood</div>
            </b-card>
          </router-link>
        </div><!--/.col-->
        <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2">
          <router-link to="/alerts">
            <b-card class="text-white bg-danger">
              <div class="h1 text-right mb-3 float-right">
                <i class="fa fa-cloud"></i>
              </div>
              <div class="h1 mb-0">0</div>
              <div class="text-uppercase font-weight-bold" style="height:45px;">Carbon monoxide</div>
            </b-card>
          </router-link>
        </div><!--/.col-->
        <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2">
          <router-link to="/alerts">
            <b-card class="text-white bg-danger">
              <div class="h1 text-right mb-3 float-right">
                <i class="fa fa-thermometer"></i>
              </div>
              <div class="h1 mb-0">1</div>
              <div class="text-uppercase font-weight-bold" style="height:45px;">Temperature</div>
            </b-card>
          </router-link>
        </div><!--/.col-->
        <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2">
          <router-link to="/alerts">
            <b-card class="text-white bg-danger">
              <div class="h1 text-right mb-4 float-right">
                <i class="icon-drop"></i>
              </div>
              <div class="h1 mb-0">0</div>
              <div class="text-uppercase font-weight-bold" style="height:45px;">Humidity</div>
            </b-card>
          </router-link>
        </div><!--/.col-->
        <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2">
          <router-link to="/alerts">
            <b-card class="text-white bg-danger">
              <div class="h1 text-right mb-4 float-right">
                <i class="fa fa-child"></i>
              </div>
              <div class="h1 mb-0">0</div>
              <div class="text-uppercase font-weight-bold" style="height:45px;">Burglary</div>
            </b-card>
          </router-link>
        </div><!--/.col-->
      </div><!-- /.row   -->
      <div v-if="!loading" class="row">
        <div class="col-lg-12">
          <!-- <b-card> -->
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
          <!-- </b-card> -->
        </div><!--/.col-->
      </div><!-- /.row   -->
    </b-card>
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
          label: 'Place',
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
      rows: [
        {
          name: 'Office',
          title: 'Office - Smoke Alarm',
          desc: 'Meeting room - Smoke detector alarm',
          occurred: ''
        },
        {
          name: 'My Home',
          title: 'My Home - Smoke Alarm',
          desc: 'Living room - Smoke detector alarm',
          occurred: ''
        },
        {
          name: 'My Home',
          title: 'Flood Alarm',
          desc: 'Bath room - Flood detector alarm',
          occurred: ''
        },
        {
          name: 'Vacation Home',
          title: 'Temperature Alarm',
          desc: 'Living room - Temperature sensor alarm',
          occurred: ''
        },
        {
          name: 'Office',
          title: 'Smoke Alarm',
          desc: 'Bath room - Smoke detector alarm',
          occurred: ''
        },
        {
          name: 'Vacation Home',
          title: 'Burglary Alarm',
          desc: 'Garage - PIR burglary alarm',
          occurred: ''
        },
        {
          name: 'My Home',
          title: 'Burglary Alarm',
          desc: 'Backyard - PIR burglary alarm',
          occurred: ''
        },
        {
          name: 'Office',
          title: 'CO Alarm',
          desc: 'Pantry - CO detector alarm',
          occurred: ''
        },
        {
          name: 'Office',
          title: 'Burglary Alarm',
          desc: 'Front door - Door/Window contact alarm',
          occurred: ''
        },
        {
          name: 'Office',
          title: 'Burglary Alarm',
          desc: 'Front door - Door/Window contact alarm',
          occurred: ''
        },
        {
          name: 'My Home',
          title: 'Burglary Alarm',
          desc: 'Backyard - PIR burglary alarm',
          occurred: ''
        },
        {
          name: 'My Home',
          title: 'Flood Alarm',
          desc: 'Bath room - Flood detector alarm',
          occurred: ''
        }
      ]
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
      // this.rows = []
      for (let i = 0; i < this.alerts.length; i++) {
        // let name = this.getControllerName(this.alerts[i].content.parms)
        // let title = !this.alerts[i].title ? 'unknown' : this.alerts[i].title
        let obj = this.rows[i]
        // obj.desc = this.alerts[i].desc
        obj.occurred = this.alerts[i].updatedAt
        this.rows.push(obj)
      }
    }
  }
}
</script>


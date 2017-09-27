<template>
   <div class="animated fadeIn">
    <pulse-loader class="spin-c" :loading="loading"></pulse-loader>
    <div v-if="!loading" class="row">
      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Controllers Info">
          <vue-good-table
            title="Controllers Info"
            :columns="columns"
            :rows="getRows"
            :paginate="true"
            rowsPerPageText="Controller per page"
            :lineNumbers="true"
            :globalSearch="true"
            styleClass="table table-bordered table-striped">
            <template slot="table-row" scope="props">
              <td>{{ props.row.name }}</td>
              <td>{{ props.row.controllerId }}</td>
              <td>{{ props.row.updated }}</td>
              <td>
                <span :class="isOnlineClass(props.row.status)">{{ isOnline(props.row.status) }}</span>
              </td>
              <td>
                <button v-if="props.row.num !== 0" @click="changePage(props.row)" class="editbtn">{{ props.row.num }}</button>
              </td>
            </template>
          </vue-good-table>
        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->
   </div>
</template>

<script>
import api from '../api'
import { mapGetters, mapActions } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import VueGoodTable from 'vue-good-table/src/components/table.vue'

export default {
  name: 'controllers',
  components: {
    PulseLoader,
    VueGoodTable
  },
  data () {
    return {
      alerts: [],
      columns: [
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'ControllerId',
          field: 'controllerId'
        },
        {
          label: 'Latest updated time',
          field: 'updated'
        },
        {
          label: 'Status',
          field: 'status'
        },
        {
          label: 'Num',
          field: 'num'
        }
      ],
      rows: []
    }
  },
  created () {
    this.setLoading(true)

    api.request('get', 'api/1/controllers')
      .then(response => {
        // console.log(response.data.results.controllers)
        // Model data
        this.setControllers(response.data.results.controllers)
        let path = 'api/1/logs?logType=message&limit=200'
        api.request('get', path)
          .then(response => {
            // console.log(response.data.results)
            // Model data
            this.alerts = response.data.results

            this.generateRows()
            // UI loading
            this.setLoading(false)
          })
          .catch(error => {
            console.log(error)
            this.setLoading(false)
          })
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
    getRows: function () {
      return this.rows
    }
  },
  methods: {
    ...mapActions([
      'setLoading',
      'setControllers'
    ]),
    isOnlineClass: function (active) {
      if (active === '0') {
        return 'badge badge-success'
      } else if (active === '1') {
        return 'badge badge-danger'
      } else if (active === '2') {
        return 'badge badge-warning'
      } else {
        return 'badge badge-secondary'
      }
    },
    isOnline: function (active) {
      if (active === '0') {
        return 'online'
      } else if (active === '1') {
        return 'offline'
      } else if (active === '2') {
        return 'logout'
      } else {
        return 'Unknown'
      }
    },
    generateRows: function () {
      this.rows = []
      for (let i = 0; i < this.controllerList.length; i++) {
        let obj = {
          name: this.controllerList[i].name,
          controllerId: this.controllerList[i].controllerId,
          updated: this.controllerList[i].updatedAt,
          status: this.controllerList[i].active,
          num: i % 5
        }
        this.rows.push(obj)
      }
    },
    changePage: function (row) {
      console.log(row.num + row.controllerId)
      this.$router.push('/alerts')
    }
  }
}
</script>


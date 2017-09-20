<template>
   <div class="animated fadeIn">
    <pulse-loader class="spin-c" :loading="loading"></pulse-loader>
    <div v-if="!loading" class="row">
      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Tablets Info">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>controllerId</th>
                <th>latest update time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tablet in tabletList">
                <td>{{ tablet.name }}</td>
                <td>{{ tablet.controllerId }}</td>
                <td>{{ lastTime(tablet.updatedAt) }}</td>
                <td>
                  <span :class="isOnlineClass(tablet.active)">{{ isOnline(tablet.active) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->
   </div>
</template>

<script>
import api from '../api'
import { mapGetters, mapActions } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PieExample from './charts/PieExample'

export default {
  name: 'tablets',
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
    })
  },
  methods: {
    ...mapActions([
      'setLoading',
      'setTablets'
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
    lastTime: function (time) {
      return time
    }
  }
}
</script>


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
          <paginate
            :page-count="tabletsNum"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
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
import api from '../api'
import { mapGetters, mapActions } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PieExample from './charts/PieExample'
import Paginate from 'vuejs-paginate'

export default {
  name: 'tablets',
  components: {
    PulseLoader,
    PieExample,
    Paginate
  },
  data () {
    return {
      tabletsNum: 0
    }
  },
  created () {
    this.setLoading(true)

    api.request('get', 'api/1/controllers')
      .then(response => {
        console.log(response.data.results.controllers)
        this.setTablets(response.data.results.controllers)
        this.setLoading(false)
        this.tabletsNum = response.data.results.controllers.length / 20
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
    },
    clickCallback: function (pageNum) {
      let path = 'api/1/logs?limit=50&offset=' + ((pageNum - 1) * 50)
      api.request('get', path)
        .then(response => {
          // console.log(response.data.results)
          this.logs = response.data.results
          this.nowPage = pageNum - 1
          this.setLoading(false)
        })
        .catch(error => {
          console.log(error)
          this.setLoading(false)
        })
    }
  }
}
</script>


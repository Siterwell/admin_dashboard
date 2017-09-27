<template>
   <div class="animated fadeIn">
    <pulse-loader class="spin-c" :loading="loading"></pulse-loader>
    <div v-if="!loading" class="row">
      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Controllers Info">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>ControllerId</th>
                <th>Latest updated time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="controller in controllerList">
                <td>{{ controller.name }}</td>
                <td>{{ controller.controllerId }}</td>
                <td>{{ controller.updatedAt }}</td>
                <td>
                  <span :class="isOnlineClass(controller.active)">{{ isOnline(controller.active) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <paginate
            :page-count="changePageCount"
            :page-range="3"
            :margin-pages="2"
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
import api from '../api'
import { mapGetters, mapActions } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PieExample from './charts/PieExample'
import Paginate from 'vuejs-paginate'

const PER_PAGE = 2

export default {
  name: 'controllers',
  components: {
    PulseLoader,
    PieExample,
    Paginate
  },
  data () {
    return {
      pagination: {
        controllersNum: 1
      }
    }
  },
  created () {
    this.setLoading(true)

    api.request('get', 'api/1/controllers')
      .then(response => {
        console.log(response.data.results.controllers)
        this.setControllers(response.data.results.controllers)
        this.setLoading(false)
        this.pagination.controllertsNum = response.data.results.controllers.length / PER_PAGE
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
    changePageCount: function () {
      return this.pagination.controllertsNum
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
    // Pagnation
    changePage: function (pageIndex) {
      console.log(pageIndex)
    }
  }
}
</script>


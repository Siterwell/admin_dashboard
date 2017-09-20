<template>
   <div class="animated fadeIn">
    <pulse-loader class="spin-c" :loading="loading"></pulse-loader>
    <div v-if="!loading" class="row">
      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Logs">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Desc</th>
                <th>latest update time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in logs">
                <td>{{ log.title }}</td>
                <td>{{ log.desc }}</td>
                <td>{{ lastTime(log.updatedAt) }}</td>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'logs',
  components: {
    PulseLoader
  },
  data () {
    return {
      logs: []
    }
  },
  created () {
    this.setLoading(true)

    api.request('get', 'api/1/logs?limit=50')
      .then(response => {
        console.log(response.data.results)
        this.logs = response.data.results

        this.setLoading(false)
      })
      .catch(error => {
        console.log(error)
        this.setLoading(false)
      })
  },
  computed: {
    ...mapGetters({
      loading: 'isLoading'
    })
  },
  methods: {
    ...mapActions([
      'setLoading'
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


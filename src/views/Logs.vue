<template>
   <div class="animated fadeIn">
    <pulse-loader class="spin-c" :loading="loading"></pulse-loader>
    <div v-if="!loading" class="row">
      <div class="col-lg-12">
        <b-card header="<i class='fa fa-align-justify'></i> Logs">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Tablet name</th>
                <th>Title</th>
                <th>Desc</th>
                <th>latest update time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in logs">
                <td>{{ getTabletName(log.content.parms) }}</td>
                <td>{{ log.title }}</td>
                <td>{{ log.desc }}</td>
                <td>{{ lastTime(log.updatedAt) }}</td>
              </tr>
            </tbody>
          </table>
          <paginate
            :page-count="20"
            :page-range="3"
            :margin-pages="2"
            :initial-page="getSelectPage"
            :click-handler="clickCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            ref="paginate">
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
import Paginate from 'vuejs-paginate'

export default {
  name: 'logs',
  components: {
    PulseLoader,
    Paginate
  },
  data () {
    return {
      logs: [],
      nowPage: 0
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
    }),
    getSelectPage: function () {
      return this.nowPage
    }
  },
  methods: {
    ...mapActions([
      'setLoading'
    ]),
    lastTime: function (time) {
      return time
    },
    getTabletName: function (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].key === 'controllerName') {
          return items[i].value
        }
      }
    },
    clickCallback: function (pageNum) {
      console.log(pageNum)
      this.setLoading(true)
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


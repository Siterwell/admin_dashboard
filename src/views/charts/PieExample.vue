<script>
import { Pie } from 'vue-chartjs'

export default Pie.extend({
  props: {
    dataList: {
      type: Object,
      required: true
    }
  },
  watch: {
    dataList: function () {
      this.renderLineChart()
    }
  },
  mounted () {
    this.renderLineChart()
  },
  computed: {
    chartData: function () {
      return this.dataList
    }
  },
  methods: {
    renderLineChart: function () {
      // console.log(this.chartData.labels)
      if (!this.chartData.labels) {
        return
      }
      this.renderChart({
        labels: this.chartData.labels,
        datasets: this.chartData.datasets
      }, {responsive: true, maintainAspectRatio: false})
    }
  }
})
</script>

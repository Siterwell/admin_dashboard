<script>
import { Pie } from 'vue-chartjs'

export default Pie.extend({
  props: {
    dataList: {
      type: Array,
      required: true,
      default: () => [0, 0, 0, 0]
    }
  },
  watch: {
    dataList: function () {
      // this._chart.destroy()
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
      this.renderChart({
        labels: ['0', '1', '2', 'over 2'],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: this.chartData
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    }
  }
})
</script>

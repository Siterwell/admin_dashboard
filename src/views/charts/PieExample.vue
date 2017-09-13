<script>
import { Pie } from 'vue-chartjs'

export default Pie.extend({
  props: {
    dataList: {
      type: Array,
      required: true,
      default: () => [40, 20, 80, 10]
    }
  },
  mounted () {
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
          data: this.dataList
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})
</script>

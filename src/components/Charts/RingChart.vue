<template>
  <div>
    <ve-ring
      height="350px"
      width="100%"
      :data="chartData"
      :settings="chartSettings"
      :extend="chartExtend"
      data-type="percent"
    >
    </ve-ring>
  </div>
</template>

<script>
import VeRing from 'v-charts/lib/ring.common'
import 'echarts/lib/component/title'
export default {
  name: 'RingChart',
  components: {
    VeRing
  },
  data() {
    this.chartSettings = {
      dimension: '学生状态',
      metrics: '所占百分比',
      labelLine: {
        show: false
      }
    }
    return {
      chartExtend: {
        series: {
          center: ['50%', '45%'],
          label: {
            show: false
          }
        },
        legend: {
          x: 'center',
          y: 'bottom',
          icon: 'circle',
          formatter: function(name) {
            return name 
          }
        }
      },
      chartData: {
        columns: ['学生状态', '所占百分比'],
        rows: [
          { 学生状态: '在读', 所占百分比: 1393 },
          { 学生状态: '结课', 所占百分比: 3530 },
          { 学生状态: '试听', 所占百分比: 2923 },
          { 学生状态: '流失', 所占百分比: 1723 }
        ]
      }
    }
  },
}
</script>
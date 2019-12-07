<template>
  <div>
    <ve-bar
      class="barStyle"
      height="450px"
      width="100%"
      :colors="barColors"
      :data="chartData"
      :extend="barExtend"
      :settings="chartSettings"
    ></ve-bar>
  </div>
</template>

<script>
import VeBar from 'v-charts/lib/bar.common'
export default {
  name: 'BarChart',
  components: {
    VeBar
  },
  data() {
    this.chartSettings = {
      metrics: ['销售量'],
      dataOrder: {
        label: '销售量',
        order: 'desc'
      }
    }
    return {
      chartData: {
        columns: ['分校名称', '销售量'],
        rows: [
          { 分校名称: '宝安分校', 销售量: 1393 },
          { 分校名称: '宝安分校宝安分校', 销售量: 3530 },
          { 分校名称: '宝安分校', 销售量: 2923 },
          { 分校名称: '宝安分校', 销售量: 1723 },
          { 分校名称: '宝安分校', 销售量: 1393 },
          { 分校名称: '宝安分校', 销售量: 3530 },
          { 分校名称: '宝安分校', 销售量: 2923 },
          { 分校名称: '宝安分校', 销售量: 1723 },
          { 分校名称: '宝安分校', 销售量: 3792 },
          { 分校名称: '宝安分校', 销售量: 4593 }
        ]
      },
      barColors: ['#4ecb73', '#f2637b', '#fad337'],
      barExtend: {
        xAxis: { show: false }, // 隐藏坐标轴
        series: {
          center: ['50%', '45%'],
          label: {
            show: true,
            position: 'right',
            textStyle: {
              fontSize: 14,
              color: '#666666'
            },
            formatter: function(params) {
              if (params.seriesIndex == 2) {
                str = params.data[1] * 100 + '%'
                return str
              }
            }
          },
          itemStyle: {
            //通常情况下：
            normal: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: function(params) {
                var colorList = [
                  '#5CCBB1',
                  '#5CCBB1',
                  '#5CCBB1',
                  '#5CCBB1',
                  '#5CCBB1',
                  '#5CCBB1',
                  '#5CCBB1',
                  '#94CC5C',
                  '#F5B431',
                  '#FF6666'
                ] //每根柱子的颜色
                return colorList[params.dataIndex]
              }
            }
          }
        },
        legend: {
          show: false
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .barStyle {
  // padding-top:0 !important;
  // padding:0 !important;
  // z-index: 3;
  // width:100% !important;
  margin-top: -40px;
}
</style>
<template>
  <div>
    <a-row>
      <a-col :span="16">
        <div class="leftContainer">
          <a-row>
            <a-col :span="24">
              <div class="totalData">
                <div class="detailData">
                  <div>1.1亿</div>
                  <div>销售额</div>
                </div>
                <div class="detailData">
                  <div>1.1亿</div>
                  <div>销售额</div>
                </div>
                <div class="detailData">
                  <div>1.1亿</div>
                  <div>销售额</div>
                </div>
                <div class="detailData">
                  <div>1.1亿</div>
                  <div>销售额</div>
                </div>
              </div>
            </a-col>
          </a-row>
          <div>
            <a-row class="under_leftContainer">
              <a-col :span="12">
                <div class="leftContainer_left">
                  <div>
                    学员概况
                    <RingChart />
                  </div>
                  <div class="stuNum">
                    <div>12312</div>
                    <div>学生总数</div>
                  </div>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="leftContainer_right">
                  <div>校区销售排行</div>
                  <BarChart />
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="RightContainer">
          <div>产品招生人数TOP10</div>
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <span
                :style="index==0 ? style1:index==1 ? style2:index==2 ? style3:''"
                v-text="index< 3 ? '':item"
              ></span>
              <span>2020春季五年级数学素养班</span>
              <span>5002人</span>
            </li>
          </ul>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <div class="bottomChart">
          <div>
            <div>公司销售额趋势图（单位：万）</div>
            <a-month-picker
              @change="monthChange"
              :allowClear="false"
              :defaultValue="moment(currentMonth, monthFormat)"
              :format="monthFormat"
            />
          </div>
          <LineChart />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { RingChart, BarChart, LineChart } from '@/components'
import moment from 'moment'
export default {
  components: {
    RingChart,
    BarChart,
    LineChart
  },
  computed: {
    style1: function() {
      return {
        backgroundImage: 'url(' + require('@/assets/images/侧栏收起icon.png') + ') ',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '10px',
        height: '10px'
      }
    },
    style2: function() {
      return {
        backgroundImage: 'url(' + require('@/assets/images/后退icon.png') + ') ',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '10px',
        height: '10px'
      }
    },
    style3: function() {
      return {
        backgroundImage: 'url(' + require('@/assets/images/前进icon.png') + ') ',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '10px',
        height: '10px'
      }
    }
  },
  created() {
    var date = new Date()
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    this.currentMonth=y+"年"+m+"月"
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  data() {
    return {
      loading: true,
      monthFormat: 'YYYY年MM月',
      currentMonth:"",
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    moment,
    monthChange(value) {
      var date = value._d.getFullYear() + '年' + value._d.getMonth() + '月'
      console.log(date)
    }
  }
}
</script>

<style lang="less" scoped>
.leftContainer {
  width: 100%;
  height: 100%;
  .totalData {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 38px 100px 38px 100px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    .detailData {
      text-align: center;
      :nth-child(1) {
        font-size: 40px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 47px;
      }
      :nth-child(2) {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 22px;
      }
    }
  }
  .under_leftContainer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .leftContainer_left {
      width: 96%;
      height: 420px;
      position: relative;
      background: white;
      border-radius: 8px;
      padding: 14px 20px 14px 20px;
      .stuNum {
        position: absolute;
        top: 40%;
        left: 38%;
        div:nth-of-type(1) {
          font-size: 40px;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 47px;
        }
        div:nth-of-type(2) {
          font-size: 14px;
          text-align: center;
          margin-top: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
        }
      }
      :nth-child(1) {
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
    }
    .leftContainer_right {
      width: 100%;
      height: 420px;
      background: white;
      border-radius: 8px;
      padding: 14px 20px 14px 20px;
      :nth-child(1) {
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
    }
  }
}
.RightContainer {
  width: 95%;
  height: 100%;
  background: white;
  margin-left: 20px;
  border-radius: 8px;
  padding: 14px 20px 14px 20px;
  div:nth-of-type(1) {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
  ul {
    list-style: none;
    padding-left: 0;
    padding-top: 18px;
    li {
      display: flex;
      padding: 15px;
      justify-content: space-between;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
    li:nth-child(odd) {
      background: #f5f7fa;
    }
  }
}
.bottomChart {
  width: 100%;
  padding: 14px 20px 14px 20px;
  height: 400px;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  :nth-child(1) {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
    display: flex;
    justify-content: space-between;
  }
}
</style>

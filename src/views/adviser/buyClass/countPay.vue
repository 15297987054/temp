<template>
  <div>
    <div class="hasChoosed">
      <div class="border"></div>
      <span>确认已购课程</span>
    </div>
    <div>
      <a-table :pagination="false" :columns="columns" :dataSource="data">
        <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record">
          <div :key="col" style="fontSize:12px;padding:0;">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{text}}</template>
          </div>
        </template>
        <template slot="total" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a @click="() => edit(record.key)">编辑</a>
            </span>
          </div>
        </template>
        <template slot="share" slot-scope>
          <a-checkbox @change="onChange"></a-checkbox>
        </template>
      </a-table>
    </div>
    <div>
      <a-row>
        <a-col :span="2">
          <span style="paddingLeft:20px;">可选政策：</span>
        </a-col>
        <a-col :span="22">
          <div class="policyContainer">
            <div
              class="policy"
              @click="indexClick(index)"
              v-for="(item,index) in policyList"
              :key="index"
            >

                <a-popover>
                <template slot="content">
                  <div style="width:200px;background:rgba(250,252,253,1);">
                     <p style="fontWeight:900;">优惠规则：</p>
                     <p>1、优惠券是仅限在乐融商城使用,按面值总额减免支付的优惠码。</p>
                     <p>2、优惠券分三种:满减券、免邮券、以旧换新优惠券。</p>
                     <p>3、优惠券获取方式:通过乐融商城的买赠、活动参与等形式获取。</p>
                     <p>4、使用满...</p>
                  </div>
                </template>
                <div>{{item.title}}</div>
                <div>{{item.detail}}</div>
               </a-popover>
              <div class="rightConer" v-show="flag==index ? true: false">
                <div class="aIcon">
                  <a-icon type="check" />
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row class="aRow">
        <a-col :span="2">
          <div style="paddingLeft:20px;marginTop:5px;">选择优惠券：</div>
        </a-col>
        <a-col :span="22">
          <a-select defaultValue="开学季，下单立减200元" style="width: 240px" @change="handleChange">
            <a-select-option value="开学季，下单立减200元">开学季，下单立减200元</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="aRow">
        <a-col :span="2">
          <div style="paddingLeft:20px;marginTop:5px;">账户余额：</div>
        </a-col>
        <a-col :span="22">
          <a-input defaultValue="5000" style="width:240px;marginRight:20px;" />
          <a-checkbox @change="onChange">
            使用余额
            <span class="changeMoney">（总￥10000，可提现5000，冻结5000）</span>
          </a-checkbox>
        </a-col>
      </a-row>
    </div>
    <hr style="border:1px solid #E5E5E5;marginTop:20px;" />
    <div class="payDetail">
      <a-row>
        订单总额：
        <span>￥{{orderTotalPay}}</span>
      </a-row>
      <a-row>
        已减优惠：
        <span>-600</span>
      </a-row>
      <a-row>
        余额抵扣
        <span>-600</span>
      </a-row>
      <a-row>
        实付金额：
        <span>￥60000</span>
      </a-row>
      <a-row class="suerBtn">
        <a-button @click="submitPay" type="primary">确认订单</a-button>
      </a-row>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '班级编号',
    dataIndex: 'classId',
    width: '8%'
  },
  {
    title: '班级名称',
    dataIndex: 'className',
    width: '15%'
  },
  {
    title: '所在校区',
    dataIndex: 'campusName',
    width: '10%'
  },
  {
    title: '任课老师',
    dataIndex: 'teacherName',
    width: '5%'
  },

  {
    title: '上课日期',
    dataIndex: 'classDate',
    width: '13%'
  },
  {
    title: '上课时间',
    dataIndex: 'classTimes',
    width: '10%'
  },
  {
    title: '购买课时/次数',
    dataIndex: 'buyTimes',
    width: '8%'
  },
  {
    title: '单价（元）',
    dataIndex: 'singlePrice',
    width: '6%'
  },
  {
    title: '其他费用（元）',
    dataIndex: 'otherPay',
    width: '7%'
  },
  {
    title: '教材费（元）',
    dataIndex: 'booksPay',
    width: '6%'
  },
  {
    title: '总价',
    dataIndex: 'total',
    width: '6%',
    className: 'total'
  },
  {
    title: '是否分摊',
    dataIndex: 'share',
    scopedSlots: { customRender: 'share' }
  }
]

const data = []
export default {
  name: 'CountPay',
  data() {
    return {
      data,
      columns,
      policyList: [
        { title: '政策一', detail: '满1000减100' },
        { title: '政策一', detail: '满1000减100' },
        { title: '政策一', detail: '满1000减100' },
        { title: '政策一', detail: '满1000减100' }
      ],
      flag: 0,
      orderTotalPay: 0
    }
  },
  created: function() {
    this.data = []
    var dataArr = this.$route.query.data
    if (
      dataArr !== undefined &&
      dataArr !== [] &&
      dataArr[0] !== undefined &&
      dataArr !== undefined &&
      dataArr[0] !== '[object Object]' &&
      dataArr !== '[object Object]'
    ) {
      sessionStorage.setItem('dataArr', JSON.stringify(dataArr))
    } else {
      dataArr = JSON.parse(sessionStorage.getItem('dataArr'))
    }
    console.log(dataArr, 2222)
    for (var i = 0; i < dataArr.length; i++) {
      var obj = {}
      obj.classId = dataArr[i].classId
      obj.className = dataArr[i].className
      obj.campusName = dataArr[i].campus
      obj.teacherName = dataArr[i].teacher
      obj.classDate = dataArr[i].classDate
      obj.classTimes = dataArr[i].classTime
      obj.buyTimes = dataArr[i].buyClassTimes
      obj.singlePrice = dataArr[i].singlePrice
      obj.otherPay = dataArr[i].otherPay
      obj.booksPay = dataArr[i].booksPay
      obj.total = (
        Number(Number(dataArr[i].buyClassTimes) * dataArr[i].singlePrice) +
        (Number(dataArr[i].otherPay) + Number(dataArr[i].booksPay))
      ).toFixed(1)
      this.data.push(obj)
    }
    for (var h = 0; h < this.data.length; h++) {
      this.orderTotalPay += Number(this.data[h].total)
    }
    this.orderTotalPay = this.orderTotalPay.toFixed(1)
    console.log(this.data, 12123)
  },
  methods: {
    submitPay() {
      this.$router.push({ path: '/adviser/buyClass/pay', query: { data: this.data } })
    },
    indexClick(index) {
      this.flag = index
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import './antdesignstyle.less';
.border {
  width: 6px;
  margin-right: 20px;
  height: 18px;
  background: rgba(76, 166, 255, 1);
  border-radius: 4px;
}

.hasChoosed {
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.policyContainer {
  cursor: pointer;
  display: flex;
  div:nth-of-type(1) {
    margin-left: 0;
  }
  .policy {
    position: relative;
    width: 12.5%;
    padding: 10px;
    border: 1px solid #ccc;
    margin-left: 20px;
    :nth-child(1) {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      // color: rgba(0, 0, 0, 1);
      line-height: 1px;
    }
    :nth-child(2) {
      height: 20px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(76, 166, 255, 1);
      line-height: 20px;
    }
    :nth-child(4) {
      color: white;
    }
    .rightConer {
      position: absolute;
      width: 0px;
      height: 0px;
      width: 0px;
      height: 0px;
      top: 0px;
      right: 0;
      border: 13px solid #000;
      border-top-color: #4ca6ff;
      border-bottom-color: white;
      border-left-color: white;
      border-right-color: #4ca6ff;
    }
    .aIcon {
      position: absolute;
      color: white !important;
      top: -11px;
      right: -12px;
    }
  }
}
.aRow {
  display: flex;
  align-items: center;
  padding: 12px 12px 12px 0;
}
.changeMoney {
  width: 331px;
  height: 12px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff6666;
  line-height: 12px;
}
.payDetail {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  padding-right: 20px;
  text-align: right;
  margin-bottom: 20px;
  :nth-child(1) {
    color: rgba(51, 51, 51, 1);
    margin-top: 10px;
    span {
      color: #ff6666;
    }
  }
  :nth-child(2) {
    color: rgba(76, 166, 255, 1);
    margin-top: 10px;
    span {
      color: rgba(76, 166, 255, 1);
    }
  }
  :nth-child(3) {
    color: rgba(92, 203, 177, 1);
    margin-top: 10px;
    span {
      color: rgba(92, 203, 177, 1);
    }
  }
  :nth-child(4) {
    margin-top: 38px;
    height: 30px;
    font-size: 15px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    margin-top: 20px;
    span {
      color: #ff6666;
      font-size: 30px;
    }
  }
  :nth-child(5) {
    color: white;
    margin-top: 20px;
    :nth-child(1) {
      color: white;
      margin-top: 0;
    }
  }
}
</style>
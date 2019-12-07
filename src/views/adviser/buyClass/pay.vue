<template>
  <div>
    <div class="hasChoosed">
      <div class="border"></div>
      <span>订单详情</span>
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
        <template slot="share" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a @click="() => edit(record.key)">编辑</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
    <div class="payDetail">
      <a-row>
        订单总额：
        <span>￥{{totalPay}}</span>
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
    </div>
    <hr style="border:1px solid #E5E5E5;marginTop:20px;marginBottom:20px;" />
    <div class="payWay">
      <a-row>
        <a-col>
          <span>收款方式</span>
          <a-select defaultValue="微信二维码收款" style="width: 170px" @change="handleChange">
            <a-icon slot="suffixIcon" type="pic-left" />
            <a-select-option value="微信二维码收款">微信二维码收款</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
          <a-input class="inputStyle" placeholder="请输入金额" />元
          <a-input class="inputStyle" placeholder="请输入单号后四位" />
          <a-button type="primary">微信收款二维码</a-button>
        </a-col>
      </a-row>
      <a-row style="margin-top:20px;">
          <a-col>
          <a-select defaultValue="请选择付款方式" style="width: 170px" @change="handleChange">
            <a-icon slot="suffixIcon" type="pic-left" />
            <a-select-option value="请选择付款方式">请选择付款方式</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
          <a-input class="inputStyle" placeholder="请输入金额" />元
          <a-input class="inputStyle" placeholder="请输入单号后四位" />
          <sapn class="iconContainer">
             <span @click="addClick"><a-icon type="plus" /></span>
             <span @click="decreaseClick"><a-icon type="minus" /></span>
          </sapn>
        </a-col>
      </a-row>
       <a-row  class="suerBtn">
        <a-button style="width:180px;height:40px;" @click="Pay" type="primary">提交报名</a-button>
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
  }
]

const data = []
export default {
  name: 'Pay',
  data() {
    return {
      data,
      columns,
      dataArr: [],
      totalPay:0
    }
  },
  created: function() {
    // = this.$route.query.data
    // console.log(this.$route.query.data,"付款页面的")
    // this.data = []
    var dataArr = this.$route.query.data
    if ((dataArr!==undefined && dataArr!==[] &&dataArr[0]!==undefined) && dataArr!==undefined && dataArr[0]!=="[object Object]"&&dataArr!=="[object Object]" ) {
      sessionStorage.setItem('dataForOrderArr', JSON.stringify(dataArr))
    } else {
      dataArr = JSON.parse(sessionStorage.getItem('dataForOrderArr'))
    }
    console.log(dataArr,2222)
    dataArr.forEach((item)=>{this.totalPay+=Number(item.total);})
    this.totalPay=this.totalPay.toFixed(1)
    this.data =dataArr;
  },
  methods: {
      decreaseClick(){

      },
      addClick(){

      },
      Pay(){},
      handleChange(value) {
        console.log(`selected ${value}`);
      },
    },
}
</script>

<style lang="less" scoped>
@import './antdesignStyle.less';
.hasChoosed {
  display: flex;
  align-items: center;
  padding-left: 20px;
  .border {
    width: 6px;
    margin-right: 20px;
    height: 18px;
    background: rgba(76, 166, 255, 1);
    border-radius: 4px;
  }
}
.payDetail {
  font-size: 16px;
  padding-right:20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  text-align: right;
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
.payWay{
    text-align: right;
    padding-right:20px;
    span{
        margin-right:15px
    }
}
.suerBtn{
    margin-top:20px;
    margin-bottom:20px;
}
.inputStyle{
width: 140px;
margin-left:20px;
margin-right:10px;
}
.iconContainer{
    color:#4CA6FF;
    margin-right:60px;
    text-align:left;
    font-size:20px;
}
</style>
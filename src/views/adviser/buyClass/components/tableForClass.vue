<template>
  <div>
    <div class="chooseClassTable">
      <a-table
        :rowSelection="{selectedRowKeys: classList, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="data"
      >
        <template slot="remanentClass" slot-scope>
          <div class="editable-row-operations">
            <span>
              <span style="color:#4CA6FF">10</span>
              <span>/12</span>
            </span>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span class="operation">
              <a @click="() => edit(record.key)">立即购买</a>
            </span>
          </div>
        </template>
      </a-table>
      <span class="record">共{{records}}条记录</span>
    </div>
    <div class="choosedClass">
      <div class="hasChoosed">
        <div class="border"></div>
        <span>已选课程</span>
      </div>
      <a-table
        :rowSelection="{selectedRowKeys: classListSec, onChange: onSelectChangeSec}"
        :columns="columnsSec"
        :dataSource="dataSec"
      >
        <template slot="buyClass" slot-scope="text, record">
          <a-input
            :v-model="text"
            :defaultValue="text"
            @change="e => classTimesChange(text,e.target.value, record.key)"
            placeholder="请输入课时/次数"
          />
        </template>
        <template slot="sendClass" slot-scope="text, record">
          <a-input
            :v-model="text"
            :defaultValue="text"
            @change="e => classSendChange(e.target.value, record.key)"
            style="width:90%;"
            placeholder="请输入课时/次数"
          />
        </template>
      </a-table>
    </div>
    <div class="nextBtn">
      <a-button @click="nextStep" type="primary">下一步</a-button>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '课程编号',
    dataIndex: 'classId'
  },
  {
    title: '课程名称',
    dataIndex: 'className'
  },
  {
    title: '班级类型',
    dataIndex: 'classType'
  },
  {
    title: '任课老师',
    dataIndex: 'teacher'
  },
  {
    title: '上课日期',
    dataIndex: 'classDate'
  },
  {
    title: '上课时间',
    dataIndex: 'classTime'
  },
  {
    title: '价格（元）',
    dataIndex: 'price'
  },
  {
    title: '教材费（元）',
    dataIndex: 'booksPay'
  },
  {
    title: '其他费用（元）',
    dataIndex: 'otherPay'
  },
  {
    title: '单价（元）',
    dataIndex: 'singlePrice'
  },
  {
    title: '剩余课次',
    dataIndex: 'remanentClass'
  },
  {
    title: '已报人数',
    dataIndex: 'buyNum',
    className: 'buyNum'
  },
  {
    title: '加购',
    dataIndex: 'buy',
    scopedSlots: { customRender: 'operation' }
  }
]
const columnsSec = [
  {
    title: '课程编号',
    dataIndex: 'classId'
  },
  {
    title: '课程名称',
    dataIndex: 'className'
  },
  {
    title: '任课老师',
    dataIndex: 'teacher'
  },
  {
    title: '上课日期',
    dataIndex: 'classDate'
  },
  {
    title: '上课时间',
    dataIndex: 'classTime'
  },
  {
    title: '购买课时/次数',
    dataIndex: 'buyClass',
    scopedSlots: { customRender: 'buyClass' }
  },
  {
    title: '赠送课时',
    dataIndex: 'sendClass',
    className: 'sendClass',
    scopedSlots: { customRender: 'sendClass' }
  }
]
const dataSec = []
// for (let i = 0; i < 46; i++) {
//   dataSec.push({
//     key: i,
//     classId: `C20191015235698`,
//     className: '2020春季五年级数学素养班',
//     teacher: '尼古拉斯.凯奇',
//     classDate: '2019-02-12至2019-02-18',
//     classTime: '周六  10:10-12:10',
//   })
// }
const data = []
for (let i = 0; i < 0; i++) {
  data.push({
    key: i,
    classId: `C20191015235698${i}`,
    className: '2020春季五年级数学素养班',
    classType: `常规班 `,
    teacher: '尼古拉',
    classDate: '2019-02-12至2019-02-18',
    classTime: '周六  10:10-12:10',
    price: '6999.2',
    booksPay: '230.2',
    otherPay: '230.2',
    singlePrice: '230.2',
    remanentClass: '不限',
    buyNum: '3009'
  })
}

const dataSource = []
import { getClassListForOrder } from '@/api/class'
export default {
  name: 'TableForClass',
  props: {
    val: {
      type: String,
      required: true,
      default: function() {
        return '福田百花分校'
      }
    }
  },
  data() {
    return {
      data,
      columns,
      dataSec,
      columnsSec,
      loading: false,
      records: 0,
      classList: [],
      classListSec: [],
      dataToOther: []
    }
  },
  created: function() {
    this.records = this.data.length
    if (!this.dataSec[0]) {
      this.dataSec = JSON.parse(sessionStorage.getItem('choosedClassList'))
    }

    if (!this.classListSec[0]) {
      this.classListSec = JSON.parse(sessionStorage.getItem('choosedClassListIndex'))
    }
    if (!this.dataToOther[0]) {
      this.dataToOther = JSON.parse(sessionStorage.getItem('dataToOther'))
    }
    // console.log(this.dataToOther,"这是进入页面时的datasec数据")
    this.getClassListForSell()
  },
  methods: {
    getClassListForSell() {
      this.data=[]
      getClassListForOrder({ pageNum: 1, pageSize: 10, studentNo: '123' }).then(res => {
        var arr = res.rows
        for (var i = 0; i < arr.length; i++) {
           var str=''
          var obj = {}
          obj.key = arr[i].id-1
          obj.classId = arr[i].classNo
          obj.className = arr[i].className
          obj.classType = arr[i].metadataName
          obj.teacher = arr[i].teacherName
          obj.classDate = arr[i].classBeginTime + '至' + arr[i].classEndTime
           arr[i].classTimes.forEach(item => {
             str+=item
            obj.classTime=str
          })
          obj.price = arr[i].price
          obj.booksPay = arr[i].teachingMaterialPrice
          obj.otherPay = arr[i].otherPrice
          obj.singlePrice = arr[i].oneClassPrice
          obj.buyNum = arr[i].buyNum
          obj.remanentClass = arr[i].surplusClassNum === 0 ? '不限' : arr[i].surplusClassNum
          this.data.push(obj)
        }
      })
    },
    nextStep() {
      this.$emit('next')
      // this.dataToOther.forEach( function(item){ item.campus=this.val})
      for (var i = 0; i < this.dataToOther.length; i++) {
        if (this.val == '') continue
        this.dataToOther[i].campus = this.val
      }
      this.$router.push({ path: '/adviser/buyClass/countPay', query: { data: this.dataToOther } })
      sessionStorage.setItem('dataToOther', JSON.stringify(this.dataToOther))
    },
    onSelectChangeSec(value) {
      this.classListSec = value
      this.dataToOther = []
      var arrSec = this.classListSec
      for (var j = 0; j < this.data.length; j++) {
        for (var i = 0; i < arrSec.length; i++) {
          if (this.dataSec[arrSec[i]].classId == this.data[j].classId) {
            this.dataToOther.push(this.data[j])
          }
        }
      }
    },
    classSendChange(value, key) {
      this.dataSec[key].sendClassTimes = value
      console.log(this.dataToOther, '这是this.dataToOther的数据123')
      for (var j = 0; j < this.data.length; j++) {
        if (this.dataSec[key].classId == this.data[j].classId) {
          this.data[j].sendClassTimes = value
          this.dataSec[key].sendClass = value
          this.dataToOther.splice(key, 1, this.data[j])
          sessionStorage.setItem('choosedClassList', JSON.stringify(this.dataSec))
        }
      }
      //  console.log(this.dataToOther,"这是this.dataToOther的数据")
    },
    classTimesChange(text, value, key) {
      this.dataSec[key].buyClassTimes = value
      for (var j = 0; j < this.data.length; j++) {
        if (this.dataSec[key].classId == this.data[j].classId) {
          this.data[j].buyClassTimes = value
          this.dataSec[key].buyClass = value
          this.dataToOther.splice(key, 1, this.data[j])
          sessionStorage.setItem('choosedClassList', JSON.stringify(this.dataSec))
        }
      }
      // this.dataSec[key].buyClassTimes=value;
    },
    onSelectChange(selectedRowKeys) {
      this.classListSec = []
      this.dataSec = []
      this.dataToOther = []
      this.classList = selectedRowKeys
      var arr = this.classList
      console.log(arr)
      for (var i = 0; i < arr.length; i++) {
        this.classListSec.push(i)
        this.data[arr[i]].campus = this.val
        this.dataToOther.push(this.data[arr[i]])
        var obj = {}
        obj.key = i
        ;(obj.classId = this.data[arr[i]].classId),
          (obj.className = this.data[arr[i]].className),
          (obj.teacher = this.data[arr[i]].teacher),
          (obj.classDate = this.data[arr[i]].classDate),
          (obj.classTime = this.data[arr[i]].classTime),
          this.dataSec.push(obj)
      }
      sessionStorage.setItem('choosedClassList', JSON.stringify(this.dataSec))
      sessionStorage.setItem('choosedClassListIndex', JSON.stringify(this.classListSec))
    }
  }
}
</script>

<style lang="less" scoped>
@import '../antdesignStyle.less';
.chooseClassTable {
  border-bottom: 12px solid #f2f3f7;
  margin-left: -20px;
  margin-right: -20px;
}

.operation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 60px;
  height: 24px;
  font-size: 12px;
  /deep/a {
    color: rgba(76, 166, 255, 1);
  }
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(76, 166, 255, 1);
}
.buyNum {
  color: red !important;
}
.record {
  width: 98px;
  position: absolute;
  margin-top: -40px;
  margin-left: 20px;
  height: 12px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 12px;
}
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
  padding-top: 20px;
  padding-left: 20px;
}
.choosedClass {
  border-radius: 8px;
  margin-left: -20px;
  margin-right: -20px;
}
.nextBtn {
  display: flex;
  width: 100%;
  justify-content: center;
  :nth-child(1) {
    width: 180px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
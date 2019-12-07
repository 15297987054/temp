<template>
  <div class="mainContainer">
    <a-row :gutter="20">
      <a-col :span="5">
        <a-form @submit="handleSubmit">
          <a-form-item>
            <a-input-search
              class="serach_input"
              placeholder="输入班级名称/编号"
              @search="onSearch"
              enterButton="查询"
              size="middle"
            />
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="5">
        <div class="choose_date_box">
          <div class="iconBoxLeft">
            <a-icon @click="weekDecrease" type="left" />
          </div>
          <input v-model="dateValue" @input="onChange" placeholder="请输入日期" class="input_box" />
          <div class="iconBoxRight">
            <a-icon @click="weekAdd" type="right" />
          </div>
        </div>
      </a-col>
      <a-col :span="2">
        <div class="currentWeek" @click="currentTime">本周</div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" class="className">{{className}}</a-col>
      <div class="stamp">打印</div>
    </a-row>
    <a-row>
      <a-table
        :columns="columns"
        :dataSource="data"
        bordered
        :pagination="false"
        class="table_for_class"
      >
        <template slot="name" slot-scope="text">
          <a href="javascript:;">{{text}}</a>
        </template>
        <template slot="class" slot-scope>
          <div class="editable-row-operations">
            <span class="classDetail">
              <span>2020春季四年级数学</span>
              <br />
              <sapn>思维班03班</sapn>
              <br />
              <span>王希（14:00-16:00）</span>
            </span>
          </div>
        </template>
      </a-table>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'
import { getAllClassList } from '@/api/class'
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  }
  if (index === 4) {
    obj.attrs.colSpan = 0
  }
  return obj
}

const data1 = [
  // {
  //   key: '101',
  //   classRoom: '101教室',
  //   ap: '下午',
  //   Mon: '',
  //   Tue: '',
  //   Wen: '',
  //   Thur: '',
  //   Fri: '',
  //   Sta: '',
  //   Sun: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`
  // },
  // {
  //   key: '102',
  //   classRoom: '102教室',
  //   ap: '上午',
  //   Mon: '',
  //   Tue: '',
  //   Wen: '',
  //   Thur: '',
  //   Fri: '',
  //   Sta: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Sun: ''
  // },
  // {
  //   key: '102',
  //   classRoom: '102教室',
  //   ap: '下午',
  //   Mon: '',
  //   Tue: '',
  //   Wen: '',
  //   Thur: '',
  //   Fri: '',
  //   Sta: '',
  //   Sun: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`
  // },
  // {
  //   key: '103',
  //   classRoom: '103教室',
  //   ap: '上午',
  //   Mon: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Tue: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Wen: '',
  //   Thur: '',
  //   Fri: '',
  //   Sta: '',
  //   Sun: ''
  // },
  // {
  //   key: '103',
  //   classRoom: '103教室',
  //   ap: '上午',
  //   Mon: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Tue: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Wen: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Thur: '',
  //   Fri: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Sta: '',
  //   Sun: ''
  // },
  // {
  //   key: '103',
  //   classRoom: '103教室',
  //   ap: '下午',
  //   Mon: '',
  //   Tue: '',
  //   Wen: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Thur: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Fri: '',
  //   Sta: '',
  //   Sun: ''
  // },
  // {
  //   key: '103',
  //   classRoom: '103教室',
  //   ap: '下午',
  //   Mon: '',
  //   Tue: '',
  //   Wen: '',
  //   Thur: '',
  //   Fri: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Sta: '',
  //   Sun: ''
  // },
  // {
  //   key: '103',
  //   classRoom: '103教室',
  //   ap: '晚上',
  //   Mon: '',
  //   Tue: '',
  //   Wen: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Thur: '',
  //   Fri: '',
  //   Sta: '',
  //   Sun: ''
  // },
  // {
  //   key: '104',
  //   classRoom: '104教室',
  //   ap: '上午',
  //   Mon: '',
  //   Tue: '',
  //   Wen: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Thur: '',
  //   Fri: '',
  //   Sta: '',
  //   Sun: ''
  // },
  // {
  //   key: '105',
  //   classRoom: '105教室',
  //   ap: '上午',
  //   Mon: '',
  //   Tue: '',
  //   Wen: '',
  //   Thur: '',
  //   Fri: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Sta: '',
  //   Sun: ''
  // },
  // {
  //   key: '105',
  //   classRoom: '105教室',
  //   ap: '下午',
  //   Mon: '',
  //   Tue: '',
  //   Wen: `2020春季四年级数学\n思维班03班\n王希(14:00-16:00)`,
  //   Thur: '',
  //   Fri: '',
  //   Sta: '',
  //   Sun: ''
  // }
]

export default {
  name: 'ByName',
  data() {
    return {
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
      dateValue: '',
      year: Number,
      month: Number,
      week: Number,
      className: '"2020春季五年级数学素养班01班（2019/11/12-2020/02/03）"的课表',
      data: [],
      lastMonday: '',
      lastTuesday: '',
      lastWednesday: '',
      lastTursday: '',
      lastFriday: '',
      lastSaturday: '',
      lastSunday: '',
      dateSub: 7,
      dateAdd: 7,
      columns: [
        {
          title: '上课时段',
          dataIndex: 'classRoom',
          colSpan: 2,
          width: '6%',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }
            var count = 1
            var list = []
            let arrKey = []
            for (var i = 0; i < this.data.length; i++) {
              arrKey.push(this.data[i].key)
            }
            var hash = []
            for (var j = 0; j < arrKey.length; j++) {
              if (hash.indexOf(arrKey[j]) == -1) {
                hash.push(arrKey[j])
              }
            }
            for (var h = 0; h < hash.length; h++) {
              for (var k = 0; k < arrKey.length; k++) {
                if (arrKey[k] == hash[h]) {
                  var object = {}
                  object.count = count++
                  object.id = k
                }
              }
              list.push(object)
              count = 1
            }
            for (var y = 0; y < list.length; y++) {
              list[y].id = 0
              if (y >= 1) {
                for (var b = 0; b < y; b++) {
                  list[y].id += list[b].count
                }
              }
            }
            for (var i = 0; i < list.length; i++) {
              if (index === list[i].id) {
                obj.attrs.rowSpan = list[i].count //zhegnque
              } else {
                for (var j = list[i].id + 1; j < list[i].count + list[i].id; j++) {
                  if (index === j) {
                    obj.attrs.rowSpan = 0
                  }
                }
              }
            }
            return obj
          }
        },
        {
          title: '上课阶段',
          dataIndex: 'ap',
          width: '6%',
          colSpan: 0,
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }
            var mcount = 1
            var acount = 1
            var ecount = 1
            var count = 1
            var list = []
            let arrKey = []
            for (var i = 0; i < this.data.length; i++) {
              arrKey.push(this.data[i].ap)
            }
            var hash = []
            for (var j = 0; j < arrKey.length; j++) {
              if (hash.indexOf(arrKey[j]) == -1) {
                hash.push(arrKey[j])
              }
            }
            for (var h = 0; h < arrKey.length; h++) {
              if (arrKey[h] === arrKey[h+1]) {
                 var object = {}
                object.count = count++
                continue
              }else{
                 list.push(count)
              }
              count = 1
            }
            var copyList=[]
             for (var y = 0; y < list.length; y++) {
                var object = {}
                object.count = list[y]
                object.id=0
              if (y >= 1) {
                for (var b = 0; b < y; b++) {
                   object.id += list[b]
                }
              }
             copyList.push(object)
            }
             list=copyList;
            for (var i = 0; i < list.length; i++) {
              if (index === list[i].id) {
                obj.attrs.rowSpan = list[i].count //zhegnque
              } else {
                for (var j = list[i].id + 1; j < list[i].count + list[i].id; j++) {
                  if (index === j) {
                    obj.attrs.rowSpan = 0
                  }
                }
              }
            }
            return obj
          }
        },
        {
          title: '',
          dataIndex: 'Mon',
          width: '12%',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }

            return obj
          }
        },
        {
          title: '2019/10/11 周二',
          dataIndex: 'Tue',
          width: '12%',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }
            return obj
          }
        },
        {
          title: '2019/10/11 周三',
          dataIndex: 'Wen',
          width: '12%',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }
            return obj
          }
        },
        {
          title: '2019/10/11 周四',
          dataIndex: 'Thur',
          width: '12%',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }
            return obj
          }
        },
        {
          title: '2019/10/11 周五',
          dataIndex: 'Fri',
          width: '12%',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }
            return obj
          }
        },
        {
          title: '2019/10/11 周六',
          dataIndex: 'Sta',
          width: '12%',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }
            return obj
          }
        },
        {
          title: '2019/10/11 周日',
          dataIndex: 'Sun',
          width: '12%',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {}
            }
            return obj
          }
        }
      ]
    }
  },
  watch: {
    time(dateValue) {
      console.log(dateValue, 12)
    }
  },
  created: function() {
    var weekOfday = moment().format('E') //计算今天是这周第几天
    this.lastMonday = moment()
      .subtract(weekOfday - 1, 'days')
      .format('YYYY/MM/DD') //周一日期
    this.lastSunday = moment()
      .add(weekOfday - 7, 'days')
      .format('YYYY/MM/DD') //周日日期

    this.getAllClass()
    this.weekDate()
    this.todayClass()
    this.currentTime() //获取当前时间，年月周
  },
  methods: {
    getAllClass() {
      getAllClassList({ pageNum: 1, pageSize: 10, beginDate: '2020-01-11', endDate: '2020-01-18' }).then(res => {
        console.log(res.rows, 123)
        var arr = res.rows

        var arrt = []
        for (var i = 0; i < arr.length; i++) {
          var tempArr = [
            arr[i].fri.length,
            arr[i].mon.length,
            arr[i].sta.length,
            arr[i].sun.length,
            arr[i].thur.length,
            arr[i].tue.length,
            arr[i].wed.length
          ]
          var len = tempArr.sort().reverse()[0]
          for (var j = 0; j < len; j++) {
            var obj = {}
            obj.key = arr[i].key
            obj.classRoom = arr[i].key
            obj.ap = arr[i].ap
            obj.Fri = arr[i].fri[j] === undefined ? '' : arr[i].fri[j]
            obj.Mon = arr[i].mon[j] === undefined ? '' : arr[i].mon[j]
            obj.Sta = arr[i].sta[j] === undefined ? '' : arr[i].sta[j]
            obj.Sun = arr[i].sun[j] === undefined ? '' : arr[i].sun[j]
            obj.Thur = arr[i].thur[j] === undefined ? '' : arr[i].thur[j]
            obj.Tue = arr[i].tue[j] === undefined ? '' : arr[i].tue[j]
            obj.Wen = arr[i].wed[j] === undefined ? '' : arr[i].wed[j]
            arrt.push(obj)
          }
          this.data = arrt
          // console.log(arrt, '终极')
          // }
        }
      })
    },
    weekDate() {
      let weekOfDay = moment().format('E')
      this.lastMonday = moment()
        .subtract(weekOfDay - 1, 'days')
        .format('YYYY-MM-DD') //周一日期
      this.lastTuesday = moment()
        .subtract(weekOfDay - 2, 'days')
        .format('YYYY-MM-DD') //周二日期
      this.lastWednesday = moment()
        .subtract(weekOfDay - 3, 'days')
        .format('YYYY-MM-DD') //周三日期
      this.lastTursday = moment()
        .subtract(weekOfDay - 4, 'days')
        .format('YYYY-MM-DD') //周四日期
      this.lastFriday = moment()
        .subtract(weekOfDay - 5, 'days')
        .format('YYYY-MM-DD') //周五日期
      this.lastSaturday = moment()
        .subtract(weekOfDay - 6, 'days')
        .format('YYYY-MM-DD') //周六日期
      this.lastSunday = moment()
        .subtract(weekOfDay - 7, 'days')
        .format('YYYY-MM-DD') //周日日期
      this.columns[2].title = this.lastMonday + ' 星期一'
      this.columns[3].title = this.lastTuesday + ' 星期二'
      this.columns[4].title = this.lastWednesday + ' 星期三'
      this.columns[5].title = this.lastTursday + ' 星期四'
      this.columns[6].title = this.lastFriday + ' 星期五'
      this.columns[7].title = this.lastSaturday + ' 星期六'
      this.columns[8].title = this.lastSunday + ' 星期日'
    },
    todayClass() {
      var str = '日一二三四五六'.charAt(new Date().getDay()) // 把今天要上的课程标绿
      for (var i = 1; i < this.columns.length; i++) {
        var string = this.columns[i].title
        var reg = new RegExp(str)
        if (string.match(reg)) {
          this.columns[i].className = 'currentClass'
        }
      }
    },
    currentTime() {
      // console.log(moment().format('YYYY-MM-DD dddd'))
      this.dateValue = moment().format('YYYY-MM-DD dddd')
      // var date = new Date()
      // var seperator1 = '/'
      // var year = date.getFullYear()
      // var month = date.getMonth() + 1
      // var strDate = date.getDate()
      // if (month >= 1 && month <= 9) {
      //   month = '0' + month
      // }
      // if (strDate >= 0 && strDate <= 9) {
      //   strDate = '0' + strDate
      // }
      // var currentdate = year + seperator1 + month + seperator1 + strDate
      // this.timeFormat(currentdate)
    },
    moment,
    timeFormat(dateString) {
      var arrDate = []
      arrDate = dateString.split('/')
      var week = Number(arrDate[2])
      if (week / 7 <= 1) {
        arrDate[3] = 1
      } else if (week / 7 > 1 && week / 7 <= 2) {
        arrDate[3] = 2
      } else if (week / 7 > 2 && week / 7 <= 3) {
        arrDate[3] = 3
      } else if (week / 7 > 3 && week / 7 <= 4) {
        arrDate[3] = 4
      } else {
        arrDate[3] = 5
      }
      this.year = arrDate[0]
      this.month = arrDate[1]
      this.week = arrDate[3]
      this.dateValue = this.year + '年' + this.month + '月第' + this.week + '周'
    },
    weekAdd() {
      let lateDate = moment(this.dateValue, 'YYYY-MM-DD').format('YYYY-MM-DD')
      this.dateValue = moment(lateDate)
        .add('days', this.dateAdd)
        .format('YYYY-MM-DD dddd')
      let tempDate = moment(lateDate)
        .add('days', this.dateAdd)
        .format('YYYY-MM-DD')
      let weekDay = moment(tempDate, 'YYYY-MM-DD').format('E')
      this.lastMonday = moment(tempDate)
        .subtract(weekDay - 1, 'days')
        .format('YYYY-MM-DD') //周一日期
      this.lastSunday = moment(tempDate)
        .subtract(weekDay - 7, 'days')
        .format('YYYY-MM-DD') //周日日期
         this.getAllClass()
      // this.dateAdd=this.dateAdd+7
      // this.dateSub=7
      // this.week++
      // this.dateValue = this.year + '年' + this.month + '月第' + this.week + '周'
      // if (this.week > 5) {
      //   this.month++
      //   this.week = 1
      //   this.dateValue = this.year + '年' + this.month + '月第' + this.week + '周'
      // }
      // if (this.month > 12) {
      //   this.month = 1
      //   this.year++
      //   this.dateValue = this.year + '年' + this.month + '月第' + this.week + '周'
      // }
      // if (this.year % 4 != 0 || (this.year % 100 == 0 && this.year % 400 != 0)) {
      //   if (this.month == 2) {
      //     if (this.week > 4) {
      //       this.month++
      //       this.week = 1
      //     }
      //   }
      // }
      // this.dateValue = this.year + '年' + this.month + '月第' + this.week + '周'
    },
    weekDecrease() {
      let beforeDate = moment(this.dateValue, 'YYYY-MM-DD').format('YYYY-MM-DD')
      console.log(beforeDate, 123)
      this.dateValue = moment(beforeDate)
        .subtract('days', this.dateSub)
        .format('YYYY-MM-DD dddd')
      console.log(this.dateValue, 111)
      let tempDate = moment()
        .subtract('days', this.dateSub)
        .format('YYYY-MM-DD')
      let weekDay = moment(tempDate, 'YYYY-MM-DD').format('E')
      this.lastMonday = moment(tempDate)
        .subtract(weekDay - 1, 'days')
        .format('YYYY-MM-DD') //周一日期
      this.lastSunday = moment(tempDate)
        .subtract(weekDay - 7, 'days')
        .format('YYYY-MM-DD') //周日日期
         this.getAllClass()
      // this.dateSub=this.dateSub+7
      // this.dateAdd=7
      // this.week--
      // this.dateValue = this.year + '年' + this.month + '月第' + this.week + '周'
      // if (this.week < 1) {
      //   this.month--
      //   this.week = 5
      //   this.dateValue = this.year + '年' + this.month + '月第' + this.week + '周'
      // }
      // if (this.month < 1) {
      //   this.month = 12
      //   this.year--
      //   this.dateValue = this.year + '年' + this.month + '月第' + this.week + '周'
      // }
      // if (this.year % 4 != 0 || (this.year % 100 == 0 && this.year % 400 != 0)) {
      //   if (this.month == 2 && this.week == 5) {
      //     this.week = 4
      //   }
      // }
      // this.dateValue = this.year + '年' + this.month + '月第' + this.week + '周'
    },
    onChange() {},
    handleSubmit() {}
  }
}
</script>

<style lang="less" scoped>
@import './antTableStyle/table.less';
.mainContainer {
  user-select: none;
  margin-bottom: 24px;
  .serach_input {
    height: 32px;
  }
  .choose_date_box {
    height: 32px;
    width: 100%;
    border: 1px solid #ccc;
    display: flex;
    margin-top: 4px;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    .iconBoxLeft {
      text-align: center;
      width: 30px;
      border-right: 1px solid #ccc;
    }
    .iconBoxRight {
      text-align: center;
      width: 30px;
      border-left: 1px solid #ccc;
    }
    :nth-child(2) {
      border: none;
      outline: none;
      background-color: rgba(0, 0, 0, 0);
    }
    .input_box {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 12px;
    }
  }
  .currentWeek {
    width: 50px;
    height: 32px;
    margin-top: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: rgba(76, 166, 255, 1);
    border: 1px solid rgba(76, 166, 255, 1);
    cursor: pointer;
  }
  .className {
    font-size: 14px;
  }
  .table_for_class {
    margin-top: 20px;
  }
  .stamp {
    width: 52px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: rgba(76, 166, 255, 1);
    border: 1px solid rgba(76, 166, 255, 1);
    cursor: pointer;
    float: right;
  }
  .classDetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 12px;
    align-items: center;
  }
}
</style>
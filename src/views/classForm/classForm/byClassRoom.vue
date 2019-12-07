<template>
  <div class="mainContainer">
    <a-row>
      <a-col :span="20">
        <div class="classContainer">
          <span v-for="(item,index) in firstFiveClass" :key="index">{{item}}</span>
          <span @click="classShowOrHide" style="textDecoration:underline">>>查看更多</span>
          <div v-show="classShow">
            <span v-for="(item,index) in otherClass" :key="index">{{item}}</span>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="5">
        <a-date-picker @change="onChange" />
      </a-col>
      <a-col :span="2">
        <a-button type="primary">查询</a-button>
      </a-col>
      <a-col :span="2">
        <a-button type="danger">重置</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" class="className">{{className}}</a-col>
      <div class="stamp">打印</div>
    </a-row>
    <a-row>
      <a-table bordered :dataSource="dataSource" :columns="columns">
        <template slot="className" slot-scope="text, record">
          <a>{{record.className}}</a>
        </template>
        <template slot="classTimes" slot-scope="text, record">
          <a>{{record.classTimes}}</a>
        </template>
        <template slot="absence" slot-scope="text, record">
          <a>{{record.absence}}</a>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">操作</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'
import { getClassListByClassroom } from '@/api/class'
export default {
  name: 'ByName',
  data() {
    return {
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
      dateValue: '',
      classShow: false,
      year: Number,
      month: Number,
      week: Number,
      firstFiveClass: ['101教室', '102教室', '103教室', '104教室', '105教室'],
      otherClass: [
        '101教室',
        '102教室',
        '103教室',
        '104教室',
        '101教室',
        '102教室',
        '103教室',
        '104教室',
        '101教室',
        '102教室',
        '103教室',
        '104教室',
        '101教室',
        '102教室',
        '103教室',
        '104教室'
      ],
      className: '"2020春季五年级数学素养班01班（2019/11/12-2020/02/03）"的课表',
      dataSource: [
        {
          key: '0',
          classroomName: '101教室',
          className: '2020春季五年级数学素养班01班',
          classTimes: '第一讲',
          classTeacher: '西门吹牛',
          classTime: '2019/11/11 12:00-15:00',
          absence: '0/10'
        },
        {
          key: '0',
          classroomName: '101教室',
          className: '2020春季五年级数学素养班01班',
          classTimes: '第一讲',
          classTeacher: '西门吹牛',
          classTime: '2019/11/11 12:00-15:00',
          absence: '0/10'
        }
      ],
      count: 2,
      columns: [
        {
          title: '教室名称',
          dataIndex: 'classroomName',
          width: '10%'
        },
        {
          title: '班级名称',
          width: '23%',
          dataIndex: 'className',
          scopedSlots: { customRender: 'className' }
        },
        {
          title: '课次',
          dataIndex: 'classTimes',
          scopedSlots: { customRender: 'classTimes' }
        },
        {
          title: '上课老师',
          dataIndex: 'classTeacher'
        },
        {
          title: '上课时间',
          width: '20%',
          dataIndex: 'classTime'
        },
        {
          title: '实到人数',
          dataIndex: 'absence',
          scopedSlots: { customRender: 'absence' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
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
    // this.classListByClassroom()
  },
  methods: {
    classShowOrHide() {
      this.classShow = !this.classShow
    },
    classListByClassroom() {
      getClassListByClassroom({
        pageNum: 1,
        pageSize: 10,
        beginDate: this.beginDate,
        endDate: this.endDate,
        classroomId: '101'
      }).then(res => {
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
  .classContainer {
    padding: 12px 12px 12px 0px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 12px;
    span {
      padding: 20px 20px 20px 0px;
      display: inline-block;
      color: #4ca6ff;
    }
  }
  .serach_input {
    height: 32px;
  }
  .className {
    font-size: 14px;
    padding: 12px 0 12px 0;
  }
  .table_for_class {
    margin-top: 20px;
    position: relative;
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
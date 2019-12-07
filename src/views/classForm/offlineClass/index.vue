<template>
  <div class="mainContent">
    <a-row :gutter="24">
      <a-col :span="4" v-for="(item,index) in classList" :key="index">
        <div
          :class="[{'showBottom':activeIndex==index},'class_for_offline']"
          @click="showBottomStyle(index)"
        >
          <span>
            <span class="active">{{item.title}}</span>
            <div v-if="activeIndex==index ? true:false" class="activeStyle">
              <div v-show="activeIndex==0 ? false:true"></div>
              <div></div>
            </div>
          </span>
          <div
            class="leftTop_tag"
            :style="{background: item.ifOnline=='待上架' ? '#F5B431':'#5CCBB1'}"
          >{{item.ifOnline}}</div>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <div
          class="table_for_classForm"
          :style="{borderRadius: activeIndex==0 ? '0 8px 8px 8px':'8px'}"
        >
          <div>
            <div class="hasChoosed">
              <div class="border"></div>
              <div>
                <span>课程有效期：</span>
                <span style="color:#4CA6FF">{{invalidTime}}</span>
              </div>
              <div>
                <span>课程状态：</span>
                <span style="color:#5CCBB1">{{status}}</span>
              </div>
              <div>
                <span>授权校区：</span>
                <span>{{campus}}</span>
              </div>
            </div>
            <a-row>
              <a-col :span="12">
                <div>
                  <a-table :pagination="false" :columns="columnSec" :dataSource="dataSec"></a-table>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <div class="classDetail">
                  <a-row>
                    <a-col class="class_detail_aCol">
                      <div>
                        <span>计划开课时间：</span>
                        <span>{{classStartTimeForplan}}</span>
                      </div>
                      <div>
                        <span>计划节课时间：</span>
                        <span>{{classEndTimeForplan}}</span>
                      </div>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col class="class_detail_aCol">
                      <div>
                        <span>必修课次：</span>
                        <span>{{necessaryClass}}</span>
                      </div>
                      <div>
                        <span>周课次：</span>
                        <span>{{classInWeek}}</span>
                      </div>
                      <div>
                        <span>课程时长：</span>
                        <span>{{singleClassTime}}</span>
                      </div>
                      <div>
                        <span>课次单价：</span>
                        <span>{{singleClass}}</span>
                      </div>
                    </a-col>
                  </a-row>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col class="classPrice">
                <div>
                  <span>课程价：</span>
                  <span>{{classPrice}}元（不含教材费）</span>
                </div>
                <div>
                  <span>教材费：</span>
                  <span>{{booksPrice}}元</span>
                </div>
                <div>
                  <span>教材：</span>
                  <span>{{booksFrom}}</span>
                </div>
              </a-col>
            </a-row>
          </div>
          <a-button type="primary" style="marginBottom:20px;" @click="showModal">新增</a-button>
          <span class="product">产品已开班级{{classNum}}个</span>
          <div id="components-table-demo-size">
            <a-table :columns="columns" :dataSource="data">
              <template
                v-for="col in ['name', 'age', 'address']"
                :slot="col"
                slot-scope="text, record"
              >
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
              <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <span>
                    <a @click="() => edit(record.key)">编辑</a>
                  </span>
                  <span>
                    <a @click="() => edit(record.key)">上架</a>
                  </span>
                  <span>
                    <a @click="() => edit(record.key)">删除</a>
                  </span>
                </div>
              </template>
            </a-table>
          </div>
          <Modal :val="flag" @childMsg="getMsgFromSon" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Modal from './modules/modal'
import { getClassList } from '@/api/class'
import { METHODS } from 'http'
const columns = [
  {
    title: '班级名称',
    dataIndex: 'className',
    width: '15%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '班级编号',
    dataIndex: 'classNo',
    width: '8%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: '分校',
    dataIndex: 'campusName',
    width: '8%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: '班级类型',
    dataIndex: 'metadataName',
    width: '6%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: '上课时期',
    dataIndex: 'classTime',
    width: '10%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: '上课时段',
    dataIndex: 'classTimes',
    width: '8%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '上课老师',
    dataIndex: 'teacherName',
    width: '6%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '必修课次',
    dataIndex: 'classNum',
    width: '6%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '排课状态',
    dataIndex: 'scheduleCourse',
    width: '6%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '已报学',
    dataIndex: 'buyNum',
    width: '6%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '班级状态',
    dataIndex: 'status',
    width: '6%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '购买状态',
    dataIndex: 'isBuy',
    width: '6%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
const columnSec = [
  {
    title: '课程ID',
    dataIndex: 'classId',
    width: '6%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '课程名称',
    dataIndex: 'className',
    width: '17%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: '课程类型',
    dataIndex: 'classType',
    width: '8%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: '学期',
    dataIndex: 'term',
    width: '7%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: '年级',
    dataIndex: 'grades',
    width: '7%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: '科目',
    dataIndex: 'subject',
    width: '7%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '层次',
    dataIndex: 'level',
    width: '6%',
    scopedSlots: { customRender: 'address' }
  }
]
const dataSec = [
  {
    classId: 'C20190605423158',
    className: '2019秋季六年级数学荣耀班',
    classType: '常规班',
    term: '2019秋季',
    grades: '六年级',
    subject: '数学',
    level: '荣耀'
  }
]
const data = []
export default {
  components: {
    Modal
  },
  data() {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      classList: [
        {
          title: '2019秋季六年级数学荣耀班',
          ifOnline: '已上架'
        },
        {
          title: '2019秋季六年级数学荣耀班',
          ifOnline: '已上架'
        },
        {
          title: '2019秋季六年级数学荣耀班',
          ifOnline: '待上架'
        },
        {
          title: '2019秋季六年级数学荣耀班',
          ifOnline: '待上架'
        },
        {
          title: '2019秋季六年级数学荣耀班',
          ifOnline: '待上架'
        }
      ],
      classNum: data.length,
      data,
      columns,
      dataSec,
      columnSec,
      classInWeek: '2次',
      flag: false,
      classPrice: '3000',
      booksPrice: '100',
      booksFrom: '邦德荣耀班自编教材',
      necessaryClass: '15次',
      singleClassTime: '2小时/次',
      singleClass: '200/小时',
      classStartTimeForplan: '2019-02-03',
      classEndTimeForplan: '2019-03-09',
      activeIndex: 1,
      invalidterm: '2019-10-12至2019-11-08',
      status: '正常',
      campus: '所有'
    }
  },
  created: function() {
    getClassList({ pageNum: 1, pageSize: 10 }).then(res => {
      console.log(res)
      var arr = res.rows
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.key = arr[i].id
        obj.campusName = arr[i].campusName
        obj.metadataName = arr[i].metadataName
        obj.classNo = arr[i].classNo
        obj.className = arr[i].className
        obj.classTime = arr[i].classBeginTime + '-' + arr[i].classEndTime
        obj.classTimes = arr[i].classTimes.join(' ')
        obj.teacherName = arr[i].teacherName
        obj.classNum = arr[i].classNum
        obj.scheduleCourse = arr[i].scheduleCourse == true ? '已排课' : '待排'
        switch (arr[i].status) {
          case 1:
            obj.status = '正常'
            break
          case 2:
            obj.status = '已结束'
            break
          case 3:
            obj.status = '已满班'
            break
          case 4:
            obj.status = '已下架'
            break
          case 5:
            obj.status = '待上架'
            break
        }
        if (arr[i].planSellNum !== 0) {
          obj.buyNum = arr[i].buyNum + '/' + arr[i].planSellNum
        } else {
          obj.buyNum = '不限'
        }
        obj.isBuy = arr[i].isBuy == true ? '已购买' : '未购买'
        this.data.push(obj)
      }
    })
  },
  methods: {
    showBottomStyle(index) {
      this.activeIndex = index
    },
    showModal() {
      this.flag = !this.flag
    },
    getMsgFromSon(val) {
      this.flag = val
    },
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit(key) {
      // const newData = [...this.data];
      // const target = newData.filter(item => key === item.key)[0];
      // if (target) {
      //   target.editable = true;
      //   this.data = newData;
      // }
    },
    save(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './changeAntd.less';
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
.mainContent {
  margin: -24px;
}
.class_for_offline {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 12px;
  padding: 15px;
  position: relative;
  cursor: pointer;
  .leftTop_tag {
    position: absolute;
    top: 0;
    left: 0;
    width: 46px;
    height: 18px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background: rgba(92, 203, 177, 1);
    border-radius: 8px 0px 8px 0px;
  }
}
.showBottom {
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 12px;
  padding: 15px;
  position: relative;
}
.table_for_classForm {
  margin-top: 10px;
  background: white;
  width: 100%;
  border-radius: 8px;
  padding: 20px;
  .product {
    margin-left: 20px;
  }
  .table_style {
    color: #666;
  }
}
.activeStyle {
  width: 100%;
  padding: 0 16px;
  z-index: 4;
  height: 10px;
  background: white;
  position: absolute;
  top: 60px;
  left: 0px;
  :nth-child(1) {
    width: 0;
    height: 0;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    border-left: 2px solid transparent;
    border-top: 2px solid transparent;
    position: absolute;
    left: -4px;
    top: 6px;
  }
  :nth-child(2) {
    width: 0;
    height: 0;
    border-bottom: 2px solid white;
    border-right: 2px solid transparent;
    border-left: 2px solid white;
    border-top: 2px solid transparent;
    position: absolute;
    left: 100%;
    top: 6px;
  }
}
.hasChoosed {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 12px;
  div {
    margin-right: 30px;
  }
  .border {
    width: 6px;
    margin-right: 10px;
    height: 18px;
    background: rgba(76, 166, 255, 1);
    border-radius: 4px;
  }
}
.classDetail {
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 12px 12px 0 12px;
  background: #eff7ff;
  .class_detail_aCol {
    display: flex;
    margin-bottom: 12px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
    div {
      margin-left: 40px;
    }
    div:nth-of-type(1) {
      margin-left: 0;
    }
  }
}
.classPrice {
  padding: 12px 12px 19px 12px;
  display: flex;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 12px;
  div:nth-of-type(1) {
    margin-left: 0;
  }
  div {
    margin-left: 20px;
  }
}
.active {
  position: relative;
  line-height: 16px;
}
</style>
<template>
  <div>
    <a-modal
      title="新增班级"
      :visible="val"
      :centered="true"
      style="top:-150px"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      cancelText="保存"
      okText="保存并上架"
      width="820px"
    >
      <p>
        <a-form @submit="handleOk" :form="form">
          <a-row>
            <a-col :span="14">
              <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="班级名称"
              >
                <a-input
                  v-decorator="[
                                    'className',
                                    {required: true,  rules: [{ message: '请输入班级名称' }] },
                                ]"
                  placeholder="请输入班级名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="预招人数"
              >
                <a-input
                  v-decorator="[
                            'studentNum',
                            {required: true,  rules: [{ message: '请输入预招人数' }] },
                        ]"
                  placeholder="输入0表示人数不限"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="9">
              <a-form-item>
                <span style="color:black">班主任：</span>
                <a-select defaultValue="刘德华" style="width: 120px" @change="classTeacherHandleChange">
                  <a-select-option v-for="(item,index) in classTeacherList" :key="index" :value="item">{{item}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <span style="color:black">任课老师：</span>
              <a-select defaultValue="刘德华" style="width: 120px" @change="teacherHandleChange">
                <a-select-option v-for="(item,index) in teacherList" :key="index" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="6">
              <span class="search_teacher_class">查看老师课表></span>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="3">
              <div style="color:black">上课时段&nbsp;:</div>
            </a-col>
            <a-col :span="21">
              <div id="components-table-demo-size">
                <a-table :pagination="false" :columns="columns" :dataSource="data">
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
                  <template slot="week" slot-scope="">
                    <div class="editable-row-operations">
                      <a-select defaultValue="星期一" style="width: 80px" @change="weekHandleChange">
                        <a-select-option v-for="(item,index) in weekList" :key="index" :value="item">{{item}}</a-select-option>
                      </a-select>
                    </div>
                  </template>
                  <template slot="startTime" slot-scope="">
                    <div class="editable-row-operations">
                     <a-select
                      showSearch
                      placeholder="请选择或输入时间"
                      optionFilterProp="children"
                      style="width: 100%"
                      @focus="handleFocus"
                      @blur="handleBlurSec"
                      @change="startTimeHandleChange"
                      :filterOption="filterOption"
                     >
                    <a-select-option v-for="(item,index) in startTimeList" :key="index" :value="item">{{item}}</a-select-option>
                  </a-select>
                  </div>
                  </template>
                  <template slot="endTime" slot-scope="">
                    <div class="editable-row-operations">
                     <a-input style="width:70px" :defaultValue="endTime" :value="endTime"  disabled="true"/>
                    </div>
                  </template>
                  <template slot="classRoom" slot-scope="">
                    <div class="editable-row-operations">
                       <a-select
                      showSearch
                      placeholder="请输入"
                      optionFilterProp="children"
                      style="width: 100%"
                      @focus="handleFocus"
                      @blur="handleBlurClassRoom"
                      @change="classNumHandleChange"
                      :filterOption="filterOption"
                     >
                    <a-select-option v-for="(item,index) in classNumList" :key="index" :value="item">{{item}}</a-select-option>
                  </a-select>
                    </div>
                  </template>
                  <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-operations">
                      <span>
                        <div @click="() => edit(record.key)" class="addInTable">新增</div>
                      </span>
                    </div>
                  </template>
                </a-table>
                <a-table :showHeader="false"  :dataSource="dataSource" :columns="columnsCol">
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="确定要删除吗?"
          @confirm="() => onDelete(record.key)"
        >
          <div style="border:red 1px solid;color:red; cursor:pointer" class="addInTable">删除</div>
        </a-popconfirm>
      </template>
    </a-table>
              </div>
            </a-col>
          </a-row>
        </a-form>
      </p>
      <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
    </a-modal>
  </div>
</template>

<script>
const plainOptions = ['检查排课冲突', '跳过节假日']
const defaultCheckedList = ['检查排课冲突', '跳过节假日']
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}
const columns = [
  {
    title: '星期',
    dataIndex: '星期',
    width: '2%',
    scopedSlots: { customRender: 'week' }
  },
  {
    title: '开始时间',
    dataIndex: '开始时间',
    width: '18%',
    scopedSlots: { customRender: 'startTime' }
  },
  {
    title: '上课时长',
    dataIndex: '上课时长',
    width: '8%',
    scopedSlots: { customRender: '' }
  },
  {
    title: '结束时间',
    dataIndex: '结束时间',
    width: '6%',
    scopedSlots: { customRender: 'endTime' }
  },
  {
    title: '教室',
    dataIndex: '教室',
    width: '10%',
    scopedSlots: { customRender: 'classRoom' }
  },
  {
    title: '操作',
    dataIndex: '操作',
    width: '8%',
    scopedSlots: { customRender: 'operation' }
  }
]
 
const data = []
for (let i = 0; i < 1; i++) {
  data.push({
    key: i.toString(),
    上课时长: `2h`
  })
}
export default {
  name: 'Modal',
  props: {
    val: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      dataSource: [],
        count: 2,
        columnsCol: [
          {
            dataIndex: 'week',
            width: '17%',
          },
          {
            dataIndex: 'startTime',
            width: '25%',
          },
          {
            dataIndex: 'classTime',
            width: '15%',
          },
          
          {
            dataIndex: 'endTime',
            width: '15%',
          },
          {
            dataIndex: 'classNum',
            width: '15%',
          },
          {
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ],
      ModalText: 'Content of the modal',
      formItemLayout,
      //   visible: false,
      confirmLoading: false,
      data,
      columns,
      plainOptions,
      jumpHoliday:true,
      checkClash:true,
      checkedList: defaultCheckedList,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      teacher: '刘德华',
      classTeacher: '刘德华',
      startTime: '',
      endTime: '10:00',
      classNum: '',
      week: '星期一',
      count:"0",
      //array
      teacherList: ['刘德华','吴彦祖','彭于晏','李诞'],
      classTeacherList: ['刘德华','吴彦祖','彭于晏','李诞'],
      startTimeList: ['08:00','10:00','14:00','16:00'],
      endTimeList:['10:00','12:00','16:00','18:00'],
      classNumList: ['101','102','103','104'],
      weekList: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日',],
      classBsidevocation: ['检查排课冲突', '跳过节假日']
    }
  },
  methods: {
     onDelete(key) {
        const dataSource = [...this.dataSource];
        this.dataSource = dataSource.filter(item => item.key !== key);
      },
    handleBlurSec(value){
      console.log(value,13)
        this.endTime=Number(value.split(":")[0])+2+":"+"00"
    },
    teacherHandleChange(values) {
      this.teacher = values
    },
    classTeacherHandleChange(values) {
      this.classTeacher = values
    },
    startTimeHandleChange(values) {
      this.startTime = values
    },
    endTimeHandleChange(values) {
      this.endTime = values
    },
    classNumHandleChange(values) {
      this.classNum = values
    },
    weekHandleChange(values) {
      this.week = values
    },
    handleSubmit() {},
    onChange(checkedList) {
      this.classBsidevocation = checkedList
       if(checkedList.length==2){this.jumpHoliday=true;this.checkClash=true;return;}else{
          if(checkedList[0]=="检查排课冲突"){
            this.jumpHoliday=false;
            this.checkClash=true;
          }else{
            this.jumpHoliday=true;
            this.checkClash=false;
          }
       }
    },
    handleOk(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          values.teacher = this.teacher
          values.classTeacher = this.classTeacher
          values.startTime = this.startTime
          values.endTime = this.endTime
          values.classNum = this.classNum
          values.week = this.week
          values.jumpHoliday=this.jumpHoliday;
          values.checkClash=this.checkClash;
          values.isShelves=false;
          console.log('Received values of form: ', values)
        }
        this.form.resetFields()
      })
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.val = false
        this.confirmLoading = false
        this.$emit('childMsg', this.val)
      }, 2000)
    },
    handleCancel(e) {
      this.val = false
      this.$emit('childMsg', this.val)
    },
    filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
    edit() {
      var obj={}
      if(this.startTime==""|this.classNum=="")return;
      ++this.count;
      obj.key=this.count;
      obj.week=this.week;
      obj.startTime=this.startTime;
      obj.endTime=this.endTime;
      obj.classTime="2h"
      obj.classNum=this.classNum
      if(this.dataSource!=[]){
        for(var i=0;i<this.dataSource.length;i++){
          if(this.dataSource[i].week==obj.week&&this.dataSource[i].startTime==obj.startTime){return;}
        }
      }
      this.dataSource.push(obj)
    }
  }
}
</script>

<style lang="less" scoped>
@import './modal.less';
.search_teacher_class {
  font-size: 12px;
  line-height: 30px;
  margin-left: 10px;
  text-decoration: underline;
}
.addInTable {
  width: 40px;
  height: 24px;
  font-size: 12px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(76, 166, 255, 1);
  margin-right: 16px;
  border: 1px solid rgba(76, 166, 255, 1);
  cursor:pointer;
}
.editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
</style>
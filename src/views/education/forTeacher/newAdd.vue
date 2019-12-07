<template>
  <div class="forTeacher-newAdd-container">
    <a-form @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="教师姓名"
          >
            <a-input
              class="input_box"
              v-model="teacherName"
              @change="getTeacherName"
              v-decorator="[
          'teacherName',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <span>类型：</span>
          <a-select
            class="input_box"
            defaultValue="教师类"
            style="width: 120px"
            @change="handleTypeChange"
          >
            <a-icon style="color:black" slot="suffixIcon" type="caret-down" />
            <a-select-option value="教师类">教师类</a-select-option>
            <a-select-option value="教职类">教职类</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="rowStyle">
        <a-col :span="12">
          <div class="space_between">
            教师工号：
            <span>{{teacherId}}</span>
          </div>
        </a-col>
        <a-col :span="12">
          <span>性别：</span>
          <a-select
            class="input_box"
            defaultValue="男"
            style="width: 120px"
            @change="handleSexChange"
          >
            <a-icon style="color:black" slot="suffixIcon" type="caret-down" />
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="入职时间"
          >
            <a-input
              class="input_box"
              @change="getStartTime"
              v-model="startTime"
              v-decorator="[
          'workTime',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <div class="chooseCampus">
            所属校区：
            <!-- <a-textarea
              :value="campus"
              v-model="campus"
              style="width:300px;"
              placeholder="请输入或选择校区"
              :autosize="{ minRows: 1, maxRows: 5 }"
            />-->
            <a-select
              mode="tags"
              :size="size"
              placeholder="请选择"
              style="width:450px;"
              :value="campus"
              v-model="campus"
              class="belongsCampus"
              @change="handleCampusChange"
            >
              <a-select-option
                v-for="i in 1"
                :key="(i + 9).toString(36) + i"
              >{{(i + 9).toString(36) + i}}</a-select-option>
            </a-select>
            <span class="chooseBtn">
              <a-button type="primary" @click="chooseCampus">请选择</a-button>
            </span>
            <div>
              <a-modal title="选择校区" @cancel="handleCancel" v-model="visible" @ok="handleOk">
                <a-input-search
                  style="width:300px;marginLeft:50px;"
                  size="middle"
                  placeholder="输入校区查询"
                  @search="onSearch"
                  enterButton="查找"
                />
                <p>
                  <a-table
                    :width="600"
                    :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                    :columns="columns"
                    :dataSource="data"
                  />
                </p>
              </a-modal>
            </div>
          </div>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item 
            class="chooseBox"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="所属校区"
          >
            <a-input-search
              v-decorator="[
          'campus',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
              @search="onSearch"
              size="middle"
            >
              <a-button slot="enterButton">请选择</a-button>
            </a-input-search>
          
          </a-form-item>
             <a-checkbox @change="chooseAll" value="不限" class="chooseShool">不限</a-checkbox>
        </a-col>-->
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="联系电话"
          >
            <a-input
              class="input_box"
              @change="getContact"
              v-model="contact"
              v-decorator="[
          'contact',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div>
      <a-row :gutter="24" class="rowStyle">
        <a-col :span="12">
          <div class="space_between">
            在职状态：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a-radio-group @change="onStatusChange" v-model="value">
              <a-radio value="在职">在职</a-radio>
              <a-radio value="离职">离职</a-radio>
            </a-radio-group>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="12" class="rowStyle">
        <a-col :span="24">
          <div class="space_between">
            授课年级：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a-checkbox-group @change="onGradeChange">
              <a-row>
                <div>&nbsp;</div>
                <a-col :span="3">
                  <a-checkbox value="一年级">一年级</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="二年级">二年级</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="三年级">三年级</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="四年级">四年级</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="五年级">五年级</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="六年级">六年级</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="七年级">七年级</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="八年级">八年级</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="九年级">九年级</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="高一">高一</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="高二">高二</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="高三">高三</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="12" class="rowStyle">
        <a-col :span="24">
          <div class="space_between">
            授课科目：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a-checkbox-group @change="onSubjectChange">
              <a-row :gutter="12">
                <div>&nbsp;</div>
                <a-col :span="3">
                  <a-checkbox value="语文">语文</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="数学">数学</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="英语">英语</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="物理">物理</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="化学">化学</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="生物">生物</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="政治">政治</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="历史">历史</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="地理">地理</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="科学">科学</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="绘画">绘画</a-checkbox>
                </a-col>
                <a-col :span="3">
                  <a-checkbox value="美术">美术</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="12" class="rowStyle">
        <a-col :span="3">
          <div class="space_between">不可用时间：</div>
        </a-col>
        <a-col :span="15">
          <DisTime />
          <!-- <div class="addTime">添加不可用时间</div> -->
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import DisTime from './disableedTime.vue'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
}
const columns = [
  {
    title: '全部',
    dataIndex: 'name'
  }
]

const data = []
for (let i = 0; i < 45; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`
  })
}
export default {
  components: {
    DisTime
  },
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [],
      formItemLayout,
      formTailLayout,
      visible: false,
      teacherId: '25467982',
      value: '1',
      teacherName: '莱昂纳多迪卡普里奥',
      teacherType: '',
      teacherOfSex: '',
      startTime: '',
      contact: '',
      status: '',
      gradeList: [],
      subjectList: [],
      campus: []
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    handleCampusChange(value) {
      this.campus = value
    },
    chooseCampus() {
      this.visible = !this.visible
    },
    onSelectChange(selectedRowKeys) {
      var campusList = []
      for (var i = 0; i < selectedRowKeys.length; i++) {
        campusList.push(this.data[selectedRowKeys[i]].name )
      }
      this.campus = campusList
      this.selectedRowKeys = selectedRowKeys
    },

    showModal() {
      this.visible = true
    },
    onSearch(value) {
      var reg = new RegExp(value)
      // var arr=this.data;
      for (var i = 0; i < this.data.length; i++) {
        if (reg.test(this.data[i].name)) {
          console.log(this.selectedRowKeys)
          // this.selectedRowKeys.forEach((item)=>{if(item==i){}else{this.selectedRowKeys.push(i)}})
          this.selectedRowKeys.push(i)
          this.data.splice(0, 0, this.data[i])
          this.data.splice(i + 1, 1)

          break
        }
      }
    },
    handleOk(e) {
      e.preventDefault()
      var campusList = []
      for (var j = 0; j < this.selectedRowKeys.length; j++) {
        campusList.push(this.data[this.selectedRowKeys[j]].name)
      }
      this.campus = campusList
      console.log(this.campus,"这是campus的数据")
      this.visible = false
    },
    handleCancel() {
      this.visible = false
    },
    handleSubmit() {},
    getContact(e) {
      setTimeout(() => {
        this.contact = e.target.value
      }, 500)
    },
    getStartTime(e) {
      setTimeout(() => {
        this.startTime = e.target.value
      }, 500)
    },
    handleTypeChange(value) {
      this.teacherType = value
    },
    handleSexChange(value) {
      this.teacherOfSex = value
    },
    getTeacherName(e) {
      setTimeout(() => {
        this.teacherName = e.target.value
      }, 500)
    },
    onStatusChange(e) {
      this.status = e.target.value
    },
    onGradeChange(checkedValues) {
      this.gradeList = checkedValues
    },
    onSubjectChange(checkedValue) {
      this.subjectList = checkedValue
    },
    chooseAll(e) {
      console.log(`checked = ${e.target.value}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import './forTeacher.less';
.forTeacher-newAdd-container {
  background: white;
  padding: 20px;
  padding-left: 60px;
  margin: -24px;
  border-radius: 8px;
  .chooseBox {
    display: flex;
    position: relative;
  }
  .chooseShool {
    position: absolute;
    top: 10px;
    left: 55%;
  }
  .rowStyle {
    margin-bottom: 15px;
  }
  span {
    color: rgba(0, 0, 0, 0.85);
    margin-right: 32px;
  }
  .space_between {
    margin-top: 6px;
    color: rgba(0, 0, 0, 0.85);
    span {
      margin-left: 8%;
    }
  }
  .addTime {
    margin-top: -44px;
    color: red;
    font-size: 16px;
    cursor: pointer;
  }
  .chooseCampus {
    display: flex;
    align-items: center;
  }
  .belongsCampus {
    // border: 1px solid #ccc;
    // display: inline-block;
    width: 300px;
    // font-size: 14px;
    // padding: 6px;
    // margin-right: 10px;
    max-height: 140px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .chooseBtn {
    margin-left: 10px;
    margin-top: -5px;
    display: inline-block;
  }
}
</style>
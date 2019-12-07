<template>
  <div class="classTimesContainer">
    <div class="headName">课次学员管理</div>
    <hr style="border:1px solid #f5f5f5" />
    <div class="hasChoosed">
      <div class="border"></div>
      <span>学员列表</span>
    </div>
    <a-row>
      <a-col :span="24">
        <a-row class="aRow">
          <a-col :span="7">
            <span>名称：</span>
            <span>2020春季五年级数学素养班01班&nbsp;&nbsp;&nbsp;&nbsp;第一讲</span>
          </a-col>
          <a-col :span="6">
            <span>时间：</span>
            <span>2019/10/15 13:00-15:00</span>
          </a-col>
          <a-col :span="2">
            <span>
              <a-button @click="addStu" type="primary">添加学员</a-button>
            </span>
          </a-col>
          <a-col :span="2">
            <span>
              <a-button @click="removeStu" type="primary">移除</a-button>
            </span>
          </a-col>
          <a-col :span="2">
            <span style="marginLeft:-23px;">
              <a-button @click="moveOutStu" type="primary">调出</a-button>
            </span>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div>
      <a-row>
        <a-col :span="14">
          <a-table
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :columns="columnsSec"
            :dataSource="dataSec"
          >
            <template slot="absence" slot-scope>
              <a-checkbox @change="onChange"></a-checkbox>
            </template>
            <template slot="notInClass" slot-scope>
              <a-checkbox @change="onChange"></a-checkbox>
            </template>
            <template slot="countPay" slot-scope>
              <a-checkbox @change="onChange"></a-checkbox>
            </template>
          </a-table>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-row>
            <a-col :span="24">
              <a-row class="aRowBottom">
                <a-col :span="2">
                  <span>总人数：</span>
                  <span>58人</span>
                </a-col>
                <a-col :span="2">
                  <span>出席：</span>
                  <span style="color:#4CA6FF">28人</span>
                </a-col>
                <a-col :span="2">
                  <span>试听：</span>
                  <span>2人</span>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <div>
      <Add :addVisible="addVisible" @showAddModal="addModal" />
      <Remove :removeVisible="removeVisible" @showRemoveModal="removeModal" />
      <MoveOut :moveOutVisible="moveOutVisible" @showMoveOutModal="moveOutModal" />
    </div>
  </div>
</template>

<script>
import Add from './components/add.vue'
import MoveOut from './components/moveOut.vue'
import Remove from './components/remove.vue'
const columnsSec = [
  {
    title: '学员编号',
    width: '25%',
    dataIndex: 'studentId'
  },
  {
    title: '学员姓名',
    width: '28%',
    dataIndex: 'studentName'
  },
  {
    title: '出席',
    width: '16%',
    dataIndex: 'absence',
    scopedSlots: { customRender: 'absence' }
  },
  {
    title: '缺席',
    width: '16%',
    dataIndex: 'notInClass',
    scopedSlots: { customRender: 'notInClass' }
  },
  {
    title: '计费',
    width: '16%',
    dataIndex: 'countPay',
    scopedSlots: { customRender: 'countPay' }
  }
]
const dataSec = []
for (let i = 0; i < 6; i++) {
  dataSec.push({
    key: i,
    studentId: `C20191015235698`,
    studentName: '西米牛奶'
  })
}
export default {
    components:{
        Add,
        MoveOut,
        Remove
    },
  data() {
    return {
      dataSec,
      columnsSec,
      selectedRowKeys: [],
      addVisible: false,
      removeVisible: false,
      moveOutVisible: false
    }
  },
  methods: {
    addModal(value) {
      this.addVisible = value
    },
    removeModal(value) {
      this.removeVisible = value
    },
    moveOutModal(value) {
      this.moveOutVisible = value
    },
    addStu() {
      this.addVisible = !this.addVisible
    },
    removeStu() {
      this.removeVisible = !this.removeVisible
    },
    moveOutStu() {
      this.moveOutVisible = !this.moveOutVisible
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style lang="less" scoped>
@import './antTable.less';
.classTimesContainer {
  border-radius: 8px;
  margin: -24px;
  background: white;
  font-family: PingFangSC-Medium, PingFang SC !important;
  padding: 20px;
  font-size: 14px;
  min-height: 780px;
  .headName {
    margin-bottom: 10px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(76, 166, 255, 1);
    line-height: 12px;
  }
  .hasChoosed {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #333333;
    margin-top: 15px;
    .border {
      width: 6px;
      margin-right: 20px;
      height: 18px;
      background: rgba(76, 166, 255, 1);
      border-radius: 4px;
    }
  }
  .aRow {
    padding: 12px;
    font-size: 16px;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 12px;
  }
  .aRowBottom {
    margin-top: -40px;
  }
}
</style>
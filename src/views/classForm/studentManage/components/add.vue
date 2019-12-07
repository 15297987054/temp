<template>
  <div>
    <a-modal width="780px" title="添加学员" @cancel="handleCancel" v-model="addVisible">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="10">
            <a-form-item label="学员编号/姓名" :label-col="{ span: 9 }" :wrapper-col="{ span: 14 }">
              <a-input v-decorator="['stuIdOrName']" />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="班级编号/名称" :label-col="{ span: 9 }" :wrapper-col="{ span: 15 }">
              <a-input v-decorator="['classIdOrName']" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit">查询</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div>
        <a-row>
          <a-col :span="24">
            <a-table
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              :columns="columnsSec"
              :dataSource="dataSec"
            >
              <template slot="status" slot-scope>
                <a-checkbox @change="onChange"></a-checkbox>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </div>
      <template slot="footer">
        <a-row>
          <a-col :span="13">
            <a-button type="primary" @click="handleOk">确定</a-button>
          </a-col>
        </a-row>
      </template>
    </a-modal>
  </div>
</template>

<script>
const columnsSec = [
  {
    title: '姓名',
    width: '10%',
    dataIndex: 'studentName'
  },
  {
    title: '学员编号',
    width: '20%',
    dataIndex: 'studentId'
  },
  {
    title: '所属分校',
    width: '16%',
    dataIndex: 'campus'
  },
  {
    title: '性别',
    width: '10%',
    dataIndex: 'sex'
  },
  {
    title: '年级',
    width: '10%',
    dataIndex: 'grade'
  },
  {
    title: '第一联系人电话',
    width: '16%',
    dataIndex: 'phoneNum'
  },
  {
    title: '状态',
    width: '16%',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  }
]
const dataSec = []
for (let i = 0; i < 6; i++) {
  dataSec.push({
    key: i,
    studentId: `C20191015235698`,
    studentName: '吴彦祖',
    campus: '野鸡学校分校',
    sex: '男',
    grade: '二年级',
    phoneNum: '11122233342',
    status: '在读'
  })
}
export default {
  name: 'Add',
  props: {
    addVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      addVisible: false,
      dataSec,
      columnsSec,
      selectedRowKeys: [],
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleCancel() {
      this.addVisible = false
      this.$emit('showAddModal', this.addVisible)
    },
    handleOk(e) {
      console.log(e)
      this.addVisible = false
      this.$emit('showAddModal', this.addVisible)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style lang="less" scoped>
@import '../antTable.less';
</style>
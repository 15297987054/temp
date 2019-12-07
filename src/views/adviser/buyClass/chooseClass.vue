<template>
  <div>
    <a-form class="aForm" :form="form" @submit="handleSubmit" :layout="formLayout" :colon="false">
      <a-row :gutter="40">
        <a-col :span="5">
          <a-form-item
            :colon="false"
            label="所在校区"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input @change="onChange"  v-decorator="['campus',{ rules: [ {message: 'Input something!', },], },]" class="inputStyle" placeholder="请选择校区">
              <a-tooltip slot="suffix" title="Extra information">
                <a-icon type="pic-right" style="color: rgba(0,0,0,.46)" />
              </a-tooltip>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="选择学期"
            :colon="false"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input  v-decorator="['term',{ rules: [ {message: 'Input something!', },], },]" class="inputStyle" placeholder="请选择学期">
            <a-tooltip slot="suffix" title="Extra information">
              <a-icon type="pic-right" style="color: rgba(0,0,0,.46)" />
            </a-tooltip>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="所在年级"
            :colon="false"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input  v-decorator="['grade',{ rules: [ {message: 'Input something!', },], },]" class="inputStyle" placeholder="请选择年级">
            <a-tooltip slot="suffix" title="Extra information">
              <a-icon type="pic-right" style="color: rgba(0,0,0,.46)" />
            </a-tooltip>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="40">
        <a-col :span="5">
          <a-form-item
            :colon="false"
            label="上课老师"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input  v-decorator="['teacher',{ rules: [ {message: 'Input something!', },], },]" class="inputStyle" placeholder="请选择老师">
             <a-tooltip slot="suffix" title="Extra information">
              <a-icon type="pic-right" style="color: rgba(0,0,0,.46)" />
            </a-tooltip>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="选择科目"
            :colon="false"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input v-decorator="['chooseSubject',{ rules: [ {message: 'Input something!', },], },]"
               class="inputStyle" placeholder="请选择科目" >
            <a-tooltip slot="suffix" title="Extra information">
              <a-icon type="pic-right" style="color: rgba(0,0,0,.46)" />
            </a-tooltip>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="报读层次"
            :colon="false"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input  v-decorator="['classFloor',{ rules: [ {message: 'Input something!', },], },]" class="inputStyle" placeholder="" >
            <a-tooltip slot="suffix" title="Extra information">
              <a-icon type="pic-right" style="color: rgba(0,0,0,.46)" />
            </a-tooltip>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item
            label="班级类型"
            :colon="false"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
           <a-select defaultValue="常规班" style="width: 120px" @change="handleChange">
            <a-select-option value="素养班">素养班</a-select-option>
            <a-select-option value="荣耀班">荣耀班</a-select-option>
           </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
            <a-button type="primary">Submit</a-button>
      </a-form-item>-->
      <a-row>
        <a-col :span="6">
          <a-input-search
            placeholder="输入课程名称/编号"
            @search="onSearch"
            enterButton="Search"
            size="middle"
            style="searchBtn"
          />
        </a-col>
        <a-col :span="4">
          <a-button type="primary" :style="{ marginLeft: '8px' }" @click="handleReset">
            <a-icon type="reload" />重置
          </a-button>
        </a-col>
      </a-row>
    </a-form>
    <hr style="border:1px solid #f5f5f5" />
    <TableForClass :val="campus"/>  
     <!-- <div class="nextBtn">
           <a-button @click="nextStep" type="primary">下一步</a-button>
       </div>    -->
  </div>
</template>

<script>

import TableForClass from './components/tableForClass'
export default {
    components:{
        TableForClass,
    },
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      campus:""
    }
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 }
          }
        : {}
    },
    buttonItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 1 }
          }
        : {}
    }
  },
  created:function(){
     
  },
  methods: {
    
   
      onChange(e){this.campus=e.target.value},
       handleChange(value) {
        console.log(`selected ${value}`,);
      },
    handleReset() {
      this.form.resetFields()
    },
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value
    }
  }
}
</script>

<style lang="less" scoped>
@import './antdesignStyle.less';
.inputStyle {
  width: 100%;
};
.aForm{
    margin-bottom:20px;
}
// .nextBtn{
//     display: flex;
//     width:100%;
//     justify-content: center;
//    :nth-child(1){
//         width:180px;
//     height:45px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-bottom:20px;
//    }
// }
</style>
<template>
  <div>
    <a-modal
      width="50%"
      title="添加不可用时间"
      v-model="visible"
      cancelText="关闭"
      okText="保存"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="开始时间"
          v-bind="formItemLayout"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-date-picker @change="onStartChange" v-decorator="['date-picker-start', config]" />
        </a-form-item>
        <a-form-item
          label="结束时间"
          v-bind="formItemLayout"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-date-picker @change="onEndChange" v-decorator="['date-picker-end', config]" />
        </a-form-item>
      </a-form>
      <a-row>
        <a-col :span="24">
          <div class="tableContainer">
            <a-row>
              <a-col :span="4">
                <div>不可用时段：</div>
              </a-col>
              <a-col :span="20">
                <ul v-for="(date,id) in dateArrList" :key="id">
                  <div class="chooseDate">
                    <li>{{date}}</li>
                    <div class="chooseDuration">
                      <a-select
                        mode="multiple"
                        :defaultValue="[]"
                        style="minWidth: 210px"
                        @change="handleChange"
                        @blur="handleBlur"
                        placeholder="请选择时间段"
                      >
                        <a-select-option
                          v-for="(item) in weekList"
                          :key="date+' '+item"
                        >{{date}} {{item}}</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <a-button v-show="false" @click="error">Error</a-button>
                </ul>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'ModalTable',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      visible: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      dateArrList: [],
      durationList: [],
      weekList: ["08:00-09:00","09:00-10:00","10:00-11:00","11:00-12:00","12:00-13:00","13:00-14:00","14:00-15:00","13:00-14:00","14:00-15:00","15:00-16:00","16:00-17:00","17:00-18:00","18:00-19:00","19:00-20:00","20:00-21:00"],
    }
  },
  methods: {
    handleChange(value) {
      console.log(value,123)
      // var tempList=[]
      // for(var i=0;i<value.length;i++){
      //   tempList=tempList.concat(value[i].split(" "))
      // }
      // var arr=[...new Set(tempList)]
      // // console.log(arr)
      // var obj={}
      // var dayA=arr.splice(0,1)
      // obj.time=dayA
      //   obj.day=arr.slice()
      //   for(var j=0;j<this.durationList.length;j++){
      //     if(dayA.indexOf(this.durationList[i]).day!=-1){this.durationList.splice(j,1)}
      //   }
      //   this.durationList.push(obj)
      //   console.log(this.durationList)
      
        // for(var j=0;j<this.dateArrList.length;j++){
        //     var obj={}
            
        // }
        // this.durationList=[]
        // for(var i=0;i<value.length;i++){
        //    this.durationList.push( this.weekList[value[i]])
           
        // }
        // console.log(this.dateArrList,123)
        // console.log(this.durationList)     
    },
    handleBlur(value){
      console.log(888)
      var tempList=[]
      for(var i=0;i<value.length;i++){
        tempList=tempList.concat(value[i].split(" "))
      }
      var arr=[...new Set(tempList)]
      // console.log(arr)
      var obj={}
       obj.day=arr[0]
      var dayA=arr.splice(0,1)
     
        obj.time=arr.slice()
        for(var j=0;j<this.durationList.length;j++){
          if(((this.durationList[j]).day).indexOf(dayA)!=-1){
            //  console.log(999)
            this.durationList.splice(j,1,obj);
            // console.log(this.durationList)
             return
             }
         
        }
        this.durationList.push(obj)
        // console.log(this.durationList)
    },
    getDateNum(datestr) {
      var temp = datestr.split('-')
      if (temp[1] === '01') {
        temp[0] = parseInt(temp[0], 10) - 1
        temp[1] = '12'
      } else {
        temp[1] = parseInt(temp[1], 10) - 1
      }
      //new Date()的月份入参实际都是当前值-1
      var date = new Date(temp[0], temp[1], temp[2])
      return date
    },
    /**
     ***获取两个日期间的所有日期
     ***默认start<end
     **/
    getDiffDate(start, end) {
      var startTime = this.getDateNum(start)
      var endTime = this.getDateNum(end)
      var dateArr = []
      while (endTime.getTime() - startTime.getTime() > 0) {
        var year = startTime.getFullYear()
        var month =startTime.getMonth().toString()==='9' ? '10':
          startTime.getMonth().toString().length === 1
            ? '0' + (parseInt(startTime.getMonth().toString(), 10) + 1)
            : startTime.getMonth() + 1
        var day = startTime.getDate().toString().length === 1 ? '0' + startTime.getDate() : startTime.getDate()
        dateArr.push(year + '-' + month + '-' + day)
        startTime.setDate(startTime.getDate() + 1)
      }
      dateArr.push(this.endTime)
      this.dateArrList = dateArr
      return dateArr
    },
    onStartChange(value) {
      var d = new Date(value)
      var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate()<10 ? '0'+d.getDate():d.getDate())
      this.beginTime = date
      if((new Date(this.beginTime)).getTime()>(new Date(this.endTime)).getTime()&& this.beginTime!="" && this.endTime!=""){
            this.error();
            return;
      }
      if(!this.endTime) return;
      console.log(1321)
      this.getDiffDate(this.beginTime, this.endTime)
      return date
    },
    onEndChange(value) {
      var d = new Date(value)
      var date = d.getFullYear() + '-' + ((d.getMonth() + 1)<10 ? '0'+ (d.getMonth() + 1):(d.getMonth() + 1)) + '-' + (d.getDate()<10 ? '0'+d.getDate():d.getDate())
      this.endTime = date
      if((new Date(this.beginTime)).getTime()>(new Date(this.endTime)).getTime()){
            this.error();
            return;
      }
      this.getDiffDate(this.beginTime, this.endTime)
      return date
    },
   error() {
        this.$message.error('结束时间要晚于开始时间哦~');
      },
    showModal() {
      this.visible = true
    },
    handleSubmit(e) {
      e.preventDefault()
      this.visible = !this.visible
      this.$emit('changeFlag', this.visible)
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log( this.durationList)
          this.$emit("msgFromChild",this.durationList)
        }
      })
    },
    handleCancel() {
      this.visible = !this.visible
      this.$emit('changeFlag', this.visible)
    }
  }
}
</script>

<style lang="less" scoped>
@import './forTeacher.less';
.tableContainer {
  //   padding-left: 28px;
  color: rgba(0, 0, 0, 0.85);
  ul{
    padding:0;
    li{
      white-space: nowrap;
    }
  }
  div:nth-of-child(1){
    width:130px;
  }
 
}
.chooseDate {
  display: flex;
  .chooseDuration{
      margin-left:5px;
      margin-top:-5px;
  }
}
/deep/ .ant-table-tbody > tr > td {
  padding: 6px 0 6px 12px;
}
/deep/.ant-table-thead > tr > th {
  text-align: left;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 14px;
  border-bottom: 1px solid #e8e8e8;
  background: none;
  padding: 6px 0 6px 12px;
}
/deep/.ant-form-item-label {
  text-align: left;
  width: 115px;
}
</style>
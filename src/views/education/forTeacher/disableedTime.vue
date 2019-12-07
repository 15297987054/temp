<template>
  <div>
    <a-table
      :pagination="false"
      class="tableStyle"
      bordered
      :dataSource="dataSource"
      :columns="columns"
    >
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="您确定要删除吗?"
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <div class="btn">
      <a-button class="editable-add-btn" @click="handleAdd">添加不可用时间</a-button>
      <ModalTable
        @msgFromChild="msgFromChildren"
        v-show="flag"
        :visible="flag"
        @changeFlag="hangleChangeFlag"
      />
      <div>
        <a-button class="editable-save-btn" @click="handleAdd">保存</a-button>
        <a-button class="editable-close-btn" @click="handleAdd">关闭</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import ModalTable from './modalTable.vue'
export default {
  components: {
    ModalTable
  },
  data() {
    return {
      dataSource: [],
      count: 2,
      columns: [
        {
          title: '日期',
          dataIndex: 'startTime'
        },
        {
          title: '不可用时段',
          dataIndex: 'uselessTime'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      flag: false
    }
  },
  methods: {
    msgFromChildren(val) {
      // for(var i=0;i<val.length;i++)
      //   for(var j=0;j<this.dataSource.length;j++){
      //     if(val[i].day==this.dataSource[j].day && val[i].time==this.dataSource[j].time){
      //       return
      //       }else if(val[i].time!=this.dataSource[j].time){
      //         this.dataSource[j].time=val[i].time;return;}
      //   }

     
        if (this.dataSource = []) {
          for (var i = 0; i < val.length; i++){
          console.log(val,111)
          var obj = {}
          obj.key = i
          obj.startTime = val[i].day
          obj.uselessTime = val[i].time.join(' ')
          this.dataSource.push(obj)
          console.log(this.dataSource,121)
         
        }
         return
        }
         for (var i = 0; i < val.length; i++) {
        for (var j = 0; j < this.dataSource.length; j++) {
        
          if (val[i].day == this.dataSource[j].day) {
              console.log(222)
            this.dataSource[j].time = val[i].time
            return
          }
        }
      }
      //       for(var h=0;h<val[i].time.length;h++){
      //         for(var m=0;m<this.dataSource[j].time.length;m++){
      //           if(val[i].time[h]==this.dataSource[j].time[m]){
      //             continue
      //           }else{
      //             this.dataSource[j].time[m]=val[i].time[h]
      //           }
      //         }
      //       }
      //       return
      //       }

      // }
      // }
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
    hangleChangeFlag(val) {
      this.flag = val
    },
    handleAdd() {
      this.flag = !this.flag
    }
  }
}
</script>
<style>
@import './forTeacher.less';

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
.btn {
  display: flex;
  justify-content: space-between;
}
.editable-save-btn {
  background: #1890ff;
  color: white;
  margin-left: 20px;
  margin-top: 13px;
}
.editable-close-btn {
  background: #ccc;
  color: white;
  margin-left: 20px;
  margin-top: 13px;
}
</style>
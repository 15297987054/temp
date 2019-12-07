<template>
  <div>
    <a-modal  style="top: 200px;" width='250px' title="移除学员" v-model="removeVisible" @cancel="handleCancel" @ok="handleOk">
      <p>确定移除该学员么？</p>
      <template slot="footer">
        <a-row>
          <a-col :span="12">
            <a-button style="width:100%;" type="primary" @click="handleOk">确定</a-button>
          </a-col>
          <a-col :span="12">
            <a-button style="width:100%;" type="primary" @click="handleOk">确定</a-button>
          </a-col>
        </a-row>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Remove',
  props: {
    removeVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      removeVisible: false
    }
  },
  methods: {
    handleCancel() {
      this.removeVisible = false
      this.$emit('showRemoveModal', this.removeVisible)
    },
    handleOk(e) {
      console.log(e)
      this.removeVisible = false
      this.$emit('showRemoveModal', this.removeVisible)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../antTable.less';
</style>
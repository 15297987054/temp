<template>
  <div>
    <a-modal title="调出班级" v-model="moveOutVisible" @cancel="handleCancel" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'MoveOut',
  props: {
    moveOutVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      moveOutVisible: false
    }
  },
  methods: {
    handleCancel() {
      this.moveOutVisible = false
      this.$emit('showMoveOutModal', this.moveOutVisible)
    },
    handleOk(e) {
      console.log(e)
      this.moveOutVisible = false
      this.$emit('showMoveOutModal', this.moveOutVisible)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
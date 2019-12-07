<template>
  <div class="mainContainer">
    <div class="headName">代报名</div>
    <hr style="border:1px solid #f5f5f5" />
    <div class="stepsContainer">
      <a-row class="aRow">
        <a-col :span="15">
          <div class="steps">
            <a-steps :current="current">
              <a-step v-for="item in steps" :key="item.title" :title="item.title" />
            </a-steps>
            <div class="steps-action">
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-row>
      <a-col :span="24">
        <div class="studentName">
          <div class="stuName">学员姓名：{{stuName}}</div>
          <div class="aIcon">
              <a-icon type="swap" />
              <span @click="changeStu">切换学员</span>
              </div>
        </div>
      </a-col>
    </a-row>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      steps: [{ title: '选课' }, { title: '结算' }, { title: '付款' }],
      stuName: '李菲菲'
    }
  },
   watch: {
      '$route'(toRouter, fromRouter) {
        if(toRouter.name=="chooseClass"){
          this.current=0
          }else if(toRouter.name=="countPay"){
            this.current=1
          }else{
            this.current=2
          }
       }
     },
     created:function(){
       console.log(this.$route.name,"luyoumingcheng")
       var pathName=this.$route.name
        if(pathName=="chooseClass"){
          this.current=0
          }else if(pathName=="countPay"){
            this.current=1
          }else if(pathName=="pay"){
            this.current=2
          }
     },
  methods: {
      changeStu(){
        //   this.next();
        //   this.$router.push({path:"/adviser/buyClass/countPay"})
      },
    next() {
      this.current++
    },
    prev() {
      this.current--
    }
  }
}
</script>
<style lang="less" scoped>
.mainContainer {
  background: white;
  border-radius: 8px;
  margin: -24px;
  padding: 15px 20px 20px 20px;
  .headName {
    width: 42px;
    height: 15px;
    font-size: 14px;
    margin-left: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(76, 166, 255, 1);
    line-height: 12px;
  }
  .studentName {
    display: flex;
    padding:19px;
    height: 55px;
    background: rgba(239, 247, 255, 1);
    margin-bottom:20px;
    .aIcon{
        cursor: pointer;
        color:#4CA6FF;
        margin-left:30px;
        margin-top:-2px;
        span{
            margin-left:10px;
        }
    }
    .stuName {
      width: 128px;
      height: 16px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 16px;
    }
  }
  .stepsContainer {
    width: 100%;
    .aRow {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
    }
    .steps {
      .steps-action {
        margin-top: 24px;
      }
    }
  }
}
</style>
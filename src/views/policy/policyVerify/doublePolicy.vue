<template>
  <div class="policyContainer">
    <div class="headName">政策审核</div>
    <hr style="border:1px solid #f5f5f5" />
    <div class="hasChoosed">
      <div class="border"></div>
      <span>政策套餐</span>
    </div>
    <a-row>
      <a-col :span="18">
        <a-row class="aRow">
          <a-col :span="9">
            <span class="policyDetail">套餐编号：</span>
            <span>90438945904539745</span>
          </a-col>
          <a-col :span="9">
            <span class="policyDetail">套餐名称：</span>
            <span>九年全科 立减400+满1000减200</span>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <div class="policyName">政策1：九年级全科 立减400</div>
      </a-col>
    </a-row>
    <div class="policyDetailContainer">
      <a-row>
        <a-col :span="24">
          <a-row class="aRow">
            <a-col :span="5">
              <span class="policyDetail">编号：</span>
              <span>90438945904539745</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">政策类型：</span>
              <span>代金券</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">有效日期：</span>
              <span style="color:#4CA6FF">2019-12-20 至 2019-12-30</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="5">
              <span class="policyDetail">立减基数：</span>
              <span>0</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">立减金额：</span>
              <span>200元</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">计算方式：</span>
              <span>每科</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">申请校区：</span>
              <span>宝安中心校区</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="5">
              <span class="policyDetail">是否可结转：</span>
              <span>否</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">是否计招生:</span>
              <span>否</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">是否可退：</span>
              <span style="color:#FF4530">否</span>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <div class="hasChoosed">
      <div class="border"></div>
      <span>适用范围</span>
    </div>
    <div>
      <a-row>
        <a-col :span="24">
          <a-row class="aRow">
            <a-col :span="5">
              <span class="policyDetail">学员类型：</span>
              <span>老生</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">报读类型：</span>
              <span>单报</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">报读年份：</span>
              <span>半年报</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">学期：</span>
              <span
                v-for="(item,index) in termList"
                :key="index"
              >{{index === termList.length-1 ? item:item+' 、'}}</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">校区：</span>
              <span
                v-for="(item,index) in campusList"
                :key="index"
              >{{index === campusList.length-1 ? item:item+' 、'}}</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">班级类型：</span>
              <span
                v-for="(item,index) in classType"
                :key="index"
              >{{index === classType.length-1 ? item:item+' 、'}}</span>

              <a-popover>
                <template slot="content">
                  <div
                    style="width:200px;background:rgba(250,252,253,1); display:flex;flexWrap:wrap;"
                  >
                    <p
                      style="whiteSpace:nowrap"
                      v-for="(item,index) in classType"
                      :key="index"
                    >{{index === classType.length-1 ? item:item+' 、'}}</p>
                  </div>
                </template>
                <span style="color:#4CA6FF;marginLeft:20px;">
                  更多
                  <a-icon style="fontSize:10px;" type="plus-square" />
                </span>
              </a-popover>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">年级：</span>
              <span
                v-for="(item,index) in grades"
                :key="index"
              >{{index === grades.length-1 ? item:item+' 、'}}</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">科目：</span>
              <span
                v-for="(item,index) in subject"
                :key="index"
              >{{index === subject.length-1 ? item:item+' 、'}}</span>
              <a-popover>
                <template slot="content">
                  <div
                    style="width:200px;background:rgba(250,252,253,1); display:flex;flexWrap:wrap;"
                  >
                    <p
                      style="whiteSpace:nowrap"
                      v-for="(item,index) in subject"
                      :key="index"
                    >{{index === subject.length-1 ? item:item+' 、'}}</p>
                  </div>
                </template>
                <span style="color:#4CA6FF;marginLeft:20px;">
                  更多
                  <a-icon style="fontSize:10px;" type="plus-square" />
                </span>
              </a-popover>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">层次：</span>
              <span
                v-for="(item,index) in floor"
                :key="index"
              >{{index === floor.length-1 ? item:item+' 、'}}</span>
              <a-popover>
                <template slot="content">
                  <div
                    style="width:200px;background:rgba(250,252,253,1); display:flex;flexWrap:wrap;"
                  >
                    <p
                      style="whiteSpace:nowrap"
                      v-for="(item,index) in floor"
                      :key="index"
                    >{{index === floor.length-1 ? item:item+' 、'}}</p>
                  </div>
                </template>
                <span style="color:#4CA6FF;marginLeft:20px;">
                  更多
                  <a-icon style="fontSize:10px;" type="plus-square" />
                </span>
              </a-popover>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <a-row>
      <a-col :span="24">
        <div class="policyName">政策1：九年级全科 立减400</div>
      </a-col>
    </a-row>
    <div class="policyDetailContainer">
      <a-row>
        <a-col :span="24">
          <a-row class="aRow">
            <a-col :span="5">
              <span class="policyDetail">编号：</span>
              <span>90438945904539745</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">政策类型：</span>
              <span>代金券</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">有效日期：</span>
              <span style="color:#4CA6FF">2019-12-20 至 2019-12-30</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="5">
              <span class="policyDetail">立减基数：</span>
              <span>0</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">立减金额：</span>
              <span>200元</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">计算方式：</span>
              <span>每科</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">申请校区：</span>
              <span>宝安中心校区</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="5">
              <span class="policyDetail">是否可结转：</span>
              <span>否</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">是否计招生:</span>
              <span>否</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">是否可退：</span>
              <span style="color:#FF4530">否</span>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <div class="hasChoosed">
      <div class="border"></div>
      <span>适用范围</span>
    </div>
    <div>
      <a-row>
        <a-col :span="24">
          <a-row class="aRow">
            <a-col :span="5">
              <span class="policyDetail">学员类型：</span>
              <span>老生</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">报读类型：</span>
              <span>单报</span>
            </a-col>
            <a-col :span="5">
              <span class="policyDetail">报读年份：</span>
              <span>半年报</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">学期：</span>
              <span
                v-for="(item,index) in termList"
                :key="index"
              >{{index === termList.length-1 ? item:item+' 、'}}</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">校区：</span>
              <span
                v-for="(item,index) in campusList"
                :key="index"
              >{{index === campusList.length-1 ? item:item+' 、'}}</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">班级类型：</span>
              <span
                v-for="(item,index) in classType"
                :key="index"
              >{{index === classType.length-1 ? item:item+' 、'}}</span>

              <a-popover>
                <template slot="content">
                  <div
                    style="width:200px;background:rgba(250,252,253,1); display:flex;flexWrap:wrap;"
                  >
                    <p
                      style="whiteSpace:nowrap"
                      v-for="(item,index) in classType"
                      :key="index"
                    >{{index === classType.length-1 ? item:item+' 、'}}</p>
                  </div>
                </template>
                <span style="color:#4CA6FF;marginLeft:20px;">
                  更多
                  <a-icon style="fontSize:10px;" type="plus-square" />
                </span>
              </a-popover>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">年级：</span>
              <span
                v-for="(item,index) in grades"
                :key="index"
              >{{index === grades.length-1 ? item:item+' 、'}}</span>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">科目：</span>
              <span
                v-for="(item,index) in subject"
                :key="index"
              >{{index === subject.length-1 ? item:item+' 、'}}</span>
              <a-popover>
                <template slot="content">
                  <div
                    style="width:200px;background:rgba(250,252,253,1); display:flex;flexWrap:wrap;"
                  >
                    <p
                      style="whiteSpace:nowrap"
                      v-for="(item,index) in subject"
                      :key="index"
                    >{{index === subject.length-1 ? item:item+' 、'}}</p>
                  </div>
                </template>
                <span style="color:#4CA6FF;marginLeft:20px;">
                  更多
                  <a-icon style="fontSize:10px;" type="plus-square" />
                </span>
              </a-popover>
            </a-col>
          </a-row>
          <a-row class="aRow">
            <a-col :span="24">
              <span class="policyDetail">层次：</span>
              <span
                v-for="(item,index) in floor"
                :key="index"
              >{{index === floor.length-1 ? item:item+' 、'}}</span>
              <a-popover>
                <template slot="content">
                  <div
                    style="width:200px;background:rgba(250,252,253,1); display:flex;flexWrap:wrap;"
                  >
                    <p
                      style="whiteSpace:nowrap"
                      v-for="(item,index) in floor"
                      :key="index"
                    >{{index === floor.length-1 ? item:item+' 、'}}</p>
                  </div>
                </template>
                <span style="color:#4CA6FF;marginLeft:20px;">
                  更多
                  <a-icon style="fontSize:10px;" type="plus-square" />
                </span>
              </a-popover>
            </a-col>
          </a-row>
          <a-row v-show="notFlag" style="marginTop:50px" class="aRow">
            <a-col :span="5"></a-col>
            <a-col :span="4">
              <a-button class="okBtn" @click="handleOk" type="primary">通过</a-button>
            </a-col>
            <a-col :span="4">
              <a-button class="rejectBtn" @click="handleRejectForReason" type="primary">驳回</a-button>
            </a-col>
          </a-row>
          <a-row v-show="flag" class="aRow">
            <a-col :span="15">
              <div>
                <a-textarea
                  style="background:#F5F5F5;"
                  placeholder="请输入驳回理由"
                  :autosize="{ minRows: 6, }"
                />
              </div>
            </a-col>
          </a-row>
          <a-row v-show="flag" class="aRow">
            <a-col :span="5"></a-col>
            <a-col :span="4">
              <a-button class="cancelBtn" @click="handleCancel" type="primary">取消</a-button>
            </a-col>
            <a-col :span="4">
              <a-button class="rejectBtn" @click="handleReject" type="primary">驳回</a-button>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      termList: ['2019年寒假', '2019年寒假', '2019年寒假'],
      campusList: [
        '宝安校区',
        '宝安校区',
        '宝安校区',
        '宝安校区',
        '宝安校区',
        '宝安校区',
        '宝安校区',
        '宝安校区',
        '宝安校区'
      ],
      classType: [
        '常规班',
        '常规班',
        '常规班',
        '常规班',
        '常规班',
        '常规班',
        '常规班',
        '常规班',
        '常规班',
        '常规班',
        '常规班'
      ],
      grades: ['九年级', '九年级', '九年级', '九年级', '九年级', '九年级'],
      subject: ['数学', '数学', '数学', '数学', '数学', '数学', '数学', '数学', '数学'],
      floor: [
        '2019荣耀班',
        '2019荣耀班',
        '2019荣耀班',
        '2019荣耀班',
        '2019荣耀班',
        '2019荣耀班',
        '2019荣耀班',
        '2019荣耀班',
        '2019荣耀班'
      ],
      flag: false,
      notFlag: true
    }
  },
  methods: {
    handleCancel() {
      ;(this.flag = !this.flag), (this.notFlag = true)
    },
    handleRejectForReason() {
      ;(this.flag = true), (this.notFlag = false)
    },
    handleReject() {}
  }
}
</script>

<style lang="less" scoped>
.policyContainer {
  border-radius: 8px;
  background: white;
  font-family: PingFangSC-Medium, PingFang SC;
  padding: 20px;
  font-size: 14px;
  min-height: 780px;
  .aRow {
    margin-top: 20px;
    .policyDetail {
      font-weight: 600;
      color: #333333;
    }
  }
  .okBtn {
    width: 180px;
    height: 48px;
    background: rgba(76, 166, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(76, 166, 255, 1);
  }
  .rejectBtn {
    width: 180px;
    height: 48px;
    background: rgba(255, 102, 102, 1);
    border-radius: 4px;
    border: none;
  }
  .cancelBtn {
    width: 180px;
    height: 48px;
    background: rgba(197, 197, 197, 1);
    border-radius: 4px;
    border: none;
  }
  .headName {
    margin-bottom: 10px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(76, 166, 255, 1);
    line-height: 12px;
  }
  .policyName {
    background: rgba(239, 247, 255, 1);
    margin-top: 15px;
    padding: 20px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 12px;
  }
  .policyDetailContainer {
    margin-top: 10px;
    padding: 12px 12px 12px 0;
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
}
</style>
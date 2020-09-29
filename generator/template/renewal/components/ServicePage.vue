<template>
  <div>
    <n22-action-sheet
      v-model="value"
      :cancel-text="cancelText"
      :options="
        this.$route.query.type
          ? this.$route.query.type == 1
            ? options2
            : options
          : renewal.historyType == 0
          ? options
          : options3
      "
      @selected="$_selected"
      @cancel="$_cancel"
    ></n22-action-sheet>
    <!-- 拨打电话 -->
    <n22-popup v-model="isPopupShow.callPhone" transition="n22-bounce">
      <div class="n22-example-popup n22-example-popup-center">
        <div class="call_box call_box_1">
          <div class="border_two">
            <div class="border_one">
              <img src="../assets/images/call.png" alt class="call_png" />
            </div>
          </div>
          <div class="content">
            <div class="verbal_trick">您将拨打的号码为</div>
            <div type="text" v-if="phoneNumberDese" class="call_input">{{ phoneNumberDese }}</div>
            <div type="text" v-else class="call_input"><span class="data-show-c">&lt;#error暂无#&gt;</span></div>
            <div class="button_group">
              <button @click="isPopupShow.callPhone = false">
                取消
              </button>
              <button @click="$_callPhone">拨打电话</button>
            </div>
          </div>
        </div>
      </div>
    </n22-popup>
    <!-- 发送短信 -->
    <n22-popup v-model="isPopupShow.sendMessage" transition="n22-bounce">
      <div class="n22-example-popup n22-example-popup-center">
        <div class="call_box call_box_2">
          <div class="border_two">
            <div class="border_one">
              <img src="../assets/images/message.png" alt class="call_png" />
            </div>
          </div>
          <!-- <div class="border_two">
            <div class="circle"></div>
          </div>
          <div class="border_one">
            <div class="circle"></div>
          </div>
          <img src="../assets/images/call.png" alt class="call_png" /> -->
          <div class="content">
            <div class="verbal_trick">您将发送的号码为</div>
            <div type="text" v-if="phoneNumberDese" class="call_input">{{ phoneNumberDese }}</div>
            <div type="text" v-else class="call_input"><span class="data-show-c">&lt;#error暂无#&gt;</span></div>
            <div class="verbal_trick1">您将发送的短信为</div>
            <div class="message_text" v-html="messageInfo"></div>
            <div class="verbal_trick2">此信息发送后十日后可再次使用</div>
            <div class="button_group">
              <button @click="sendMessageClose">
                取消
              </button>
              <button @click="dealQueryAndSave">发送短信</button>
            </div>
          </div>
        </div>
      </div>
    </n22-popup>
  </div>
</template>

<script>
import { mapState } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import native from "js-native-n22";
import { ActionSheet, Popup } from "al-mobile";
import { recordSave, recordQuery, policyServiceDetail } from "../service/getData";
import __stepDate from "@t/stepDate";

export default {
  name: "service-page", //使用xx-xx-xx命名方式具体看操作文档
  computed: {
    ...mapState(["renewal"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    phoneNumberDese() {
      var phoneStr = (this.phoneNumber && this.phoneNumber.replace(this.phoneNumber.substring(3, 7), "****")) || "";
      return phoneStr;
    },
    message1() {
      return "";
    },
  },
  data() {
    return {
      serviceData: "",
      actionItem: "",
      options: [
        {
          label: "拨打客户电话",
          value: 0,
          type: "phone",
        },
        {
          label: "发送服务短信",
          value: 1,
          type: "sms_sv",
          messageTemplate:
            // "宽限期交费温馨提示：尊敬的<投保人姓名><投保人性别称谓>，您投保的<产品名称>保单号为<保单号>保单的宽限期即将于<宽限日期-1天> 24时结束，请您将<当期应缴保费>元保费存入<银行名称>尾号<划款账号后四位>账户。保单效力中止后复效会产生利息，复效保险费利率同保单贷款利率，自保费宽限期后一日起计息，至还款申请日止。如有疑问请联系您的服务人员<业务员姓名>，电话<业务人员电话>。",
            "宽限期交费温馨提示：尊敬的<投保人姓名><投保人性别称谓>，您投保的<产品名称>保单号为<保单号>号保单已进入宽限期，请您及时将<当期应交保费>元保费存入<银行名称>尾号<划款账号后四位>账户，或注册我司官方微信“光大永明人寿”，选择客户服务-保单服务办理保单交费。如已交纳保费，请忽略此短信。如有疑问请联系您的服务人员<业务员姓名>，电话<业务人员电话>。",
        },
        {
          label: "提醒变更账户",
          value: 2,
          type: "sms_up",
          messageTemplate:
            "尊敬的<投保人姓名><投保人性别称谓>，您投保的<产品名称>保单号为<保单号>号保单，预留交费账户为<银行名称>尾号<划款账号后四位>，如需变更请您注册我司官方微信“光大永明人寿”，选择客户服务-保单服务办理，或致电我司客服热线95348办理。如有疑问请联系您的服务人员<业务员姓名>，电话<业务人员电话>",
        },
      ],
      options2: [
        {
          label: "拨打服务代理人电话",
          value: 0,
          type: "phone",
        },
      ],
      options3: [
        {
          label: "拨打客户电话",
          value: 0,
          type: "phone",
        },
      ],
      isPopupShow: {
        callPhone: false,
        sendMessage: false,
      },
      messageInfo: "",
      value: false,
      cancelText: "取消",
      phoneNumber: "",
    };
  },
  mounted() {
    console.log("%c service-page>生命周期>mounted", "color:green;", "");
    // this.serviceDataQuery();
  },
  methods: {
    message() {
      let mes = "";
      if (this.serviceData && this.actionItem) {
        let mesArr = this.actionItem.messageTemplate;
        mesArr = mesArr.split(/<(.*?)>/g);
        mesArr.forEach((val, index) => {
          if (index % 2 === 1) {
            console.log("%c val>>>>>>>>>>>", "color:green;", val);
            switch (val) {
              case "投保人姓名":
                val = this.serviceData.appntname;
                break;
              case "投保人性别称谓":
                val = this.serviceData.p6 === "男" ? "先生" : this.serviceData.p6 === "女" ? "女士" : "先生/女士";
                break;
              case "产品名称":
                val = this.serviceData.riskname;
                break;
              case "保单号":
                val = this.serviceData.contno;
                break;
              case "宽限日期-1天": {
                //2020-07-24确认失效日期-1
                const paytoday = __stepDate.stepDays(this.serviceData.enddate, -1);
                val = paytoday;
                break;
              }
              case "当期应缴保费":
                val = this.serviceData.shouldmoney;
                break;
              case "银行名称":
                val = this.serviceData.p7;
                break;
              case "划款账号后四位": {
                let len = "";
                if (this.serviceData.p8) {
                  len = this.serviceData.p8.length;
                  val = this.serviceData.p8.substring(len - 4, len);
                }
                break;
              }
              case "业务员姓名":
                val = this.serviceData.serveragentname;
                break;
              case "业务人员电话":
                val = this.serviceData.p9;
                break;
              default:
                break;
            }
            if (val) {
              // val = `<span class="data-show-c">${val}</span>`;
            } else {
              val = `<span class="data-show-c">&lt;#error暂无#&gt;</span>`;
            }
          }
          mes += val;
        });
      }
      return mes;
    },
    sendMessageClose() {
      // 弹框取消按钮
      this.isPopupShow.sendMessage = false;
    },
    $_sendMessage() {
      // 原生发送短信插件
      if (window.GDIJSBridge || window.WebViewJavascriptBridge) {
        native.sendMsg(
          {
            phoneNumber: this.phoneNumber,
            msgInfo: this.message(),
          },
          content => {
            console.log(JSON.stringify(content));
            this.sendMessageClose();
          },
          error => {
            alert(error);
          },
        );
      } else {
        // this.dealQueryAndSave();
      }
    },
    $_callPhone() {
      // 原生拨打电话插件
      if (window.GDIJSBridge || window.WebViewJavascriptBridge) {
        native.callPhone(
          {
            phoneNumber: this.phoneNumber,
            extensionNumber: "",
          },
          content => {
            console.log(JSON.stringify(content));
            // this.dealQueryAndSave();
          },
          error => {
            alert(error);
          },
        );
      } else {
        // this.dealQueryAndSave();
      }
    },
    $_showActionSheet(serviceData) {
      this.serviceData = serviceData;
      this.phoneNumber = this.$route.query.type == 1 ? this.serviceData.p9 : this.serviceData.p10;
      this.value = true; // 展开服务模板
    },
    $_selected(item) {
      this.actionItem = item;
      // this.serviceDataQuery();
      this.showDialog();
    },
    $_cancel() {
      // 取消回调
    },
    showDialog() {
      // 服务模板选中方法
      if (this.actionItem.value === 0) {
        this.isPopupShow.callPhone = true;
      } else if (this.actionItem.value === 1 || this.actionItem.value === 2) {
        this.isPopupShow.sendMessage = true;
        this.messageInfo = this.message();
      }
    },
    dealQueryAndSave() {
      // await this.messageQuery();
      this.saveMessage();
    },
    saveMessage() {
      if (!this.actionItem || !this.serviceData.contno || !this.serviceData.paytodate) {
        console.log("%c servicePage>>>>>>>>>>>>>", "color:red;", "存在必填字段！！！请检查");
        return;
      }
      const axiosParams = {
        isLoadding: true,
        loaddingText: "数据请求中...",
      };
      let savedata = {
        contNo: this.serviceData.contno,
        payToDate: this.serviceData.paytodate,
        type: this.actionItem.type,
        phoneNum: this.phoneNumber,
        nopayreason: this.actionItem.type === "sms_sv" ? "12" : "13", //12：发送服务短信 13：提醒变更账户
        historyType: this.renewal.historyType, //0:续期任务 1:挽单任务 2:续期服务
      };
      recordSave({ data: savedata, config: axiosParams }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
          this.$_sendMessage();
        },
        error => {
          console.log("%c error-demo", "color:#00CD00", error);
        },
      );
    },
    messageQuery() {
      if (!this.actionItem || !this.serviceData.contno || !this.serviceData.paytodate) {
        console.log("%c servicePage>>>>>>>>>>>>>", "color:red;", "存在必填字段！！！请检查");
        return;
      }
      let savedata = {
        contNo: this.serviceData.contno,
        payToDate: this.serviceData.paytodate,
        type: this.actionItem.type,
        phoneNum: "",
      };
      recordQuery({ data: savedata }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
        },
        error => {
          console.log("%c error-demo", "color:#00CD00", error);
        },
      );
    },
    serviceDataQuery() {
      if (!this.serviceData.contno && !this.serviceData.prtno) {
        console.log("%c servicePage>>>>>>>>>>>>>", "color:red;", "存在必填字段！！！请检查");
        return;
      }
      const config = {
        isLoadding: true,
        loaddingText: "数据请求中...",
      };
      let savedata = {
        contNo: this.serviceData.contno || "",
        prtNo: this.serviceData.prtno || "",
      };
      policyServiceDetail({ data: savedata, config }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
          this.serviceData.appntSex = data.data.appntSex;
          this.serviceData.bankAccNo = data.data.bankAccNo;
          this.serviceData.bankName = data.data.bankName;
          this.serviceData.endDate = data.data.endDate;
          this.serviceData.agentMobile = data.data.agentMobile;
          this.phoneNumber = data.data.appntMobile;
          this.showDialog();
        },
        error => {
          console.log("%c error-demo", "color:#00CD00", error);
        },
      );
    },
  },
  components: {
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@keyframes turnOne {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes turnTwo {
  0% {
    -webkit-transform: rotate(360deg);
  }
  25% {
    -webkit-transform: rotate(270deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(90deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
  }
}
::v-deep .data-show-c {
  color: red;
}
.call_box {
  &.call_box_1 {
    width: 315px;
    height: 342px;
  }
  &.call_box_2 {
    width: 315px;
    height: 480px;
  }
  div {
    margin: 0 auto;
  }
  .content {
    div {
      margin: 0 auto;
      text-align: center;
    }
  }
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  // display: flex;
  // justify-content: center;
  padding-top: 12px;
  flex-wrap: nowrap;
  .verbal_trick {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    // position: absolute;
    // top: 126px;
    margin-top: 15px !important;
  }
  .verbal_trick1 {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    // position: absolute;
    // top: 209px;
    margin-top: 12px !important;
  }
  .verbal_trick2 {
    height: 14px;
    font-size: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 70, 61, 1);
    line-height: 14px;
    // position: absolute;
    // bottom: 88px;
    margin-top: 10px !important;
  }
  .call_input {
    width: 191px;
    height: 41px;
    border-radius: 5px;
    border: 1px solid rgba(253, 194, 72, 1);
    // position: absolute;
    // top: 158px;
    margin-top: 11px !important;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 41px;
    text-align: center;
  }
  .message_text {
    text-align: justify !important;
    width: 263px;
    height: 128px;
    border-radius: 5px;
    border: 1px solid rgba(216, 216, 216, 1);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    overflow-y: auto;
    // position: absolute;
    padding: 3px 10px;
    // top: 231px;
    margin-top: 6px !important;
  }
  .button_group {
    width: 100%;
    position: absolute;
    bottom: 70px;
    button {
      width: 120px;
      height: 40px;
      color: #fff;
      outline: none;
      border: none;
      border-radius: 5px;
      justify-content: space-between;
      font-size: 15px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 251, 251, 1);
      line-height: 21px;
    }
    button:nth-child(1) {
      background: #d8d8d8;
      position: absolute;
      left: 20px;
    }
    button:nth-child(2) {
      background: #fdc248;
      position: absolute;
      right: 15px;
    }
  }
  .border_two {
    // animation: turnTwo 4s linear infinite;
    width: 97px;
    height: 97px;
    border: 1px solid rgba(255, 240, 208, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    // margin-top: 18px;
  }
  .border_one {
    // position: absolute;
    // top: 25px;
    // animation: turnOne 4s linear infinite;
    width: 82px;
    height: 82px;
    border: 1px solid rgba(253, 194, 72, 1);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .call_png {
    // position: absolute;
    // top: 43px;
    display: block;
    width: 52px;
    height: 52px;
  }
  // .circle {
  //   width: 5px;
  //   height: 5px;
  //   border-radius: 50%;
  //   background-color: rgba(253, 194, 72, 1);
  //   position: absolute;
  //   top: -3px;
  // }
}
</style>

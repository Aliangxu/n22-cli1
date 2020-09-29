<template>
  <div class="renewal-add-record">
    <al-all-head hairline :title="myTitle"></al-all-head>
    <al-content
      class="renewal-add-record-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <n22-field>
        <n22-drop-select
          v-model="record.type"
          title="服务方式"
          :options="servicesTypeOptions"
          :disabled="isDisable"
          :arrow="!isDisable ? 'right_arrow' : false"
        ></n22-drop-select>
        <n22-radio-item
          v-model="record.payWish"
          :disabled="isDisable"
          title="缴费意愿"
          :options="payWishOptions"
        ></n22-radio-item>
        <n22-drop-select
          v-if="dealPayWish === 1"
          v-model="record.payTime"
          :maxDate="maxDate"
          title="预计缴费时间"
          type="date"
          :options="servicesTypeOptions"
          :disabled="isDisable"
          :arrow="!isDisable ? 'right_arrow' : false"
        ></n22-drop-select>
        <n22-radio-item
          v-if="dealPayWish === 2"
          class="not-pay-radio"
          v-model="record.notPayReason"
          title="不愿缴费原因"
          :options="payWishReasonOptions"
          :isLine="false"
          :disabled="isDisable"
          type="checkbox"
        ></n22-radio-item>
        <n22-textarea
          ref="myTextarea"
          v-show="dealNoReason"
          v-model="record.payContent"
          :border="true"
          :maxHeight="98"
          :maxLength="100"
          :disabled="isDisable"
          class="my-textarea"
          placeholder="请具体描述其他问题"
        ></n22-textarea>
        <div class="my-line"></div>
        <n22-drop-select
          v-if="dealPayWish === 2"
          v-model="record.invalidPlan"
          title="保单进入失效后，客户打算"
          :options="invalidPlanOptions"
          :disabled="isDisable"
          :arrow="!isDisable ? 'right_arrow' : false"
        ></n22-drop-select>
      </n22-field>
      <n22-button v-if="!isDisable" @click="commit" class="commit-c" type="primary">提交</n22-button>
    </al-content>
  </div>
</template>

<script>
import { mapState } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, DropSelectItem, Field, RadioItem, Textarea } from "al-mobile";
import {
  servicesTypeOptions,
  servicesTypeOptions2,
  payWishOptions,
  payWishReasonOptions,
  invalidPlanOptions,
  invalidPlanOptions2,
} from "../components/options";
import { saveHistoryQuery } from "../service/getData";

export default {
  name: "renewal-add-record", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Button.name]: Button,
    [DropSelectItem.name]: DropSelectItem,
    [Field.name]: Field,
    [RadioItem.name]: RadioItem,
    [Textarea.name]: Textarea,
  },
  computed: {
    ...mapState(["renewal"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    dealPayWish() {
      return this.record.payWish == 1 ? 1 : this.record.payWish == 2 ? 2 : "";
    },
    dealNoReason() {
      const is = this.dealPayWish === 2 && this.record.notPayReason.indexOf("11") > -1;
      return is;
    },
    isDisable() {
      return this.$route.query.type === "see";
    },
    myTitle() {
      const historyType =
        this.renewal.historyType == "2"
          ? "续期服务记录"
          : this.renewal.historyType == "0"
          ? "续收任务服务"
          : "挽单服务";
      const type = this.$route.query.type === "see" ? "详情" : "录入";
      return `${historyType}${type}`;
    },
  },
  mounted() {
    console.log("%c add-record>生命周期>mounted", "color:green;", "");
    if (this.renewal.historyType == 1) {
      this.servicesTypeOptions = servicesTypeOptions2;
      this.invalidPlanOptions = invalidPlanOptions2;
    }
    if (this.$route.query.type === "see") {
      const recordLs = window.utils.cache.get("recordData");
      for (let i = 0; i < servicesTypeOptions.length; i++) {
        const inval = servicesTypeOptions[i];
        if (inval.text === recordLs.paytype) {
          this.record.type = inval.value; //服务方式
        }
      }
      this.record.payWish = recordLs.paywish ? 1 : 2; //缴费愿望
      this.record.payTime = recordLs.payplandate && recordLs.payplandate.replace(" 00:00:00", ""); //预计缴费时间
      this.record.notPayReason = recordLs.nopayreason; //不愿缴费原因
      this.record.payContent = recordLs.nopayotherreason; //不愿缴费原因-其他
      for (let i = 0; i < invalidPlanOptions.length; i++) {
        const inval = invalidPlanOptions[i];
        if (inval.text === recordLs.customerwill) {
          this.record.invalidPlan = inval.value; //保单进入失效后，客户打算
        }
      }
    }
    //暂时无法发布组件库`textarea`组件的`maxLength`属性，此处进行手动js更改为100
    if (
      this.$refs.myTextarea &&
      this.$refs.myTextarea.$refs.vTextarea &&
      this.$refs.myTextarea.$refs.vTextarea.maxLength === -1
    ) {
      this.$refs.myTextarea.$refs.vTextarea.maxLength = 100;
      console.log("%c >>>>>>>>>>>>>>>>>>>>>100", "color:green;", this.$refs.myTextarea.$refs);
    }
  },
  watch: {},
  data() {
    return {
      maxDate: new Date("2099-01-01"),
      tabs: [
        //content组件对象
        {
          label: "默认单个列表不展示",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: false,
          upCallbackFun: "",
        },
      ],
      servicesTypeOptions,
      payWishOptions,
      payWishReasonOptions,
      invalidPlanOptions,
      record: {
        type: "", //服务方式
        payWish: "", //缴费愿望
        payTime: "", //预计缴费时间
        notPayReason: [], //不愿缴费原因
        payContent: "", //不愿缴费原因-其他
        invalidPlan: "", //保单进入失效后，客户打算
      },
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    commit() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "数据请求中...",
      };
      if (!this.$route.query.contNo && !this.$route.query.historyType) {
        console.log("%c AddRecord-commit>>>>>>>>>>>>", "color:red;", "保单号and接口状态不能为空！！！请检查");
        return;
      }
      //填写数据校验
      if (!this.record.type) {
        this.$toast.info("请选择服务方式！");
        return;
      }
      if (this.record.payWish) {
        if (this.record.payWish == 1) {
          if (!this.record.payTime) {
            this.$toast.info("请选择预计缴费时间！");
            return;
          }
        } else if (this.record.payWish == 2) {
          if (this.record.notPayReason && this.record.notPayReason.length > 0) {
            if (this.record.notPayReason.indexOf("11") > -1 && !this.record.payContent) {
              this.$toast.info("请填写具体描述其他问题！");
              return;
            }
          } else {
            this.$toast.info("请选择不愿缴费原因！");
            return;
          }
          if (!this.record.invalidPlan) {
            this.$toast.info("请选择保单进入失效后，客户打算！");
            return;
          }
        }
      } else {
        this.$toast.info("请选择缴费意愿！");
        return;
      }
      let params = {
        contno: this.$route.query.contNo,
        historyType: this.renewal.historyType, //0:续期任务 1:挽单任务 2:续期服务
        paytype: this.record.type, //	0：面访: 1：电话 2：无法联系 3：短信 4：微信
        paywish: this.record.payWish == 1 ? true : false,
        payplandate: this.record.payTime,
        nopayreason: this.record.notPayReason.toString(),
        nopayotherreason: this.record.payContent,
        customerwill: this.record.invalidPlan,
        paytodate: this.$route.query.payToDate,
      };
      saveHistoryQuery({ data: params, config: axiosParams }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
          this.back();
        },
        error => {
          console.log("%c error-demo", "color:#00CD00", error);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.renewal-add-record {
  .renewal-add-record-content {
    .not-pay-radio {
      ::v-deep .n22-field-item-title {
        width: 60px;
      }
      ::v-deep .size-xs {
        width: 110px;
      }
    }
    // ::v-deep.n22-radio-item-input.is-disabled {
    //   background-color: #fdb92c !important;
    //   border: 1px solid #fdb92c;
    // }
    ::v-deep.n22-radio-item-input {
      &.is-disabled {
        .n22-radio {
          background-color: #c5cad5 !important;
          border: 1px solid #c5cad5;
          color: #fff;
        }
        .checked {
          background-color: #ffba03 !important;
          border: 1px solid #ffba03;
        }
      }
    }
    .my-textarea {
      // border: 1px solid #d8d8d8;
      // border-radius: 5px;
      width: 300px;
      ::v-deep textarea {
        border-radius: 5px;
        border: 1px solid #d8d8d8;
        padding: 1px;
      }
      ::v-deep .auto-textarea-block {
        max-height: 98px;
      }
    }
    .commit-c {
      width: 200px;
      height: 44px;
      margin: 20px auto;
    }
    .my-line {
      height: 1px;
      background-color: #e2e4ea;
    }
  }
}
</style>

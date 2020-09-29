<template>
  <div class="proposalBookSimple-product">
    <al-all-head :title="productName" hairline leftTextIcon="" :opacityStyle="opacityStyle"></al-all-head>
    <al-content
      class="proposalBookSimple-product-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
      :isAutoTopMargin="true"
    >
      <!-- 产品详情相关信息区域 -->
      <product-detail ref="proDetail" :productCode="productCode"></product-detail>
      <!-- 展示测算区域按钮 -->
      <div class="cesuan">
        <n22-button @click="cesuanFun" class="cesuan_ly_button button-img-an" type="primary" plain>
          保费测算 <img src="../assets/images/hand.png" /> 保障利益
        </n22-button>
      </div>
      <!-- 测算内区域 -->
      <n22-field class="insured-info-c" title="" v-if="isShowCalculate && master">
        <n22-drop-select
          class="isBorder"
          v-model="insured.age"
          title="被保险人年龄"
          selectDefaultValue="30"
          :options="ageOptions"
          type="single"
        ></n22-drop-select>
        <n22-drop-select
          class="isBorder"
          v-model="insured.sex"
          title="被保险人性别"
          :options="sexOptions"
          ispickerValue="请选择"
          type="single"
        ></n22-drop-select>
        <n22-drop-select
          v-if="master.choose.pay_freq"
          class="isBorder"
          v-model="master.chooseValues.pay_freq"
          title="交费方式"
          :options="master.choose.pay_freq"
          :defaultValue="master.choose.pay_freq[0].value"
          ispickerValue="请选择"
          type="single"
        ></n22-drop-select>
        <n22-drop-select
          v-if="master.choose.pay"
          class="isBorder"
          v-model="master.chooseValues.pay"
          title="交费期间"
          :itemObject="{ index: 0 }"
          :options="master.choose.pay"
          :defaultValue="master.choose.pay[0].value"
          ispickerValue="请选择"
          type="single"
          @changeData="changeData_pay"
        ></n22-drop-select>
        <n22-drop-select
          v-if="master.choose.insure"
          class="isBorder"
          v-model="master.chooseValues.insure"
          title="保险期间"
          :options="master.choose.insure"
          :defaultValue="master.choose.insure[0].value"
          ispickerValue="请选择"
          type="single"
        ></n22-drop-select>
        <n22-drop-select
          v-if="master.choose.rank"
          class="isBorder"
          v-model="master.chooseValues.rank"
          title="档次"
          :options="master.choose.rank"
          :defaultValue="master.choose.rank[0].value"
          ispickerValue="请选择"
          type="single"
        ></n22-drop-select>
        <n22-drop-select
          v-if="master.choose.draw_age"
          class="isBorder"
          v-model="master.chooseValues.draw_age"
          title="祝寿金领取年龄"
          :options="master.choose.draw_age"
          :defaultValue="master.choose.draw_age[0].value"
          ispickerValue="请选择"
          type="single"
        ></n22-drop-select>
        <n22-drop-select
          v-if="master.choose.draw_mode"
          class="isBorder"
          v-model="master.chooseValues.draw_mode"
          title="年金领取方式"
          :options="master.choose.draw_mode"
          :defaultValue="master.choose.draw_mode[0].value"
          ispickerValue="请选择"
          type="single"
        ></n22-drop-select>
        <n22-drop-select
          v-if="master.choose.draw_freq"
          class="isBorder"
          v-model="master.chooseValues.draw_freq"
          title="年金领取频率"
          :options="master.choose.draw_freq"
          :defaultValue="master.choose.draw_freq[0].value"
          ispickerValue="请选择"
          type="single"
        ></n22-drop-select>
        <n22-radio-item
          v-if="master.choose.option_duty"
          class="isBorder"
          v-model="master.chooseValues.option_duty"
          :defaultValue="[]"
          title="可选责任"
          :options="master.choose.option_duty"
          ispickerValue="请选择"
          type="checkbox"
        ></n22-radio-item>
        <n22-input-item
          v-if="master.inputModel === 1"
          title="份数"
          v-model="master.quantity"
          :defaultValue="master.defaultQuantity"
          placeholder="请输入份数"
          align="right"
          type="digit"
          clearable
        >
          <template #right>
            <span>份数</span>
          </template>
        </n22-input-item>
        <n22-input-item
          v-if="master.inputModel === 2"
          title="保险金额"
          v-model="master.amount"
          maxlength="10"
          :defaultValue="master.defaultAmount"
          placeholder="请输入保额"
          align="right"
          type="digit"
          clearable
        >
          <template #right>
            <span>元</span>
          </template>
        </n22-input-item>
        <n22-input-item
          v-if="master.inputModel === 4"
          title="年交保费"
          v-model="master.premium"
          maxlength="10"
          :defaultValue="master.defaultPremium"
          placeholder="请输入保费"
          align="right"
          type="digit"
          clearable
        >
          <template #right>
            <span>元</span>
          </template>
        </n22-input-item>
        <n22-input-item
          v-if="master.inputModel === 7"
          title="一次性支付保险费"
          v-model="master.fixed"
          maxlength="10"
          :defaultValue="master.defaultFixed"
          placeholder="请输入保费"
          align="right"
          type="digit"
          clearable
        >
          <template #right>
            <span>元</span>
          </template>
        </n22-input-item>
        <div v-if="master.isAppend" class="pro-apend">
          <n22-cell-item title="追加保费">
            <template slot="right">
              <n22-icon name="add_pro" @click="proAppendOrDrawAdd(master.append)"></n22-icon>
            </template>
          </n22-cell-item>
          <div class="pro-apend-entry" v-for="(item, i) in master.append" :key="i">
            <div class="pro-append-index">{{ i + 1 }}</div>
            <div class="pro-append-delete" @click="proAppendOrDrawDelete(master.append, i)">
              <n22-icon name="delete"></n22-icon>
            </div>
            <n22-input-item
              title="追加保费起始年限"
              v-model="item.startYear"
              placeholder="请输入"
              align="right"
              type="digit"
            ></n22-input-item>
            <n22-input-item
              title="追加保费截止年限"
              v-model="item.endYear"
              placeholder="请输入"
              align="right"
              type="digit"
            ></n22-input-item>
            <n22-input-item
              title="追加保费"
              v-model="item.money"
              placeholder="请输入"
              align="right"
              type="digit"
            ></n22-input-item>
          </div>
        </div>
        <div v-if="master.isDraw" class="pro-apend draw">
          <n22-cell-item title="部分领取">
            <template slot="right">
              <n22-icon name="add_pro" @click="proAppendOrDrawAdd(master.draw)"></n22-icon>
            </template>
          </n22-cell-item>
          <div class="pro-apend-entry" v-for="(item, i) in master.draw" :key="i">
            <div class="pro-append-index">{{ i + 1 }}</div>
            <div class="pro-append-delete" @click="proAppendOrDrawDelete(master.draw, i)">
              <n22-icon name="delete"></n22-icon>
            </div>
            <n22-input-item
              title="领取起始年限"
              v-model="item.startYear"
              placeholder="请输入"
              align="right"
              type="digit"
            ></n22-input-item>
            <n22-input-item
              title="领取截止年限"
              v-model="item.endYear"
              placeholder="请输入"
              align="right"
              type="digit"
            ></n22-input-item>
            <n22-input-item
              title="当年度部分领取金额"
              v-model="item.money"
              placeholder="请输入"
              align="right"
              type="digit"
            ></n22-input-item>
          </div>
        </div>
        <n22-button @click="calculate" class="cesuan_button" type="primary" plain>
          <img src="../assets/images/hand02.png" /> 测算
        </n22-button>
        <n22-cell-item title="年交保费：" :addon="`${allPremium}元`" no-border>
          <template slot="right">
            <n22-amount :value="allPremium" has-separator :duration="800" transition></n22-amount>元
          </template>
        </n22-cell-item>
      </n22-field>
      <!-- 利益演示区域 -->
      <product-benefit
        v-if="isShowCalculate && master"
        :benefitFamilies="benefitFamilies"
        :insured="insured"
      ></product-benefit>
      <!-- 温馨提示区域 -->
      <product-tips :class="[isAbsolute ? 'is-absolute' : '']" :master="master"></product-tips>
    </al-content>
    <!-- 产品规则提示区域 -->
    <n22-dialog
      title="规则提示"
      transition="n22-bounce"
      :closable="false"
      v-model="rulesDialog.open"
      :btns="rulesDialog.btns"
    >
      <div class="dialog-banner" slot="header">
        <img src="@m/proposalBook/assets/images/tip_head.png" />
      </div>
      <div v-for="(item, i) in rulesDialog.content" :key="i" class="rules-content">
        <div v-for="(itema, ii) in item" :key="ii" class="div-tip">
          <n22-tag
            v-if="ii !== 0"
            size="tiny"
            shape="fillet"
            type="fill"
            fill-color="#FFD055"
            font-weight="normal"
            font-color="#ffffff"
          >
            <span>{{ ii }}</span>
          </n22-tag>
          <span :class="[ii === 0 ? 'pro-name' : 'tip']">{{ itema }}</span>
        </div>
      </div>
    </n22-dialog>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import {
  AllHead,
  Content,
  Amount,
  Button,
  CellItem,
  DropSelectItem,
  Dialog,
  Field,
  FieldItem,
  Icon,
  InputItem,
  RadioItem,
  Tag,
  Slider,
} from "al-mobile";
import { calculate, getProductEntry } from "../service/getData";
import ProductDetail from "../components/productDetail";
import ProductBenefit from "../components/ProductBenefit";
import ProductTips from "../components/ProductTips";
import { productCheck, dealHuomian } from "@m/proposalBook/views/checkData.js";
import _cloneDeep from "lodash/cloneDeep";
import utilsWechat from "@@/utils/wechat";

export default {
  name: "proposal-book-simple-product", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Amount.name]: Amount,
    [Button.name]: Button,
    [CellItem.name]: CellItem,
    [Dialog.name]: Dialog,
    [DropSelectItem.name]: DropSelectItem,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [InputItem.name]: InputItem,
    [Icon.name]: Icon,
    [RadioItem.name]: RadioItem,
    [Tag.name]: Tag,
    [Slider.name]: Slider,

    [ProductDetail.name]: ProductDetail,
    [ProductBenefit.name]: ProductBenefit,
    [ProductTips.name]: ProductTips,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  beforeMount() {
    utilsWechat.wxConfig().then(() => {
      console.log("%c >>>>>>>>>>>>wxConfig", "color:green;", "");
      let param = {
        title: "光大永明爱多多重大疾病", // 分享标题
        desc: "光大永明爱多多重大疾病保险产品计划", // 分享描述
        link: window.location.href.split("&AL=")[0],
        // imgUrl: `${window.globalConfig.rootUrl.replace("/api", "")}/app/proposalBookSimple/static/images/share.jpg`, // 分享图标
        imgUrl: "https://mitphone.sunlife-everbright.com/app/proposalBookSimple/static/images/share.jpg", // 分享图标
        type: "", // 分享类型,music、video或link，不填默认为link
        dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
      };
      utilsWechat.onMenuShareAppMessage(param).then(() => {});
    });
  },
  mounted() {
    console.log("%c proposalBookSimple-生命周期-mounted", "color:green;", "");
    //产品code
    if (this.$route.path) {
      const arr = this.$route.path.split("/");
      this.productCode = arr[arr.length - 1];
    }
    for (let i = 0; i < 56; i++) {
      this.ageOptions.push({
        text: `${i}岁`,
        value: i + "",
      });
    }
    //设置初始默认年龄
    this.insured.age = "30";
    //获取录入项
    this.getProductEntryFun(this.productCode, this.channel);
  },
  watch: {},
  data() {
    return {
      isAbsolute: true,
      productCode: "",
      channel: this.$route.query.channel,
      productName: "",
      opacityStyle: {
        backgroundColor: "#fdb92c",
        color: "#fff",
      },
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
      rulesDialog: {
        open: false,
        btns: [
          {
            text: "确 定",
          },
        ],
      },
      master: "",
      insured: {
        age: "",
        sex: "1",

        name: "",
        birthday: "",
        occupationCode: "0001001",
        occupationLevel: "1",
        addon: "党政机关、企事业单位负责人和行政管理人员",
        social: false, //社保
      },
      holder: {
        addon: "党政机关、企事业单位负责人和行政管理人员", //职业临时
        age: "30",
        birthday: "",
        name: "",
        occupationCode: "0001001", //职业code
        occupationLevel: "1", //职业级别
        relation: "00", //关系
        sameInsurant: false, //是否通被保人
        sex: "1",
        social: false, //社保
      },
      sexOptions: [
        { text: "男", value: "1" },
        { text: "女", value: "2" },
      ],
      ageOptions: [],
      isShowCalculate: false,
      allPremium: 0,
      benefitFamilies: "",
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    dealIsAbsoult(is) {
      const height = window.document.body.offsetHeight - this.$refs.proDetail.$el.offsetHeight;
      console.log("%c >>>>>>>>>>>> height", "color:green;", height);
      if (!is && !this.isShowCalculate) {
        this.isAbsolute = true;
      } else {
        this.isAbsolute = false;
      }
    },
    /**
     * 日期加减
     * @param date 被加或减的日期
     * @param days 需要加或减的数字
     * @returns {string}
     */
    getBeforeDays(date = new Date(), days = 0) {
      let _date = new Date(date);
      _date.setDate(_date.getDate() + days);
      let month = _date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = _date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return _date.getFullYear() + "-" + month + "-" + day;
    },
    cesuanFun() {
      if (!this.isShowCalculate) {
        this.isShowCalculate = !this.isShowCalculate;
        this.dealIsAbsoult(true);
      }
    },
    //更改回调--pay缴费期间
    // eslint-disable-next-line no-unused-vars
    changeData_pay({ index }, val, oldval, isHand, type, key) {
      if (index === 0) {
        console.log("%c changeData_pay-name", "color:green;", name);
        console.log("%c changeData_pay", "color:green;", val);
        dealHuomian([this.master], val, this);
      }
    },
    /**
     * 处理录入项的追加or领取
     */
    dealAppendOrDrawFun(mpro) {
      mpro.isAppend = _cloneDeep(mpro.append);
      mpro.append = [];
      mpro.isDraw = _cloneDeep(mpro.draw);
      mpro.draw = [];
      return mpro;
    },
    /**
     * 获取险种的录入参数
     * @param(number) i 所选主险的下标
     * @param(number) isMounted 是否初始化-默认underfinde
     * @param(number) type 1-初始化逻辑，2-新增逻辑， 3-修改逻辑
     */
    getProductEntryFun(code, channel) {
      if (!code || code === "product") {
        this.$toast({
          content: `请检查,存在未知产品编码！`,
          position: "center",
          maxTextNum: 100,
          duration: 3000,
        });
        return;
      }
      if (!channel) {
        this.$toast({
          content: `请检查,存在未知销售渠道！`,
          position: "center",
          maxTextNum: 100,
          duration: 3000,
        });
        return;
      }
      const axiosParams = {
        isLoadding: true,
        loaddingText: "数据请求中...",
      };
      const params = {
        code: code,
        channel: channel,
      };
      getProductEntry({ data: params, config: axiosParams, method: "get" }).then(
        data => {
          console.log("%c getProductEntry>>>>data", "color:green;", data);
          //处理返回的追加、领取字段
          const ma = this.dealAppendOrDrawFun(_cloneDeep(data.data[0]));
          this.productName = ma.name;
          this.master = ma;
        },
        err => {
          console.log("%c getProductEntry>>>>err", "color:green;", err);
        },
      );
    },
    calculate() {
      this.calculateFun(this.holder, this.insured, [{ product: [this.master] }], true);
    },
    /**
     * 保费试算
     * @param(Object) holder 投保人信息
     * @param(Object) insured 被保人信息
     * @param(Object) productList 产品信息
     * @param(Object) isLoadding 保费试算是否展示加载loading
     */
    calculateFun(holder, insured, productList, isLoadding) {
      console.log("%c 保费试算>>>calculateFun>>>投保人", "color:#ffba03;", _cloneDeep(holder));
      console.log("%c 保费试算>>>calculateFun>>>被保人", "color:#ffba03;", _cloneDeep(insured));
      console.log("%c 保费试算>>>calculateFun>>>险种", "color:#ffba03;", _cloneDeep(productList));
      let ruleDatap = "";
      if (!this.insured.age) {
        ruleDatap = `请输入被保险人年龄`;
      }
      if (!this.insured.sex) {
        ruleDatap = `请输入被保险人性别`;
      }
      if (ruleDatap) {
        this.$toast({
          content: `${ruleDatap}！`,
          position: "bottom",
          maxTextNum: 100,
          duration: 3000,
        });
        return;
      }
      const ruleData = productCheck(productList);
      if (ruleData) {
        this.$toast({
          content: `${ruleData}！`,
          position: "bottom",
          maxTextNum: 100,
          duration: 3000,
        });
        return;
      }
      this.calculateLoading = true;
      // p[0].product[0].amount = 50000;
      // p[0].product[0].append = [];
      // p[0].product[0].draw = [];
      let families = _cloneDeep(productList);
      const axiosParams = {
        isLoadding: isLoadding || false,
        loaddingText: "保费试算中...",
      };
      // add by zhangxin
      if (insured.age === "0") {
        insured.birthday = this.getBeforeDays(new Date(), -30);
      }
      const params = {
        applicant: holder,
        insurant: insured,
        families: families,
      };
      calculate({ data: params, config: axiosParams, channel: this.channel }).then(
        data => {
          console.log("%c calculate>>>>>data", "color:green;", data);
          this.allPremium = data.data.premium;
          this.benefitFamilies = data.data.benefitFamilies;
        },
        err => {
          console.log("%c calculate>>>>>err", "color:green;", err);
          if (err.bizcode === 1005) {
            //1005保费计算错误
            this.allPremium = 0;
            this.rulesDialog.open = true;
            this.rulesDialog.content = err.body;
          }
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.proposalBookSimple-product {
  .proposalBookSimple-product-content {
    .button-img-an img {
      animation: jittery 2.5s infinite;
    }
    .button-img-an img:hover {
      animation: heartbeat 1s infinite;
    }

    @keyframes jittery {
      5%,
      50% {
        transform: scale(1);
      }
      10% {
        transform: scale(0.9);
      }
      15% {
        transform: scale(1.2);
      }
      20% {
        transform: scale(1.2) rotate(-5deg);
      }
      25% {
        transform: scale(1.2) rotate(5deg);
      }
      30% {
        transform: scale(1.2) rotate(-3deg);
      }
      35% {
        transform: scale(1.2) rotate(2deg);
      }
      40% {
        transform: scale(1.2) rotate(0);
      }
    }
    @keyframes heartbeat {
      50% {
        transform: scale(1.1);
      }
    }
    // ::v-deep.not-swiper-div {
    //   background-color: #ffffff;
    // }
    .cesuan {
      background-color: #ffffff;
      padding: 20px 0;
      .cesuan_ly_button {
        margin: 0 auto;
        width: 351px;
        height: 44px;
        font-size: 16px;
        img {
          height: 24px;
          width: 24px;
          margin: 0 3px;
        }
      }
    }
    .insured-info-c {
      padding: 0 10px;
      margin: 0;
      color: #333333;
      ::v-deep .n22-field-content {
        border: 1px solid #fbcf42;
        .n22-field-item-content,
        .n22-cell-item-body {
          padding: 0 10px;
        }
        .n22-cell-item {
          background-color: #fff4d3;
          .n22-cell-item-title {
            color: #333333;
          }
        }
      }
      .cesuan_button {
        font-size: 16px;
        width: 220px;
        height: 44px;
        margin: 24px auto;
        img {
          height: 24px;
          width: 24px;
          margin-right: 5px;
        }
      }
    }
  }
}
::v-deep .n22-dialog-content {
  .dialog-banner {
    img {
      display: block;
      width: 100%;
    }
  }

  background-color: rgba(0, 0, 0, 0);

  .n22-dialog-body {
    background-color: #ffffff;
  }
  .n22-dialog-actions {
    background-color: #ffffff;
    &::after {
      display: none;
    }
    .n22-dialog-btn {
      margin: 20px 30px;
      background-color: #ffba03;
      color: #ffffff;
      height: 40px;
      border-radius: 5px;
    }
  }

  .rules-content {
    max-height: 150px;
    overflow-y: auto;
    .div-tip {
      margin-top: 10px;
    }
    .n22-tag {
      div {
        padding: 4px 5px;
        font-size: 8px;
        transform: scale(0.7);
      }
    }
    .tip {
      color: #666666;
      font-size: 13px;
    }
    .pro-name {
      color: #ffba01;
      font-size: 14px;
    }
  }
}
</style>

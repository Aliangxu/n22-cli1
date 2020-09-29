<template>
  <div>
    <al-all-head hairline></al-all-head>
    <al-content ref="listSwiper" :tabs="tabs" :isMescrollDown="true" :isToTop="true" isMescrollLoadList>
      <transition name="n22-slide-left">
        <n22-field
          v-if="myTransition.show1"
          class="message-info-c"
          title="保单缴费信息"
          @headerClick="showReFees = !showReFees"
        >
          <template #head_title_left>
            <div class="title-line"></div>
          </template>
          <div :class="[showReFees ? '' : 'toogle-true', 'toogle']" slot="action">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
          <div v-for="(da, di) in detailData2.reFees" :key="di">
            <div v-if="showReFees" class="content">
              <!-- <n22-cell-item title="应交日期" :addon="da.payToDate" /> -->
              <!-- <n22-cell-item title="交费截止日期" :addon="da.payDate" /> -->
              <!-- <n22-cell-item title="应交保费">
                <template #right>{{ da.duePayMoney | doPrecision }}元</template>
              </n22-cell-item> -->
              <n22-cell-item title="应交日期" :addon="$route.query.payToDate || da.payToDate" />
              <n22-cell-item title="交费截止日期" :addon="$route.query.enddate || da.payDate" />
              <n22-cell-item title="应交保费">
                <template #right>{{ ($route.query.shouldmoney || da.duePayMoney) | doPrecision }}元</template>
              </n22-cell-item>
              <n22-cell-item title="交费年期" :addon="da.payEndYear" />
              <n22-cell-item title="交费频率" :addon="da.payIntv | dealOptions('payIntv')" />
              <n22-cell-item title="转账银行" :addon="da.bankName" />
              <n22-cell-item title="银行账号" :addon="da.accNo | valueReplace" />
              <!-- <n22-cell-item title="续期服务类型" :addon="da.rnewServiceType | dealOptions('serviceType')" /> -->
              <n22-cell-item
                title="续期服务类型"
                :addon="($route.query.p5 || da.rnewServiceType) | dealOptions('serviceType')"
              />
              <n22-cell-item title="限制保单收费" :addon="da.premLimitCont | dealOptions('premLimitCont')" />
              <n22-cell-item title="限制起期" v-if="da.premLimitCont == 'Y'" :addon="da.limitEndDate" />
              <n22-cell-item title="限制止期" v-if="da.premLimitCont == 'Y'" :addon="da.limitStartDate" />
              <!-- <n22-cell-item title="销售渠道" v-if="$route.query.type == 1" :addon="da.saleChnl" />
              <n22-cell-item title="服务机构" v-if="$route.query.type == 1" :addon="da.serviceCom" />
              <n22-cell-item title="承保代理人姓名" v-if="$route.query.type == 1" :addon="da.agentName" />
              <n22-cell-item title="承保代理人工号" v-if="$route.query.type == 1" :addon="da.agentCode" />
              <n22-cell-item title="服务代理人姓名" v-if="$route.query.type == 1" :addon="da.serviceAgentName" />
              <n22-cell-item title="服务代理人工号" v-if="$route.query.type == 1" :addon="da.serviceAgentCode" /> -->
            </div>
          </div>
        </n22-field>
      </transition>
      <transition name="n22-slide-left">
        <n22-field
          v-if="myTransition.show2"
          class="message-info-c"
          title="续期代扣记录"
          @headerClick="showXuqi = !showXuqi"
        >
          <template #head_title_left>
            <div class="title-line"></div>
          </template>
          <div :class="[showXuqi ? '' : 'toogle-true', 'toogle']" slot="action">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
          <div v-show="showXuqi">
            <div v-for="(da, di) in detailData2.reFees" :key="di">
              <div v-if="di < 5 || (more2 && di >= 5)">
                <div class="content">
                  <n22-cell-item title="开户银行" :addon="da.bankName" />
                  <n22-cell-item
                    title="账号后四位"
                    :addon="da.accNo.length > 3 ? da.accNo.substring(da.accNo.length - 4, da.accNo.length) : '-'"
                  />
                  <n22-cell-item title="报盘日期" :addon="da.transDate" />
                  <n22-cell-item title="上载日期" :addon="da.confDate" />
                  <n22-cell-item title="银行处理结果" :addon="da.bankBackResult" />
                  <n22-cell-item title="交费方式" :addon="da.payMode | dealOptions('payMode')" />
                </div>
              </div>
              <div v-if="di !== detailData2.reFees.length - 1" class="my-bill-neck">
                <span></span>
              </div>
              <!-- <div v-if="di !== detailData2.reFees.length - 1" class="cut-line"></div> -->
            </div>
            <div v-if="detailData2.reFees && detailData2.reFees.length >= 5" @click="goMore(2)" class="more">
              <div>查看更多</div>
              <div><n22-icon name="right_arrow" size="md"></n22-icon></div>
            </div>
          </div>
        </n22-field>
      </transition>
      <transition name="n22-slide-left">
        <n22-field
          v-if="myTransition.show3"
          class="message-info-c"
          title="投保人信息"
          @headerClick="showHolder = !showHolder"
        >
          <template #head_title_left>
            <div class="title-line"></div>
          </template>
          <div :class="[showHolder ? '' : 'toogle-true', 'toogle']" slot="action">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
          <div v-if="showHolder && detailData" class="content">
            <n22-cell-item title="姓名" :addon="detailData.appntInfo.appntName" />
            <n22-cell-item title="证件类型" :addon="detailData.appntInfo.appntIDType | dealOptions('IDType')" />
            <n22-cell-item title="证件号码" :addon="detailData.appntInfo.appntIDNo | valueReplace" />
            <n22-cell-item title="证件有效止期" :addon="detailData.appntInfo.appntIDExpDate" />
            <n22-cell-item title="性别" :addon="detailData.appntInfo.appntSex | dealOptions('sex')" />
            <n22-cell-item title="出生日期" :addon="detailData.appntInfo.appntBirthday" />
            <n22-cell-item title="手机号码" :addon="detailData.appntInfo.appntMobile | valueReplace" />
            <n22-cell-item title="详细地址" :addon="detailData.appntInfo.appntPostalAddress" />
            <!-- <n22-cell-item title="客户分级" :addon="detailData.appntInfo.rank" /> -->
          </div>
        </n22-field>
      </transition>
      <transition name="n22-slide-left">
        <n22-field
          v-if="myTransition.show4"
          class="message-info-c"
          title="被保人信息"
          @headerClick="showInsured = !showInsured"
        >
          <template #head_title_left>
            <div class="title-line"></div>
          </template>
          <div :class="[showInsured ? '' : 'toogle-true', 'toogle']" slot="action">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
          <div v-if="showInsured">
            <div v-for="(da, di) in detailData.insuInfoList" :key="di">
              <div class="content">
                <n22-cell-item title="与投保人关系" :addon="da.relationToAppnt | dealOptions('relation')" />
                <n22-cell-item title="姓名" :addon="da.insuName" />
                <n22-cell-item title="证件类型" :addon="da.insuIDType | dealOptions('IDType')" />
                <n22-cell-item title="证件号码" :addon="da.insuIDNo | valueReplace" />
                <n22-cell-item title="证件有效止期" :addon="da.insuIDExpDate" />
                <n22-cell-item title="性别" :addon="da.insuSex | dealOptions('sex')" />
                <n22-cell-item title="出生日期" :addon="da.insuBirthday" no-border />
                <!-- <n22-cell-item title="手机号码" :addon="da.insuMobile | valueReplace" /> -->
                <!-- <n22-cell-item title="详细地址" :addon="da.insuPostalAddress" /> -->
                <!-- <n22-cell-item title="客户分级" :addon="da.rank" /> -->
              </div>
              <div v-if="di !== detailData.insuInfoList.length - 1" class="my-bill-neck">
                <span></span>
              </div>
            </div>
          </div>
        </n22-field>
      </transition>
      <transition name="n22-slide-left">
        <n22-field
          v-if="myTransition.show5"
          class="message-info-c"
          title="受益人信息"
          @headerClick="showBenfit = !showBenfit"
        >
          <template #head_title_left>
            <div class="title-line"></div>
          </template>
          <div :class="[showBenfit ? '' : 'toogle-true', 'toogle']" slot="action">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
          <div v-if="showBenfit">
            <div v-for="(da, di) in detailData.bnfInfoList" :key="di">
              <div class="content">
                <n22-cell-item title="姓名" :addon="da.bnfName" />
                <n22-cell-item title="证件类型" :addon="da.bnfIDType | dealOptions('IDType')" />
                <n22-cell-item title="证件号码" :addon="da.bnfIDNo | valueReplace" />
                <n22-cell-item title="证件有效止期" :addon="da.iDExpDate" />
                <n22-cell-item title="性别" :addon="da.bnfSex | dealOptions('sex')" />
                <n22-cell-item title="出生日期" :addon="da.bnfBirthDay" no-border />
                <!-- <n22-cell-item title="手机号码" :addon="da.allBnfMobile | valueReplace" /> -->
                <!-- <n22-cell-item title="详细地址" :addon="da.allBnfDetailAddress" /> -->
                <!-- <n22-cell-item title="客户分级" :addon="da.rank" /> -->
                <!-- <n22-cell-item title="被保人姓名" :addon="da.customerName" /> -->
              </div>
              <div v-if="di !== detailData.bnfInfoList.length - 1" class="my-bill-neck">
                <span></span>
              </div>
              <!-- <div v-if="di !== detailData.bnfInfoList.length - 1" class="cut-line"></div> -->
            </div>
          </div>
        </n22-field>
      </transition>
      <transition name="n22-slide-left">
        <n22-field
          v-if="myTransition.show6"
          class="message-info-c"
          title="保单信息"
          @headerClick="showPolice = !showPolice"
        >
          <template #head_title_left>
            <div class="title-line"></div>
          </template>
          <div :class="[showPolice ? '' : 'toogle-true', 'toogle']" slot="action">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
          <div v-if="showPolice">
            <div v-for="(da, di) in detailData.polInfoList" :key="di">
              <div class="content">
                <!-- <n22-cell-item title="保单号" :addon="detailData.contInfo.contNo" /> -->
                <n22-cell-item title="产品名称" :addon="da.riskName" />
                <!-- <n22-cell-item title="被保人姓名" :addon="da.insuName" /> -->
                <n22-cell-item title="保额">
                  <template #right>{{ da.amnt | doPrecision }}元</template>
                </n22-cell-item>
                <n22-cell-item title="保障生效日期" :addon="da.cValiDate" />
                <n22-cell-item title="保障满期日" :addon="da.endDate" />
                <n22-cell-item title="交费年期" :addon="`${da.payYears}年`" />
                <n22-cell-item title="交费频率" :addon="da.payIntv | dealOptions('payIntv')" />
                <n22-cell-item title="保费">
                  <template #right>{{ da.prem | doPrecision }}元</template>
                </n22-cell-item>
                <n22-cell-item title="险种状态" :addon="da.polState | dealOptions('policeStatus')" no-border />
                <!-- <n22-cell-item title="交费对应日(仅主险)" :addon="detailData.contInfo.payToDate" /> -->
              </div>
              <div v-if="di !== detailData.polInfoList.length - 1" class="my-bill-neck">
                <span></span>
              </div>
              <!-- <div v-if="di !== detailData.polInfoList.length - 1" class="cut-line"></div> -->
            </div>
          </div>
        </n22-field>
      </transition>
      <transition name="n22-slide-left">
        <n22-field
          v-if="myTransition.show7"
          class="message-info-c"
          title="垫交/贷款"
          @headerClick="showContInfo = !showContInfo"
        >
          <template #head_title_left>
            <div class="title-line"></div>
          </template>
          <div :class="[showContInfo ? '' : 'toogle-true', 'toogle']" slot="action">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
          <div v-if="showContInfo && detailData" class="content">
            <n22-cell-item title="当前贷款利率" :addon="detailData.contInfo.loanRate" />
            <n22-cell-item title="垫交金额" :addon="`${detailData.contInfo.payPremMoney || '- '}元`" />
            <n22-cell-item title="垫交金额始期" :addon="detailData.contInfo.payPremStrDate" />
            <n22-cell-item title="垫交金额止期" :addon="detailData.contInfo.loanEndDate" />
            <n22-cell-item title="垫交应还金额" :addon="`${detailData.contInfo.payPremRepayMoney || '- '}元`" />
            <n22-cell-item title="贷款金额" :addon="`${detailData.contInfo.loanMoney || '- '}元`" />
            <n22-cell-item title="贷款金额始期" :addon="detailData.contInfo.boanStarDate" />
            <n22-cell-item title="贷款金额止期" :addon="detailData.contInfo.loanEndDate" />
            <n22-cell-item title="贷款应还金额" :addon="`${detailData.contInfo.loanRepayMoney || '- '}元`" />
          </div>
        </n22-field>
      </transition>
      <transition name="n22-slide-left">
        <n22-field
          v-if="myTransition.show8"
          class="message-info-c"
          title="销售渠道信息"
          @headerClick="showChannel = !showChannel"
        >
          <template #head_title_left>
            <div class="title-line"></div>
          </template>
          <div :class="[showChannel ? '' : 'toogle-true', 'toogle']" slot="action">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
          <div v-for="(da, di) in detailData2.reFees" :key="di">
            <div v-if="showChannel" class="content">
              <n22-cell-item title="销售渠道" :addon="da.saleChnl" />
              <n22-cell-item title="服务机构" :addon="da.serviceCom" />
              <n22-cell-item title="销售机构" :addon="da.agentCom" />
              <n22-cell-item title="承保代理人姓名" :addon="da.agentName" />
              <n22-cell-item title="承保代理人工号" :addon="da.agentCode" />
              <n22-cell-item title="服务代理人姓名" :addon="da.serviceAgentName" />
              <n22-cell-item title="服务代理人工号" :addon="da.serviceAgentCode" />
            </div>
          </div>
        </n22-field>
      </transition>
      <transition name="n22-slide-left">
        <n22-field
          v-if="myTransition.show9"
          :class="['message-info-c', true ? 'message-table' : '']"
          title="交费历史"
          @headerClick="showreFeeInfo = !showreFeeInfo"
        >
          <template #head_title_left>
            <div class="title-line"></div>
          </template>
          <div :class="[showreFeeInfo ? '' : 'toogle-true', 'toogle']" slot="action">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
          <div v-if="showreFeeInfo">
            <table class="pro_table pro_table_01 wd01">
              <tr class="table_title_head">
                <td>交费年度</td>
                <td>交费类型</td>
                <td>现交至日期</td>
                <td>交费期数</td>
                <td>保单交费合计</td>
                <td>交费频率</td>
              </tr>
              <tr
                :class="['table_title', di % 2 === 1 ? 't-color' : '']"
                v-for="(da, di) in detailData2.reFeeInfoList"
                :key="di"
              >
                <td>{{ da.payYear || "-" }}</td>
                <td>{{ da.payType || "-" }}</td>
                <td>{{ da.payDate || "-" }}</td>
                <td>{{ da.payCount || "-" }}</td>
                <td>{{ da.payPrem || "-" | doPrecision }}</td>
                <td>{{ da.payIntv | dealOptions("payIntv") }}</td>
              </tr>
            </table>

            <!-- <div v-for="(da, di) in detailData2.reFeeInfoList" :key="di">
              <div class="content">
                <n22-cell-item title="交费年度" :addon="da.payYear" />
                <n22-cell-item title="交费类型" :addon="da.payType" />
                <n22-cell-item title="现交至日期" :addon="da.payDate" />
                <n22-cell-item title="交费期数" :addon="da.payCoun" />
                <n22-cell-item title="保单交费合计" :addon="da.payPrem" />
                <n22-cell-item title="交费频率" :addon="da.payIntv | dealOptions('payIntv')" />
              </div>
              <div v-if="di !== detailData2.reFeeInfoList.length - 1" class="cut-line"></div>
            </div> -->
          </div>
        </n22-field>
      </transition>
      <transition name="n22-slide-left">
        <n22-field
          v-if="myTransition.show10"
          class="message-info-c"
          title="续期服务记录"
          @headerClick="showHistory = !showHistory"
        >
          <template #head_title_left>
            <div class="title-line"></div>
          </template>
          <div :class="[showHistory ? '' : 'toogle-true', 'toogle']" slot="action">
            <n22-icon name="right_arrow"></n22-icon>
          </div>
          <div v-show="showHistory" class="contains-history-service">
            <n22-field :title="name" v-for="(year, name) in historyData" :key="name">
              <n22-cell-item
                v-show="item.allIndex <= 5 || more1"
                v-for="(item, index) in year"
                :brief="item.paytype"
                :title="item.monthday"
                :addon="item | showAddon"
                :key="index"
              >
                <circle-line slot="left"></circle-line>
              </n22-cell-item>
            </n22-field>
            <div v-if="allIndex >= 5" @click="goMore(1)" class="more">
              <div>查看更多</div>
              <div><n22-icon name="right_arrow" size="md"></n22-icon></div>
            </div>
            <!-- <n22-button v-if="allIndex >= 5" @click="goMore(1)" class="more" type="primary">查看更多</n22-button> -->
          </div>
        </n22-field>
      </transition>
    </al-content>
  </div>
</template>

<script>
import { mapState } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, CellItem, Field, Icon } from "al-mobile";
import CircleLine from "../components/CircleLine";
import { policyDetail, policyDetailWithhold, historyQuery } from "../service/getData";
import {
  IDType,
  relation,
  policeStatus,
  sex,
  payMode,
  payIntv,
  serviceType,
  premLimitCont,
} from "../components/options";
// const __is = require("@t/is");

export default {
  name: "policy-details", //保单详情
  props: {},
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Button.name]: Button,
    [CellItem.name]: CellItem,
    [Field.name]: Field,
    [Icon.name]: Icon,

    [CircleLine.name]: CircleLine,
  },
  filters: {
    dealOptions(val, op) {
      if (!val) {
        return "-";
      }
      const _options = { IDType, relation, policeStatus, sex, payMode, payIntv, serviceType, premLimitCont };
      console.log("%c >>>>>>>>>", "color:green;", _options);
      let ls = _options[op].find(item => item.value == val);
      return ls ? ls.text : "错误：<code>001";
    },
  },
  computed: {
    ...mapState(["renewal"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    showAddon() {
      return (con, item, di) => {
        let addon = "-";
        if (con.quta && item.addon) {
          addon = this.detailData[con.quta][di][item.addon] || "-";
        }
        if (item.addon.indexOf("Sex") > -1) {
          addon = addon == 1 ? "男" : "女";
        }
        return addon;
      };
    },
  },
  mounted() {
    let setB = function(i, __this) {
      if (i > 10) {
        clearInterval(__this.inT);
        return;
      }
      return true;
    };
    let _this = this;
    let i = 0;
    this.inT = setInterval(() => {
      if (this.$route.query.type == 1 && i == 2) {
        i = 5;
      } else if (this.$route.query.type != 1 && i == 7) {
        i = 8;
      }
      i++;
      _this.myTransition[`show${i}`] = setB(i, _this);
      // console.log("%c >>>>>>>>>>>", "color:green;", _this.myTransition);
    }, 500);
    if (!this.$route.query.contNo) {
      console.error("此页面url需要必须的<contNo>参数，请检查！");
      this.$toast({
        content:
          process.env.VUE_APP_ENV === "local"
            ? "此页面url需要必须的<contNo>参数，请检查！"
            : "错误(202008141722)：参数有误！",
        icon: "warn-color",
        position: "center",
        confirmText: "确定",
        duration: 3000,
      });
      return;
    }
    this.policyDetailWithholdFun();
    setTimeout(() => {
      this.historyQueryFun();
    }, 200);
    setTimeout(() => {
      this.policyDetailFun();
    }, 500);
  },
  watch: {},
  data() {
    return {
      myTransition: {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        show9: false,
        show10: false,
      },
      inT: "",
      showHolder: false,
      showInsured: false,
      showBenfit: false,
      showPolice: false,
      showContInfo: false,
      showreFeeInfo: false,
      showReFees: false,
      showChannel: false,
      showHistory: false,
      showXuqi: false,
      more1: false,
      allIndex: 0,
      more2: false,
      tabs: [
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
      detailData: "",
      detailData2: "",
      historyData: "",
    };
  },
  methods: {
    // toggleContent(con, ci) {
    //   con.show = !con.show;
    //   console.log("%c con.show>>>>>>>>>", "color:green;", con.show);
    //   this.$set(this.detailDataField, ci, con);
    // },
    goMore(type) {
      if (type === 1) {
        this.go("/renewal/historyService", {
          type: this.$route.query.type,
          contNo: this.$route.query.contNo,
          payToDate: this.$route.query.payToDate,
          isAdd: 2,
        });
      } else if (type === 2) {
        this.go("/renewal/withholdDetail", { type: this.$route.query.type, contNo: this.$route.query.contNo });
      }
    },
    historyQueryFun() {
      const axiosParams = {
        isLoadding: false,
        loaddingText: "数据请求中...",
      };
      let params = {
        contno: this.$route.query.contNo,
        historyType: this.renewal.historyType,
        paytodate: this.$route.query.payToDate,
      };
      historyQuery({ data: params, config: axiosParams }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
          this.historyData = data.data;
          this.allIndex = 0;
          for (const key in this.historyData) {
            const val = this.historyData[key];
            val.forEach(ll => {
              this.allIndex += 1;
              ll.allIndex = this.allIndex;
            });
          }
          console.log("%c this.historyData", "color:green;", this.historyData);
        },
        error => {
          console.log("%c error-demo", "color:#00CD00", error);
        },
      );
    },
    policyDetailFun() {
      const axiosParams = {
        isLoadding: true,
        loaddingText: "数据查询中...",
        timeout: 15000,
      };
      let params = {
        contNo: this.$route.query.contNo || "",
        prtNo: this.$route.query.prtNo || "",
      };
      if (!params.contNo && !params.prtNo) {
        console.log("%c PolicyDetails>>>>>>>policyDetailFun", "color:green;", "保单号、投保号必须存在一个！！！请检查");
        return;
      }
      policyDetail({ data: params, config: axiosParams }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
          this.detailData = data.data;
        },
        error => {
          console.log("%c error-demo", "color:#00CD00", error);
        },
      );
    },
    policyDetailWithholdFun() {
      const axiosParams = {
        isLoadding: false,
        loaddingText: "数据查询中...",
      };
      let params = {
        contNo: this.$route.query.contNo || "",
        creatDateStart: "",
        creatDateEnd: "",
      };
      if (!params.contNo && !params.prtNo) {
        console.log("%c PolicyDetails>>>>>>>policyDetailFun", "color:green;", "保单号、投保号必须存在一个！！！请检查");
        return;
      }
      policyDetailWithhold({ data: params, config: axiosParams }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
          this.detailData2 = data.data;
          // this.detailData.appntInfo = [this.detailData.appntInfo];
          // this.detailData.contInfo = [this.detailData.contInfo];
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
.my-bill-neck {
  position: relative;
  height: 18px;
  padding: 5px;
  margin: 0 14px;
  box-sizing: border-box;
  span {
    position: absolute;
    display: block;
    top: 50%;
    left: -15px;
    right: -15px;
    height: 1px;
    border-top: dashed 2px #ffca59;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 18px;
    height: 18px;
    border-radius: 9px;
    background-color: #f4f4f4;
  }
  &::before {
    left: -42px;
  }
  &::after {
    right: -42px;
  }
}
.message-info-c {
  overflow: hidden;
  ::v-deep &.n22-field {
    color: #434343;
    margin: 12px;
    box-shadow: 2px 2px 4px 2px rgba(210, 208, 208, 0.24);
    border-radius: 8px;
    .n22-field-header {
      margin-left: -20px;
      .n22-field-heading {
        // border-left: 3px solid #ffba01;
        // border-radius: 1.5px;
        background-color: #ffffff;
      }
      .n22-field-title {
        color: #333333;
        margin-left: 8px;
        font-size: 16px;
      }
    }
    .n22-cell-item-title {
      color: #8f8f8f;
      margin-left: 5px;
    }
    .n22-cell-item-right {
      color: #434343;
      font-weight: 500;
      max-width: 200px;
    }
  }
  position: relative;
  z-index: 3;
  padding-bottom: 0px;

  ::v-deep .n22-field-content {
    position: relative;
  }
  .title-line {
    width: 5px;
    height: 16px;
    background: #fdb92c;
    border-radius: 3px;
    float: left;
    margin: 0 13px 0 11px;
  }
  .toogle {
    transform: rotate(-90deg);
    transition: all 0.2s ease-out;
    color: #fdb92c;
  }
  .toogle-true {
    transform: rotate(90deg);
  }
}

.message-table {
  ::v-deep .n22-field-content {
    margin: 0 -19px 20px;
  }
}

.cut-line {
  height: 7px;
  // background-color: #f3f3f3;
  background-color: #ffde9b;
}
.more {
  // height: 30px;
  // width: 110px;
  margin: 10px auto;
  font-size: 12px;
  color: #7f7f7f;
  line-height: 17px;
  text-align: center;
  display: flex;
  justify-content: center;
  div:last-child {
    height: 8px;
    width: 8px;
    margin-left: 10px;
    transform: rotate(90deg);
  }
}
.contains {
  border-bottom: 6px solid rgba(252, 185, 46, 1);
  img {
    transition: all 0.2s ease-out;
  }
  ::v-deep .n22-cell-item-body {
    // height: 44px;
    min-height: 36px;
    padding: 0 20px;
    &::before {
      // left: -20px;
      // width: 100%;
      border-bottom: 0.533vw solid #ecedef;
    }
  }
}
.contains-history-service {
  ::v-deep .n22-field-title {
    font-size: 16px;
    color: #4b4b4b;
  }
  ::v-deep .n22-field-content {
    margin-left: 15px;
    .n22-cell-item-title {
      color: #fdb92c;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .n22-cell-item-brief {
      color: #fdb92c;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    .n22-cell-item-body {
      &:before {
        left: 16px;
      }
    }
    .multilines {
      padding-top: 0px !important;
      padding-bottom: 0px !important;
    }
  }
}
.contains:last-child {
  border-bottom: none;
}
.massage_title {
  height: 36px;
  background: rgba(246, 246, 246, 1);
  display: flex;
  align-items: center;
  color: #fdb92c;
  padding-left: 18px;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  img {
    display: inline-block;
    width: 15px;
    height: 8px;
    position: absolute;
    right: 17px;
  }
}
.content {
  background: rgba(255, 255, 255, 1);
  // overflow-y: scroll;
}
// table,
// table tr th,
// table tr td {
//   border: 1px solid #ecedef;
// }
.pro_table_01 {
  margin: 10px auto 0;
  tr:first-child {
    // background-color: #f8e4b8;
    background-color: #ffc64c94;
  }
}
.pro_table {
  width: 100%;
  &.wd01 {
    td:nth-child(1) {
      width: 14%;
    }
    td:nth-child(3) {
      width: 20%;
    }
    td:nth-child(4) {
      width: 15%;
    }
    td:nth-child(5) {
      width: 18%;
    }
    td {
      width: 17%;
    }
  }
  font-size: 12px;
  background-color: #ffffff;
  color: #333232;
  border-collapse: collapse;
  text-align: center;
  // width: 320px;
  .table_title {
    td {
      // color: #6e6e6e;
      color: #969696;
      padding: 10px 0;
      line-height: 16px;
    }
    &.t-color {
      background-color: #ffc64c5b;
      // background-color: #f7efde;
    }
  }
  .table_title_head {
    td {
      color: #333333;
      padding: 10px 10px;
      line-height: 16px;
      font-size: 14px;
    }
  }
}
</style>

<template>
  <div class="renewal-withhold-detail">
    <al-all-head></al-all-head>
    <al-content
      class="renewal-withhold-detail-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <div v-for="(da, di) in detailData2.reFees" :key="di">
        <div class="fee-head" @click="toogleClick(da, di)">
          <div class="con-1">
            <div>{{ da.transDate }}</div>
            <div>报盘日期</div>
          </div>
          <div class="con-2">
            <div>
              <div>{{ da.bankBackResult }}</div>
              <div>银行处理结果</div>
            </div>
            <n22-icon :class="[da.isShow ? '' : 'toogle-true', 'toogle']" name="right_arrow"></n22-icon>
          </div>
        </div>
        <transition name="n22-fade-down">
          <div class="con-con" v-if="da.isShow">
            <div class="con-con-1">
              <div>开户银行</div>
              <div>账号后四位</div>
              <div>上载日期</div>
              <div>交费方式</div>
            </div>
            <div class="con-con-2">
              <div>{{ da.bankName }}</div>
              <div>{{ da.accNo.length > 3 ? da.accNo.substring(da.accNo.length - 4, da.accNo.length) : "-" }}</div>
              <div>{{ da.confDate }}</div>
              <div>{{ da.payMode | dealOptions("payMode") }}</div>
            </div>
          </div>
        </transition>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Icon } from "al-mobile";
import { policyDetailWithhold } from "../service/getData";
import { payMode } from "../components/options";
export default {
  name: "renewal-withhold-detail", //使用xx-xx-xx命名方式具体看操作文档
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
    [Icon.name]: Icon,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c withhold-detail>生命周期>mounted", "color:green;", "");
    this.policyDetailWithholdFun();
  },
  filters: {
    dealOptions(val, op) {
      const _options = { payMode };
      console.log("%c >>>>>>>>>", "color:green;", _options);
      let ls = _options[op].find(item => item.value == val);
      return ls ? ls.text : "错误：<code>001";
    },
  },
  watch: {},
  data() {
    return {
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
      detailData2: "",
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    toogleClick(da, index) {
      da.isShow = !da.isShow;
      console.log("%c >>>>>>>>>>>>>>>>>>>>>", "color:green;", da.isShow);
      this.$set(this.detailData2.reFees, index, da);
    },
    policyDetailWithholdFun() {
      const axiosParams = {
        isLoadding: true,
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
.renewal-withhold-detail {
  .renewal-withhold-detail-content {
    .toogle {
      transform: rotate(-90deg);
      transition: all 0.2s ease-out;
      margin: auto 0 auto 11px;
      color: #c6c6c6;
    }
    .toogle-true {
      transform: rotate(90deg);
    }
    .fee-head {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      height: 80px;
      background: #ffffff;
      box-shadow: 2px 2px 4px 2px rgba(210, 208, 208, 0.24);
      div {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        div:last-child {
          color: #8f8f8f;
        }
      }
      .con-1 {
        margin: auto 0 auto 28px;
        div:first-child {
          color: #434343;
        }
      }
      .con-2 {
        div:first-child {
          color: #e45c5c;
        }
        margin: auto 20px auto 0;
        display: flex;
      }
    }
    .con-con {
      background-color: #ffffff;
      margin: 0 10px;
      display: flex;
      justify-content: space-between;
      box-shadow: 2px 2px 4px 2px rgba(210, 208, 208, 0.24);
      border-radius: 0px 0px 8px 8px;
      padding: 14px 30px 15px;
      div {
        font-size: 14px;
        line-height: 20px;
        div:not(:first-child) {
          margin-top: 13px;
        }
      }
      .con-con-1 {
        color: #8f8f8f;
      }
      .con-con-2 {
        color: #434343;
        text-align: right;
      }
    }
  }
}
</style>

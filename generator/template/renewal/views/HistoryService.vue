<template>
  <div class="renewal-history-service">
    <al-all-head hairline></al-all-head>
    <al-content
      class="renewal-history-service-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <n22-field :title="name" v-for="(year, name) in historyData" :key="name">
        <n22-cell-item
          :class="[isSee(item) ? '' : 'is-not-arrow']"
          v-for="(item, index) in year"
          :brief="isSee(item) ? item.paytype : ' '"
          :title="item.monthday"
          :addon="item | showAddon"
          :key="index"
          :arrow="isSee(item)"
          @click="addRecordOrSee('see', item)"
        >
          <circle-line slot="left"></circle-line>
        </n22-cell-item>
      </n22-field>
      <n22-button v-if="$route.query.isAdd == 1" @click="addRecordOrSee('add')" class="add-c" type="primary"
        >新增</n22-button
      >
    </al-content>
  </div>
</template>

<script>
import { mapState } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, CellItem, Field } from "al-mobile";
import { historyQuery } from "../service/getData";
import CircleLine from "../components/CircleLine";

export default {
  name: "renewal-history-service", //使用xx-xx-xx命名方式具体看操作文档
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
    [CellItem.name]: CellItem,
    [Button.name]: Button,
    [Field.name]: Field,

    [CircleLine.name]: CircleLine,
  },
  computed: {
    ...mapState(["common", "renewal"]), //引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    isSee() {
      return item => {
        if (item.nopayreason.indexOf("12") > -1 || item.nopayreason.indexOf("13") > -1) {
          return (item.isSee = false);
        }
        return (item.isSee = true);
      };
    },
  },
  mounted() {
    console.log("%c history-service>生命周期>mounted", "color:green;", "");
    if (
      !this.$route.query.isAdd ||
      !this.$route.query.contNo ||
      !this.$route.query.payToDate ||
      !(this.renewal.historyType + "")
    ) {
      console.error("此页面url需要必须的<isAdd,contNo,payToDate>、vuex的<historyType>参数，请检查！");
      this.$toast({
        content:
          process.env.VUE_APP_ENV === "local"
            ? "此页面url需要必须的<isAdd,contNo,payToDate>、vuex的<historyType>参数，请检查！"
            : "错误(202008141722)：参数有误！",
        position: "string",
        confirmText: "确定",
        duration: 3000,
      });
      return;
    }
    this.historyQueryFun();
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
      historyData: "",
    };
  },
  activated() {
    console.log("%c activated>>>>>>>>>>>>>", "color:green;", this.common.routers);
    if (this.common.routers.from.name === "renewalAddRecord" && this.$route.query.isAdd == 1) {
      this.historyQueryFun();
    }
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    historyQueryFun() {
      const axiosParams = {
        isLoadding: true,
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
        },
        error => {
          console.log("%c error-demo", "color:#00CD00", error);
        },
      );
    },
    addRecordOrSee(type, item) {
      if (item) {
        if (item.isSee === false) {
          console.log("%c 保单服务记录不支持查看服务详情>>>>>>>>>>>>>>>>>>>>", "color:green;", "");
          return;
        }
        window.utils.cache.set("recordData", item);
      }
      this.go("/renewal/addRecord", {
        contNo: this.$route.query.contNo,
        payToDate: this.$route.query.payToDate,
        type: type,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.renewal-history-service {
  .renewal-history-service-content {
    ::v-deep .not-swiper-div {
      background-color: #ffffff;
    }
    ::v-deep .n22-field-title {
      font-size: 16px;
      color: #4b4b4b;
    }
    ::v-deep .n22-field-content {
      margin-left: 15px;
      .n22-cell-item-title {
        color: #fdb92c;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .n22-cell-item-brief {
        color: #fdb92c;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 6px;
      }
      .n22-cell-item-body {
        &:before {
          left: 16px;
        }
      }
      .is-not-arrow {
        .n22-cell-item-right {
          margin-right: 16px;
        }
      }
      .multilines {
        padding-top: 0px !important;
        padding-bottom: 0px !important;
      }
    }

    .add-c {
      width: 280px;
      height: 44px;
      margin: 20px auto;
    }
  }
}
</style>

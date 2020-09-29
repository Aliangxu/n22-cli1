<template>
  <div>
    <al-all-head title="续期任务">
      <div slot="head_bottom">
        <n22-tab-bar
          ref="listMenu"
          v-model="curIndex"
          :items="tabs"
          :maxLength="5"
          :ink-length="50"
          @change="changeTab"
        ></n22-tab-bar>
      </div>
    </al-all-head>
    <al-content
      v-model="curIndex"
      ref="listSwiper"
      :swiperTop="44"
      :tabWidth="187.5"
      :tabs="tabs"
      :page="page"
      @selectListByPage="selectListByPage"
      isMescrollLoadList
    >
      <!-- 列表数据 -->
      <div slot-scope="props">
        <renewal-list
          :dataList="props.list"
          :swiperIndex="props.swiperIndex"
          :id="props.id"
          @policyDetails="policyDetails"
          @renewalService="renewalService"
          @historyService="historyService"
          :buttonType="1"
          :headTip="curIndex + 2"
        >
          <template v-if="curIndex === 0" #content_content="{item}">
            <div class="list-detail">
              <div>保单号</div>
              <div>{{ item.contno }}</div>
            </div>
            <div class="list-detail">
              <div>应交日期</div>
              <div>{{ item.paytodate && item.paytodate.replace(" 00:00:00", "") }}</div>
            </div>
            <div class="list-detail">
              <div>保费</div>
              <div>{{ item.sumduepaymoney | doPrecision }}元</div>
            </div>
          </template>
          <template v-else #content_content="{item}">
            <div class="list-detail">
              <div>申请日期</div>
              <div>{{ (item.applicationdate && item.applicationdate.replace(" 00:00:00", "")) || "-" }}</div>
            </div>
            <div class="list-detail">
              <div>挽单止期</div>
              <div>{{ (item.applicationdate && item.applicationdate.replace(" 00:00:00", "")) || "-" }}</div>
            </div>
            <div class="list-detail">
              <div>主险名称</div>
              <div>{{ item.mainProductName || "-" }}</div>
            </div>
          </template>
        </renewal-list>
      </div>
    </al-content>
    <service-page ref="servicePage"></service-page>
  </div>
</template>

<script>
import { mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, TabBar } from "al-mobile";
import RenewalList from "../components/RenewalList";
import ServicePage from "../components/ServicePage";
import { renewalTaskQuery } from "../service/getData";
const searchModelJson = { name: "", age: "" };
export default {
  name: "renewal-task", //续期任务
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [TabBar.name]: TabBar,
    [RenewalList.name]: RenewalList,
    [ServicePage.name]: ServicePage,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    this.HISTORYTYPE(0);
  },
  watch: {},
  data() {
    return {
      searchModel: JSON.parse(JSON.stringify(searchModelJson)),
      page: {
        pagenum: 1,
        size: 10,
      },
      curIndex: 0,
      tabs: [
        //content组件对象
        {
          label: "续收任务",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
        },
        {
          label: "挽单任务",
          name: 1,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
        },
      ],
      title: "",
    };
  },
  methods: {
    ...mapMutations([
      //提交vuex-state更改样例
      "HISTORYTYPE",
    ]),
    changeTab(item, i, curIndex) {
      this.HISTORYTYPE(i);
      console.log("%c curIndex", "color:#00CD00", curIndex);
      //如果contet内容区使用了列表content-list组件并且开启了needSwiper通过ref去操作content-list组件的changeTab切换内容区（具体可以移步content查看参数）
      console.log("%c this.$refs.listSwiper", "color:#00CD00", this.$refs.listSwiper);
      this.$refs.listSwiper.changeTab && this.$refs.listSwiper.changeTab(i);
      // this.tabs[i].mescroll.triggerDownScroll();
    },
    selectListByPage(tabIndex, item, pageNum, pageSize, successCallback, errorCallback) {
      let params = {
        page: pageNum,
        serviceAgentCode: window.utils.cache.get(window.globalConfig.AppUserInfoCacheKey).agentCode,
        taskCategory: tabIndex + "",
      };
      renewalTaskQuery({ data: params }).then(
        data => {
          var listData = [];
          listData = data.data;
          successCallback && successCallback(listData);
        },
        error => {
          errorCallback && errorCallback(error);
        },
      );
    },
    policyDetails(item) {
      //保单详情
      this.go("/renewal/policyDetails", {
        type: this.$route.query.type,
        payToDate: item.paytodate && item.paytodate.replace(" 00:00:00", ""),
        contNo: item.contno,
        prtNo: item.prtNo,
        enddate: item.enddate && item.enddate.replace(" 00:00:00", ""),
        shouldmoney: item.shouldmoney,
        p5: item.p5,
      });
    },
    renewalService(item) {
      //保单服务
      this.$refs.servicePage.$_showActionSheet(item);
    },
    historyService(item) {
      //历史服务
      console.log("%c item>>>>>>>>>>>>>>>>>", "color:green;", item);
      //记录历史
      const params = {
        contNo: item.contno,
        payToDate: item.paytodate && item.paytodate.replace(" 00:00:00", ""),
        isAdd: this.$route.query.type == 1 ? 2 : 1,
      };
      this.go("/renewal/historyService", params);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .n22-tab-bar-item {
  // font-weight: 600;
  &.is-active {
    font-size: 16px;
  }
}
.list-detail {
  display: flex;
  justify-content: space-between;
  &.list-detail:nth-child(2) {
    margin-top: 6px;
  }
  &.list-detail:last-child {
    margin-bottom: 8px;
  }
  div {
    line-height: 20px;
    margin-top: 5px;
  }
  div:first-child {
    font-size: 14px;
    color: #8f8f8f;
    margin-left: 10px;
    text-align: justify;
    width: 64px;
    height: 20px;
    &:after {
      display: inline-block;
      content: "";
      width: 100%;
    }
  }
  div:last-child {
    font-size: 14px;
    font-weight: 500;
    color: #484848;
    margin-right: 8px;
  }
}
.call_box {
  width: 315px;
  background: #fff;
  padding: 18px 0 36px 0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  .border {
    width: 97px;
    height: 97px;
    border: 1px solid rgba(255, 240, 208, 1);
    border-radius: 50%;
    padding: 11px;
    .border_two {
      width: 100%;
      height: 100%;
      border: 1px solid #fdc248;
      border-radius: 50%;
      img {
        display: block;
        width: 52px;
        height: 52px;
      }
    }
  }
}
.border,
.border_two {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

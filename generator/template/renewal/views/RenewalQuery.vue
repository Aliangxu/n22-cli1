<template>
  <div class="renewal-query">
    <al-all-head :title="title" @click-right="isSearchPopup = !isSearchPopup">
      <div slot="head_bottom">
        <n22-tab-bar
          ref="listMenu"
          v-model="curIndex"
          :items="tabs"
          :maxLength="5"
          :ink-length="50"
          @change="changeTab"
        ></n22-tab-bar>
        <!-- 时间区间查询2 -->
        <div class="query-box">
          <span class="borderLeft"></span>
          <p class="title">{{ tabs[curIndex].searchTimeName }}</p>
          <div class="gsb-search">
            <div class="search-date-div">
              <n22-drop-select
                v-model="searchForm.startTime"
                type="date"
                :minDate="minDate"
                :maxDate="maxDate"
                :isAppendTo="true"
                resetText="重置"
                @changeData="$_changeData(1)"
                @onPickerReset="$_pickerReset(1, 1)"
              ></n22-drop-select>
            </div>
            <span>一</span>
            <div class="search-date-div">
              <n22-drop-select
                v-model="searchForm.endTime"
                type="date"
                :minDate="minDate"
                :maxDate="maxDate"
                :isAppendTo="true"
                resetText="重置"
                @changeData="$_changeData(1)"
                @onPickerReset="$_pickerReset(2, 1)"
              ></n22-drop-select>
            </div>
          </div>
          <n22-icon @click="reset(1)" class="reset-c" name="reset" size="md" svg></n22-icon>
        </div>
        <div class="query-box" v-if="tabs[curIndex].listType === 'FAILURE_OR_PAD'">
          <span class="borderLeft"></span>
          <p class="title">{{ tabs[curIndex].searchTimeName2 }}</p>
          <div class="gsb-search">
            <div class="search-date-div">
              <n22-drop-select
                v-model="searchForm.padStartDate"
                type="date"
                :minDate="minDate"
                :maxDate="maxDate"
                :isAppendTo="true"
                resetText="重置"
                @changeData="$_changeData(2)"
                @onPickerReset="$_pickerReset(1, 2)"
              ></n22-drop-select>
            </div>
            <span>一</span>
            <div class="search-date-div">
              <n22-drop-select
                v-model="searchForm.padEndDate"
                type="date"
                :minDate="minDate"
                :maxDate="maxDate"
                :isAppendTo="true"
                resetText="重置"
                @changeData="$_changeData(2)"
                @onPickerReset="$_pickerReset(2, 2)"
              ></n22-drop-select>
            </div>
          </div>
          <n22-icon @click="reset(2)" class="reset-c" name="reset" size="lg" svg></n22-icon>
        </div>
      </div>
      <template slot="right" v-if="$route.query.type == '0'">
        <span>
          <n22-icon color="#FDB92C" name="search" size="lg"></n22-icon>
        </span>
      </template>
    </al-all-head>
    <al-content
      class="entry-index-view-content"
      v-model="curIndex"
      ref="listSwiper"
      :swiperTop="$route.query.type != 99 ? (tabs[curIndex].listType === 'FAILURE_OR_PAD' ? 183 : 110) : 47"
      :tabWidth="187.5"
      :tabs="tabs"
      :page="page"
      @selectListByPage="selectListByPage"
      isMescrollLoadList
      htmlNodata="<p class='upwarp-nodata'>-- 无更多数据 --</p>"
    >
      <template #default="{list,id,swiperIndex}">
        <renewal-list
          :dataList="list"
          :swiperIndex="swiperIndex"
          :id="id"
          :buttonType="2"
          :headTip="1"
          @policyDetails="policyDetails"
          @policyService="policyService"
          @recordHistory="recordHistory"
        >
          <!-- 时间区间查询 -->
          <template slot="content_content" slot-scope="props">
            <list-content-xq :data="props.item"></list-content-xq>
          </template>
        </renewal-list>
      </template>
    </al-content>
    <n22-popup v-model="isSearchPopup" position="right" :style="{ top: headTopVW }">
      <div class="search-popup-content">
        <div class="title">
          <img src="../assets/images/renewalQuery.png" alt="" />
          <span>查询条件</span>
        </div>
        <div class="search-form">
          <search-renewal v-model="searchForm" v-if="$route.query.type == 0"></search-renewal>
          <!-- <search-supervise v-model="searchForm" v-else-if="$route.query.type == 1"></search-supervise> -->
          <!-- <search-branch v-model="searchForm" v-else-if="$route.query.type == 2"></search-branch> -->
        </div>
        <div class="search-button">
          <n22-button @click="resetFun">重置</n22-button>
          <n22-button @click="searchFun" type="primary">查询</n22-button>
        </div>
      </div>
    </n22-popup>
    <service-page ref="servicePage"></service-page>
  </div>
</template>

<script>
import { AllHead, Content, Button, TabBar, Icon, Popup, DropSelectItem, InputItem } from "al-mobile";
import RenewalList from "../components/RenewalList";
import SearchPage from "../components/SearchPage";
import ServicePage from "../components/ServicePage";
import SearchRenewal from "../components/SearchRenewal";
// import SearchSupervise from "../components/SearchSupervise";
// import SearchBranch from "../components/SearchBranch";
import ListContentXQ from "../components/ListContentXQ";
import "@/assets/icons/reset.svg";

import _cloneDeep from "lodash/cloneDeep";
import _isEqual from "lodash/isEqual";

import { pagingQuery } from "../service/getData";
// import icon2_join_nodata from "../assets/images/icon2_join_nodata.png";
export default {
  name: "renewal-query", // 续收查询
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [Button.name]: Button,
    [DropSelectItem.name]: DropSelectItem,
    [InputItem.name]: InputItem,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [TabBar.name]: TabBar,
    [ServicePage.name]: ServicePage,
    [SearchPage.name]: SearchPage,
    [RenewalList.name]: RenewalList,
    [SearchRenewal.name]: SearchRenewal,
    // [SearchSupervise.name]: SearchSupervise,
    // [SearchBranch.name]: SearchBranch,
    [ListContentXQ.name]: ListContentXQ,
  },
  computed: {
    headTopVW() {
      return this.dealPxToVw(this.allHeadTopPx + 1) + "vw";
    },
  },
  mounted() {
    console.log("%c renewal-query>生命周期>mounted", "color:green;", "");
    this.searchFormLS = _cloneDeep(this.searchForm);
  },
  watch: {},
  data() {
    return {
      title: this.$parent.queryList[this.$route.query.type].name,
      isSearchPopup: false,
      maxDate: new Date("2099/01/01"),
      minDate: new Date("1999/01/01"),
      page: {
        pagenum: 1,
        size: 5,
      },
      curIndex: 0,
      searchFormLS: "",
      searchForm: {
        startTime: "",
        endTime: "",
        padStartDate: "",
        padEndDate: "",
        orgCode: "",
        comCode: "",
        appntName: "",
        payYear: [],
        contNo: "",
        serveragentname: "",
        bankBranchCode: "",
      },
      tabs: [
        {
          label: "即将缴费",
          searchTimeName: "应交日期",
          name: 0,
          listType: "ABOUT_PAY",
          mescroll: null,
          list: "",
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
          emptyProp: {
            tip: "暂无相关数据~",
          },
        },
        {
          label: "应收未收",
          searchTimeName: "应交日期",
          name: 1,
          listType: "RECEIVABLE_BUT_NOT",
          mescroll: null,
          list: "",
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
          emptyProp: {
            tip: "暂无相关数据~",
          },
        },
        {
          label: "收费成功",
          searchTimeName: "缴费日期",
          name: 2,
          listType: "SUCCESSFUL_CHARGE",
          mescroll: null,
          list: "",
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
          emptyProp: {
            tip: "暂无相关数据~",
          },
        },
        {
          label: "即将失效",
          searchTimeName: "应交日期",
          name: 3,
          listType: "ABOUT_LAPSE",
          mescroll: null,
          list: "",
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
          emptyProp: {
            tip: "暂无相关数据~",
          },
        },
        {
          label: "失效或垫交",
          searchTimeName: "失效日期",
          searchTimeName2: "垫交日期",
          name: 4,
          listType: "FAILURE_OR_PAD",
          mescroll: null,
          list: "",
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
          emptyProp: {
            tip: "暂无相关数据~",
          },
        },
      ],
      serviceShow: false,
    };
  },
  methods: {
    reset(type) {
      if (
        this.searchForm[type === 1 ? "startTime" : "padStartDate"] ||
        this.searchForm[type === 1 ? "endTime" : "padEndDate"]
      ) {
        this.searchForm[type === 1 ? "startTime" : "padStartDate"] = "";
        this.searchForm[type === 1 ? "endTime" : "padEndDate"] = "";
        this.tabs[this.curIndex].list = [];
        this.tabs[this.curIndex].mescroll.resetUpScroll();
      }
    },
    $_pickerReset(timetype, type) {
      timetype === 1 && (this.searchForm[type === 1 ? "startTime" : "padStartDate"] = "");
      timetype === 2 && (this.searchForm[type === 1 ? "endTime" : "padEndDate"] = "");
      if (
        !this.searchForm[type === 1 ? "startTime" : "padStartDate"] &&
        !this.searchForm[type === 1 ? "endTime" : "padEndDate"]
      ) {
        console.log("%c 更改时间进行重置下拉刷新>>>>>>>>>", "color:green;", "");
        this.tabs[this.curIndex].list = [];
        this.tabs[this.curIndex].mescroll.resetUpScroll();
      }
    },
    $_changeData(type) {
      console.log("%c >>>>>>>>>>", "color:green;", this.searchForm[type === 1 ? "startTime" : "padStartDate"]);
      if (
        this.searchForm[type === 1 ? "startTime" : "padStartDate"] &&
        this.searchForm[type === 1 ? "endTime" : "padEndDate"]
      ) {
        if (
          this.searchForm[type === 1 ? "startTime" : "padStartDate"] >
          this.searchForm[type === 1 ? "endTime" : "padEndDate"]
        ) {
          this.$toast({
            content: "日期起期不可晚于日期止期，日期止期不可早于日期起期",
            icon: "warn-color",
            iconSvg: true,
            position: "center",
            duration: 3000,
          });
          return;
        }
        console.log("%c 更改时间进行重置下拉刷新>>>>>>>>>", "color:green;", "");
        this.tabs[this.curIndex].list = [];
        this.tabs[this.curIndex].mescroll.resetUpScroll();
      }
    },
    resetFun() {
      this.resetParams();
      this.searchFun();
    },
    resetParams() {
      this.searchForm = {
        startTime: this.searchForm.startTime,
        endTime: this.searchForm.endTime,
        padStartDate: this.searchForm.padStartDate,
        padEndDate: this.searchForm.padEndDate,
        orgCode: "",
        comCode: "",
        appntName: "",
        payYear: [],
        contNo: "",
        serveragentname: "",
        bankBranchCode: "",
      };
    },
    searchFun() {
      this.isSearchPopup = false;
      console.log("%c >>>>>>>>>>>>>>>>>>this.tabs", "color:green;", this.tabs);
      this.tabs[this.curIndex].list = [];
      this.tabs[this.curIndex].mescroll.resetUpScroll();
    },
    changeTab(item, i, curIndex) {
      // if (!this.tabs[curIndex].isListInit) {
      //   this.resetParams();
      // }
      console.log("%c curIndex", "color:#00CD00", curIndex);
      this.$refs.listSwiper.changeTab && this.$refs.listSwiper.changeTab(i);
      console.log("%c >>>>>>>>>>>>>>this.tabs[i]", "color:green;", item);
      if (!_isEqual(this.searchForm, this.tabs[i].searchFormLS)) {
        console.log("%c >>>>>>>>>>>>>>>>>搜索对象不一致进行重置查询操作", "color:orange;", "");
        if (this.tabs[i].list) {
          this.tabs[i].list = [];
          this.tabs[i].mescroll.resetUpScroll();
        }
        //查询重置操作完成后将临时缓存替换成最新的搜索对象
        this.tabs[i].searchFormLS = _cloneDeep(this.searchForm);
      }
    },
    selectListByPage(tabIndex, item, pageNum, pageSize, successCallback, errorCallback) {
      const axiosParams = {
        isLoadding: false,
        loaddingText: "数据请求中...",
      };
      let testlogin = {
        qtype: this.$route.query.type,
        tabName: this.tabs[tabIndex].listType,
        startDate: this.searchForm.startTime,
        endDate: this.searchForm.endTime,
        padStartDate: this.searchForm.padStartDate,
        padEndDate: this.searchForm.padEndDate,
        comCode:
          this.searchForm.orgCode && !this.searchForm.comCode ? this.searchForm.orgCode : this.searchForm.comCode,
        appntName: this.searchForm.appntName,
        payYear: this.searchForm.payYear,
        contNo: this.searchForm.contNo,
        agentName: "",
        agentCode: window.utils.cache.get(window.globalConfig.AppUserInfoCacheKey).agentCode,
        serverAgent: this.$route.query.agentCode,
        bankBranchCode: this.$route.query.bankBranchCode || "",
        page: pageNum,
        startTMakedate: "",
        endTMakedate: "",
        startEnddate: "",
        endEnddate: "",
      };
      pagingQuery({ data: testlogin, config: axiosParams }).then(
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
    policyService(item) {
      //保单服务
      this.$refs.servicePage.$_showActionSheet(item);
    },
    recordHistory(item) {
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
.query-box {
  width: 100%;
  height: 60px;
  background: #fff;
  margin-top: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 10px hsla(0, 0%, 60%, 0.1);
  .title {
    margin-left: -8px;
  }
}
.search-popup-content {
  width: 269px;
  height: 100%;
  background: #fff;
  .title {
    height: 41px;
    display: flex;
    align-items: center;
    // border-bottom: 5px solid rgba(236, 237, 239, 1);
    img {
      display: block;
      width: 20px;
      height: 20px;
      margin: 0 10px 0 13px;
    }
    span {
      display: block;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(116, 116, 116, 1);
      line-height: 20px;
    }
  }
  .search-form {
    border-top: 5px solid #ecedef;
    ::v-deep.n22-field-item-title {
      padding-left: 10px;
    }
  }
  .search-button {
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
    button {
      height: 40px;
      width: 100px;
    }
    button:first-child {
      background-color: #d8d8d8;
      color: #ffffff;
    }
  }
}

span.borderLeft {
  display: block;
  width: 4px;
  height: 12px;
  background: rgba(253, 194, 72, 1);
  border-radius: 2px;
  margin: 0 4px 0 10px;
}
p.title {
  width: 87px;
  // height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(253, 194, 72, 1);
  line-height: 20px;
}
.gsb-search {
  display: flex;
  align-items: center;
  position: relative;
  // left: 40px;
  left: 5px;
  span {
    color: #666666;
    display: block;
    margin: 0 7px;
  }
  .search-date-div {
    width: 95px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgba(216, 215, 215, 1);
    outline: none;
    color: rgba(216, 215, 215, 1);
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .n22-drop-select .n22-field-item .n22-field-item-content .n22-field-item-right .n22-icon {
      display: none;
    }
  }
  ::v-deep .n22-field-item-right-addon {
    color: #666f83;
  }
  ::v-deep .n22-field-item-right {
    margin-left: 0 !important;
  }
  ::v-deep .is-select {
    .n22-field-item-right-addon {
      color: #d8d7d7;
    }
  }
}
.reset-c {
  // margin-left: 22px;
  margin-left: 18px;
  color: $theme-color;
  font-weight: 500;
  width: 19px !important;
  height: 19px !important;
}
// .entry-index-view-content {
//   ::v-deep .mescroll {
//     background: #fff;
//     .empty-icon {
//       width: 68px;
//       height: 72px;
//       margin-top: 100px;
//       margin-bottom: 39px;
//     }
//   }
// }
.gsb-search {
  ::v-deep .n22-drop-select {
    .n22-icon {
      display: none;
    }
  }
}
</style>

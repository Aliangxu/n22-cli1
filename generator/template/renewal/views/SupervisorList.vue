<template>
  <div class="renewal-supervisor-list">
    <al-all-head :title="myTitle" @click-right="isSearchPopup = !isSearchPopup">
      <div slot="head_bottom" class="search-head-bottom" v-if="$route.query.type == 1">
        <div class="search-agent">
          <n22-icon color="#b5b5b5" name="search" size="lg"></n22-icon>
          <input
            v-if="$route.query.type == 1"
            v-model="searchForm.serveragentname"
            type="text"
            placeholder="请输入代理人姓名"
          />
          <input
            v-else-if="$route.query.type == 2"
            v-model="searchForm.bankBranchCode"
            type="text"
            placeholder="请输入网点名称"
          />
        </div>
      </div>
      <template slot="right" class="head-right-children">
        <span>
          <n22-icon color="#FDB92C" name="search" size="lg"></n22-icon>
        </span>
      </template>
    </al-all-head>
    <al-content
      class="renewal-supervisor-list-content"
      ref="insureMessage"
      :tabs="tabs"
      :swiperTop="$route.query.type == 1 ? 70 : 2"
      :isToTop="true"
      :page="page"
      dataListId="supervisor-list"
      isMescrollLoadList
      @selectListByPage="selectListByPage"
      htmlNodata="<p class='upwarp-nodata'>-- 无更多数据 --</p>"
    >
      <template #default="{list,id}">
        <div :id="id">
          <div class="my-content-list">
            <n22-cell-item
              v-for="(item, index) in list"
              :key="index"
              :title="item[$route.query.type == 1 ? 'serveragentname' : 'agentcomname'] || '-'"
              @click="goDetailList(item)"
            >
              <template #right>
                <span class="not-receive">应收未收</span>
                <span class="receive-piece">{{ item.receivable }}</span
                >/
                <span class="now-invalid">即将失效</span>
                <span class="invalid-piece">{{ item.lapse }}</span>
              </template>
            </n22-cell-item>
          </div>
        </div>
      </template>
    </al-content>
    <n22-popup v-model="isSearchPopup" position="right" :style="{ top: headTopVW }">
      <div class="search-popup-content">
        <div class="title">
          <img src="../assets/images/renewalQuery.png" alt="" />
          <span>查询条件</span>
        </div>
        <div class="search-form">
          <!-- <search-renewal v-model="searchForm" v-if="$route.query.type == 0"></search-renewal> -->
          <search-supervise
            :isSearchPopup="isSearchPopup"
            v-model="searchForm"
            v-if="$route.query.type == 1"
          ></search-supervise>
          <search-branch
            :isSearchPopup="isSearchPopup"
            v-model="searchForm"
            v-else-if="$route.query.type == 2"
          ></search-branch>
        </div>
        <div class="search-button">
          <n22-button @click="resetFun">重置</n22-button>
          <n22-button @click="searchFun" type="primary">查询</n22-button>
        </div>
      </div>
    </n22-popup>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, Button, CellItem, Icon, Popup } from "al-mobile";
import SearchSupervise from "../components/SearchSupervise";
import SearchBranch from "../components/SearchBranch";
import { supervisorQuery, outletsQuery } from "../service/getData";

import _throttle from "lodash/throttle";

export default {
  name: "renewal-supervisor-list", //使用xx-xx-xx命名方式具体看操作文档
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
    [CellItem.name]: CellItem,
    [Icon.name]: Icon,
    [Popup.name]: Popup,

    [SearchSupervise.name]: SearchSupervise,
    [SearchBranch.name]: SearchBranch,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    headTopVW() {
      return this.dealPxToVw(this.allHeadTopPx + 1) + "vw";
    },
  },
  mounted() {
    console.log("%c supervisor-list>生命周期>mounted", "color:green;", "");
  },
  watch: {
    "searchForm.serveragentname"() {
      this.searchChange();
    },
    // "searchForm.bankBranchCode"() {
    //   this.searchChange();
    // },
  },
  data() {
    return {
      myTitle: this.$route.query.type == 1 ? "督导查询" : "银行网点查询",
      isSearchPopup: false,
      tabs: [
        //content组件对象
        {
          label: "默认单个列表不展示",
          name: 0,
          listType: "1",
          mescroll: null,
          list: [],
          isListInit: false,
          isMescrollUp: true,
          upCallbackFun: "selectListByPage",
        },
      ],
      searchForm: {
        startTime: "",
        endTime: "",
        orgCode: "",
        comCode: "",
        appntName: "",
        payYear: [],
        contNo: "",
        serveragentname: "",
        bankBranchCode: "",
        agentName: "",
      },
      //分页参数
      page: {
        pagenum: 1,
        size: 10,
        time: null,
      },
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    searchChange: _throttle(function() {
      this.tabs[0].list = [];
      this.tabs[0].mescroll.resetUpScroll();
    }, 1500),
    resetFun() {
      this.resetParams();
      this.searchFun();
    },
    resetParams() {
      this.searchForm = {
        startTime: "",
        endTime: "",
        orgCode: "",
        comCode: "",
        appntName: "",
        payYear: [],
        contNo: "",
        serveragentname: "",
        bankBranchCode: "",
        agentName: "",
        agentCode: "",
      };
    },
    searchFun() {
      this.isSearchPopup = false;
      this.tabs[0].list = [];
      this.tabs[0].mescroll.resetUpScroll();
    },
    goDetailList(item) {
      this.go("/renewal/renewalQuery", {
        agentCode: item.serveragent,
        type: this.$route.query.type,
        bankBranchCode: item.agentcom,
      });
    },
    selectListByPage(tabIndex, item, pageNum, pageSize, successCallback, errorCallback) {
      const axiosParams = {
        isLoadding: false,
        loaddingText: "数据请求中...",
      };
      let params = {
        qtype: this.$route.query.type,
        startDate: this.searchForm.startTime,
        endDate: this.searchForm.endTime,
        comCode:
          this.searchForm.orgCode && !this.searchForm.comCode ? this.searchForm.orgCode : this.searchForm.comCode,
        appntName: this.searchForm.appntName,
        payYear: this.searchForm.payYear,
        contNo: this.searchForm.contNo,
        agentName: this.searchForm.serveragentname,
        agentCode: window.utils.cache.get(window.globalConfig.AppUserInfoCacheKey).agentCode,
        agentCom: this.searchForm.bankBranchCode,
        page: pageNum,
      };
      const supAndout = this.$route.query.type === "1" ? supervisorQuery : outletsQuery;
      supAndout({ data: params, config: axiosParams }).then(
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
    selectListByPage_ls(tabIndex, item, pageNum, pageSize, successCallback, errorCallback) {
      //==========↓↓↓↓↓↓此部分为给定模拟数据--真实情况将其删除
      let dataList = [];
      for (let i = 0; i < 100; i++) {
        dataList.push({
          serveragentname: "里玉" + i,
          agentcomname: "里玉1123" + i,
          receivable: i + 5,
          lapse: i + 2,
          serveragent: "1100000006",
          agentcom: "11213",
        });
      }
      //==========↑↑↑↑↑↑此部分为给定模拟数据--真实情况将其删除
      //请求参数
      let req = {
        name: this.searchForm.appntName,
        age: this.searchForm.orgCode,
      };
      console.log("%c selectListByPage", "color:#00CD00", tabIndex);
      setTimeout(() => {
        // eslint-disable-next-line no-constant-condition
        if (1 === 1) {
          //成功回掉--模拟true
          let listData = [];
          //==========↓↓↓↓↓↓此部分为模拟返回数据分页处理--真实情况将其替换为接口成功返回取list逻辑
          for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
            if (i >= dataList.length) break;
            if (req.name) {
              if (dataList[i].name.indexOf(req.name) !== -1) {
                //模拟搜索
                listData.push(dataList[i]);
              }
              //用完之后重置请求参数对象
              this.resetSearch();
            } else {
              listData.push(dataList[i]);
            }
          }
          listData = tabIndex === 2 ? [] : listData;
          //==========↑↑↑↑↑↑此部分为模拟返回数据分页处理--真实情况将其替换为接口成功返回取list逻辑
          // 回调
          successCallback && successCallback(listData);
        } else {
          //失败回掉
          errorCallback && errorCallback();
        }
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.renewal-supervisor-list {
  .search-head-bottom {
    padding-top: 18px;
    padding-bottom: 17px;
    background-color: #ffffff;
    margin-top: 3px;
    .search-agent {
      width: 346px;
      height: 34px;
      line-height: 34px;
      border-radius: 17px;
      // padding: 0 15px;
      border: 1px solid #b5b5b5;
      // margin-top: 18px;
      margin: auto;
      // &:focus {
      //   border-radius: 17px;
      //   border: 1px solid red;
      // }
      input {
        outline: none;
        border: none;
        width: 112px;
        line-height: 25px;
        margin-left: 8px;
        &::-webkit-input-placeholder {
          color: #c2c2c2;
          font-size: 14px;
        }
      }
    }
  }
  .renewal-supervisor-list-content {
    .my-content-list {
      background-color: #ffffff;
      ::v-deep.n22-cell-item {
        .n22-cell-item-content {
          margin-left: 16px;
          font-size: 15px;
          font-weight: 500;
          color: #333333;
        }
        .n22-cell-item-right {
          margin-right: 15px;
          color: #b5b5b5;
        }
      }
      .not-receive {
        color: #b5b5b5;
        margin-right: 4px;
      }
      .receive-piece {
        color: #fdb92c;
        margin-right: 7px;
      }
      .now-invalid {
        color: #b5b5b5;
        margin-right: 3px;
        margin-left: 8px;
      }
      .invalid-piece {
        color: #f33c3c;
        // margin-right: 7px;
      }
    }
  }
  .search-popup-content {
    width: 269px;
    min-height: 100%;
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
}
</style>

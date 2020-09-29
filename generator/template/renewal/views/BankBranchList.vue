<template>
  <div class="renewal-bank-branch-list">
    <al-all-head>
      <div slot="head_bottom" class="search-head-bottom">
        <div class="search-agent">
          <n22-icon name="search" size="lg"></n22-icon>
          <input type="text" placeholder="请输入网点名称" />
        </div>
      </div>
      <template slot="right" class="head-right-children">
        <span>
          <n22-icon class="search" name="search" size="lg"></n22-icon>
        </span>
      </template>
    </al-all-head>
    <al-content
      class="renewal-bank-branch-list-content"
      ref="insureMessage"
      :tabs="tabs"
      :swiperTop="70"
      :isToTop="true"
      isMescrollLoadList
      :page="page"
      @selectListByPage="selectListByPage"
    >
      <template #default="{list,id}">
        <div :id="id" class="my-content-list">
          <n22-cell-item
            v-for="(item, index) in list"
            :key="index"
            :title="item.name"
            :addon="item.time"
            @click="goDetailList(item)"
          ></n22-cell-item>
        </div>
      </template>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content, CellItem, Icon } from "al-mobile";
export default {
  name: "renewal-bank-branch-list", //使用xx-xx-xx命名方式具体看操作文档
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
    [Icon.name]: Icon,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c bank-branch-list>生命周期>mounted", "color:green;", "");
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
        contno: "",
        serveragentname: "",
        bankBranchCode: "",
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
    goDetailList(item) {
      this.go("/renewal/renewalQuery", { agentCode: item.agentCode, type: 1 });
    },
    selectListByPage(tabIndex, item, pageNum, pageSize, successCallback, errorCallback) {
      //==========↓↓↓↓↓↓此部分为给定模拟数据--真实情况将其删除
      let dataList = [];
      for (let i = 0; i < 100; i++) {
        dataList.push({
          name: "里玉" + i,
          time: "11/" + i,
          agentCode: "1100000006",
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
        if (true) {
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
.renewal-bank-branch-list {
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
      ::v-deep .n22-icon {
        color: #b5b5b5;
      }
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
  .renewal-bank-branch-list-content {
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
          margin-right: 21px;
          color: #b5b5b5;
        }
      }
    }
  }
}
</style>

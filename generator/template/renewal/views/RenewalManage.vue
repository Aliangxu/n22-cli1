<template>
  <div class="renewal-renewal-manage">
    <al-all-head back-url="hybrid-back"></al-all-head>
    <al-content
      class="renewal-renewal-manage-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <ul class="list">
        <li v-for="(item, index) in listModules" :key="index" @click="goPage(item.path)">
          <div class="rotundity" :style="{ background: item.backgroundColor }">
            <img :src="item.Icon" />
          </div>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </al-content>
  </div>
</template>

<script>
import { mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content } from "al-mobile";
export default {
  name: "renewal-manage", //续期管理
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
  },
  data() {
    return {
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
      listModules: [
        {
          name: "续期任务",
          Icon: require("../assets/images/task.png"),
          backgroundColor: "#B9E2A4",
          path: "renewalTask",
        },
        {
          name: "续期服务",
          Icon: require("../assets/images/service.png"),
          backgroundColor: "#FFDA8E",
          path: "renewalService",
        },
        // {
        //   name: "催缴明细",
        //   Icon: require("../assets/images/service.png"),
        //   backgroundColor: "#ABB7F8",
        //   path: "renewalService",
        // },
      ],
    };
  },
  methods: {
    ...mapMutations([
      //提交vuex-state更改样例
      "HISTORYTYPE",
    ]),
    goPage(path) {
      switch (path) {
        case "renewalTask":
          this.$router.push({
            path: path,
          });
          break;
        default:
          this.HISTORYTYPE(2);
          this.$router.push({
            path: "renewalService",
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.renewal-renewal-manage {
  .renewal-renewal-manage-content {
    .list {
      display: flex;
      width: 100%;
      margin-top: 10px;
      li {
        border-left: 1px solid #ecedef;
        flex-grow: 1;
        height: 100px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
        .rotundity {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 16px 0 13px 0;
          img {
            display: block;
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
}
.borderRight {
  border-right: 1px solid #ecedef;
}
</style>

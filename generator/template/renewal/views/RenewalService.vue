<template>
  <div>
    <al-all-head></al-all-head>
    <!-- <ul>
      <li v-for="(item, index) in $parent.queryList" :key="index" @click="queryBtnConfig(item, index)">
        {{ item.name }}
        <img src="../assets/images/right.png" alt />
      </li>
    </ul> -->
    <al-content
      class="renewal-renewal-manage-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <!-- <ul>
        <li v-for="(item, index) in $parent.queryList" :key="index" @click="queryBtnConfig(item, index)">
          {{ item.name }}
          <img src="../assets/images/right.png" alt />
        </li>
      </ul> -->
      <n22-field class="cell-c">
        <n22-cell-item
          :title="item.name"
          v-for="(item, index) in $parent.queryList"
          :key="index"
          @click="queryBtnConfig(item, index)"
          arrow
        ></n22-cell-item>
      </n22-field>
    </al-content>
  </div>
</template>

<script>
import { AllHead, Content, CellItem, Field } from "al-mobile";
export default {
  name: "renewal-service", //续期服务
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    [AllHead.name]: AllHead,
    [Content.name]: Content,
    [CellItem.name]: CellItem,
    [Field.name]: Field,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {},
  watch: {},
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
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    queryBtnConfig(item, index) {
      this.go(`/renewal/${item.path}`, { type: index });
    },
  },
};
</script>

<style lang="scss" scoped>
// ul li {
//   height: 44px;
//   display: flex;
//   align-items: center;
//   padding: 0 0 0 16px;
//   font-size: 15px;
//   font-family: PingFangSC-Medium, PingFang SC;
//   font-weight: 500;
//   color: rgba(51, 51, 51, 1);
//   border-top: 1px solid rgba(236, 237, 239, 1);
//   background: #fff;
//   position: relative;
//   img {
//     display: inline-block;
//     width: 14px;
//     height: 14px;
//     position: absolute;
//     right: 21px;
//   }
// }
.cell-c {
  margin-top: 3.5px;
  padding: 0;
  ::v-deep .n22-cell-item {
    .n22-cell-item-body {
      padding: 0 15px;
      min-height: 44px;
      .n22-cell-item-title {
        font-weight: 500;
        color: #333;
        font-size: 15px;
      }
    }
  }
}
</style>

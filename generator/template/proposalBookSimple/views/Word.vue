<template>
  <div class="proposalBookSimple-word">
    <al-all-head></al-all-head>
    <!-- <al-content
      class="proposalBookSimple-word-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    > -->
    <div style="height: 100%;">
      <iframe
        src="https://xinyidongzhanyeguangsubao-st-1254235118.cos.ap-beijing.myqcloud.com/PC/productConfig/productInfoManage/terms/2020-07-24/1595578321283_%E7%88%B1%E5%A4%9A%E5%A4%9A.pdf"
        frameborder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
    <!-- </al-content> -->
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content } from "al-mobile";
export default {
  name: "proposal-book-simple-word", //使用xx-xx-xx命名方式具体看操作文档
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
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c word>生命周期>mounted", "color:green;", "");
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
  },
};
</script>

<style lang="scss" scoped>
.n22-proposal-book-simple-child-view {
  height: 100%;
}
.proposalBookSimple-word {
  .proposalBookSimple-word-content {
  }
}
</style>

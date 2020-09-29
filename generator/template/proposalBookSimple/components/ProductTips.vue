<template>
  <div class="ft">
    <div class="text_25" @click="goWordShow">保险条款</div>
    <div class="summary_18">*以上资料仅供理解使用，保险公司<br />与您的一切权利与义务以保险条款为准。</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
// import { AllHead, Content } from "al-mobile";
export default {
  name: "product-tips", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    master: {
      //props定义样例
      type: [Object, String],
      default: () => {
        return "";
      },
    },
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c product-tips>生命周期>mounted", "color:green;", "");
  },
  watch: {},
  data() {
    return {};
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    ...mapMutations([
      //提交vuex-state更改样例
      "WORDSHOW",
    ]),
    goWordShow() {
      const tk = this.master;
      const outLink = `//${tk.terms}`;
      this.WORDSHOW({ title: tk.name, url: outLink });
      this.go("", { isPdf: true });
      // this.go("proposalBookSimple/word");
    },
  },
};
</script>

<style lang="scss" scoped>
.is-absolute {
  bottom: 0px;
  width: 100%;
  animation: my-slide-down 0.5s both ease;
}
@keyframes my-slide-down {
  0% {
    opacity: 0;
    transform: translate(0, 100%);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}
.ft {
  text-align: center;
  // margin-top: 30px;
  background-color: #fdb92c;
  height: 60px;
  padding-top: 5px;
  // margin-bottom: 44px;
  // position: absolute;
  // bottom: 0px;
  .text_25 {
    text-align: center;
    height: 20px;
    line-height: 20px;
    white-space: nowrap;
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
  }
  .summary_18 {
    // padding-top: 20px;
    margin: 2px 14px 0;
    height: 34px;
    line-height: 17px;
    color: #ffffff;
    font-size: 11px;
    transform: scale(0.9);
  }
}
</style>

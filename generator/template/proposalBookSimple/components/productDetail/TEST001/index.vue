<template>
  <div class="proposalBookSimple-product-detail">
    我是测试产品-TEST001
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { Icon } from "al-mobile";
export default {
  name: "TEST001", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    //headBottom: {//props定义样例
    //   type: Boolean,
    //   default: true,
    //},
  },
  components: {
    [Icon.name]: Icon,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c product-detail>生命周期>mounted", "color:green;", "");
  },
  watch: {},
  data() {
    return {
      test: "我是测试产品-TEST001",
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
::v-deep .not-swiper-div {
  background-color: #ffffff;
}
::v-deep .n22-button::after {
  border: 1px solid #d9d9d9;
}
.all_toogle {
  &.toogle {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0);
    width: 20px;
    height: 20px;
  }
  .n22-icon {
    padding: 2px;
    color: #fbcf42;
    display: inline-block;
    transform: rotate(90deg);
    transition: 0.2s;
  }
  &.toogle-down {
    // transform: rotate(-90deg)!important;
    .n22-icon {
      transform: rotate(-90deg);
      transition: 0.2s;
    }
  }
}
@import "./index.scss";
</style>

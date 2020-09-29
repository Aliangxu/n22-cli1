<template>
  <!-- <component :is="productCode"></component> -->
  <router-view></router-view>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
// import HCT023 from "./HCT023";
export default {
  name: "product-detail", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    productCode: {
      //props定义样例
      type: String,
      default: "",
    },
  },
  components: {
    // HCT023,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {
    console.log("%c product-detail>生命周期>mounted", "color:green;", "");
  },
  watch: {},
  data() {
    return {};
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
  },
};
</script>

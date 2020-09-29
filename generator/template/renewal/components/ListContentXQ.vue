<template>
  <div class="content-con">
    <div class="detail">
      <div>
        <div class="riskname">
          {{ data.riskname.replace("光大永明", "") }}
        </div>
        <div class="contno">
          {{ data.contno }}
        </div>
      </div>
      <div class="money">
        {{ data.shouldmoney | doPrecision }}
        <span>元</span>
      </div>
    </div>
    <div class="detail">
      <div class="time">
        <div>{{ data.paytodate | dealAllData }}</div>
        <div>应交日起期</div>
      </div>
      <div class="time">
        <div>{{ data.enddate | dealAllData }}</div>
        <div style="text-align: right;">应交日止期</div>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content } from "al-mobile";
export default {
  name: "list-content-xq", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    data: {
      //props定义样例
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [AllHead.name]: AllHead,
    [Content.name]: Content,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
  },
  mounted() {},
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
.content-con {
  margin: 13px 10px 20px;
  .detail {
    display: flex;
    justify-content: space-between;
    .riskname {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: #484848;
    }
    .contno {
      margin-top: 2px;
      font-size: 14px;
      font-weight: 400;
      color: #585858;
      line-height: 20px;
      letter-spacing: 1px;
    }
    .money {
      font-size: 16px;
      font-weight: 500;
      color: #fdb92c;
      line-height: 20px;
      display: flex;
      span {
        margin-left: 3px;
        font-size: 14px;
        font-weight: 500;
        color: #8f8f8f;
        transform: scale(0.8);
        // line-height: 13px;
      }
    }
    .time {
      margin-top: 13px;
      div:first-child {
        font-size: 14px;
        font-weight: 500;
        color: #484848;
        line-height: 20px;
      }
      div:last-child {
        font-size: 12px;
        font-weight: 400;
        // color: #8f8f8f;
        color: #666f83;
        line-height: 17px;
      }
    }
  }
}
</style>

<template>
  <div class="brokerageKpi-administration-allowance">
    <al-all-head :title="title"></al-all-head>
    <al-content
      class="brokerageKpi-administration-allowance-content"
      ref="insureMessage"
      :tabs="tabs"
      :isMescrollDown="true"
      :isToTop="true"
    >
      <!--      <div class="canvas-content">-->
      <!--        <canvas id="lineChart" canvas-id="lineChart"></canvas>-->
      <!--      </div>-->
      <div class="content-detail margin-top">
        <div class="detail-title">
          <div class="detail-title-icon"></div>
          <div v-if="zu">直辖组NPC</div>
          <div v-if="bu">直辖部NPC</div>
          <div v-if="qu">直辖区NPC</div>
        </div>
        <div class="detail-table-content">
          <div class="detail-table">
            <div class="detail-table-title">当前</div>
            <div class="detail-table-title">{{ n }}</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title">上一档</div>
            <div class="detail-table-title">{{ nl }}</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title border-right">最高档</div>
            <div class="detail-table-title border-right">{{ nm }}</div>
          </div>
        </div>
      </div>
      <div class="content-detail margin-top">
        <div class="detail-title">
          <div class="detail-title-icon"></div>
          <div>奖金率</div>
        </div>
        <div class="detail-table-content">
          <div class="detail-table">
            <div class="detail-table-title">当前</div>
            <div class="detail-table-title">{{ r }}</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title">上一档</div>
            <div class="detail-table-title">{{ rl }}</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title border-right">最高档</div>
            <div class="detail-table-title border-right">{{ rm }}</div>
          </div>
        </div>
      </div>
      <div class="content-detail margin-top">
        <div class="detail-title">
          <div class="detail-title-icon"></div>
          <div v-if="zu">直辖组继续率</div>
          <div v-if="bu">直辖部继续率</div>
          <div v-if="qu">直辖区继续率</div>
        </div>
        <div class="detail-table-content">
          <div class="detail-table">
            <div class="detail-table-title">当前</div>
            <div class="detail-table-title">{{ b }}</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title">上一档</div>
            <div class="detail-table-title">{{ bl }}</div>
          </div>
          <div class="detail-table">
            <div class="detail-table-title border-right">最高档</div>
            <div class="detail-table-title border-right">{{ bm }}</div>
          </div>
        </div>
      </div>
    </al-content>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { AllHead, Content } from "al-mobile";
export default {
  name: "bkge-examine-administration-allowance", //使用xx-xx-xx命名方式具体看操作文档
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
    console.log("%c administration-allowance>生命周期>mounted", "color:green;", "");
    let currentLevel = this.$route.query["level"];
    if (currentLevel == "B11" || currentLevel == "B21" || currentLevel == "B31") {
      this.title = "直辖组管理津贴";
      this.zu = true;
    } else if (currentLevel == "B41" || currentLevel == "B51" || currentLevel == "B61") {
      this.title = "直辖部管理津贴";
      this.bu = true;
    } else if (currentLevel == "B71") {
      this.title = "直辖区管理津贴";
      this.qu = true;
    }
  },
  create() {
    // this.draw();
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
          isMescrollUp: false,
          upCallbackFun: "",
        },
      ],
      title: "",
      level: this.$route.query["level"],
      zu: false,
      bu: false,
      qu: false,
      n: this.$route.query["n"],
      nl: this.$route.query["nl"],
      nm: this.$route.query["nm"],
      r: this.$route.query["r"],
      rl: this.$route.query["rl"],
      rm: this.$route.query["rm"],
      b: this.$route.query["b"],
      bl: this.$route.query["bl"],
      bm: this.$route.query["bm"],
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
.brokerageKpi-administration-allowance {
  .brokerageKpi-administration-allowance-content {
    .canvas-content {
      width: 100%;
      height: 254px;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 10px;
      margin-top: 10px;
      canvas {
        width: 100%;
        height: 100%;
      }
    }
    .content-detail {
      background: rgba(255, 255, 255, 1);
      box-sizing: border-box;
      padding: 14px 0 20px 14px;
      .detail-title {
        height: 22px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: rgba(253, 185, 44, 1);
        padding-bottom: 8px;
        .detail-title-icon {
          width: 5px;
          height: 12px;
          background: rgba(253, 185, 44, 1);
          border-radius: 3px;
          margin-right: 7px;
        }
      }
      .detail-table-content {
        width: 100%;
        display: flex;
        .detail-table {
          display: flex;
          flex-direction: column;
          .detail-table-title {
            width: 116px;
            height: 35px;
            box-sizing: border-box;
            font-size: 10px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            border: 1px solid rgba(213, 213, 213, 1);
            border-right: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .border-right {
            border-right: 1px solid rgba(213, 213, 213, 1);
          }
          :first-child {
            background: rgba(255, 251, 244, 1);
            font-size: 10px;
            border-bottom: none;
          }
        }
      }
    }
    .margin-top {
      margin-top: 10px;
    }
  }
}
</style>

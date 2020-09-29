<template>
  <div class="product-benefit">
    <div class="main-title">
      <div class="color_4" />
      <span>主要保障利益：</span>
    </div>
    <div class="product-benefit-content" v-if="benefitArray.length > 0">
      <div class="bonus-wrap">
        <span class="age">
          被保人
          <span>{{ selectIndex + parseInt(insured.age) }}</span>
          周岁时保单利益如下：
        </span>
      </div>
      <div class="button-arr" v-if="getBenefitData.multiLevel">
        <n22-button @click="zdgButton = 1" type="warning" :plain="zdgButton !== 1" inline
          >3.00%<br />低档利率</n22-button
        >
        <n22-button @click="zdgButton = 2" type="warning" :plain="zdgButton !== 2" inline
          >4.5%<br />中档利率</n22-button
        >
        <n22-button @click="zdgButton = 3" type="warning" :plain="zdgButton !== 3" inline
          >6.00%<br />高档利率</n22-button
        >
      </div>
      <div class="explicit" v-for="(item, i) in getBenefitData.title" :key="i">
        <div style="max-width: 80%">{{ item[0].replace("：", "") }}</div>
        <div v-if="getBenefitData.arrayData[selectIndex]">
          {{ getBenefitData.arrayData[selectIndex][i] }}
          {{ item[0].indexOf("保险单年度末") > -1 ? "年" : getBenefitData.arrayData[selectIndex][i] ? "元" : "" }}
        </div>
      </div>
      <div class="slider" v-if="isShow">
        <div class="slider-btn minus" @click="sliderClick(-1)"></div>
        <div class="slider-btn plus" @click="sliderClick(1)"></div>
        <div class="runway-wrap">
          <div class="runway-inner">
            <transition name="n22-fade">
              <n22-slider v-if="sliderMax > 0" v-model="selectIndex" :min="0" :max="sliderMax"></n22-slider>
            </transition>
          </div>
        </div>
      </div>
      <div class="slider-tips">
        <span>拖动按钮查看不同年龄段保单利益</span>
      </div>
    </div>
    <div class="explain">
      <div class="title">
        <div class="color_4" />
        <span>特别提示说明：</span>
      </div>
      <div>1、以上保险金给付，均假设保险事故发生在等待期过后，本保险产品等待期为90天。</div>
      <div>2、以上各项保险金给付条件请详见《光大永明爱多多重大疾病保险》条款。</div>
    </div>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { slider } from "al-mobile";
// import benefitArray from "./benefitArray";
export default {
  name: "product-benefit", //使用xx-xx-xx命名方式具体看操作文档
  props: {
    insured: {
      //props定义样例
      type: Object,
      default: () => {
        return {};
      },
    },
    benefitFamilies: {
      //props定义样例
      type: [Array, String],
      default: () => {
        return [];
      },
    },
  },
  components: {
    [slider.name]: slider, //引入组件样例如此
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    getBenefitData() {
      console.log("%c >>>>>>>>>>>>>>9999999", "color:green;", this.benefitArray[this.selectMasterIndex]);
      return this.benefitArray[this.selectMasterIndex];
    },
  },
  created() {},
  mounted() {
    console.log("%c product-benefit>生命周期>mounted", "color:green;", "");
    // this.dealData();
  },
  watch: {
    benefitFamilies(newVal) {
      console.log("%c benefitFamilies-change>>>>>>>>>>>>>>>>", "color:green;", "");
      newVal && this.dealData();
    },
  },
  data() {
    return {
      isShow: false,
      selectIndex: 0,
      selectMasterIndex: 0,
      sliderMax: 120,
      benefitArray: [],
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    dealData() {
      this.isShow = false;
      this.selectIndex = 0;
      this.benefitArray = [];
      this.benefitFamilies.forEach((ma, mi) => {
        let master = ma;
        if (master.singleLevel && master.singleLevel.length > 0) {
          const rowls = master.singleLevel.length - 1;
          const row = master.singleLevel[rowls].length;
          master.title = master.singleLevel.slice(0, row);
          master.arrayData = master.singleLevel.slice(row, rowls + 1);
          if (mi === 0) {
            this.sliderMax = parseInt(master.arrayData.length) - 1;
          }
        }
        this.benefitArray.push(master);
        console.log("%c this.benefitArray", "color:green;", this.benefitArray);
      });
      let _this = this;
      setTimeout(() => {
        _this.isShow = true;
      }, 100);
      console.log("%c >>>>>>>>>>>>>this.sliderMax", "color:green;", this.sliderMax);
    },
    sliderClick(step) {
      //slider的按钮加减点击
      if ((this.selectIndex < this.sliderMax && step > 0) || (this.selectIndex > 0 && step < 0)) {
        this.selectIndex = this.selectIndex + step;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.product-benefit {
  background-color: #ffffff;
  .main-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(251, 207, 66, 1);
    line-height: 22px;
    padding: 15px 10px;
    position: relative;
    span {
      margin-left: 15px;
    }
    .color_4 {
      margin: 8px 0px;
    }
  }
  .product-benefit-content {
    padding-top: 20px;
    background-color: #fff4d3;
    margin: 0 10px;
    .bonus-wrap {
      font-size: 15px;
      padding: 10px 20px;
      .jiazhi {
        background: linear-gradient(180deg, $theme-color, #fb4847);
        border-radius: 3px;
        span {
          font-size: 13px;
          font-weight: bold;
          color: #fffefe;
          margin: 8px;
        }
      }
      .age {
        // margin-left: 15px;
        font-size: 14px;
        span {
          font-weight: bold;
          font-size: 17px;
          color: $theme-color;
        }
      }
    }
    .explicit {
      margin: 7px auto 0;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      span {
        color: $theme-color;
        font-weight: bold;
      }
    }
    ::v-deep.n22-slider {
      &::before {
        background-color: #ffeaa8;
      }
      .n22-slider-bar {
        background-color: $theme-color;
      }
      .n22-slider-handle span {
        // background-color: $theme-color;
        // border: 1px solid #fdd042;
        background-image: url("../assets/images/tip.png");
        background-size: 100%;
        background-color: #fcce41;
        box-shadow: none;
      }
      // .n22-slider-handle:before {
      //   content: " ";
      //   text-align: center;
      //   height: 11px;
      //   width: 11px;
      //   position: absolute;
      //   background-color: #fdd042;
      //   border-radius: 100%;
      //   margin: 8px;
      // }
    }
    //滑动
    .slider {
      position: relative;
      width: 100%;
      padding: 5px 0;
      margin-top: 14px;
      .minus {
        left: 5px;
      }
      .slider-btn {
        z-index: 20;
        position: absolute;
        top: 50%;
        width: 44px;
        height: 44px;
        font-size: 32px;
        line-height: 40px;
        text-align: center;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        -webkit-tap-highlight-color: transparent;
      }
      .slider-btn:after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        height: 3px;
        width: 18px;
      }
      .plus {
        right: 5px;
      }
      .plus:before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 3px;
        height: 18px;
      }
      .minus:after,
      .plus:before,
      .plus:after,
      .tooltip {
        background-color: $theme-color;
      }
      .runway-wrap {
        padding: 0px 65px;
      }
      .runway-inner {
        padding: 5px 0;
      }
      .runway {
        background-color: #e0e0e0;
      }
      .runway {
        width: 100%;
        height: 8px;
        margin: 0 auto;
        border-radius: 100px;
        position: relative;
        cursor: pointer;
        vertical-align: middle;
      }
    }
    .slider-tips {
      text-align: center;
      color: #999;
      font-size: 12px;
      padding-bottom: 35px;
    }
  }
  .explain {
    margin: 15px 10px 0;
    padding-bottom: 20px;
    font-size: 12px;
    color: #333333;
    line-height: 17px;
    .title {
      // font-weight: 500;
      // color: #333333;
      font-size: 14px;
      font-weight: 500;
      color: rgba(251, 207, 66, 1);
      margin-bottom: 10px;
      position: relative;
      span {
        margin-left: 15px;
      }
    }
    div:nth-child(2) {
      line-height: 18px;
    }
    div:nth-child(3) {
      margin-top: 10px;
      line-height: 18px;
    }
  }
  .color_4 {
    // margin-right: 5px;
    margin: 5px 0px;
    position: absolute;
    border-radius: 6px;
    background-color: #fdb92c;
    width: 6px;
    height: 6px;
  }
}
</style>

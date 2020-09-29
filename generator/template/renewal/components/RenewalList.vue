<template>
  <div>
    <!-- <div class="query-box" v-if="buttonType === 2">
      <slot name="dateQuery"></slot>
    </div> -->
    <ul class="list" v-for="(item, $index) in dataList" :key="item.id">
      <slot name="content_list" :item="item" :index="$index">
        <li class="my-content">
          <div :class="['content-head', `content-head-${headTip}`]">
            <div class="holder-c">
              <span class="line"></span>
              <span>投保人 </span>
              <span>{{ item.appntname }}</span>
              <img v-if="item.p1 === 'Y' || item.wCFlag === 'Y'" class="my-icon" src="../assets/images/wechat.png" />
            </div>
            <div v-if="headTip === 1" class="pay-year">第{{ item.payyear }}保单年度</div>
            <div v-else-if="headTip === 2" class="pay-book">
              <div class="pay-border" :style="tip(item.pushtype, 1)">
                {{ item.pushtype | dealOptions("policyStatus") }}
              </div>
              <div class="pay-triangle" :style="tip(item.pushtype, 2)"></div>
            </div>
            <div v-else-if="headTip === 3" class="policy-status">待处理</div>
          </div>
          <slot name="content_content" :item="item" :index="$index"></slot>
        </li>
      </slot>
      <slot name="bottom_button" :item="item" :index="$index">
        <li class="clearfix">
          <div style="float:right">
            <!-- 功能按钮区 -->
            <button
              class="button-array"
              v-for="(bu, index) in buttonList"
              :key="index"
              @click="buttonConfig(bu.functionName, item)"
            >
              <div>
                <img :src="require(`../assets/images/${bu.icon}.png`)" />
                <span>{{ bu.name }}</span>
              </div>
            </button>
          </div>
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>
import { policyStatus } from "./options";
export default {
  name: "renewal-list",
  props: {
    dataList: {
      //props定义样例
      type: [Array, String],
      default: () => {
        return [];
      },
    },
    swiperIndex: {
      default: "0",
    },
    buttonType: {
      default: 1,
    },
    headTip: {
      default: 99,
    },
  },
  filters: {
    dealOptions(val, op) {
      const _options = { policyStatus };
      console.log("%c >>>>>>>>>", "color:green;", _options);
      let ls = _options[op].find(item => item.value == val);
      return ls ? ls.text : "错误：<code>001";
    },
  },
  computed: {
    tip() {
      return (status, type) => {
        const tiplsbg = {
          backgroundColor: "",
        };
        const tiplsbor = {
          borderTopColor: "",
        };
        switch (status) {
          case "0":
            tiplsbg.backgroundColor = "#FFDD72";
            tiplsbor.borderTopColor = "#D8BC65";
            break;
          case "1":
            tiplsbg.backgroundColor = "#feca94";
            tiplsbor.borderTopColor = "#d5a26d";
            break;
          case "2":
            tiplsbg.backgroundColor = "#FF9C9C";
            tiplsbor.borderTopColor = "#C58787";
            break;
          case "3":
            tiplsbg.backgroundColor = "#B6EEAE";
            tiplsbor.borderTopColor = "#9DCD96";
            break;
          case "4":
            tiplsbg.backgroundColor = "#A6C7FF";
            tiplsbor.borderTopColor = "#82A2D9";
            break;

          default:
            break;
        }
        return type === 1 ? tiplsbg : tiplsbor;
      };
    },
  },
  mounted() {
    if (this.buttonType === 1) {
      this.buttonList = [
        { name: "保单详情", functionName: "policyDetails", icon: "detail" },
        { name: "保单服务", functionName: "renewalService", icon: "heart" },
        { name: "服务记录", functionName: "historyService", icon: "service-history" },
      ];
    } else {
      this.buttonList = [
        { name: "保单详情", functionName: "policyDetails", icon: "detail" },
        { name: "保单服务", functionName: "policyService", icon: "heart" },
        { name: "服务记录", functionName: "recordHistory", icon: "service-history" },
      ];
    }
  },
  watch: {
    swiperIndex(val) {
      console.log("%c idswiperIndex", "color:green;", val);
    },
  },
  data() {
    return {
      buttonList: [],
      isPopupShow: false,
    };
  },
  methods: {
    buttonConfig(functionName, item) {
      // if (functionName) {
      //   eval("this." + functionName + "()");
      // }
      this.$emit(functionName, item);
    },
    policyDetails() {
      //保单详情
      this.$emit("policyDetails");
    },
    renewalService() {
      //续收服务
      this.$emit("renewalService");
    },
    historyService() {
      //服务历史
      this.$emit("historyService");
    },
    policyService() {
      //保单服务
      this.$emit("policyService");
    },
    recordHistory() {
      //记录历史
      this.$emit("recordHistory");
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  background: #fff;
  // margin-top: 10px;
  margin: 18px 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 4px 2px rgba(197, 197, 197, 0.21);
}
.list li:first-child {
  // padding-top: 33px;
  position: relative;
}
.list {
  .content-div {
    padding: 0 20px 6px 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 20px;
  }
}
// .list li:first-child div span:first-child {
//   height: 20px;
//   font-size: 14px;
//   font-family: PingFangSC-Regular, PingFang SC;
//   font-weight: 400;
//   color: rgba(102, 102, 102, 1);
// }
// .list li:first-child div span:last-child {
//   height: 20px;
//   font-size: 14px;
//   font-family: PingFangSC-Regular, PingFang SC;
//   font-weight: 400;
//   color: rgba(181, 181, 181, 1);
//   text-align: right;
// }

.my-content {
  .content-head-1 {
    height: 41px;
  }
  .content-head-2,
  .content-head-3 {
    height: 48px;
  }
  .content-head-3 {
    overflow: hidden;
  }
  .content-head {
    .holder-c {
      display: flex;
      margin: auto 0;
      .line {
        display: block;
        width: 4px;
        height: 12px;
        background: rgba(253, 194, 72, 1);
        border-radius: 2px;
        margin: 2px 4px 0 10px;
      }
      span:nth-child(2) {
        margin: 0 10px;
        color: #8f8f8f;
        font-size: 14px;
      }
      span:nth-child(3) {
        color: #484848;
        font-size: 15px;
        font-weight: 500;
      }
    }
    .my-icon {
      height: 20px;
      width: 20px;
      margin-left: 9px;
      margin-top: -2px;
    }
    .pay-year {
      width: 90px;
      height: 25px;
      background: rgba(253, 185, 44, 1);
      border-radius: 13px 13px 13px 1px;
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 10px;
      text-align: center;
      line-height: 25px;
    }
    .pay-not {
      background-image: url("../assets/images/tab_01.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      font-size: 14px;
      height: 26px;
      margin-top: auto;
      margin-bottom: auto;
      margin-right: -5px;
    }
    .pay-book {
      margin: auto -5px auto 0;
      .pay-border {
        line-height: 25px;
        padding-left: 12px;
        color: #ffffff;
        font-size: 14px;
        margin-top: 5px;
        height: 25px;
        width: 66px;
        border-radius: 12.5px 0 0 12.5px;
        font-weight: 500;
      }
      .pay-triangle {
        width: 0;
        height: 0;
        border-right: 5px solid transparent;
        border-top: 3px solid;
        // border-left: 5px solid transparent;
        float: right;
      }
    }
    .policy-status {
      height: 16px;
      width: 80px;
      background-color: #ff9f9f;
      transform: rotate(42deg);
      margin-top: 11px;
      margin-right: -20px;
      text-align: center;
      font-size: 12px;
      line-height: 16px;
      color: #ffffff;
    }
    border-bottom: 1px solid #ecedef;
    display: flex;
    justify-content: space-between;
  }
}

.list li:nth-child(2) {
  border-top: 1px solid rgba(236, 237, 239, 1);
  position: relative;
}
.list li:nth-child(2) button {
  // width: 85px;
  height: 30px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid rgba(207, 207, 207, 1);
  outline: none;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #7c7b7b;
  line-height: 20px;
  margin: 14px 10px 14px 0;
}
.clearfix::after {
  display: block;
  clear: both;
  content: "";
}
.button-array {
  div {
    display: flex;
    align-items: center;
  }
  img {
    height: 16px;
    width: 16px;
    margin-right: 4px;
    margin-top: 2px;
  }
  span {
    min-width: 48px;
  }
}
// .query-box {
//   width: 100%;
//   height: 60px;
//   background: #fff;
//   margin-top: 10px;
//   display: flex;
//   align-items: center;
// }
.n22-icon .icon-font .n22-icon-right_arrow .right_arrow {
  display: none;
}
</style>

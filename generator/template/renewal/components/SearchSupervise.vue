<template>
  <div>
    <!-- <n22-input-item
      title="服务代理人"
      maxlength="15"
      v-model="searchForm.serveragentname"
      v-input-limit="/[^\a-\z\A-\Z\u4E00-\u9FA5]/g"
      placeholder="请输入服务代理人"
      align="right"
      clearable
    ></n22-input-item> -->
    <n22-input-item
      title="保单号"
      v-model="searchForm.contNo"
      placeholder="请输入保单号"
      align="right"
      clearable
    ></n22-input-item>
    <n22-drop-select
      title="机构"
      ispickerValue="请选择三级中支"
      v-model="searchForm.orgCode"
      :options="orgOptions"
      :isAppendTo="true"
      @changeData="$search_changeData"
    ></n22-drop-select>
    <n22-drop-select
      ispickerValue="请选择四级营服"
      v-model="searchForm.comCode"
      :options="dealComOptions"
      :isAppendTo="true"
      @dropSelectClick="$_dropSelectClick"
    ></n22-drop-select>
    <n22-input-item
      title="投保人"
      maxlength="15"
      v-model="searchForm.appntName"
      v-input-limit="/[^\a-\z\A-\Z\u4E00-\u9FA5]/g"
      placeholder="请输入投保人姓名"
      align="right"
      clearable
    ></n22-input-item>
    <!-- <n22-drop-select
      title="保单年度"
      ispickerValue="请选择保单年度"
      v-model="searchForm.payYear"
      :options="payYearOptions"
      :isAppendTo="true"
    ></n22-drop-select> -->
    <n22-radio-item
      v-model="searchForm.payYear"
      title="保单年度"
      type="checkbox"
      name="radio"
      :options="payYearOptions"
      plain
    >
    </n22-radio-item>
    <n22-drop-select
      title="应交日起期"
      v-model="searchForm.startTime"
      type="date"
      :minDate="minDate"
      :maxDate="maxDate"
      :isAppendTo="true"
      @changeData="$_changeData"
    ></n22-drop-select>
    <n22-drop-select
      title="应交日止期"
      v-model="searchForm.endTime"
      type="date"
      :minDate="minDate"
      :maxDate="maxDate"
      :isAppendTo="true"
      @changeData="$_changeData"
    ></n22-drop-select>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { DropSelectItem, InputItem, RadioItem } from "al-mobile";
import { comQuery } from "../service/getData";
import { payYearOptions } from "../components/options";
import inputLimit from "@@/utils/inputLimit";
export default {
  name: "search-supervise", //使用xx-xx-xx命名方式具体看操作文档
  directives: {
    inputLimit,
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    //[xxxx.name]: xxx,//引入组件样例如此
    [DropSelectItem.name]: DropSelectItem,
    [InputItem.name]: InputItem,
    [RadioItem.name]: RadioItem,
  },
  computed: {
    //...mapState(["common"])//引入vuex state样例>>>可通过this.common.userInfo获取vuex-state数据
    dealComOptions() {
      return this.comOptions.filter(item => item.value.indexOf(this.searchForm.orgCode) > -1);
    },
  },
  mounted() {
    this.searchOrg();
  },
  watch: {
    searchForm(newVal) {
      this.$emit("value", newVal);
    },
    value(newVal) {
      this.searchForm = newVal;
    },
  },
  data() {
    return {
      maxDate: new Date("2099/01/01"),
      minDate: new Date("1999/01/01"),
      payYearOptions,
      orgOptions: [],
      comOptions: [],
      searchForm: this.value,
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    $_dropSelectClick(callBack) {
      const isShow = this.searchForm.orgCode ? true : false;
      callBack(isShow);
      if (!isShow) {
        this.$toast({
          content: "请先选择三级中支！",
          position: "content",
          duration: 3000,
        });
      }
    },
    $_changeData() {
      if (this.searchForm.startTime && this.searchForm.endTime) {
        if (this.searchForm.startTime > this.searchForm.endTime) {
          this.$toast({
            content: "日期起期不可晚于日期止期，日期止期不可早于日期起期",
            icon: "warn-color",
            iconSvg: true,
            position: "center",
            duration: 3000,
          });
          return;
        }
        console.log("%c 更改时间进行重置下拉刷新>>>>>>>>>", "color:green;", "");
        // this.tabs[this.curIndex].mescroll.triggerDownScroll();
      }
    },
    // eslint-disable-next-line
    $search_changeData({}, newval, oldval) {
      // console.log("%c search_changeData>>>>>>>>>>>>>", "color:green;", newval);
      // console.log("%c search_changeData>>>>>>>>>>>>>", "color:green;", oldval);
      if (oldval && newval !== oldval) {
        this.searchForm.comCode = "";
      }
    },
    searchOrg() {
      comQuery({
        data: { orgId: window.utils.cache.get(window.globalConfig.AppUserInfoCacheKey).orgId },
        method: "get",
      }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
          const optionList = data.data;
          optionList.forEach(item => {
            if (item.comcode.length === 6) {
              this.orgOptions.push({
                text: item.name,
                value: item.comcode,
              });
            } else {
              this.comOptions.push({
                text: item.name,
                value: item.comcode,
              });
            }
          });
          console.log("%c >>>>>>>>>>>>>>", "color:green;", this.orgOptions);
        },
        error => {
          console.log("%c error-demo", "color:#00CD00", error);
        },
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.my-birthday-c {
  width: 200px;

  // float: left;
  ::v-deep .n22-field-item-right-addon {
    width: 75px;
  }
}

.my-age-c {
  width: 100px;
  position: absolute;
  margin-top: -50px;
  right: 10px;

  // float: right;
  // margin-right: 10px;
  ::v-deep .n22-field-item-right-addon {
    width: 75px;
  }
}
</style>

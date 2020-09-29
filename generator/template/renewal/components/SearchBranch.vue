<template>
  <div class="search-branch-c">
    <n22-drop-select
      title="银行网点"
      ispickerValue="请选择银行网点"
      v-model="searchForm.bankBranchCode"
      :options="bankBranchOptions"
      :isAppendTo="true"
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
    <n22-input-item
      title="保单号"
      maxlength="15"
      v-model="searchForm.contno"
      v-input-limit="/[^\a-\z\A-\Z\u4E00-\u9FA5]/g"
      placeholder="请输入保单号"
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
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";//引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { DropSelectItem, InputItem, RadioItem } from "al-mobile";
import { bankcodeQuery } from "../service/getData";
import { payYearOptions } from "../components/options";
import inputLimit from "@@/utils/inputLimit";
export default {
  name: "search-branch", //使用xx-xx-xx命名方式具体看操作文档
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
    isSearchPopup: {
      type: Boolean,
      default: false,
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
  },
  updated() {
    console.log("%c search-branch>生命周期>updated", "color:green;", "");
  },
  mounted() {
    console.log("%c search-branch>生命周期>mounted", "color:green;", "");
    this.searchBankcode();
  },
  watch: {
    searchForm(newVal) {
      this.$emit("value", newVal);
    },
    value(newVal) {
      this.searchForm = newVal;
    },
    isSearchPopup(newVal) {
      //如果点击打开弹出搜索弹窗时候，码表数据还没有，那么进行loding加载，以待码表数据加载完
      if (newVal === true && this.bankBranchOptions.length === 0) {
        this.searchBankcode(true);
      }
    },
  },
  data() {
    return {
      bankBranchOptions: [],
      payYearOptions,
      searchForm: this.value,
    };
  },
  methods: {
    //...mapActions(["getUserInfo"]),//vuex-action引入样例>>>通过this.getUserInfo()可直接调用获取state数据可异步
    //...mapMutations([//提交vuex-state更改样例
    //    'USER_INFO',
    //]),
    // eslint-disable-next-line
    searchBankcode(isLoding=false) {
      const axiosParams = {
        isLoadding: isLoding,
        loaddingText: "数据加载中...",
      };
      bankcodeQuery({
        data: { agentCode: window.utils.cache.get(window.globalConfig.AppUserInfoCacheKey).agentCode },
        config: axiosParams,
        method: "get",
        isParams: true,
      }).then(
        data => {
          console.log("%c data--demo", "color:#00CD00", data);
          const optionList = data.data;
          optionList.forEach(item => {
            this.bankBranchOptions.push({
              text: item.agentcomname,
              value: item.agentcom,
            });
          });
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
.search-branch-c {
  ::v-deep .n22-field-item-right-addon {
    max-width: 125px;
  }
}
</style>

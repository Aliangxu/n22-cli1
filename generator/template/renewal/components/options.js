const servicesTypeOptions = [
  { text: "面访", value: "0" },
  { text: "电话", value: "1" },
  { text: "短信", value: "3" },
  { text: "微信", value: "4" },
  { text: "无法联系", value: "2" },
];
const servicesTypeOptions2 = [
  { text: "面访", value: "0" },
  { text: "电话", value: "1" },
  { text: "短信", value: "3" },
  { text: "微信", value: "4" },
];
const payWishOptions = [
  { text: "愿意缴费", value: "1" },
  { text: "不愿缴费", value: "2" },
];

const payWishReasonOptions = [
  { text: "暂时经济困难", value: "0" },
  { text: "对公司不信任", value: "1" },
  { text: "业务员自保件", value: "2" },
  { text: "业务员人情单", value: "3" },
  { text: "销售误导", value: "4" },
  { text: "产品不理想", value: "5" },
  { text: "服务不满意", value: "6" },
  { text: "理赔不满意", value: "7" },
  { text: "同业竞争", value: "8" },
  { text: "家庭问题", value: "9" },
  { text: "客户失联", value: "10" },
  { text: "其他原因", value: "11" },
];

const invalidPlanOptions = [
  // { text: "不需要保险产品", value: "0" },
  { text: "退保", value: "0" },
  { text: "退旧上新（我司）", value: "1" },
  { text: "退旧上新（他司）", value: "2" },
  { text: "复效", value: "3" },
  { text: "不确定", value: "4" },
];
const invalidPlanOptions2 = [
  { text: "退保", value: "0" },
  { text: "退旧上新（我司）", value: "1" },
  { text: "退旧上新（他司）", value: "2" },
  { text: "不确定", value: "4" },
];

const IDType = [
  { value: "11", text: "居民身份证" },
  { value: "12", text: "居民户口薄" },
  { value: "13", text: "驾驶证" },
  { value: "14", text: "军官证" },
  { value: "15", text: "士兵证" },
  { value: "16", text: "军官离退休证" },
  { value: "17", text: "中国护照" },
  { value: "18", text: "学生证" },
  { value: "19", text: "工作证" },
  { value: "20", text: "出生证" },
  { value: "21", text: "无证件" },
  { value: "22", text: "警官证" },
  { value: "23", text: "台湾居民来往大陆通行证" },
  { value: "24", text: "外国护照" },
  { value: "25", text: "旅行证" },
  { value: "26", text: "港澳居民来往内地通行证" },
  { value: "27", text: "居留证件" },
  { value: "28", text: "其他" },

  // { value: "11", remark: "CHN", maxle: "", text: "身份证" },
  // { value: "12", remark: "CHN", maxle: "", text: "户口本" },
  // { value: "17", remark: "CHN", minle: "3", maxle: "20", text: "中国护照" },
  // { value: "24", remark: "!CHN,!HKG,!MAC,!TWN", minle: "3", maxle: "20", text: "外国护照" },
  // { value: "23", remark: "CHN", minle: "3", maxle: "20", text: "台胞证" },
  // { value: "26", remark: "CHN,HKG,MAC", minle: "3", maxle: "20", text: "港澳通行证" },
  // { value: "20", remark: "CHN", minle: "4", maxle: "20", text: "出生证" },
  // { value: "29", remark: "!CHN,!HKG,!MAC,!TWN", minle: "5", maxle: "20", text: "外国人永久居留身份证" },
  // { value: "30", remark: "HKG,MAC,TWN", text: "港澳台居住证" },
  // { value: "50", remark: "HKG,MAC", text: "港澳居住证" },
  // { value: "51", remark: "TWN", text: "台湾居住证" },
];

const sex = [
  { value: "0", text: "男" },
  { value: "1", text: "女" },
];

const relation = [
  { value: "00", text: "本人" },
  { value: "01", text: "丈夫" },
  { value: "02", text: "妻子" },
  { value: "03", text: "父亲" },
  { value: "04", text: "母亲" },
  { value: "05", text: "儿子" },
  { value: "06", text: "女儿" },
  { value: "07", text: "祖父" },
  { value: "08", text: "祖母" },
  { value: "09", text: "孙子" },
  { value: "10", text: "孙女" },
  { value: "11", text: "外祖父" },
  { value: "12", text: "外祖母" },
  { value: "13", text: "外孙" },
  { value: "14", text: "外孙女" },
  { value: "15", text: "哥哥" },
  { value: "16", text: "姐姐" },
  { value: "17", text: "弟弟" },
  { value: "18", text: "妹妹" },
  { value: "19", text: "公公" },
  { value: "20", text: "婆婆" },
  { value: "21", text: "岳父" },
  { value: "22", text: "岳母" },
  { value: "23", text: "儿媳" },
  { value: "24", text: "女婿" },
  { value: "25", text: "其他亲属" },
  { value: "26", text: "同事" },
  { value: "27", text: "朋友" },
  { value: "28", text: "雇主" },
  { value: "29", text: "雇员" },
  { value: "30", text: "其他" },
  { value: "31", text: "父母" },
  { value: "32", text: "子女" },
  { value: "33", text: "配偶" },
  { value: "34", text: "叔叔" },
  { value: "35", text: "姨姨" },
  { value: "36", text: "姑姑" },
  { value: "37", text: "父子" },
  { value: "38", text: "父女" },
  { value: "39", text: "母子" },
  { value: "40", text: "母女" },
  { value: "41", text: "祖孙" },
];
const policeStatus = [
  { value: "0", text: "未承保" },
  { value: "1", text: "有效" },
  { value: "2", text: "失效" },
  { value: "4", text: "终止" },
  { value: "9", text: "续保未生效" },
];
const payMode = [
  { value: "1", text: "缴款单" },
  { value: "3", text: "银行转账" },
];
const serviceType = [
  { value: "1", text: "专职单" },
  { value: "2", text: "在职单" },
];
const premLimitCont = [
  { value: "Y", text: "是" },
  { value: "N", text: "否" },
];
const payIntv = [
  { value: "1", text: "月交" },
  { value: "12", text: "年交" },
  { value: "0", text: "趸交" },
];

const policyStatus = [
  { value: "0", text: "10日未交" },
  { value: "1", text: "30日未交" },
  { value: "2", text: "50日未交" },
  { value: "3", text: "大单关注" },
  { value: "4", text: "15日应收" },
];

const payYearOptions = [
  { text: "第一年度", value: 1 },
  { text: "第二年度", value: 2 },
  { text: "第三年度", value: 3 },
  { text: "第四年度", value: 4 },
  { text: "第四年度以上", value: 5 },
];

export {
  servicesTypeOptions,
  servicesTypeOptions2,
  payWishOptions,
  payWishReasonOptions,
  invalidPlanOptions,
  invalidPlanOptions2,
  IDType,
  relation,
  policeStatus,
  sex,
  payMode,
  serviceType,
  premLimitCont,
  payIntv,
  policyStatus,
  payYearOptions,
};

<template>
  <div class="proposalBookSimple-product-detail" ref="proDetailCom">
    <img
      class="bd"
      v-lazy="
        `//xinyidongzhanyeguangsubao-st-1254235118.cos.ap-beijing.myqcloud.com/PC/productConfig/productInfoManage/proposalSimple/2020-07-16/HCT023.png`
      "
    />
    <div class="submain" />
    <div class="row_title row_title_fir" @click="toogle.buy = !toogle.buy">
      <div class="container_3">
        <div class="wrap">
          <img class="icon_3" src="@m/proposalBookSimple/assets/images/buy.png" />
        </div>
        <span class="word_7">购买理由</span>
      </div>
      <div :class="['all_toogle', toogle.buy ? 'toogle-down' : '']">
        <n22-icon name="right_arrow"></n22-icon>
      </div>
    </div>
    <transition name="n22-fade-down">
      <div class="row_content" v-if="toogle.buy">
        <div class="group">
          <!-- <div class="colorDiv_2" /> -->
          <img src="../../../assets/images/sick_01.png" />
          <span class="info_4">重大疾病患病率高</span>
        </div>
        <div class="summary_7">根据国家卫生部的统计数据显示，人一辈子患重疾的概率是72.18%！</div>
        <div class="container_2">
          <!-- <div class="color_4" /> -->
          <img src="../../../assets/images/sick_01.png" />
          <span class="info_4">患病后治愈率高</span>
        </div>
        <div class="summary_7">
          据《柳叶刀》统计数据，我国最新的癌症 5 年平均生存率达到了40.5%！器官移植手术术后存活率已达90%以上！
        </div>
        <div class="container_2">
          <!-- <div class="colorDiv_3" /> -->
          <img src="../../../assets/images/sick_01.png" />
          <span class="info_4">患病年轻化趋势明显</span>
        </div>
        <div class="summary_7">
          根据理赔大数据，中青年（31~50岁）发病率约占60%！
        </div>
        <div class="container_2">
          <!-- <div class="color_5" /> -->
          <img src="../../../assets/images/sick_01.png" />
          <span class="info_4">现实困境：治疗费用高</span>
        </div>
        <div class="summary_7">恶性肿瘤治疗：12-50万。</div>
        <div class="summary_7">急性心肌梗塞：10-50万。</div>
        <div class="summary_7">脑中风后遗症：10-40万。</div>
        <div class="summary_7">冠状动脉搭桥术：10-30万元。</div>
        <div class="summary_7">
          重大器官移植术或造血干细胞移植术：移植费用7-50万，术后每年2-5万的抗排斥及康复费用。
        </div>
        <div class="summary_7">每人都需要一款重疾保险产品！</div>
        <div class="summary_7">保障内容多一点：多种重疾、多次赔付。</div>
        <div class="summary_7">专项保障多一点：高发重疾多、重疾分组多。</div>
        <div class="summary_7">覆盖家庭成员多一点：多种附加、多种搭配。</div>
        <div class="summary_7">优惠服务多一点：重疾前期咨询、重疾求医就诊、重疾后续治疗…</div>
      </div>
    </transition>
    <div class="row_title" @click="toogle.detail = !toogle.detail">
      <div class="container_3">
        <div class="wrap">
          <img class="icon_3" src="@m/proposalBookSimple/assets/images/pro_detail.png" />
        </div>
        <span class="word_7">产品详情</span>
      </div>
      <div :class="['all_toogle', toogle.detail ? 'toogle-down' : '']">
        <n22-icon name="right_arrow"></n22-icon>
      </div>
    </div>
    <transition name="n22-fade-down">
      <div class="row_content" v-if="toogle.detail">
        <div class="group">
          <!-- <div class="colorDiv_2" /> -->
          <img src="../../../assets/images/heart.png" />
          <span class="info_4">全面呵护 关爱多多</span>
        </div>
        <div class="summary_7">
          为您提供150种疾病保障：100种重大疾病和50种轻症疾病， 保障全面，多重呵护。最高可获得三次轻症疾病赔付和六次
          重大疾病赔付，不同轻症疾病每次赔付保额递增，依次为基本保险金额的30%、35%、40%；重大疾病每次赔付不低
          于100%基本保额。提供恶性肿瘤二次额外给付可选责任，首次肿瘤确诊赔付5年后，开启肿瘤责任二次保障。
        </div>
        <div class="container_2">
          <!-- <div class="color_4" /> -->
          <img src="../../../assets/images/double_person.png" />
          <span class="info_4">轻症重疾 双项豁免</span>
        </div>
        <div class="summary_7">
          无论罹患轻症或是重疾，均可豁免后续未交保费，保障继续有效。让您安心治疗，减轻经济压力。
        </div>
        <div class="container_2">
          <!-- <div class="colorDiv_3" /> -->
          <img src="../../../assets/images/medicine.png" />
          <span class="info_4">身故高残 终末关爱</span>
        </div>
        <div class="summary_7">
          等待期内返还已交保费；等待期后，18周岁前返还已交保费，18周岁后给付基本保险金额、已交保费或现金价值最大者。
        </div>
      </div>
    </transition>
    <div class="row_title" @click="toogle.sick = !toogle.sick">
      <div class="container_3">
        <div class="wrap">
          <img class="icon_3" src="@m/proposalBookSimple/assets/images/sick.png" />
        </div>
        <span class="word_7">疾病种类</span>
      </div>
      <div :class="['all_toogle', toogle.sick ? 'toogle-down' : '']">
        <n22-icon name="right_arrow"></n22-icon>
      </div>
    </div>
    <transition name="n22-fade-down">
      <div class="row_content" v-if="toogle.sick">
        <div style="margin: 0 auto;" v-for="(sick, si) in sickArray" :key="si">
          <div class="outer_4" @click="sick.isShow = !sick.isShow">
            <span class="info_13">{{ sick.sickName }}</span>
            <div class="group_4" :class="['all_toogle', sick.isShow ? 'toogle-down' : '']">
              <n22-icon name="right_arrow"></n22-icon>
            </div>
          </div>
          <table class="sick_table" v-if="sick.isShow">
            <tr class="table_title" v-for="(sv, svi) in sick.sickValue" :key="svi">
              <td>{{ sv[0] }}</td>
              <td>{{ sv[1] }}</td>
            </tr>
          </table>
        </div>
      </div>
    </transition>
    <div class="row_title" @click="toogle.demo = !toogle.demo">
      <div class="container_3">
        <div class="wrap">
          <img class="icon_3_1" src="@m/proposalBookSimple/assets/images/analysis.png" />
        </div>
        <span class="word_7">案例分享</span>
      </div>
      <div :class="['all_toogle', toogle.demo ? 'toogle-down' : '']">
        <n22-icon name="right_arrow"></n22-icon>
      </div>
    </div>
    <transition name="n22-fade-down">
      <div class="row_content" v-if="toogle.demo">
        <div class="summary_7 pro_demo_txt">
          30岁小爱女士，十分注重自己及家人的保障，为自己投保了《光大永明爱多多重大疾病保险》，基本保险金额30万元，
          交费期间19年，选择了恶性肿瘤额外保险金可选责任，年交保费10611元，保障期间为终身。在等待期后，小爱女士享有以下保障：
        </div>
        <table class="pro_table wd01">
          <tr class="table_title">
            <td>性别</td>
            <td>年龄（岁）</td>
            <td>交费期间</td>
            <td>保险期间</td>
            <td>基本保额（万元）</td>
            <td>保费（元）</td>
          </tr>
          <tr class="table_title">
            <td>女</td>
            <td>30</td>
            <td>19</td>
            <td>终身</td>
            <td>30</td>
            <td>10611</td>
          </tr>
        </table>

        <table class="pro_table wd01">
          <tr class="table_title">
            <td>假设年龄</td>
            <td>事项</td>
            <td>所获赔付</td>
            <td>备注</td>
          </tr>
          <tr class="table_title table_title_02">
            <td>32岁</td>
            <td>首次罹患轻症</td>
            <td>赔付30%基本保额：9万元</td>
            <td>豁免后期保费，合同继续有效</td>
          </tr>
          <tr class="table_title table_title_02">
            <td>35岁</td>
            <td>第二次罹患轻症</td>
            <td>赔付35%基本保额：10.5万元</td>
            <td>不同轻症，合同继续有效</td>
          </tr>
          <tr class="table_title table_title_02">
            <td>38岁</td>
            <td>第三次罹患轻症</td>
            <td>赔付40%基本保额：12万元</td>
            <td>不同轻症，合同继续有效</td>
          </tr>
          <tr class="table_title table_title_02">
            <td>39岁</td>
            <td>首次罹患重疾</td>
            <td>赔付100%基本保额：30万元</td>
            <td>本组重疾责任终止，其它5组重疾责任继续有效</td>
          </tr>
          <tr class="table_title table_title_02">
            <td>被保人终身</td>
            <td>身故</td>
            <td>已交保费、基本保额30万元、现金价值三者最大者</td>
            <td>未发生重疾赔付</td>
          </tr>
        </table>

        <img class="itemLong" src="@m/proposalBookSimple/assets/images/HCT023_message01.png" />
        <!-- <span class="info_33">特别提示和说明：</span> -->
        <div class="container_2_1">
          <div class="color_4" />
          <!-- <img src="../../../assets/images/double_person.png" /> -->
          <span class="info_4">特别提示和说明：</span>
        </div>
        <span class="summary_15">1、以上保险金给付，均假设保险事故发生在等待期过后，本保险产品等待期为90天。</span>
        <span class="summary_15">2、以上各项保险金给付条件请详见《光大永明爱多多重大疾病保险》条款。</span>
      </div>
    </transition>
    <div class="row_title" @click="toogle.xuzhi = !toogle.xuzhi">
      <div class="container_3">
        <div class="wrap">
          <img class="icon_3_1" src="@m/proposalBookSimple/assets/images/xuzhi.png" />
        </div>
        <span class="word_7">投保须知</span>
      </div>
      <div :class="['all_toogle', toogle.xuzhi ? 'toogle-down' : '']">
        <n22-icon name="right_arrow"></n22-icon>
      </div>
    </div>
    <transition name="n22-fade-down">
      <div class="row_content" v-if="toogle.xuzhi">
        <div class="block_10">
          <div class="color_6" />
          <span class="info_34">投保人年龄：</span>
          <span class="info_35">年满18周岁以上</span>
        </div>
        <div class="group_7">
          <div class="colorDiv_5" />
          <span class="text_21">保险期间：</span>
          <span class="txt_14">终身</span>
        </div>
        <div class="container_9">
          <div class="color_7" />
          <span class="desc_15">交费方式与被保险人年龄范围：</span>
        </div>
        <span class="txt_14 text_14_01">出生满30天至下表上限（周岁）</span>
        <table class="pro_table wd02">
          <tr class="table_title">
            <td>交费期</td>
            <td>一次交清</td>
            <td>5年交</td>
            <td>10年交</td>
            <td>15年交</td>
            <td>18年交</td>
            <td>19年交</td>
            <td>20年交</td>
          </tr>
          <tr class="table_title">
            <td>年龄上限</td>
            <td>55</td>
            <td>55</td>
            <td>55</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
            <td>50</td>
          </tr>
        </table>

        <div class="block_13">
          <div class="colorDiv_6" />
          <span class="desc_15">犹豫期和退保：</span>
        </div>
        <div class="summary_7">
          自签收合同次日起（含该日）15天内为犹豫期，犹豫期内您有全额退保（扣除10元工本费）的权利，犹豫期后解除合同，本公司退还合同终止时的保险单现金价值。
        </div>
        <div class="group_11">
          <div class="color_4" />
          <span class="info_36">特别提示与说明：</span>
        </div>
        <span class="desc_18">您在犹豫期后解除合同可能会受到一定的损失。</span>
      </div>
    </transition>
  </div>
</template>

<script>
//import { mapState, mapActions } from "vuex"; // 引入组件样例--★★此处为引入vuex推荐此方法引入vuex的各个方法属性使用
import { Icon } from "al-mobile";
export default {
  name: "HTC023", //使用xx-xx-xx命名方式具体看操作文档
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
  watch: {
    toogle: {
      handler: function(newVal) {
        let _this = this;
        console.log("%c >>>>>>>>>>>>>>> newVal", "color:green;", newVal);
        let is = false;
        for (const key in newVal) {
          const aa = newVal[key];
          if (aa) {
            is = true;
            break;
          }
        }
        this.$nextTick().then(function() {
          _this.$parent.$parent.$parent.$parent.dealIsAbsoult(is);
        });
      },
      deep: true,
    },
  },
  data() {
    return {
      toogle: {
        buy: false,
        detail: false,
        sick: false,
        demo: false,
        xuzhi: false,
      },
      sickArray: [
        {
          sickName: "重大疾病保障（100种）",
          isShow: false,
          sickValue: [
            ["1. 恶性肿瘤", "2. 恶性葡萄胎"],
            ["3. 急性或亚急性重症肝炎", "4. 慢性肝功能衰竭失代偿期"],
            ["5. 重型再生障碍性贫血", "6. 系统性红斑狼疮性肾炎"],
            ["7. 由输血或输液而感染艾滋病病毒", "8. 因职业关系导致的人类免疫缺陷病毒（HIV）感染"],
            ["9. 特发性慢性肾上腺皮质功能衰竭", "10. 严重克隆病"],
            ["11. 严重溃疡性结肠炎", "12. 原发性硬化性胆管炎"],
            ["13. Ⅱ级重症急性胰腺炎", "14. 严重慢性复发性胰腺炎"],
            ["15. 胰腺移植", "16. 嗜铬细胞瘤"],
            ["17. 范可尼综合征", "18. 严重自身免疫性肝炎"],
            ["19. 原发性骨髓纤维化", "20. 重症骨髓增生异常综合征"],
            ["21. 溶血性尿毒综合征", "22. 小肠移植"],
            ["23. 败血症导致的多器官功能障碍综合征", "24. 自体造血干细胞移植"],
            ["25. 弥漫性血管内凝血", "26. 胆道重建手术"],
            ["27. 严重肠道疾病并发症", "28. 器官移植导致的HIV 感染"],
            ["29. 重大器官移植术或造血干细胞移植术", "30. 终末期肾病（或称慢性肾功能衰竭尿毒症期）"],
            ["31. 急性心肌梗塞", "32. 冠状动脉搭桥术（或称冠状动脉旁路移植术）"],
            ["33. 心脏瓣膜手术", "34. 严重原发性肺动脉高压"],
            ["35. 主动脉手术", "36. 慢性呼吸功能衰竭"],
            ["37. 严重冠心病", "38. 严重心肌病"],
            ["39. 主动脉夹层瘤", "40. 系统性硬皮病"],
            ["41. 严重心肌炎", "42. 肺源性心脏病"],
            ["43. 严重组织细胞增生症", "44. 传染性心内膜炎"],
            ["45. 完全性房室传导阻滞", "46. 川崎病"],
            ["47. 严重慢性缩窄性心包炎", "48. 1型糖尿病—严重并发症"],
            ["49. Brugada综合征", "50. 冠状动脉血管成形术"],
            ["51. 室壁瘤切除手术", "52. 肺淋巴管肌瘤病"],
            ["53. 严重获得性或继发性肺泡蛋白质沉积症", "54. 严重肺结节病"],
            ["55. 严重心脏衰竭CRT心脏再同步治疗", "56. 神经白塞病"],
            ["57. 脑中风后遗症", "58. 良性脑肿瘤"],
            ["59. 脑炎后遗症或脑膜炎后遗症", "60. 深度昏迷"],
            ["61. 双耳失聪－三周岁始理赔", "62. 双目失明－三周岁始理赔"],
            ["63. 瘫痪", "64. 严重阿尔茨海默病"],
            ["65. 严重脑损伤", "66. 严重帕金森病"],
            ["67. 严重运动神经元病", "68. 语言能力丧失－三岁始理赔"],
            ["69. 严重多发性硬化", "70. 植物人状态"],
            ["71. 额颞叶痴呆", "72. 严重类风湿性关节炎"],
            ["73. 非阿尔茨海默病所致严重痴呆", "74. 脑动脉瘤破裂开颅手术"],
            ["75. 疾病或外伤所致智力障碍（残疾）", "76. 亚急性硬化性全脑炎"],
            ["77. 克-雅氏病（CJD、人类疯牛病）", "78. 席汉氏综合征"],
            ["79. 进行性多灶性白质脑病", "80. 脊髓灰质炎"],
            ["81. 进行性核上性麻痹", "82. 严重幼年风湿关节炎"],
            ["83. 严重结核性脑膜炎", "84. 脊髓小脑变性症"],
            ["85. 严重瑞氏综合征", "86. 脊髓空洞症"],
            ["87. 细菌性脑脊髓膜炎后遗症", "88. 严重癫痫"],
            ["89. 严重强直性脊柱炎", "90. 进行性风疹性全脑炎"],
            ["91. 脑型疟疾", "92. 湿性年龄相关性黄斑变性"],
            ["93. 多个肢体缺失", "94. 严重III度烧伤"],
            ["95. 多处臂丛神经根性撕脱", "96. 意外导致的重度面部烧伤"],
            ["97. 失去一肢及一眼", "98. 重症急性坏死性筋膜炎"],
            ["99. 丝虫病所致象皮病", "100. 埃博拉病毒感染（伊波拉病毒感染）"],
          ],
        },
        {
          sickName: "轻症疾病保障（50种）",
          isShow: false,
          sickValue: [
            ["1. 极早期的恶性肿瘤或恶性病变", "2. 不典型的急性心肌梗塞"],
            ["3. 中度类风湿性关节炎", "4. 轻微脑中风"],
            ["5. 心脏瓣膜介入手术", "6. 视力严重受损"],
            ["7. 较小面积III度烧伤", "8. 主动脉内手术"],
            ["9. 脑垂体瘤、脑囊肿、脑动脉瘤及脑血管瘤", "10. 重度头部外伤"],
            ["11. 慢性肝功能衰竭失代偿早期", "12. 单个肢体缺失"],
            ["13. 急性坏死性胰腺炎腹腔镜手术", "14. 中度系统性红斑狼疮"],
            ["15. 慢性肾功能损害-肾功能衰竭期", "16. 严重的骨质疏松"],
            ["17. 轻度原发性肺动脉高压", "18. 单眼失明"],
            ["19. 角膜移植", "20. 人工耳蜗植入术"],
            ["21. 单耳失聪", "22. 轻度脑炎或脑膜炎后遗症"],
            ["23. 微创颅脑手术", "24. 早期运动神经元病"],
            ["25. 中度帕金森氏病", "26. 中度脊髓灰质炎"],
            ["27. 硬脑膜下血肿手术", "28. 植入大脑内分流器"],
            ["29. 结核性脊髓炎", "30. 深度昏迷48小时"],
            ["31. 中度阿尔茨海默症", "32. 中度瘫痪"],
            ["33. 因肾上腺皮质腺瘤切除肾上腺", "34. 心包膜切除术"],
            ["35. 于颈动脉进行血管成形术或内膜切除术", "36. 腔静脉过滤器植入术"],
            ["37. 早期象皮病", "38. 微创冠状动脉搭桥手术"],
            ["39. 心脏起搏器或除颤器植入", "40. 早期原发性心肌病"],
            ["41. 微创冠状动脉介入手术（非开胸手术）", "42. 严重大动脉炎"],
            ["43. 中度肠道疾病并发症", "44. 单侧肺脏切除"],
            ["45. 肝脏切除", "46. 中度严重溃疡性结肠炎"],
            ["47. 单侧肾脏切除", "48. 双侧睾丸切除术"],
            ["49. 双侧卵巢切除术", "50. 可逆性再生障碍性贫血"],
          ],
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
    width: 24px;
    height: 24px;
  }
  .n22-icon {
    padding: 2px;
    color: #fdb92c;
    display: inline-block;
    transform: rotate(90deg);
    transition: 0.2s;
    font-size: 20px;
    font-weight: 500;
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

/* eslint-disable */
import utils from "@@/utils";
/**
 * 注意
 * token直接存储在storage中 永久缓存
 */
const types = {
    HISTORYTYPE: "HISTORYTYPE",//服务历史记录模块
/* @init<%  ${vuexType}: "${vuexType}",//${vuexDesc}%> */
};

const state = {
    historyType: utils.cache.get("renewal-historyType") || "", //服务历史记录模块
/* @init<%  ${vuexStateKebabUpper}: "${vuexStateDefault}",//${vuexDesc}%> */
};

const getters = {};

const actions = {};

const mutations = {
    [types.HISTORYTYPE](state, value) {
    console.log('%c 服务历史记录模块', 'color:green;', value);
    utils.cache.set("renewal-historyType", value);
    state.historyType = value;
  },
/* @moreLine<%  [types.${vuexType}](state, value) {
    console.log('%c ${vuexDesc}', 'color:green;', value);
    state.${vuexStateKebabUpper} = value;
  },moreLine%> */
};

export default {
  state,
  getters,
  actions,
  mutations,
};

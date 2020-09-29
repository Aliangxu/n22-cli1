import axiosHttp from "@@/config/axiosHttp";

const module = "renewal";
export const dataService = {
  pagingQuery: "/renewal/pagingQuery",
  supervisorQuery: "/renewal/supervisorQuery", //督查查询
  outletsQuery: "/renewal/outletsQuery", //银行网点查询
  renewalTaskQuery: "/renewal/renewalTaskQuery", //续收任务查询
  policyServiceDetail: "/renewalDetails/policyServiceDetail", //续期保单服务详情查询（拨打电话、发送短信所需信息）
  policyDetail: "/renewalDetails/policyDetail", //续期详情查询
  policyDetailWithhold: "/renewalDetails/PolicyWithhold", //续期代扣详情查询
  historyQuery: "/renewalHistory/RenewalHistoryQuery", //查询服务记录
  saveHistoryQuery: "/renewalHistory/saveRenewalHistory", //查询服务记录
  comQuery: "/renewal/comQuery", //机构查询
  bankcodeQuery: "/renewal/bankcodeQuery", //银行网点选项查询
  recordQuery: "/policy/recordQuery", //xxx
  recordSave: "/policy/recordSave", //yyy
};

// 续收查询列表
export const pagingQuery = params =>
  axiosHttp.request(`${dataService.pagingQuery}`, params, localStorage.getItem(module + "Debug"), module);
// 督查查询列表
export const supervisorQuery = params =>
  axiosHttp.request(`${dataService.supervisorQuery}`, params, localStorage.getItem(module + "Debug"), module);
// 银行网点查询
export const outletsQuery = params =>
  axiosHttp.request(`${dataService.outletsQuery}`, params, localStorage.getItem(module + "Debug"), module);
// 续收任务查询
export const renewalTaskQuery = params =>
  axiosHttp.request(`${dataService.renewalTaskQuery}`, params, localStorage.getItem(module + "Debug"), module);

// 续期保单服务详情查询（拨打电话、发送短信所需信息）
export const policyServiceDetail = params =>
  axiosHttp.request(`${dataService.policyServiceDetail}`, params, localStorage.getItem(module + "Debug"), module);

// 续期详情查询
export const policyDetail = params =>
  axiosHttp.request(`${dataService.policyDetail}`, params, localStorage.getItem(module + "Debug"), module);

// 续期代扣详情查询
export const policyDetailWithhold = params =>
  axiosHttp.request(`${dataService.policyDetailWithhold}`, params, localStorage.getItem(module + "Debug"), module);

// 查询服务记录
export const historyQuery = params =>
  axiosHttp.request(`${dataService.historyQuery}`, params, localStorage.getItem(module + "Debug"), module);

// 新增服务记录
export const saveHistoryQuery = params =>
  axiosHttp.request(`${dataService.saveHistoryQuery}`, params, localStorage.getItem(module + "Debug"), module);

// 机构查询
export const comQuery = params =>
  axiosHttp.request(`${dataService.comQuery}`, params, localStorage.getItem(module + "Debug"), module);

// 银行网点选项查询
export const bankcodeQuery = params =>
  axiosHttp.request(`${dataService.bankcodeQuery}`, params, localStorage.getItem(module + "Debug"), module);

// xx
export const recordQuery = params =>
  axiosHttp.request(`${dataService.recordQuery}`, params, localStorage.getItem(module + "Debug"), module);

// yy
export const recordSave = params =>
  axiosHttp.request(`${dataService.recordSave}`, params, localStorage.getItem(module + "Debug"), module);

/*
 * @Author: aliang
 * @Date: 2018-11-19 17:21:00
 * @des: 系统级接口serve
 * @Last Modified by: aliang
 * @Last Modified time: 2020-07-15 15:47:21
 */
import axiosHttp from "@@/config/axiosHttp";

const module = "proposal";
export const dataService = {
  productEntry: "/simpleProposal/open/entry", //查询某款产品的录入项
  calculate: "/simpleProposal/open/calculate", //保费试算
};
export const getData = dataService;

/**
 * 根据code查询产品的录入项
 * @param {*} code 主险code
 */
export const getProductEntry = params =>
  axiosHttp.request(`${dataService.productEntry}`, params, localStorage.getItem(module + "Debug"), module);

/**
 * 保费试算
 * @param {*} 保费试算
 */
export const calculate = params =>
  axiosHttp.request(
    `${dataService.calculate}${params.channel ? `?channel=${params.channel}` : ""}`,
    params,
    localStorage.getItem(module + "Debug"),
    module,
  );

/*
 * @Author: Spoon
 * @des: 模块级接口serve
 * axiosHttp.get(`${dataService.entryUser}/${params.name}`, params, localStorage.getItem(module + "Debug"), module);
 */
import axiosHttp from "@@/config/axiosHttp";

const module = "app";
export const dataService = {
  //接口标识配置
  findAppVersion: "/appVersion/findAppVersion", //app版本查询更新查询
};
export const api = dataService;

//app版本查询更新查询
export const findAppVersion = params =>
  axiosHttp.request(`${dataService.findAppVersion}`, params, localStorage.getItem(module + "Debug"), module);

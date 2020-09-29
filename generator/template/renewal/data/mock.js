/* eslint-disable */
/*
 * @Author: aliang
 * @Date: 2018-07-26 16:17:56
 * @Last Modified by: aliang
 * @Last Modified time: 2020-07-30 14:19:57
 * @desc mock虚拟数据接口--虚拟后台接口
 */
import {
  dataService
}
from "../service/getData.js";
import Mock from "mockjs";

// 引入mockjs
// const Mock = require('mockjs')
// 获取 mock.Random 对象
// const Random = Mock.Random
//虚拟数据请求时间ms
Mock.setup({
  timeout: 800
});
console.log('%c mock','color:#00CD00',process.env.NODE_ENV)
if (process.env.NODE_ENV !== "production") {
  //生产模式不加载测试json文件
  // Mock.mock( url, post/get , 返回的数据)//例子请求方式
  //虚拟登录请求接口
  //系统级接口serve虚拟数据
  console.log('%c key》》》》》》》》','color:#00CD00',dataService)
  for (const key in dataService) {
    console.log('%c key》》》》》》》》','color:#00CD00',key)
    if (Object.prototype.hasOwnProperty.call(dataService, key)) {
      const e = dataService[key];
      import('./' + key + '.json').then(module => {
        console.log('%c 注册mock接口','color:#00CD00',e)
        Mock.mock(new RegExp(`${e}.*`), 'get', module.default)
      }).catch(err => {
        console.log('%c 使用虚拟mock数据未配置相应接口的虚拟json文件--->>>>未配置的文件为', 'color:#fc0;', err.message);
      });
    }
  }
}
export default {
  Mock: Mock
};

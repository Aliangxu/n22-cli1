/* eslint-disable */
/*
 * @Author: $desc{author}
 * @Date: $desc{time}
 * @Desc: $desc{moduleDesc}
 * @Last Modified by: $desc{author}
 * @Last Modified time: $desc{time}
 */

/**
 * @功能：此处为异步按需引入js
 * @参数：webpackChunkName webpack打包到一个文件的名字，需要将那几个文件打到一个文件里面，直接定义成同一个webpackChunkName
 * @参数：path 入口文件路径 
 */

const proposalBookSimple = () => import( /* webpackChunkName: "ProposalBookSimple" */ "@m/proposalBookSimple/views/ProposalBookSimple.vue")
const product = () => import( /* webpackChunkName: "Product" */ "@m/proposalBookSimple/views/Product.vue")
const TEST001 = () => import( /* webpackChunkName: "TEST001" */ "@m/proposalBookSimple/components/productDetail/TEST001")
const HCT023 = () => import( /* webpackChunkName: "HCT023" */ "@m/proposalBookSimple/components/productDetail/HCT023")
const word = () => import( /* webpackChunkName: "proposalBookSimpleword" */ "@m/proposalBookSimple/views/Word.vue")/* @init<%const ${viewKebabUpper} = () => import( ${webpackChunkName} "@m/${moduleKebabUpper}/views/${viewKebabNameUpper}.vue")%> */
export default [
    {
        name: "proposalBookSimple",
        path: "/proposalBookSimple",
        component: proposalBookSimple,
        meta: {
            title: "建议书简版",//标题
            login: false,//是否需要登陆权限
            transition: true,//是否滑动切换页面
            footer: false,//是否需要底部footer菜单
            scrollToTop: false,//是否返回顶部
            zoom: false,//是否可缩放
            isquery: false,//是否可被全局search组件搜索到
        },
        children: [
            {
                path: "/proposalBookSimple",
                redirect: "/proposalBookSimple/product"
            },
            {
                name: "proposalBookSimpleProduct",
                path: "product",
                component: product,
                meta: {
                    title: "",//标题产品全页
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                },
                children: [
                    {

                        name: "ProductSingleTEST001",
                        path: "TEST001",
                        component: TEST001,
                        meta: {
                            title: "我是产品配置例子", //标题产品全页
                            login: true, //是否需要登陆权限
                            transition: true, //是否滑动切换页面
                            footer: false, //是否需要底部footer菜单
                            scrollToTop: false, //是否返回顶部
                            zoom: false, //是否可缩放
                            isquery: false, //是否可被全局search组件搜索到
                        }
                    },
                    {
                        
                        name: "ProductSingleHCT023",
                        path: "HCT023",
                        component: HCT023,
                        meta: {
                            title: "光大永明爱多多重大疾病保险", //标题产品全页
                            login: true, //是否需要登陆权限
                            transition: true, //是否滑动切换页面
                            footer: false, //是否需要底部footer菜单
                            scrollToTop: false, //是否返回顶部
                            zoom: false, //是否可缩放
                            isquery: false, //是否可被全局search组件搜索到
                        }
                    }
                ]
            },
            {
                name: "proposalBookSimpleWord",
                path: "word",
                component: word,
                meta: {
                    title: "文件",//标题
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },/* @children<%            {
                name: "${routerName}",
                path: "${viewKebabUpper}",
                component: ${viewKebabUpper},
                meta: {
                    title: "${viewCnName}",//标题
                    login: true, //是否需要登陆权限
                    transition: true,//是否滑动切换页面
                    footer: false,//是否需要底部footer菜单
                    scrollToTop: false,//是否返回顶部
                    zoom: false,//是否可缩放
                    isquery: false,//是否可被全局search组件搜索到
                }
            },children%> */
        ]
    },
]

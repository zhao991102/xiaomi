import Vue from 'vue' ;
import Vuex from 'vuex';
import VuexPersist from "vuex-persist";
import address from './address.js';


Vue.use(Vuex);

const vuexLoacl = new VuexPersist({
        storage: window.sessionStorage
});
const store = new Vuex.Store({
        modules: {address}
});
export default store;


// state: {
//         //放的是组件间要共享的数据（总仓库）
//         num: 100
// },
// //mutations节点中是放方法的；只是这里面方法
// // 可以修改state节点中的数据
// // 必须用commit方法来调用；
// // 必须是同步的代码，不可以包含异步的耗时代码
// //mutatis中的方法的第一个参数总是state节点本身
// //第二个参数是commit调用时传递的额外参数
// mutations: {
//         changeNum(state, payload){
//                 state.num = payload;
//         }
// },
// //他不能修改state中的数据；可以包含异步的耗时代码
// //actions中的方法必须用dispatch方法来间接调用
// // actions中的方法的第一个参数是一个对象，这个对象中
// //包含很许多属性（state）和方法（dispatch）
// //第二个参数就是dispatch时额外传递的参数
// //actions中的方法默认返回一个成功的promise对象
// actions: {
//         //第一个形参 = {state: ?,commit: 方法，dispatch：方法， ...}
//         getNum(context){
//                 setTimeout(() => {
//                         context.commit('changeNum', 500)
//                 }, 2000)
//         }
// },
// //对vuex进行子仓库拆分
// modules: {
//         a: {
//                 namespaced: true,
//                 state: {num: 1000},
//                 mutations: {
//                         changeNum(state, payload){
//                                 state.num = payload;
//                         }
//                 },
//                 actions: {
//                         getNum(context){
//                                 setTimeout(() => {
//                                         context.commit('changeNum', 5000)
//                                 }, 2000)
//                         }
//                 }
//         }
// }
// 将components文件夹中的所有公共组件在这里进行统一 导入
// 再export统一导出
// 让这些公共组件在这被用的时候代码更加优雅！
import MiTabBar from './MiTabBar/MiTabBar.vue';
import MiCount from './MiCount/MiCount.vue';
import MiNotice from './MiNotice';
import MiAlert from './MiAlert';
import MiConfirm from './MiConfirm';
import MiLoginAlert from './MiLoginAlert';
import MiLoading from './MiLoading';

export default {
    install: function (Vue) {
        Vue.prototype.$miNotice = MiNotice;
        Vue.prototype.$miAlert = MiAlert;
        Vue.prototype.$miConfirm = MiConfirm;
        Vue.prototype.$miLoginAlert = MiLoginAlert;
        Vue.prototype.$miLoading = MiLoading;
        Vue.prototype.$miCount = MiCount;
    }
}

export {
    MiTabBar,
    MiNotice,
    MiAlert,
    MiConfirm,
    MiLoginAlert,
    MiLoading,
    MiCount
};

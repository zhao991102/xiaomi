import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const router = new VueRouter({
        routes: [
                { path: "/", redirect: '/home' },
                { path: "/home", component: () => import('../views/Home.vue') },
                { path: "/address", component: () => import('../views/Address.vue'), meta: { auth: true } },
                { path: "/cart", component: () => import('../views/Cart.vue'), meta: { auth: true } },
                { path: "/category", component: () => import('../views/Category.vue') },
                { path: "/detail/:id", component: () => import('../views/Detail.vue') },
                { path: "/paylist", component: () => import('../views/PayList.vue'), meta: { auth: true } },
                { path: "/discover", component: () => import('../views/Discover.vue') },
                { path: "/list/:cid", component: () => import('../views/List.vue') },
                { path: "/login", component: () => import('../views/Login.vue') },
                { path: "/order", component: () => import('../views/Order.vue'), meta: { auth: true } },
                { path: "/orderconfirm", component: () => import('../views/OrderConfirm.vue'), meta: { auth: true } },
                { path: "/profile", component: () => import('../views/Profile.vue') },
                { path: "/register", component: () => import('../views/Register.vue') },
        ],
});
//给路由对象添加全局路由守卫
router.beforeEach(function (to, from, next) {
        //登陆验证
        if (to.meta.auth && !sessionStorage.getItem("token")) {
                Vue.prototype.$miLoginAlert()
                        .then(() => next(`/login?target=${to.fullPath}`))
                        .catch((e) => {
                        })
                // .then(() => { return next(`/login?target=${to.fullPath}`) })
                // .catch(() => { });
                // next(`/login?target=${to.fullPath}`)
        } else
                next();
});

export default router;
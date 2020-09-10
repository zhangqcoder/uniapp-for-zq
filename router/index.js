
import Vue from 'vue'
import Router from '@/js_sdk/uni-simple-router/index.js';
Vue.use(Router)
//初始化
const router = new Router({
	routes: ROUTES, //路由表
	encodeURI: false,
});
console.log(ROUTES)

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (to.path !== "/pages/login/login" && to.path !== '/pages/loading-page/loading-page') {
		 let isLogin = uni.getStorageSync("loginStatus");//获取是否登录状态
		if (!isLogin) {
			next({
				name: 'login',
				NAVTYPE: 'push'
			});
		} else {
			next()
		}

	} else {
		next();
	}

})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export default router;

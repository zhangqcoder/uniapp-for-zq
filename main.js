import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import router from './router'
import store from './stores';
import {
	RouterMount
} from './js_sdk/uni-simple-router/index.js'
import request from '@/utils/request.js'
Vue.prototype.$http = request;
Vue.use(uView);
Vue.use(router);
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	 store,
	...App
})

// #ifdef H5
RouterMount(app, '#app');
// #endif
// #ifndef H5
app.$mount(); 
// #endif

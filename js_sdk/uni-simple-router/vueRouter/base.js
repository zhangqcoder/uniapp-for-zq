export const builtIn = [{
	path: '/preview-image',
	name: 'previewImage',
	component: {
		render: () => {},
	},
}, {
	path: '/choose-location',
	name: 'chooseLocation',
	component: {
		render: () => {},
	},
}, {
	path: '/open-location',
	name: 'openLocation',
	component: {
		render: () => {},
	},
}, {
	path: '/pages/inspection/detailed', //巡查详细
	name: 'openLocation',
	component: {
		render: () => {},
	},
}, {
	path: '/pages/inspection/matter', //巡查事项
	name: 'matter',
	component: {
		render: () => {},
	},
}, {
	path: '/pages/supply/pumpPublic', //供水泵站流量
	name: 'pumpPublic',
	component: {
		render: () => {},
	},
}, {
	path: '/pages/alarm/listDetails', //报警列表详情
	name: 'listDetails',
	component: {
		render: () => {},
	},
}, {
	path: '/pages/equ-account/account', //设备台帐
	name: 'account',
	component: {
		render: () => {},
	}
}, {
	path: '/pages/equ-account/equipment', //设备台帐-设备总数
	name: 'equipment',
	component: {
		render: () => {},
	}
}, {
	path: '/pages/equ-account/details', //设备台帐-设备总数-设备详情
	name: 'appDetails',
	component: {
		render: () => {},
	}
}, {
	path: '/pages/equ-account/information', //设备台帐-设备总数-设备详情-基本信息
	name: 'appInformation',
	component: {
		render: () => {},
	}
}, {
	path: '/pages/equ-account/maintainHistory', //设备台帐-设备总数-设备详情-保养历史
	name: 'maintainHistory',
	component: {
		render: () => {},
	}
}, {
	path: '/pages/equ-account/repairHistory', //设备台帐-设备总数-设备详情-维修历史
	name: 'repairHistory',
	component: {
		render: () => {},
	}
}, {
	path: '/pages/equipment-analysis/analysis', //设备分析
	name: 'analysis',
	component: {
		render: () => {},
	}
}, {
	path: '/pages/application/showApp', //我的应用
	name: 'analysis',
	component: {
		render: () => {},
	}
}]; // uni-app内置路由
export const vuelifeHooks = { // vueRouter的原始生命周期
	beforeHooks: [],
	afterHooks: [],
};
export const vueMount = []; // 使用内部对象保留实例化下的appVue,并使用Router进行挂载触发第一次路由钩子

export default {
	title: {
		text: '',
		x: 'center',
		bottom: '15%',
		subtext:"",
		
		textStyle: {
			color: '#929395',
			fontSize: '12'
		},
		subtextStyle: {
			color: '#929395',
			fontSize: '14',
			fontWeight:700
		}
	},
	series: [{
		type: "gauge",
		name: "",
		radius: "55%",
		splitNumber: 5,
		startAngle: 225,
		endAngle: -45,
		min: 0,
		max: 0,

		pointer: {
			//指针
			width: 6,
			length: "60%"
		},
		axisLine: {
			//仪表盘轴线相关配置
			show: true,
			lineStyle: {
				color: [
					// [5/6, "#ED8A8A"],
					// [1, '#69ACFD']
					[5 / 6.25, "#69ACFD"],
					[1, '#ED8A8A']
				],
				width: 12
			}
		},
		grid: {
			top:0
		},
		splitLine: {
			//分割线样式
			length: 24, //分割线长度
			lineStyle: {
				width: 2,
				color: "#fff"
			}
		},
		axisTick: {
			show: true,
			length: 12,
			lineStyle: {
				color: '#fff'
			}
		},
		title: {
			//仪表盘标题
			offsetCenter: [0, 110], //相对于仪表盘中心的偏移位置
			color: "#fff",
			fontSize: 26
		},
		axisLabel: {
			distance: -50,
			fontSize: 12,
			color: '#838383',
		},
		detail: {
			show: false
		},
		data: [0]
	}]
}

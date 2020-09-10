<template>
	<view class="container">
		<mpvue-echarts :canvasId="id" :echarts="echarts" :onInit="init" :option="option" ref="mpchart" />
	</view>
</template>

<script>
	import * as echarts from '@/components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
	import util from '@/utils/utils.js';
	export default {
		components: {
			mpvueEcharts
		},
		props: {
			option: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				id: "",
				echarts: echarts,
			}
		},
		created() {
			//每次实例化，自动注册随机ID
			if (!this.id) {
				this.id = util.getUID()
			}
		},
		methods: {
			//初始化图表，保存chartModel图表对象
			init(canvas, width, height, option) {
				const chart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(chart);
				chart.setOption(option)
				return chart

			},
			//图表对象接收新值重新渲染，兼容H5和小程序端
			render(option) {
				this.$refs['mpchart'].init(option)
			
			}
		}
	}
</script>
<style>
	.container {
		height: 100%;
	}
</style>

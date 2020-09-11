<template>
	<view class="gauge">
		<view class="charts">
			<text class="title">进监测</text>
			<inCharts></inCharts>
		</view>
		<view class="charts">
			<text class="title">出监测</text>
			<outCharts></outCharts>
		</view>
	</view>
</template>
<script>
	import outCharts from "./cmp/out-chart.vue"
	import inCharts from "./cmp/in-chart.vue"
	export default {
		components: {
			outCharts,
			inCharts
		}
	};
</script>
<style scoped lang="scss" src="./css/style.scss"></style>

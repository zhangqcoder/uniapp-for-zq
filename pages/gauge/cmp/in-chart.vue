<template>
	<view class="container">
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item>
							<view class="chart-view">
								<view class="chart">
									<chart :option="gaugeOption" ref="COD" class="chart-model"></chart>

									<text>{{dataModel.COD}}</text>
								</view>
								<view class="chart">
									<chart :option="gaugeOption" ref="NH3-N" class="chart-model"></chart>

									<text>{{dataModel.NH3}}</text>
								</view>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="chart-view">
								<view class="chart">
									<chart :option="gaugeOption" ref="TP" class="chart-model"></chart>
									<text>{{dataModel.TP}}</text>
								</view>
								<view class="chart">
									<chart :option="gaugeOption" ref="TN" class="chart-model"></chart>
									<text>{{dataModel.TN}}</text>
								</view>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="chart-view">
								<view class="chart">
									<chart :option="gaugeOption" ref="PH" class="chart-model"></chart>
									<text>{{dataModel.PH}}</text>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import chart from "@/dev_cmp/chart.vue";
	import gaugeOption from "../js/gauge-option.js";
	export default {
		components: {
			chart,
		},
		data() {
			return {
				gaugeOption: gaugeOption,
				background: ["color1", "color2", "color3"],
				indicatorDots: true,
				autoplay: true,
				interval: 112000,
				duration: 500,
				updateStatus: false,
				dataModel: {
					COD: 0,
					NH3: 0,
					TP: 0,
					TN: 0,
					PH: 0,
				},
				timer: null,
			};
		},
		methods: {
			//递归定时
			loop(fn, interval) {
				this.timer = setTimeout((_) => {
					fn && fn();
					if (this.timer) {
						clearTimeout(this.timer);
						this.timer = null;
					}
					this.loop(fn, interval);
				}, interval);
			},
			getData() {
				(this.dataModel = {
					COD: 180,
					NH3: 38.6,
					TP: 4.14,
					TN: 34.57,
					PH: 7.11,
				}),
				Object.keys(this.dataModel).forEach((e, i) => {
					this.dataModel[e] = Number(
						(Math.random() / 100) * 100 + Number(this.dataModel[e])
					).toFixed(2);
				});
				//深拷贝初始化图表配置，定义阈值数据缩放，仪表颜色
				var o = JSON.parse(JSON.stringify(this.gaugeOption)),
					scale = 1.25,
					sC = "#69ACFD",
					eC = "#ED8A8A";
				let oCOD = JSON.parse(JSON.stringify(({ ...o
					},
					(o.title.text = "NTU"),
					(o.title.subtext = "COD"),
					(o.series[0].min = 0),
					(o.series[0].max = 500 * scale),
					(o.series[0].data = [this.dataModel.COD]),
					(o.series[0].axisLine.lineStyle.color = [
						[500 / (500 * scale), sC],
						[1, eC],
					])) && o))

				this.$refs["COD"].render(oCOD);
				let oNH3 = JSON.parse(JSON.stringify(({ ...o
					},
					(o.title.text = "mg/L"),
					(o.title.subtext = "NH3-N"),
					(o.series[0].min = 0),
					(o.series[0].max = 45 * scale),
					(o.series[0].data = [this.dataModel.NH3]),
					(o.series[0].axisLine.lineStyle.color = [
						[45 / (45 * scale), sC],
						[1, eC],
					])) && o))
				this.$refs["NH3-N"].render(oNH3);
				let oTP = JSON.parse(JSON.stringify(({ ...o
					},
					(o.title.text = "mg/L"),
					(o.title.subtext = "TP"),
					(o.series[0].min = 0),
					(o.series[0].max = 8 * scale),
					(o.series[0].data = [this.dataModel.TP]),
					(o.series[0].axisLine.lineStyle.color = [
						[8 / (8 * scale), sC],
						[1, eC],
					])) && o))

				this.$refs["TP"].render(oTP);
				let oTN = JSON.parse(JSON.stringify(({ ...o
					},
					(o.title.text = "mg/L"),
					(o.title.subtext = "TN"),
					(o.series[0].min = 0),
					(o.series[0].max = 70 * scale),
					(o.series[0].data = [this.dataModel.TN]),
					(o.series[0].axisLine.lineStyle.color = [
						[70 / (70 * scale), sC],
						[1, eC],
					])) && o))

				this.$refs["TN"].render(oTN);
				let oPH = JSON.parse(JSON.stringify(({ ...o
					},
					(o.title.text = ""),
					(o.title.subtext = "PH"),
					(o.series[0].min = 5),
					(o.series[0].max = 9 * scale),
					(o.series[0].data = [this.dataModel.PH]),
					(o.series[0].axisLine.lineStyle.color = [
						[0.2, eC],
						[9 / (9 * scale), sC],
						[1, eC],
					])) && o))

				this.$refs["PH"].render(oPH);
			},
		},
		mounted() {
			
			this.getData()
			this.loop(this.getData, 3000);
		},
		destroyed() {
			clearTimeout(this.timer);
			this.timer = null;
		},
	};
</script>
<style lang="scss" scoped>
	.swiper {
		height: 460upx;

		.chart-view {
			@include flex(space-between);
			height: 82%;
			margin-top: 20upx;

			.chart {
				height: 100%;
				border: 1px solid #dee1e6;
				width: calc(50% - 9upx);
				text-align: center;

				.chart-model {
					position: relative;
					top: -30upx;
				}

				text {
					position: relative;
					bottom: 80upx;
					width: 100%;
					color: #78b4f7;
				}
			}
		}
	}
</style>

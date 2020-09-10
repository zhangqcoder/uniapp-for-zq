<template>
	<view class="container">
		<view class="datePickerComb">
			<datePickerComb @getDate="getDate" @getCycle="getCycle" @revoke="getDate" @dateRelaChange="getDate" @refresh="getData"></datePickerComb>
		</view>

		<chart ref="chart" class="chart" :style="{height:`${CH}px`}"></chart>

	</view>
</template>
<script>
	import chart from '@/dev_cmp/chart.vue';
	import util from '@/utils/utils.js';
	import datePickerComb from '@/dev_cmp/date-picker-comb.vue';
	import mock from './js/mock.js'
	export default {
		components: {
			chart,
			datePickerComb
		},
		data() {
			var _this = this;
			return {
				TOP: 40,
				GAP: 60,
				H: 0,
				CH: 0,
				IH: 0,
				params: {
					cycle: "day"
				}
			}
		},
		methods: {
			getDate(item) {
				console.log(item)
			},
			getCycle(item) {
				this.params.cycle = item
				console.log(item)
			},
			getData() {
				uni.showLoading({
					title: '加载中'
				});
				let option = {
					axisPointer: {
						link: [{
							xAxisIndex: 'all',
						}]
					},
					tooltip: {
						trigger: 'axis',
						position: function(pos, params, dom, rect, size) {
							// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
							var obj = {
								top: '60'
							};
							obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
							return obj;
						},
						padding: [10, 15, 10, 10],
						formatter: function(params) {
							var res = params[0].name;
							params.forEach(e => {
								res += `\n${e.seriesName}:${e.value}`
							})
							return res;
						},

					},
					color: ['#458FE3', '#48C964', '#FFAE37', '#FB8989', '#CA89FB'],
					title: [],
					xAxis: [],
					grid: [],
					series: [],
					yAxis: []
				};

				let res = mock;
				//如果传来多个测点，让toolTip位置自适应，取消强制左右显示；
				if (mock.length > 1) {
					option.tooltip.position = null;
				}

				if (res && Array.isArray(res.items) && res.items.length > 0) {
					var _this = this;
					var datas = res.items;
					_this.H = _this.calcHeight(datas);
					datas.forEach((e, i) => {
						//位置名称为null格式化
						e.siteName = e.siteName == null ? "" : `-${e.siteName}`;

						//生成图表title
						option.title.push({
							left: "center",
							text: `${e.mpointName}${e.siteName}`,
							top: _this.calcTitle(i + 1, datas),
							textStyle: {
								fontSize: 12
							}
						});
						//生成图表xAxis,series数据
						var xData = [],
							sData = [];
						datas[i].data.forEach((v, j) => {
							xData.push(v.dataDate);
							//格式化m³
							if (e.unit === 'm³') {
								sData.push((v.dataValue / 10000).toFixed(2))
							} else {
								sData.push(v.dataValue)
							}
						})
						//生成图表xAxis,只要最后的图表项才显示标签
						if (i < datas.length - 1) {
							option.xAxis.push({

								data: xData,
								gridIndex: i,
								axisLabel: {
									show: false,

								},
								axisTick: {
									show: false
								},
								axisLine: {
									lineStyle: {
										color: '#666'
									}
								},

							});
						} else {
							option.xAxis.push({

								data: xData,
								gridIndex: i,
								axisTick: {
									show: false
								},
								axisLabel: {
									color: '#999',
									formatter(param) {
										//天显示mm:ss，周月m/d,年显示m
										if (_this.params.cycle === 'day') {
											return param.substring(11, 16)
										} else if (_this.params.cycle === 'week' || _this.params.cycle === 'month') {
											return param.substring(5, 10).replace(/\-/g, "/")
										} else {
											var m = param.substring(5, 7) < 10 ? param.substring(6, 7) : param.substring(5, 7)
											return m
										}
									}
								},
								axisLine: {
									lineStyle: {
										color: '#666'
									}
								},

							});
						}

						//生成图表yAxis,格式化m³单位
						if (e.unit == null) {
							e.unit = ""
						} else if (e.unit === "m³") {
							e.unit = '万m³'
						}
						option.yAxis.push({
							splitLine: {
								show: false
							},
							name: e.unit,
							gridIndex: i,
							axisTick: {
								show: false
							},
							axisLabel: {
								color: '#999',
							},
							axisLine: {
								lineStyle: {
									color: '#666'
								}
							}
						});
						//生成图表grid
						option.grid.push({
							top: _this.calcGrid(i),
							height: _this.H,
							left: '50',
							right: '50'
						});
						//生成图表series
						option.series.push({
							name: `${e.mpointName}${e.siteName}`,
							type: 'line',
							showSymbol: false,
							data: sData,
							xAxisIndex: i,
							yAxisIndex: i,
						});

					});
					_this.$refs['chart'].render(option)
					uni.hideLoading();
					uni.stopPullDownRefresh()
				}


			},
			//计算图表GRID所处的位置
			calcGrid(i) {
				var result = this.TOP + (this.GAP * i) + (this.H * i);
				return result
			},
			//计算图表TITLE在未显示标签情况下的位置，和在最后一次显示标签的位置
			calcTitle(i, data) {
				var result
				if (i < data.length) {
					result = (this.TOP + (this.GAP * (i - 1)) + (this.H * i)) + ~~(this.TOP / 4);
				} else {
					result = (this.TOP + (this.GAP * (i - 1)) + (this.H * i)) + ~~(this.TOP / 2);
				}
				return result
			},
			//计算图表数据项的应生成的高度,如果超过4个，则进行原高度增加对应N个图表项的高度
			calcHeight(data) {
				var result;
				if (data.length > 4) {
					this.CH = (data.length / 4) * this.IH;
				}
				result = (this.CH / data.length) - (this.GAP + (~~(this.TOP / data.length)) + 2);
				return result
			}
		},
		onReady() {
			uni.createSelectorQuery().in(this).select('.container').boundingClientRect(pRes => {
				if (pRes) {
					uni.createSelectorQuery().in(this).select('.datePickerComb').boundingClientRect(cRes => {
						if (cRes) {
							this.CH = (pRes.height) - (cRes.height);
							this.IH = (pRes.height) - (cRes.height)
							this.getData()
						}
					}).exec()
				}
			}).exec()

		}
	}
</script>

<style scoped lang="scss" src="./css/curve.scss">
</style>

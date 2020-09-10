<template>

	<view class="picker">

		<view class="datePick">
			<text class="dateText" @click="dateShow = true">{{dateValue}}</text>
			<u-icon name="rili" custom-prefix="custom-icon" color="#2979ff" size="40"></u-icon>
			<u-icon name="chexiao" custom-prefix="custom-icon" color="#2979ff" size="50" class="revoke" @click="revoke"></u-icon>
			<u-picker mode="time" v-model="dateShow" :params="params" @confirm="getDate"></u-picker>
		</view>



		<view class="cyclePick">
			<u-icon name="arrow-left" color="#2979ff" size="40" @click="dateRelaChange(-1)"></u-icon>
			<text class="cycleText" @click="cycleShow = true">{{cycleLabel}}</text>
			<u-icon name="arrow-right" color="#2979ff" size="40" class="arrowRight" @click="dateRelaChange(1)"></u-icon>
			<view @click="refresh">
				<u-icon name="reload" color="#2979ff" size="40" class="reload"></u-icon>
				<text>刷新</text>
			</view>
			<u-select v-model="cycleShow" :list="list" @confirm="getCycle"></u-select>

		</view>
	</view>


</template>

<script>
	import util from '@/utils/utils.js'
	import "@/static/icon/iconfont.css";
	import DT from '@/utils/datetime.js'
	export default {
		data() {
			return {
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				dateValue: util.formatDateTime(new Date(), 'yyyy-MM-dd'),
				cycleLabel: '天',
				cycleValue: 'day',
				list: [{
					value: "day",
					label: "天"
				}, {
					value: "week",
					label: "周"
				}, {
					value: "month",
					label: "月",
					//  {
					// 	value: "year",
					// 	label: "年"
					// },
				}],
				dateShow: false,
				cycleShow: false
			}
		},
		methods: {
			dateRelaChange(flag) {

				var _date = this.dateValue,
					_step = this.cycleValue;
				this.dateValue = DT.countDateByStep(_date, flag, _step).substring(0, 10);
				this.$emit('getDate', this.dateValue)
			},
			getDate(o) {
				this.dateValue = `${o.year}-${o.month}-${o.day}`;
				this.$emit('getDate', this.dateValue)
			},
			getCycle(o) {
				this.cycleLabel = o[0].label;
				this.cycleValue = o[0].value;
				this.$emit('getCycle', this.cycleValue)
			},
			revoke() {
				this.dateValue = util.formatDateTime(new Date(), 'yyyy-MM-dd');
				this.$emit('getDate', this.dateValue)
			},
			refresh(){
				this.$emit('getDate', this.dateValue)
			}
		},
		mounted() {
			// this.$emit('getDate', this.dateValue);
			// this.$emit('getCycle', this.cycleValue)
		},
	
	}
</script>

<style lang="scss" scoped>
	.picker {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;

		text {
			font-size: 30rpx;
			display: inline-block;
			height: 100%;
		}

		.datePick {

			display: flex;
			margin-right: 20rpx;
			align-items: center;

			.dateText {
				margin-right: 10rpx;
			}

			.revoke {
				margin: 0 20rpx;
			}
		}

		.cyclePick {
			display: flex;
			align-items: center;

			.cycleText {
				margin: 0 30rpx;
			}

			.arrowRight {
				margin-right: 30rpx;
			}

			.reload {
				margin-right: 10rpx;
			}
		}

	}
</style>

<template>
	<view class="securityVideo">
		<view class="selector">
			<view @click="handleClick(0)" :class="{active:show == 0}">实时安防</view>
			<view class="split"></view>
			<view :show="show === 1" :class="{active:show == 1}" @click="handleClick(1)">历史安防</view>
		</view>
		<view class="search">
			<u-search placeholder="请输入关键字" :show-action="false" bg-color="#f7f7f7" input-align="center" v-model="searchKey" @change="handleFilter"></u-search>
		</view>
		<view class="videoWrap">
			<real v-show="show == 0" ref="real"></real>
			<history v-show="show == 1" ref="history"></history>
		</view>

	</view>
</template>

<script>
	import real from './cmp/real.vue'
	import history from './cmp/history.vue'
	export default {
		components: {
			real,
			history
		},
		onLoad() {
			uni.startPullDownRefresh()
		},
		data() {
			return {
				show: 0,
				searchKey:""
			}
		},
		methods: {
			handleClick(i) {
				// 点击切换时,关键词搜索清空,数据重置
				this.searchKey = "";
				this.handleFilter(this.searchKey)
				this.show = i
			},
			handleFilter(key) {
				// 0 过滤 单数据，1  过滤 组合数据
				if (!!this.show) {
					this.$nextTick(() => {
						this.$refs['history'].handleFilter(key)
					})

				} else {
					this.$nextTick(() => {
						this.$refs['real'].handleFilter(key)
					})

				}
			}
		},
		onPullDownRefresh() {
			// 0 显示实时安防视频 ，1 显示历史安防视频
			if (!!this.show) {
				this.$nextTick(() => {
					this.$refs['history'].getData()
				})

			} else {
				this.$nextTick(() => {
					this.$refs['real'].getData()
				})

			}
		}
	}
</script>

<style scoped lang="scss" src="./css/security-video.scss">

</style>

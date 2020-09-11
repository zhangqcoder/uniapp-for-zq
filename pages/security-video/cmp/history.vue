<template>
	<view class="history-video">
		<view class="video-list" v-for="item in list" :key="item.id" @click="showVideo(item.url)">
			<view class="image">
				<image src="/static/images/video/play.png"></image>
			</view>
			<view class="list">
				<view class="title">{{item.name}}</view>
				<view>事件：{{item.eventName}}</view>
				<view>发生时间：{{item.dateTime}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			var url =
				"http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8"
			return {

				list: [{
						id: "a0",
						name: "测试历史1",
						eventName: "超时",
						url: url,
						dateTime: new Date().toJSON()
					},
					{
						id: "a1",
						name: "测试历史2",
						eventName: "超时",
						url: url,
						dateTime: new Date().toJSON()
					},
					{
						id: "a2",
						name: "武汉历史安防3",
						eventName: "超时",
						url: url,
						dateTime: new Date().toJSON()
					},
					{
						id: "a3",
						name: "测试历史4",
						eventName: "超时",
						url: url,
						dateTime: new Date().toJSON()
					}, {
						id: "a4",
						name: "测试历史5",
						eventName: "超时",
						url: url,
						dateTime: new Date().toJSON()
					},
					{
						id: "a5",
						name: "测试历史6",
						eventName: "超时",
						url: url,
						dateTime: new Date().toJSON()
					},
					{
						id: "a6",
						name: "测试通历史7",
						eventName: "超时",
						url: url,
						dateTime: new Date().toJSON()
					},
					{
						id: "a7",
						name: "测试历史8",
						eventName: "超时",
						url: url,
						dateTime: new Date().toJSON()
					}
				],
				cacheList: []
			}
		},
		mounted() {
			this.cacheList = JSON.parse(JSON.stringify(this.list))
		},
		methods: {
			showVideo(url) {
				uni.navigateTo({
					url: '/pages/security-video/video-player?url=' + url
				})
			},
			handleFilter(key) {
				var list = this.cacheList;
				if (!!key && list.length > 0) {
					//接受的关键词和备份数据的英文字段全部转化成大写查询，支持测点名称和工艺位置查询
					var _key = key.toUpperCase();
					this.list = list.filter(e => e.name.toUpperCase().indexOf(_key) != -1 || e.siteName.toUpperCase().indexOf(_key) !=
						-1)
				} else {
					//如果传来是空的，还原数据
					this.list = list
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.history-video {
		padding: 20rpx;
		padding-top: 0;
		box-sizing: border-box;
	}
	.video-list {
		display: flex;
		color: #B0B2B4;
		box-sizing: border-box;
		font-size: 30rpx;
		border-bottom: 1rpx solid #EDEDED;
		padding: 30rpx 0;
		.list {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 22rpx;

			.title {
				color: #525252;
			}
		}
		.image {
			width: 157rpx;
			height: 148rpx;
			background:url(../../../static/images/video/history.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				height: 36rpx;
				width: 36rpx;
			}
		}
		&:nth-child(2n) {
			margin-right: 0rpx;
		}
	}
</style>
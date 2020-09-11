<template>
	<view class="real-video">
		<view class="video-list" v-for="item in list" :key="item.id" @click="showVideo(item.url)">
			<image src="/static/images/video/video.png"></image>
			<view>{{item.name}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [{
						id: "a0",
						name: "测试通道1",
						siteName: "测试",
						url: "http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8",
					},
					{
						id: "a1",
						name: "测试通道2",
						siteName: "测试",
						url: "http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8",
						poster: "/static/login/logo.png"
					},
					{
						id: "a2",
						name: "测试通道3",
						siteName: "测试",
						url: "http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8"
					},
					{
						id: "a3",
						name: "测试通道4",
						siteName: "测试",
						url: "http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8",
					}, {
						id: "a4",
						name: "测试通道5",
						siteName: "测试",
						url: "http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8",
					},
					{
						id: "a5",
						name: "测试通道6",
						siteName: "测试",
						url: "http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8",
					},
					{
						id: "a6",
						name: "测试通道7",
						siteName: "测试",
						url: "http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8"
					},
					{
						id: "a7",
						name: "测试通道8",
						siteName: "测试",
						url: "http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8"
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
	.real-video {
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.video-list {
		width: calc(50% - 20rpx);
		padding-left: 28rpx;
		color: #fff;
		box-sizing: border-box;
		margin-right: 20rpx;
		font-size: 30rpx;
		text-align: left;
		margin-bottom: 40rpx;
		border: 1rpx solid $uni-border-color;
		box-shadow: 1px 1px 8px #d9d9d9;
		background: url(../../../static/images/video/bg.png) no-repeat;
		background-size: 100% 100%;
		height: 211rpx;
		image {
			width: 35rpx;
			height: 40rpx;
			margin-top: 23rpx;
			margin-bottom: 20rpx;
		}
		&:nth-child(2n) {
			margin-left: 20rpx;
			margin-right: 0rpx;
		}
	}
</style>

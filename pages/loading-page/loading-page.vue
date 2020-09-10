<template>
	<view class="loading-page">
		<view class="slogan">
			<image src="/static/images/loading-page/slogan.png"></image>
		</view>

		<view class="logo">
			<image src="/static/images/loading-page/logo.png"></image>
		</view>
		<view class="enter">
			<u-button shape="circle" type="primary" @click="toLogin">立即体验</u-button>
		</view>
		<text class="copyright">智慧工业APP开发BETA版</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animate: false,
				isShow: false,
				timer: null
			}
		},
		methods: {
			toLogin() {
				uni.reLaunch({
					url: '/pages/login/login'

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.loading-page {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		height: 100%;
		background: red;
		background: url('/static/images/loading-page/bg.png') no-repeat;
		background-size: 100% 100%;
		align-content: flex-start;

		image {
			width: 100%;
			height: 100%
		}

		.slogan {
			margin-top: 45rpx;
			width: 775rpx;
			height: 637rpx;
		}

		.logo {
			margin-top: 78rpx;
			width: 178rpx;
			height: 166rpx;

		}

		.enter {
			width: 100%;

			button {
				width: 380rpx;
				height: 80rpx;
				line-height: 80rpx;
				margin-top: 72rpx;
				background: none;
				border: 1px solid #1f88e9;
			}
		}

		.copyright {
			position: absolute;
			bottom: 20upx;
			font-size: 14upx;
			color: #ffffff;
		}
	}
</style>

<template>
	<view class="content">
		<view class="header">
			<image src="/static/images/login/logo.png"></image>
		</view>
		<view class="list">
			<view class="listCall">
				<image class="img" src="/static/images/login/1.png"></image>
				<input class="finput" v-model="username" type="text" placeholder="输入用户名" />
			</view>
			<view class="listCall">
				<image class="img" src="/static/images/login/2.png"></image>
				<input class="finput" v-model="password" type="text" maxlength="32" placeholder="输入密码" password="true" />
			</view>
		</view>
		<view class="login">
			<u-button shape="circle" type="primary" @click="login">登录</u-button>
		</view>
		<view class="rememberMe">
			<u-checkbox v-model="rememberMe" name="记住密码" class="rememberMe">记住密码</u-checkbox>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				timer: null,
				rememberMe:false
			};
		},
		methods: {
			login() {
				if (this.username.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写用户名'
					});
					return;
				}
				if (this.password.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写密码'
					});
					return;
				}
				uni.showToast({
					title: '正在登录',
					icon: 'loading',
					duration: 120000
				})
				this.timer = setTimeout(_ => {
					uni.setStorageSync("loginStatus",true)
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					});
					uni.switchTab({
						url: '/pages/index/index'
					});
				}, 1000)

			}
		},
		onHide() {
			clearTimeout(this.timer)
			this.timer = null
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 180rpx;
		height: 166rpx;
		margin-top: 100upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 100%;
		height: 100%;
	}
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 80rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
		margin-bottom: 170rpx;
	}

	.listCall {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230, 230, 230, 1);
	}

	.listCall .img {
		width: 40upx;
		height: 40upx;
	}

	.listCall .finput {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 40upx;
		margin-left: 16upx;
		height: 40upx;
	}

	.login {
		width: 100%;

	}

	.login button {
		width: 380rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 72rpx;
	}

	.rememberMe {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;

	}

	.rememberMe text {
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>

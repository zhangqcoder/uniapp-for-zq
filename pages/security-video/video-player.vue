<template>
	<view class="video-player">
		<view class="video-js vjs-default-skin vjs-big-play-centered" v-html="videoHtml"></view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				videoHtml: "",
				player: null,
				url: ""
			}
		},
		onLoad(o) {
			if (o) {
				this.url = o.url
				// playsinline:true //IOS微信浏览器支持小窗内播放
				// webkit-playsinline:true //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全zhi屏播放的video标签的一个属性
				// x5-video-player-type: h5 //安卓 声明启用同层H5播放器 可以在video上面加东西
				// 判断一下视频类型，设置不同的type
				let type = ''
				if (this.url.indexOf('.mp4') !== -1) {
					type = 'video/mp4'
				} else if (this.url.indexOf(('.m3u8')) !== -1) {
					type = 'application/x-mpegURL'
				} else {
					type = 'rtmp/hls'
				}
				this.videoHtml =
					`
				<video id="video" 
				controls 
				playsinline 
				webkit-playsinline 
				x5-video-player-type="h5">
					<source 
					src="${this.url}"
					type="${type}"
					>
				</video>
				
				`
			}
		},
		onReady() {
			if (this.url) {
				this.player = videojs('video', {
					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					autoDisable: true,
					preload: 'none', //auto - 当页面加载后载入整个视频 meta - 当页面加载后只载入元数据 none - 当页面加载后不载入视频
					language: 'zh-CN',
					fluid: true, // 自适应宽高
					muted: false, //  是否静音
					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					controls: true, //是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
					autoplay: false, //如果true,浏览器准备好时开始回放。 autoplay: "muted", // //自动播放属性,muted:静音播放
					loop: true, // 导致视频一结束就重新开始。 视频播放结束后，是否循环播放
					techOrder: ["html5", "flash"], //播放顺序
					screenshot: true,
					controlBar: {
						volumePanel: { //声音样式
							inline: false // 不使用水平方式
						},
						timeDivider: true, // 时间分割线
						durationDisplay: true, // 总时间
						progressControl: true, // 进度条
						remainingTimeDisplay: true, //当前以播放时间
						fullscreenToggle: true, //全屏按钮
						pictureInPictureToggle: true, //画中画

					}
				}, function() {
					this.on('error', function() { //请求数据时遇到错误
						console.log("请求数据时遇到错误")
					});
					this.on('stalled', function() { //网速失速
						console.log("网速失速")
					});
					this.on('play', function() { //开始播放
						console.log("开始播放")
					});
					this.on('pause', function() { //暂停
						console.log("暂停")
					});
					this.on('timeupdate', function() {
						// console.log(this.currentTime())
					})

				});
				this.player.play();
			}
		},
		destroyed() {
			this.player.dispose()
		},
	}
</script>
<style scoped lang="scss">
	page {
		height: 100%;
		.video-player {
			height: 100%;
			width: 100%;
			view {
				height: 100%;
				width: 100%;
			}
		}
	}
</style>

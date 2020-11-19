<template>
	<div class="app">
		<!-- <div class="model" v-show="show">
			<p style="text-align: center;">更新通知(11.4~11.5)</p>
			<p>1.不同设备下底部栏显示问题，进入detail页面后直接隐藏(详细见TarBar.vue)</p>
			<p>2.优化,搜索时按下enter,取消对input的聚焦状态</p>
			<p>3.进度条的可拖动</p>
			<p>4.记忆播放</p>
			<p>5.修复detail页面刷新，播放键不符样式</p>
			<p>6.优化逻辑，mv可查看发言人的相关信息，主页作者信息逻辑优化</p>
			<p>7.修复歌词异常，利用字段检测</p>
			<p>待完善添加到下一首听</p>
			<div class="model-son"></div>
		</div> -->
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<player v-show="ispath" ref="player" />
	</div>
</template>
<script>
	import player from '@/components/Player'
	export default {
		data() {
			return {
				ispath: true,
				show: true
			}
		},
		components: {
			player
		},
		watch: {
			'$route': 'path'
		},
		mounted() {
			setTimeout(() => {
				this.show = false
			}, 3000)
			window.localStorage.setItem('wantplay','[]')
			this.getlocalData(); //读取本地信息
		},
		methods: { //监听路由变化，对音乐进行操作
			getlocalData() {//主页面刷新，音乐从头开始bug
				const totime = window.localStorage.getItem("time")
				this.$store.commit('music/TOTIME', {
					totime
				}); //加{} 
			},
			path() {
				// console.log(this.$route.path)
				if (this.$route.path == '/mv' || this.$route.path == '/mv/mvdetail') {
					this.$refs.player.$el.firstChild.pause();
					this.ispath = false
				} else {
					// this.$refs.player.$el.firstChild.play();
					this.ispath = true
				}
			}
		}
	}
</script>
<style lang="scss">
	body {
		width: 375px;
		height: 100%;
		margin: 10px auto;
		// background: url(https://api.ixiaowai.cn/api/api.php);
	}

	.app {
		background-color: white;
		padding-top: 10px;
		position: relative;
	}

	li {
		list-style: none;
	}

	.model {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: white;
		z-index: 1000;
		opacity: .9;
	}

	.model p {
		font-size: 18px;
	}

	.model-son {
		width: 384px;
		height: 65px;
		background: white;
		opacity: 0.9;
		position: fixed;
		bottom: 0;
		margin: 0 auto;
	}
</style>

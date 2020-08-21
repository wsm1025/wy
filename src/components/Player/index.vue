<template>
	<div>
		<audio loop style="display: none;" @timeupdate="time" ref="audio" :src="this.$store.state.music.URL" />
		<div v-show="Playshow" class="selcet">
			<!-- <span><i class="iconfont icon-shangyishou"></i></span> -->
			<span @click="reloading"><i class="iconfont icon-zhongxinjiazai"></i></span>
			<span @click="stop"><i v-show="show" class="iconfont icon-zanting"></i><i
				 v-show="!show" class="iconfont icon-tingzhi"></i></span><!-- <span><i class="iconfont icon-xiayishou"></i></span> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'palyer',
		data() {
			return {
				Playshow: true,
				flag: 0,
				show: false
			}
		},
		watch: {
			'$route': 'path',
			"$store.state.music.totime":'to'
		},
		mounted() {
			this.set();
		},
		methods: {
			set(){
				var _this = this;
				var a = this.$refs.audio;
				a.ondurationchange = function(){
					window.localStorage.setItem("duration",Number(a.duration.toFixed(2)));
					 var duration = Number(a.duration.toFixed(2));
					 // console.log( duration);//函数内this指向不同
					_this.$store.commit('music/Duration', {
						 	duration
						 })
				}
			},
			stop() {
				if (this.flag == 0) {
					this.$refs.audio.play();
					this.flag = 1;
					this.show = true
				} else {
					this.$refs.audio.pause();
					this.flag = 0;
					this.show = false
				}
			},
			reloading(){
				this.$refs.audio.load();
				this.flag = 0;
				this.stop();
			},
			path() {
				if (this.$route.path == '/music/detail') {
					// console.log(this.$refs.audio)
					// //使用this.$refs.audio.play() 无效
					// this.show = true
					this.flag = 0;
					this.stop();
					this.$refs.audio.autoplay = true;
				}
				if(this.$route.path == '/mv' || this.$route.path == '/mv/mvdetail'){
					this.show = false;
					this.flag = 0;//mv到音乐界面，需要点击播放两次解决方法
				}
			},
			time(){
				var TIME = this.$refs.audio.currentTime.toFixed(2);
				window.localStorage.setItem('time',TIME);
				 this.$store.commit('music/TIME_INFO',{TIME});//加{}
			},
			to(){
				this.$refs.audio.currentTime = this.$store.state.music.totime
			}
		}
		}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.selcet {
		position: fixed;
		background-color: transparent;
		display: flex;
		top: 33%;
		right: 3%;
		height: 52px;
		/* width: 100%; */
		width: 60px;
		z-index: 999;
	}

	.selcet span {
		display: block;
		width: 100%;
	}

	.selcet span i {
		font-size: 30px;
		color: pink;
		/* 		margin-left: 20px; */
	}
</style>

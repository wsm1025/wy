<template>
	<div>
		<audio loop style="display: none;" @timeupdate="time" ref="audio" :src="'https://music.163.com/song/media/outer/url?id='+`${this.$store.state.music.songId}`+'.mp3'" />
		<!-- $store.state.music.URL报错 -->
		<div v-show="Playshow" class="selcet">
			<span @click="nextsong"><i class="iconfont icon-shangyishou"></i></span>
			<span @click="reloading"><i class="iconfont icon-zhongxinjiazai"></i></span>
			<span @click="stop">
				<i v-show="show" class="iconfont icon-zanting"></i>
				<i v-show="!show" class="iconfont icon-tingzhi"></i>
			</span>
			<span @click="nextsong"><i class="iconfont icon-xiayishou"></i></span>
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
				show: false,
				list: [] //歌单列表
			}
		},
		watch: {
			'$route': 'path',
			"$store.state.music.totime": 'to',
			"$store.state.music.TIME": 'xx'
		},
		mounted() {
			this.set();
		},
		methods: {
			set() {
				var _this = this;
				var a = this.$refs.audio;
				//此处可用箭头函数
				a.ondurationchange = function() {
					window.localStorage.setItem("duration", Number(a.duration.toFixed(2)));
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
			reloading() {
				this.$refs.audio.load();
				this.flag = 0;
				this.stop();
			},
			xx() {
				var a = window.localStorage.getItem("duration");
				var b = this.$store.state.music.TIME;
				if (Number(a) <= Number(b) + 1) {
					this.$refs.audio.pause();
					this.nextsong()
				}
			},
			nextsong() {
			    var songList = JSON.parse(window.localStorage.getItem('hotmusic'));
				var wantList = JSON.parse(window.localStorage.getItem("wantplay"));
				if (wantList.length == 0) {
					for (let n of songList) {
						this.list.unshift(n.id)
					}
				} else {
					this.list = []//当wantplay无结果,播放时选取随机歌曲，但在点击wantplay时，重置list
					for (let n of wantList) {
						this.list.unshift(n)
					}
				}
				// console.log(this.list);
				let randomNumber = Math.floor(Math.random() * this.list.length);
				window.localStorage.setItem('songId', this.list[randomNumber]);//立即存储
				this.axios({
					url: `https://api.vvhan.com/api/music?id=${this.list[randomNumber]}&type=song&media=netease`
				}).then(res => {
					if (wantList.length) {
						var musicId = window.localStorage.getItem("songId");
						// console.log(wantplay[0]);
						for (var x in wantList) {
							if (wantList[x] == musicId) {
								wantList.splice(x, 1)
								console.log(wantList)
								window.localStorage.setItem("wantplay", JSON.stringify(wantList))
							}else{
								return ;
							}
						}
						let songImg = res.data.cover
						let songId = this.list[randomNumber]
						this.$store.commit('music/MUSIC_INFO', {
							songId,
							songImg
						});
						window.localStorage.setItem('songImg', songImg);
						this.flag = 0
						this.stop()
						this.$refs.audio.autoplay = true;
					} else {
						let songImg = res.data.cover
						let songId = this.list[randomNumber]
						this.$store.commit('music/MUSIC_INFO', {
							songId,
							songImg
						});
						window.localStorage.setItem('songImg', songImg);
						this.flag = 0
						this.stop()
						this.$refs.audio.autoplay = true;
					}
				})
			},
			path() {
				if (this.$route.path == '/music/detail') {
					// console.log(this.$refs.audio)
					// //使用this.$refs.audio.play() 无效
					// this.show = true
					this.flag = 0;
					this.stop();
					//上面为detail暂停并返回再进入不会播放
					this.$refs.audio.autoplay = true;
					// console.log(this.$refs.audio.paused)
					//检测音频是否在播放
					if (this.$refs.audio.paused == true) {
						this.show = false
						this.flag = 0
					} else {
						this.show = true
						this.flag = 1
					}
				}
				if (this.$route.path == '/mv' || this.$route.path == '/mv/mvdetail') {
					this.show = false;
					this.flag = 0; //mv到音乐界面，需要点击播放两次解决方法
				}
			},
			checkAudio() {
				if (this.$refs.audio.paused == true) {
					this.show = false
					this.flag = 0
				} else {
					this.show = true
					this.flag = 1
				}
			},
			time() {
				var TIME = this.$refs.audio.currentTime.toFixed(2);
				window.localStorage.setItem('time', TIME);
				this.$store.commit('music/TIME_INFO', {
					TIME
				}); //加{}
				this.checkAudio()
			},
			to() {
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
		top: 30%;
		margin-left: 240px;
		height: 30px;
		width: 120px;
		z-index: 999;
	}

	.selcet span {
		display: block;
		float: left;
		width: 100%;
		height: 30px;
	}

	.selcet span i {
		font-size: 30px;
		color: pink;
		/* 		margin-left: 20px; */
	}
</style>

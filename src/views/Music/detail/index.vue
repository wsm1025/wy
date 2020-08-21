<template>
	<div class="box slide-enter">
		<p style=" font-size: 20px; position: absolute;left: 45%;">音乐</p>
		<span class="back"><i class="iconfont icon-fanhui" @click="back"></i></span>
		<div class="song">
			<img :src="$store.state.music.songImg" alt="" />
			<p>{{song.name}}</p>
			<p>{{song.author}}</p>
			<p v-show="tip">因选取网易api,部分音乐暂时不能听</p>
			<p v-show="tip">图片较大,有时加载也很慢</p>
			
			<div class="all"><span>{{this.$store.state.music.TIME | change }}</span>
				<p style="flex: 1;height:12px;margin-top:2px;"><span class="jishitiao" :style="'width:'+width+'%'"></span></p><span>{{$store.state.music.duration | change }}</span>
			</div>
			<ul class="ul-lyric" v-show="show" ref="ul">
				<li @click="to($event)" style="margin-top: 4px;" v-for="(n,index) in lyc" :title="n[0] |Time" v-show="sss" :key="index"
				 ref="li">{{n[1]}}</li>
			</ul>
			<p v-show="!show">纯音乐,请欣赏</p>
		</div>
	</div>
</template>

<script>
	import wsm from "@/components/jiexi"
	export default {
		name: 'musicbox',
		data() {
			return {
				tip:true,
				song: [],
				list: [],
				list1: [],
				lyc: '',
				show: true,
				sss: false,
				width: 0
			}
		},
		watch: {
			"$store.state.music.TIME": 'cc',
		}, //监听数据
		filters: {
			Time(data) {
				var a = data.substring(0, data.length);
				a = a.substring(0, a.indexOf(":"));
				var x = data.substring(data.indexOf(":") + 1, data.length);
				if (a >= 0) { //删除非时间字段
					return (Number(a * 60) + Number(x)).toFixed(2)
				}
			},
			change(data) {
				var data = Number(data);
				if (data >= 60) {
					var data = Math.round(data);
					var a = '0' + parseInt(data / 60);
					var b = Math.round(data % 60);
					if (b < 10) {
						var c = a + ':' + '0' + b;
					} else {
						var c = a + ':' + b;
					}
				} else {
					var b = Math.round(data);
					if(b<10){
						var c = '00' + ':' + '0' + b
					}else{
						var c = '00' + ':' + b
					}
				}
				return c
			}
		},
		mounted() {
			setTimeout(()=>{
				this.tip = false
			},8000)
		},
		activated() {
			var id = window.localStorage.getItem('songId')
			let URL = `https://api.itooi.cn/netease/url?id=${id}&isRedirect=1`;
			window.localStorage.setItem('musicurl', URL);
			this.music(URL);
			
			this.axios({
				// url: `/api/song/media?id=${id}`
				url:`https://api.paugram.com/netease/?id=${id}`
			}).then(res => {
				if (res.data.lyric) {
					this.lyc = wsm(res.data.lyric);
					this.show = true
				} else {
					this.lyc = ''; //清空数据
					this.show = false
				}
			})
			
			this.axios({
				url: `https://api.vvhan.com/api/music?id=${this.$store.state.music.songId}&type=song&media=netease`
			}).then(res => {
				this.song = res.data
			})
			// console.log(typeof(this.$store.state.music.TIME))
		},
		methods: {
			back() {
				this.$router.back();
			},
			music(URL) {
				this.$store.commit('music/URL_INFO', {
					URL
				}); //加{}
			},
			cc() {
				var x = this.$refs.ul.childNodes;
				for (var c in x) {
					if (x[c].title) { //经过toFixed会变成string类型
						if (x[c].title <= Number(this.$store.state.music.TIME)) {
							x[c].style.display = 'block'
						} else {
							x[c].style.display = 'none'
						}
					}
				}

				var a = window.localStorage.getItem("duration");
				var b = this.$store.state.music.TIME;
				this.width = (((b / a) * 100).toFixed(2))
			},
			to(x) {
				var totime = x.target.title;
				window.localStorage.setItem('totime', totime);
				this.$store.commit('music/TOTIME', {
					totime
				}); //加{}
			},
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.box {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
		min-height: 100%;
		background: white;
		z-index: 999;
	}

	.slide-enter {
		animation: .3s slideMove;
	}

	.back {
		position: absolute;
		display: block;
		top: 0;
		height: 40px;
		width: 40px;
		border-radius: 50%;
		background-color: #E4E4E4;
		opacity: 0.5;
	}

	.icon-fanhui {
		font-size: 30px;
		margin-left: 3px;
		color: black;
		z-index: 2;
	}

	@keyframes slideMove {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}

	.song img {
		width: 100%;
		height: 300px;
	}

	.song p {
		text-align: center;
	}

	.selcet {
		color: red;
	}

	.ul-lyric {
		width: 100%;
		height: 360px;
		overflow-y: auto;
	}

	li {
		text-align: center;
		list-style: none;
	}

	.jishitiao {
		display: block;
		height: 100%;
		background-color: #000000;
	}

	.all {
		display: flex;
		justify-content: space-between;
	}
</style>

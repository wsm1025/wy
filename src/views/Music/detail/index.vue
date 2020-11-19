<template>
	<div class="box slide-enter">
		<p style=" font-size: 20px; position: absolute;left: 45%;">音乐</p>
		<span class="back"><i class="iconfont icon-fanhui" @click="back"></i></span>
		<div class="song">
			<img :src="$store.state.music.songImg" alt="" />
			<!-- <p>{{song.name}}</p>
			<p>{{song.ar[0].name}}</p> -->
			<p v-show="tip">因选取网易api,部分音乐暂时不能听</p>
			<p v-show="tip">图片较大,有时加载也很慢</p>

			<div class="all"><span>{{this.$store.state.music.TIME | change }}</span>
				<p class="jishitiao_p" @click="Todata"><span class="jishitiao" :style="'width:'+width+'%'"></span></p><span>{{$store.state.music.duration | change }}</span>
			</div>
			<ul class="ul-lyric" v-show="show" ref="ul">
				<li @click="to($event)" style="margin-top: 4px;" v-for="(n,index) in lyc" :title="n[0] |Time" v-show="sss" :key="index"
				 ref="li">{{n[1]}}</li>
			</ul>
			<p v-show="!show" style="height: 360px;">纯音乐,请欣赏</p>
		</div>
	</div>
</template>

<script>
	import wsm from "@/components/jiexi"
	export default {
		name: 'musicbox',
		data() {
			return {
				tip: true,
				song: [],
				lyc: '',
				show: true,
				sss: false, //测试用
				width: 0
			}
		},
		watch: {
			"$store.state.music.TIME": 'cc',
			"$store.state.music.songImg": 'pp' //图片改变时，触发该函数
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
					if (b < 10) {
						var c = '00' + ':' + '0' + b
					} else {
						var c = '00' + ':' + b
					}
				}
				return c
			}
		},
		mounted() {
			//读取本地配置
			this.getlocalData();
			setTimeout(() => {
				this.tip = false
			}, 4000);
			this.pp()
		},
		methods: {
			getlocalData() {
				const totime = window.localStorage.getItem("time")
				const duration = window.localStorage.getItem("duration")
				this.width = ((totime / duration) * 100).toFixed(2)
				this.$store.commit('music/TOTIME', {
					totime
				}); //加{} 
			},
			back() {
				this.$router.back();
			},
			music(URL) {
				this.$store.commit('music/URL_INFO', {
					URL
				}); //加{}
			},
			Todata(e) { //处理点击进度事件
				// console.log(e.offsetX,e.offsetY)
				// console.log(e.target.nodeName )
				//防止点击到外面出错
				const duration = window.localStorage.getItem("duration");
				// if(e.target.nodeName == 'P'){
				this.width = ((e.offsetX / 302) * 100).toFixed(2);
				//301会置空
				// console.log(this.width)
				const totime = ((this.width * duration) / 100).toFixed(2)
				// window.localStorage.setItem("time",totime)这里不需要保存此数据用store同步		
				//直接操作totime
				window.localStorage.setItem("totime", totime)
				this.$store.commit('music/TOTIME', {
					totime
				}); //加{}
				// }

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
			pp() {
				this.del()
				this.axios({
					url: `https://autumnfish.cn/lyric?id=${this.$store.state.music.songId}`
				}).then(res => {
					if (!(res.data.hasOwnProperty("lrc"))) { //检测数据是否有该字段
						this.lyc = ''; //清空数据
						this.show = false
					} else {
						this.lyc = wsm(res.data.lrc.lyric);
						this.show = true
					}
				})
			},
			del() {
				//检测当前播放的是否为想听的//待修改
				const wantplay = JSON.parse(window.localStorage.getItem('wantplay'));
				const musicId = window.localStorage.getItem("songId");
				for (var x in wantplay) {
					if (wantplay[x] == musicId) {
						wantplay.splice(x, 1)
						window.localStorage.setItem("wantplay", JSON.stringify(wantplay))
					}
				}
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
		top: 0;
		width: 375px;
		margin: 0 auto;
		background: white;
		z-index: 999;
		overflow-y: hidden;
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
		height: 411px;
		overflow-y: auto;
	}

	li {
		text-align: center;
		list-style: none;
	}

	.jishitiao_p {
		flex: 1;
		height: 12px;
		margin-top: 2px;
		border: 0.5px solid black;
		box-sizing: content-box;
		border-radius: 10px;
	}

	.jishitiao {
		display: block;
		height: 100%;
		background-color: pink;
		border-radius: 0.625rem;
		box-sizing: border-box;
	}

	.all {
		display: flex;
		justify-content: space-between;
		padding: 15px 0;
	}

	img {
		border-radius: 10%;
	}
</style>

<template>
	<div class="box slide-enter">
		<p style=" font-size: 20px; position: absolute;left: 45%;">音乐</p>
		<span><i class="iconfont icon-fanhui" @click="back"></i></span>
		<div class="song">
			<img :src="$store.state.music.songImg" alt="" />
			<p>{{song.name}}</p>
			<p>{{song.author}}</p>
		</div>
		<audio controls loop style="width: 100%; height:120px;" v-if="play">
			<source :src="url" type="audio/mpeg">
			您的浏览器不支持 audio 元素。
		</audio>
	</div>
</template>

<script>
	export default {
		name: 'musicbox',
		data() {
			return {
				song: [],
				url: '',
				play: false,
			}
		},
		activated() {
			this.axios({
				url: `https://api.vvhan.com/api/music?id=${this.$store.state.music.songId}&type=song&media=netease`
			}).then(res => {
				this.song = res.data
			})
			this.play = true;
			var id = window.localStorage.getItem('songId')
			this.url = `https://api.itooi.cn/netease/url?id=${id}&quality=flac&isRedirect=1`;
		},
		methods: {
			back() {
				this.$router.back();
				this.url = '';
				this.play = false;
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
	}

	.slide-enter {
		animation: .3s slideMove;
	}

	.slide-enter span {
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
</style>

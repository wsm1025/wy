<template>
	<div>
		<header id="header">
			<div class="search-text">
				<img class="img" src="../../../public/search.png" alt="">
				<input type="text" @keyup.13="search(key)" :placeholder='message' @focusin="yes" v-model="key"
				 @focusout="wait">
			</div>
			<div class="search-cancel" v-show="isShow" @click="isShow=!isShow">取消</div>
			<div v-show="isShow" class="getdata">
				<div style=" border-bottom: 1px solid #ccc;"></div>
				<ul class="data">
					<p>热门推荐：</p>
					<li v-for="n in tuijian" :key="n.id">
						<span @click="detail(n.id,n.album.picUrl)">{{n.name}}</span>
					</li>
				</ul>
			</div>
		</header>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		data() {
			return {
				isShow: false,
				tuijian: [],
				key: ''
			}
		},
		props: {
			message: {
				type: String,
				default: '搜索/音乐/专辑/歌手'
			}
		},
		mounted() {
			if (window.localStorage.getItem('hotmusic')) {
				this.tuijian = JSON.parse(window.localStorage.getItem('hotmusic'))
			} else {

				this.axios({
					url: 'https://api.vvhan.com/api/rand.music?type=all&sort=%E7%83%AD%E6%AD%8C%E6%A6%9C'
				}).then(res => {
					this.tuijian = res.data
					window.localStorage.setItem('hotmusic', JSON.stringify(this.tuijian))
				})
			}
		},
		methods: {
			yes(){
				// console.log(this.$route.path);
				if(this.$route.path=='/music/hot'|| this.$route.path=='/music/Recommended'){
	               this.isShow=!this.isShow;
				}
			},
			wait() {
				setTimeout(() => {
					this.isShow = false
				}, 200) //修复不同层级bug
			},
			detail(songId, songImg) {
				this.$store.commit('music/MUSIC_INFO',{songId,songImg});
				window.localStorage.setItem('songId',songId);
				window.localStorage.setItem('songImg',songImg);
				this.$router.push("./detail")
				this.isShow = !this.isShow;
			},
			search(key) {
				if (key.trim().length==0) {
					return;
				} else {
					this.axios({
						url: `http://musicapi.leanapp.cn/search?keywords=${key}`
					}).then(res => {
						this.key = '';
						var backSong = res.data.result.songs;
						this.$store.commit('music/BACK_INFO',{backSong});
						window.localStorage.setItem('Backsong',JSON.stringify(backSong));
					})
				}
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	#header {
		width: 100%;
		display: flex;
		height: 40px;
	}

	.search-text {
		display: flex;
		width: 100%;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #eeeeee;
	}

	.img {
		width: 30px;
		height: 30px;
		margin-top: 4px;
	}

	input {
		width: 100%;
		height: 30px;
		border: none;
		background-color: #eeeeee;
		font-size: medium;
		margin-top: 3px;
	}

	.search-cancel {
		width: 60px;
		height: 40px;
		line-height: 40px;
		margin-left: 10px;
		transition: width .3s;
		cursor: pointer;
		overflow: hidden;
	}

	.getdata {
		position: absolute;
		background-color: whitesmoke;
		margin-top: 45px;
		width: 376px;
		height: 170px;
		z-index: 100;
		border: 1px dotted #99A9BF;
		overflow: auto;
	}

	.data {
		width: 100%;
	}

	.data li {
		display: block;
		width: auto;
		float: left;
		height: 30px;
		margin-top: 10px;
		margin-left: 10px;
		border: 1px solid #ccc;
		border-radius: 10px;
		background-color: #B8BBBF;
	}

	
</style>

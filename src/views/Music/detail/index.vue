<template>
	<div class="box slide-enter">
		<p style=" font-size: 20px; position: absolute;left: 45%;">音乐</p>
		<span class="back"><i class="iconfont icon-fanhui" @click="back"></i></span>
		<div class="song">
			<img :src="$store.state.music.songImg" alt="" />
			<p>{{song.name}}</p>
			<p>{{song.author}}</p>
		</div>
		<!-- <div>
			<p style="font-size: 20px; padding: 10px; text-align: center; border-top: 1px dotted gray;">一些评论</p>
			<ul class="list">
				<li v-for="n in list1" :key="n.time">
					<div style="display: flex;">
						<img :src="n.user.avatarUrl" alt="" />
						<span>name:{{n.user.nickname}}</span>
					</div>
					<div>saying:{{n.content}}</div>
				</li>
			</ul>
			<p style="font-size: 20px; padding: 10px; text-align: center;">热门评论</p>
			<ul class="list">
				<li v-for="n in list" :key="n.time">
					<div style="display: flex;">
						<img :src="n.user.avatarUrl" alt="" />
						<span>name:{{n.user.nickname}}</span>
					</div>
					<div>saying:{{n.content}}</div>
				</li>
			</ul>
		</div> -->
	</div>
</template>

<script>
	export default {
		name: 'musicbox',
		data() {
			return {
				song: [],
				list:[],
				list1:[]
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
			let URL = `https://api.itooi.cn/netease/url?id=${id}&quality=flac&isRedirect=1`;
			window.localStorage.setItem('musicurl',URL);
			this.music(URL);
			
			
			// this.axios({url:`https://api.itooi.cn/netease/comment/song?id=${id}&page=0&pageSize=30`}).then(res=>{
			// 	this.list = res.data.data.hotComments;
			// 	this.list1  = res.data.data.comments;
			// })
		},
		methods: {
			back() {
				this.$router.back();
			},
			music(URL){
			   this.$store.commit('music/URL_INFO',{URL});//加{}
			}
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
	/* .list li{
		display: block;
		width: 100%;
		height: auto;
		margin-top: 2px;
		border: 1px dotted #ccc;
		border-radius: 6px;
	}
	.list li img{
		width: 53px;
		height: 53px;
		border-radius: 50%;
	}
	.list li span{
		margin-left: 30px;
		font-size: 15px;
		line-height: 45px;
	} */
</style>

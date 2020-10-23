<template>
	<div class="box slide-enter">
		<span class="back"><i class="iconfont icon-fanhui" @click="back"></i></span>
		<p style=" font-size: 20px; position: absolute;left: 45%;">歌单</p>
		<ul class="list">
			<li style="display: flex;" v-for="n in songlist" @click="get(n.id,n.pic)">
				<img :src="n.pic" alt=" "/>
				<p>歌手:{{n.singer}}</p>
				<p>歌曲:{{n.name}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'songlist',
		data(){
			return{
				songlist:[]
			}
		},
		activated(){
			this.songlist = [];
			var listId = window.localStorage.getItem('listId');
			this.axios({url:`https://autumnfish.cn/playlist/detail?id=${listId}`}).then(res=>{
				this.deal(res.data.privileges)
				// this.songlist = res.data.privileges;
			})
		},
		methods:{
			back() {
				this.$router.back();
			},
			get(songId,songImg){
				this.$store.commit('music/MUSIC_INFO',{songId,songImg});
				window.localStorage.setItem('songId',songId);
				window.localStorage.setItem('songImg',songImg);
				this.$router.push("./detail");
			},
			deal(data){
				for(var n in data){
					this.axios({url:`https://autumnfish.cn/song/detail?ids=${data[n].id}`}).then(res=>{
						this.songlist.push({
							singer:res.data.songs[0].ar[0].name,
							id:res.data.songs[0].id,
							pic:res.data.songs[0].al.picUrl,
							name:res.data.songs[0].name
							})
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

	.box {
		position: absolute;
		top: 0;
		width:375px;
		height: 670px;
		margin: 0 auto;
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
	.list{
		position: absolute;
		width: 99%;
		height: 600px;
		top: 6%;
		overflow: hidden;
	}
	.list li{
		display: block;
		width: 100%;
		height: 55px;
		margin-top: 2px;
		border: 1px dotted #ccc;
		border-radius: 6px;
	}
	.list li img{
		display: block;
		width: 53px;
		height: 53px;
		border-radius: 50%;
	}
	.list li p{
		float: left;
		width: 45%;
		height: 53px;
		margin-left: 1px;
		overflow: hidden;
	}
</style>

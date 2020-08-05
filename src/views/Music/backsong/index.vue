<template>
	<div>
		<ul class="list">
			<li style="display: flex;" v-for="n in this.$store.state.music.backSong" @click="set(n.id)" :key="n.id">
				<p>歌手:{{n.artists[0].name}}</p>
				<p>歌曲:{{n.name}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'backsong',
		data() {
			return {
				singername: []
			}
		},
		mounted() {
		},
		methods: {
			set(id) {
				this.axios({url:`https://api.vvhan.com/api/music?id=${id}&type=song&media=netease`}).then(res=>{
					this.to(res.data.song_id,res.data.cover)
				});
			},
			to(songId,songImg){
				this.$store.commit('music/MUSIC_INFO',{songId,songImg});
				// console.log(songId,songImg);
				window.localStorage.setItem('songId',songId);
				window.localStorage.setItem('songImg',songImg);
				setTimeout(()=>{
				this.$router.push("./detail")	
				},200)
			}
			
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.list {
		width: 100%;
		margin-top: 20px;
	}

	.list li {
		display: block;
		width: 100%;
		height: 50px;
		border: 1px dotted #ccc;
		border-radius: 6px;
	}

	.list li p {
		float: left;
		width: 45%;
		height: 53px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>

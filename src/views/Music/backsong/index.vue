<template>
	<div>
		<ul class="list">
			<li style="display: flex;" v-for="n in this.$store.state.music.backSong" :key="n.id">
				<p @click="set(n.id)">歌手:{{n.artists[0].name}}</p>
				<p @click="set(n.id)">歌曲:{{n.name}}</p>
				<span v-show="n.mvid>0" class="MVINFO" @click="tomv(n.mvid)">MV</span>
				<span class="addSong" @click="addNextsong" :data-id="n.id"><img ref="imgAdd" src="../../../../public/add.png" /></span>
			</li>
			<p style="height: 67px; text-align: center; line-height: 67px;" @click="close">我也是有底线的啊</p>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'backsong',
		data() {
			return {
				hidden: true,
				nextId:[]
			}
		},
		mounted() {
			this.getdata()
			//初始化wantToPlay的id
			
		},
		watch: {
			"$route": 'add'
		}, //监听数据
		methods: {
			getdata(){
				const localdata =JSON.parse(window.localStorage.getItem("wantplay"));
				const checkLength = JSON.parse(window.localStorage.getItem('Backsong'))
				// this.nextId = []
				if(localdata){
					//不为空执行此处代码
					this.nextId = localdata
					for(var x of localdata){
						// console.log(x);
						for(var y in checkLength){
							//遍历所有节点
							// console.log(this.$refs.imgAdd[y].parentNode.dataset.id);
							if(this.$refs.imgAdd[y].parentNode.dataset.id == x){
								// console.log(this.$refs.imgAdd[y]);
								this.$refs.imgAdd[y].hidden = true
							}
						}
					}
					
				}
			},
			reset(){
				// console.log(this.$refs.imgAdd);
				const arr = this.$refs.imgAdd;
				const arr2 = JSON.parse(window.localStorage.getItem("wantplay"))
				for(var x in arr){
					for(var y in arr2){
						if(this.$refs.imgAdd[x].parentNode.dataset.id !== arr2[y]){
							this.$refs.imgAdd[y].hidden = false
						}
					}
				}
			},
			set(id) {
				this.axios({
					url: `https://api.vvhan.com/api/music?id=${id}&type=song&media=netease`
				}).then(res => {
					this.to(res.data.song_id, res.data.cover)
				});
			},
			to(songId, songImg) {
				this.$store.commit('music/MUSIC_INFO', {
					songId,
					songImg
				});
				window.localStorage.setItem('songId', songId);
				window.localStorage.setItem('songImg', songImg);
				setTimeout(() => {
					this.$router.push("./detail")
				}, 200)
			},
			tomv(id) {
				this.$store.commit('music/MV_INFO', {
					id
				});
				window.localStorage.setItem('Mvid', id);
				this.$router.push("/mv/mvdetail");
			},
			close() {
				window.localStorage.removeItem('Backsong')
				this.$store.state.music.backSong = null
				this.hidden = false
			},
			addNextsong(e) {
				//wrong,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
				// e.target.hidden = true
				// console.log(e.target.parentElement.dataset.id)
				//读取本地数据
				const nowId = window.localStorage.getItem("songId");
				const wantplay =JSON.parse(window.localStorage.getItem('wantplay'))
				if(e.target.parentElement.dataset.id == nowId){
					alert("您正在听此歌,不需要再添加了")
				}else{
					e.target.hidden = true
				// console.log(e.target);
				  this.nextId = wantplay//读取数据防止添加数据添加多项
					this.nextId.push(e.target.parentNode.attributes[1].nodeValue)
					window.localStorage.setItem("wantplay",JSON.stringify(this.nextId))
				}
					
			},
			add(){
				if(this.$route.path == '/music/hot'){
					// this.reset()
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
		margin-top: 2px;
	}

	.list li:hover {
		color: #13CE66;
	}

	.list li p {
		float: left;
		width: 45%;
		height: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 50px;
	}

	.MVINFO {
		font-size: 18px;
		color: black;
		line-height: 50px;
	}

	.addSong {
		line-height: 50px;
		padding-left: 20px;
	}

	.addSong img {
		width: 35px;
		height: 35px;
		margin-top: 5px;
	}
</style>

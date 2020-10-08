<template>
		<div class="wy">
			<div v-show="show" style="color: pink; padding: 20px;"><span @click="to()">查看作者主页</span><span style="float: right; color: #000000; cursor: pointer;" @click="cancel">X</span></div>
			<div v-if="loading" style="text-align: center;">热门评论加载中...</div>
			<div v-else style="width: 100%; height: auto;" >
				<p class="header" @click="pick(list.id,list.picUrl)">{{list.name}}({{list.auther}})下的留言</p>
				<p class="content" @click="bush">{{list.content}}</p>
			</div>
	    </div>
</template>

<script>
	export default {
		name: 'wy',
		data() {
			return {
				list: [],
				loading : true,
				show:true
			}
		},
		mounted() {
			this.axios({
				url: 'https://api.vvhan.com/api/reping',
			}).then(res => {
				this.list = res.data.data;
				this.loading = false
			})
		},
		methods: {
			pick(songId,songImg){
				this.$store.commit('music/MUSIC_INFO',{songId,songImg});
				// console.log(songId,songImg);
				window.localStorage.setItem('songId',songId);
				window.localStorage.setItem('songImg',songImg);
				setTimeout(()=>{
				this.$router.push("./detail")	
				},300)
			},
			bush() {
				this.axios({
					url: 'https://api.vvhan.com/api/reping',
				}).then(res => {
					this.list = res.data.data;
				})
			},
			cancel(){
				this.show = false
			},
			to(){
				this.$router.push("/userinfo")
				window.localStorage.setItem('userId',1311290730)
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.wy div {
		border: 1px dotted bisque;
		margin-top: 10px;
	}

	.header {
		color: darkgrey;
	}

	.content {
		color: lightcoral;
		font-size: 20px;
	}
</style>

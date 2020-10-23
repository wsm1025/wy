<template>
	<div class="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<player v-show="ispath" ref="player"/>
	</div>
</template>
<script>
	import player from '@/components/Player'
	export default {
		data(){
			return{
				ispath:true
			}
		},
		components:{
			player
		},
		watch:{
			'$route':'path'
		},
		methods:{//监听路由变化，对音乐进行操作
			path(){
				// console.log(this.$route.path)
				if(this.$route.path == '/mv' || this.$route.path == '/mv/mvdetail'){
					this.$refs.player.$el.firstChild.pause();
					this.ispath = false
				}else{
					// this.$refs.player.$el.firstChild.play();
					this.ispath = true
				}
			}
		}
	}
</script>
<style lang="scss">
	body{
		width: 375px;
		height: 100%;
		margin: 10px auto;
		// background: url(https://api.ixiaowai.cn/api/api.php);
	}
	.app{
		background-color:white;
		padding-top: 10px;
	}
	li{
		list-style: none;
	}
</style>

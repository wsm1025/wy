<template>
	<div>
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

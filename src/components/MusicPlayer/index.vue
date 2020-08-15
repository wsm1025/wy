<template>
	<div id="player"  ref="player">
		<div id="song" @click="jump"><img :src="$store.state.music.songImg" :key="$store.state.music.songId"></div>
		<div v-show="Playshow" class="selcet"><span><i class="iconfont icon-shangyishou"></i></span><span><i class="iconfont icon-zanting"></i></span><span><i
				 class="iconfont icon-xiayishou"></i></span></div>
	</div>
</template>

<script>
	export default {
		name: 'player',
		data() {
			return {
				Playshow: false,
			}
		},
		methods: {
			// set() {
			// 	if (!this.Playshow) {
			// 		this.$refs.player.style.width = '300px'
			// 	} else {
			// 		this.$refs.player.style.width = '0'
			// 	}
			// 	this.$nextTick();
			// 	this.Playshow = !this.Playshow
			// },上一首，，下一首
			jump() {
				this.$router.push("./detail")
			}
		}
	}
</script>

<style scoped>
	#player {
		height: 52px;
		position: absolute;
		top: 14%;
		left: 2%;
		margin-left: 50px;
	}

	#song {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: black;
		margin-left: -50px;
	}

	#song img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.selcet {
		position: absolute;
		background-color: white;
		display: flex;
		top: 0%;
		height: 52px;
		width: 100%;
	}

	.selcet span {
		display: block;
		width: 100%;
	}

	.selcet span i {
		font-size: 45px;
		margin-left: 20px;
	}
</style>

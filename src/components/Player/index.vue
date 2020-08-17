<template>
	<div>
		<audio loop style="display: none;" ref="audio" :src="this.$store.state.music.URL" />
		<div v-show="Playshow" class="selcet">
			<!-- <span><i class="iconfont icon-shangyishou"></i></span> --><span @click="stop"><i v-show="show" class="iconfont icon-zanting"></i><i
				 v-show="!show" class="iconfont icon-tingzhi"></i></span><!-- <span><i class="iconfont icon-xiayishou"></i></span> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'palyer',
		data() {
			return {
				Playshow: true,
				flag: 0,
				show: false
			}
		},
		watch: {
			'$route': 'path'
		},
		methods: {
			stop() {
				if (this.flag == 0) {
					this.$refs.audio.play();
					this.flag = 1;
					this.show = true
				} else {
					this.$refs.audio.pause();
					this.flag = 0;
					this.show = false
				}
			},
			path() {
				if (this.$route.path == '/music/detail') {
					// console.log(this.$refs.audio)
					this.$refs.audio.autoplay = true;//使用this.$refs.audio.play() 无效
					this.show = true
				}
				if(this.$route.path == '/mv' || this.$route.path == '/mv/mvdetail'){
					this.show = false
				}
			}
		},
		}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.selcet {
		position: absolute;
		background-color: transparent;
		display: flex;
		top: 33%;
		right: 3%;
		height: 52px;
		/* width: 100%; */
		width: 50px;
		z-index: 999;
	}

	.selcet span {
		display: block;
		width: 100%;
	}

	.selcet span i {
		font-size: 45px;
		color: pink;
		/* 		margin-left: 20px; */
	}
</style>

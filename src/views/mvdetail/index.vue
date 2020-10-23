<template>
	<div class="box slide-enter" ref="mv">
		<p style=" font-size: 20px; position: absolute;left: 45%;">Mv</p>
		<span class="back"><i class="iconfont icon-fanhui" @click="back"></i></span>
		<video width="100%" height="240" controls :key="id" :src="url">
			<source :src="url" type="audio/mp4" v-show="play">
		</video>
		<div>
			热门评论
			<ul class="list">
				<li v-for="n in list" :key="n.time">
					<div style="display: flex;">
						<img :src="n.user.avatarUrl" alt="" />
						<span>name:{{n.user.nickname}}</span>
					</div>
					<div>saying:{{n.content}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'mvbox',
		data() {
			return {
				url: '',
				play: false,
				id:'',
				list:[]
			}
		},
		activated() {
			var id = window.localStorage.getItem('Mvid');
			this.id = id;
			this.axios({
				url:`https://autumnfish.cn/mv/url?id=${id}`
			}).then(res=>{
				this.url = res.data.data.url;
			})
			this.play = true;
			
			this.axios({url:`https://autumnfish.cn/comment/mv?id=${id}`}).then(res=>{
				this.list = res.data.comments;
			})
			document.documentElement.scrollTop = document.body.scrollTop = 0;
		},
		methods: {
			back() {
				this.$router.back();
				this.url = '';
				this.play = false;
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
			transform: translateX(100%);
		}

		to {
			transform: translateX(0);
		}
	}

	.song img {
		width: 100%;
		height: 300px;
	}

	.song p {
		text-align: center;
	}

	video {
		margin-top: 20px;
	}
	
	.list li{
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
	}
</style>

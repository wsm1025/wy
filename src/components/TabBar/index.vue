<template>
	<footer id="footer">
		<ul>
			<router-link tag="li" to="/music" active-class="myactive"><i class="iconfont icon-music"></i>
				<p>音乐</p>
			</router-link>
			<router-link tag="li" to="/mv" active-class="myactive"><i class="iconfont icon-shexiangji"></i>
				<p>MV</p>
			</router-link>
		</ul>
		<MusicPlayer></MusicPlayer>
	</footer>
</template>

<script>
	import MusicPlayer from '@/components/MusicPlayer'
	export default {
		name: 'tabbar',
		components:{
			MusicPlayer
		},
	}
</script>

<style scoped>
	#footer {
		width:384px;
		height: 65px;
		background: white;
		border-top: 2px #ebe8e3 solid;
		position: fixed;
		bottom: 0;
		margin: 0 auto;
	}

	#footer ul {
		display: flex;
		text-align: center;
		height: 35px;
		align-items: center;
	}

	#footer ul li {
		flex: 1;
		height: 40px;
		list-style: none;
	}

	.myactive{
		color: #f03d37;
	}

	#footer ul i {
		font-size: 20px;
	}

	#footer ul p {
		font-size: 12px;
		line-height: 18px;
	}
</style>

<template>
	<div>
		<div id="music" ref="music">
			<Header></Header>
			<div class="meum-list">
				<router-link tag="div" to="/music/hot" active-class="myactive">
					热门
				</router-link>
				<router-link tag="div" to="/music/Recommended" active-class="myactive">
					今日推荐
				</router-link>
			</div>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<TabBar v-show="show"></TabBar>
	</div>
</template>

<script>
	import TabBar from '@/components/TabBar'
	import Header from '@/components/Header'
	import player from '@/components/Player'
	export default {
		name: 'music',
		data() {
			return {
				nothot: true,
				show: true,
			}
		},
		components: {
			TabBar,
			Header,
			player
		},
		mounted() {
			window.addEventListener('scroll', this.set, true)
		},
		methods: {
			set() {
				var h = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if (h > 86) {
					this.show = false
				} else {
					this.show = true
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

	#music {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.meum-list {
		display: flex;
		height: 40px;
	}

	.meum-list div {
		width: 100%;
		text-align: center;
		line-height: 40px;
	}

	.myactive {
		color: red;
		border-bottom:3px solid red;
	}
</style>

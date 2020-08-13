<template>
	<div>
		<div id="mv" ref="mv">
			<HeaderT v-show="yes"></HeaderT>
			<TabBar v-show="show"></TabBar>
		</div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import TabBar from '@/components/TabBar'
	import HeaderT from '@/components/Header2'
	export default {
		name: 'MV',
		data() {
			return {
				show: true,
				yes:true
			}
		},
		components: {
			TabBar,
			HeaderT,
		},
		mounted() {
			var H =  window.screen.height;
			 this.$refs.mv.style.height = H +'px';
			window.addEventListener('scroll', this.set, true);
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
</style>

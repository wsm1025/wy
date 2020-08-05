<template>
	<keep-alive>
		<router-view v-if="isRouterAlive"></router-view>
	</keep-alive>
</template>
<script>
	export default {
		provide() {
			return {
				reload: this.reload()
			}
		},
		data() {
			return {
				isRouterAlive: true
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		}
	}
</script>

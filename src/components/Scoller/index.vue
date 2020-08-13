<template>
	<div class="contain" ref="contain">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name:'Scroller',
		mounted() {
			var scroll = new BScroll(this.$refs.contain, {
					tap: true,
					probeType: 1
				});
		}
	}
</script>

<style scoped>
.contain{height: 200px; }
</style>
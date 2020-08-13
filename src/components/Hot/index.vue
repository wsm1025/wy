<template>
	<div class = "hot">
	<Wy></Wy>
	<Backsong></Backsong>
	</div>
</template>

<script>
	import Wy from '@/components/wycloud'
	import Backsong from '@/views/Music/backsong'
	export default{
		name:'hot',
		components:{
			Wy,
			Backsong
		},
	}
</script>

<style scoped>
</style>

<template>
	<div v-if="loading" style="text-align: center;">等待加载</div>
	<div v-else>
		<div>
			<ul style="overflow:inherit">
				<li @click="getId(n.id)" class="list" v-for="n in recommendedlist" :key="n.id">
					<img class="liimg" :src="n.picUrl" alt="" />
					<p class="des">{{n.name}}</p>
					<p class="play"><span>{{n.playCount | playCount}}</span>万人次播放</p>
				</li>
			</ul>
			<span v-show="up" class="up"><i @click="toup" class="iconfont icon-xiangshang"></i></span>
		</div>
	</div>
	</Scroller>
</template>

<script>
	import Vue from 'vue'
	Vue.filter("playCount", function(data) {
		return Math.floor(data / 10000);
	})
	export default {
		name: 'recommended',
		data() {
			return {
				loading: true,
				recommendedlist: [],
				up: false
			}
		},
		mounted() {
				this.axios({
					url: 'https://autumnfish.cn//personalized?limit=20'
				}).then(res => {
					this.recommendedlist = res.data.result;
					this.loading = false
				}),
				window.addEventListener('scroll', this.hup, true)
		},
		
		methods: {
			hup() {
				var h = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if (h > 140) {
					this.up = true;
				} else {
					this.up = false
				}
			},
			toup() {
				document.documentElement.scrollTop = document.body.scrollTop = 0;
			},
			getId(id){
					this.$router.push("./songlist")
					// console.log(id);
					window.localStorage.setItem('listId',id);
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.list {
		height: 200px;
		width: 49%;
		border: 1px solid red;
		margin-top: 10px;
		float: left;
		list-style: none;
	}

	.des {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
	}

	.liimg {
		height: 150px;
		width: 98%;
		margin: 2px 2px;
		border: 1px dotted #DCDCDC;
	}

	.play {
		text-align: center;
		line-height: 16px;
	}

	.play span {
		font-size: 22px;
		color: #DD6161;
	}

	.up {
		position: fixed;
		bottom: 1%;
		right: 3%;
	}

	.icon-xiangshang {
		font-size: 60px;
	}
</style>

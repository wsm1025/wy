<template>
	<div v-if="loading" style="text-align: center;">等待加载</div>
	<div v-else>
		<div>
			<el-carousel :interval="5000" height="200px" arrow="always" indicator-position="none">
				<el-carousel-item v-for="(n,index) in imglist" :key="index">
					<img class="img" :src="n.picUrl" alt="" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<div>
			<ul v-infinite-scroll="load" infinite-scroll-distance="60" infinite-scroll-immediate-check="false" style="overflow:inherit">
				<li @click="getId(n.id)" class="list" v-for="n in recommendedlist" :key="n.id">
					<img class="liimg" :src="n.coverImgUrl" alt="" />
					<p class="des">{{n.name}}</p>
					<p class="play"><span>{{n.playCount | playCount}}</span>万人次播放</p>
				</li>
			</ul>
			<p v-show="ok" style="text-align: center;">等待响应。。。</p>
			<p v-show="out" style="text-align: center;">到底啦</p>
			<span v-show="up" class="up"><i @click="toup" class="iconfont icon-xiangshang"></i></span>
		</div>
	</div>
	</Scroller>
</template>

<script>
	import Vue from 'vue'
	import {
		InfiniteScroll
	} from 'mint-ui';
	Vue.use(InfiniteScroll);
	Vue.filter("playCount", function(data) {
		return Math.floor(data / 10000);
	})
	export default {
		name: 'recommended',
		data() {
			return {
				loading: true,
				imglist: [],
				recommendedlist: [],
				page: 6,
				ok: true,
				out: false,
				up: false
			}
		},
		mounted() {
			this.axios({
					url: 'https://api.itooi.cn/netease/banner'
				}).then(res => {
					this.imglist = res.data.data;
					this.loading = false;
				}),
				this.axios({
					url: `https://api.itooi.cn/netease/songList/highQuality?cat=%E5%85%A8%E9%83%A8&pageSize=${this.page}`
				}).then(res => {
					this.recommendedlist = res.data.data;
					this.ok = true
				}),
				window.addEventListener('scroll', this.hup, true)
		},
		methods: {
			load() {
				setTimeout(() => {
					if (this.page >32) {
						this.ok = false;
						this.out = true;
						return 0;
					} else {
						this.page += 6;
						if (this.recommendedlist.length >= 36) {
							return;
						}
						this.axios({
							url: `https://api.itooi.cn/netease/songList/highQuality?cat=%E5%85%A8%E9%83%A8&pageSize=${this.page}`
						}).then(res => {
							this.recommendedlist = res.data.data
						})
					}
				}, 3000)
			},
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

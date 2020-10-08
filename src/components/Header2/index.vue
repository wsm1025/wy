<template>
	<div>
		<header id="header">
			<div class="search-text">
				<img class="img" src="../../../public/search.png" alt="">
				<input type="text" @keyup.13="search(key)" :placeholder='message' @focusin="isShow=true" v-model="key" @focusout="isShow=!isShow">
			</div>
			<div class="search-cancel" v-show="isShow" @click="isShow = false">取消</div>
		</header>
		<div>
			<p>热门推荐</p>
			<div class="hot">
				<ul class="list">
					<li v-for="n in mvhotlist" :key="n.id" @click="to(n.id)">
						<p>{{n.name}}</p>
						<p>{{n.artistName}}</p>
						<img :src="n.cover" alt="" />
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Header2',
		data() {
			return {
				isShow: false,
				message: '搜索mv(输入ID)',
				key: '',
				mvhotlist: []
			}
		},
		mounted() {
			this.axios({
				url: 'https://autumnfish.cn/mv/first?limit=10'
			}).then(res => {
				this.mvhotlist = res.data.data;
			})
		},
		methods: {
			search(key) {
				if (key.length == 0) {
					return;
				} else {
					this.$store.commit('music/MV_INFO', {key});
					window.localStorage.setItem('Mvid', key);
					this.$router.push("mv/mvdetail");
					this.key = '';
				}
			},
			to(id) {
				this.$store.commit('music/MV_INFO', {
					id
				});
				window.localStorage.setItem('Mvid', id);
				this.$router.push("mv/mvdetail");
			}
		},
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	#header {
		width: 100%;
		display: flex;
		height: 40px;
	}

	.search-text {
		display: flex;
		width: 100%;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #eeeeee;
	}

	.img {
		width: 30px;
		height: 30px;
		margin-top: 4px;
	}

	input {
		width: 100%;
		height: 30px;
		border: none;
		background-color: #eeeeee;
		font-size: medium;
		margin-top: 3px;
	}

	.search-cancel {
		width: 60px;
		height: 40px;
		line-height: 40px;
		margin-left: 10px;
		transition: width .3s;
		cursor: pointer;
		overflow: hidden;
	}

	p {
		text-align: center;
		font-size: 15px;
		margin-top: 10px
	}

	.list {
		width: 100%;
		height: 20%;
	}

	.list li {
		width: 100%;
		height: 20%;
		border: 1px dotted #ccc;
		margin-top: 20px;
	}

	.list img {
		width: 100%;
		height: 100%;
	}
</style>

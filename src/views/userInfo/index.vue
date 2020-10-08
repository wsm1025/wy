<template>
	<div class="userinfo" :id="this.$store.state.music.USERID">
		<span class="back"><i class="iconfont icon-fanhui" @click="back"></i></span>
		<p style="text-align: center;">个人信息</p>
		<div class="USERINFO">
			<img :src="userbg" alt="" />
			<input v-show="show" type="text" placeholder="请输入你的Id" @keyup.13="change(USERID)" v-model="USERID"  />
			<div class="user">
				<img :src="userpic" @click="Show" alt=""/>
					<div style="flex: 1; margin-top: 35px;">
						<p>昵称:{{nickname}}</p>
						<p>个性签名:{{signature}}</p>
					</div>
				</div>
			<p>我的歌单</p>
			<div class="USERSONGLIST">
				<ul>
					<li v-for="n in data" :key='n.id' @click="to(n.id)">
						<img :src="n.coverImgUrl" alt="">
						<p style="text-align: center;">{{n.name}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'userinfo',
		data(){
			return{
				show:false,
				USERID:'',
				id:'',
				data:'',
				userpic:'',
				userbg:'',
				nickname:'',
				signature:''
			}
		},
		activated() {
			this.axios({url:`https://autumnfish.cn/user/playlist?uid=${this.$store.state.music.USERID}`}).then(res=>{
				this.data =res.data.playlist;
      			this.userpic =res.data.playlist[0].creator.avatarUrl;
				this.userbg = res.data.playlist[0].creator.backgroundUrl;
				this.nickname  = res.data.playlist[0].creator.nickname;
				this.signature = res.data.playlist[0].creator.signature
			})
		},
		methods: {
			Show(){
				this.show = !this.show
			},
			back() {
				this.$router.back();
			},
			to(id){
				this.$router.push("music/songlist")
				window.localStorage.setItem('listId',id);
			},
			change(USERID){
				this.$store.commit('music/USER_INFO', {
					USERID
				});
				window.localStorage.setItem("userId",USERID);
				this.$router.go(0)
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
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
		margin-left: 3px;
		color: black;
		z-index: 2;
	}
	.USERINFO img{
		width: 100%;
		height: 250px;
	}
	.USERINFO .user{
		width: 100%;
		height: 100px;
		display: flex;
	}
	.USERINFO .user img{
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	.USERINFO input{
		padding: 8px;
		position: absolute;
		top: 10%;
		left: 45%;
		border: none;
	}
	.user{
		margin-bottom: 10px;
		border-bottom: 1px dotted gray;
		margin-top: -40px
	}
	.user div p{
		text-align: center;
		margin-top: 5px;
	}
	.USERSONGLIST{
		background-color: #00FFFF;
		height: 1150px;
	}
	.USERSONGLIST ul li{
		list-style: none;
		width: 50%;
		float: left;
		height: 200px;
		padding-bottom: 30px;
	}
	.USERSONGLIST ul li img{
		width: 100%;
		height: 180px;
	}
</style>

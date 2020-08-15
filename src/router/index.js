import Vue from 'vue'
import VueRouter from 'vue-router'
import Hot from '@/components/Hot'


Vue.use(VueRouter)

const routes = [ //路由配置
	{
		path: '/music',
		component: () => import('@/views/Music'),
		redirect: '/music/hot',
		
		children: [
			{
				path: 'hot',
				component: () => import('@/components/Hot'),
			},
			{
				path: 'recommended',
				component: () => import('@/components/Recommended'),
			},
			{
				path:'detail',
				component: () => import('@/views/Music/detail')
			},
			{
				path:'songlist',
				component: () => import('@/views/Music/songlist')
			}
		]
	},
	{
		path: '/mv',
		component: () => import('@/views/Mv'),
	},
	{
		path:'/mv/mvdetail',
		component: () => import('@/views/mvdetail')
	},
	{
		path:'/userinfo',
		component: () => import('@/views/userInfo')
	},
	{
		path: '*',
		redirect: '/music/hot'
	},
	
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

export default router

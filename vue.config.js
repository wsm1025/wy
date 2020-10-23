module.exports = {
	devServer: {
		// proxy: {
		// 	'/api': {
		// 		target:"https://music.163.com",
		// 		//ws: true,
		// 		changeOrigin: true
		// 	},//可配置多个
		// 	// '/foo': {
		// 	// 	target: '<other_url>'
		// 	// }
		// }
	},
   publicPath: process.env.NODE_ENV === "production" ?  "/wy" : "./",
   // publicPath: process.env.NODE_ENV === "production" ?  "./" : "./wy",
  //webpack增加静态页面前缀
}
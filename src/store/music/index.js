const state = {
	songId :window.localStorage.getItem("songId") || '',
	songImg : window.localStorage.getItem("songImg")||'http://p1.music.126.net/swcW0FE-__ihfjnJqU22Qg==/109951164696345792.jpg',
    backSong :JSON.parse(window.localStorage.getItem("Backsong")) || [],
	MVID: window.localStorage.getItem('Mvid') || '',
	USERID: window.localStorage.getItem("userId") || '1311290730',
	URL: window.localStorage.getItem("musicurl")|| ''
};

const actions = {
	
};
const mutations = {
	MUSIC_INFO(state,payload){
		state.songId = payload.songId;
		state.songImg = payload.songImg;
	},
	BACK_INFO(state,payload){
		state.backSong = payload.backSong;
	},
	MV_INFO(state,payload){
		state.MVID = payload.MVID;
	},
	USER_INFO(state,payload){
		state.USERID = payload.USERID;
	},
	URL_INFO(state,payload){
		state.URL = payload.URL;
	}
};
export default{
	namespaced : true,
	state,
	actions,
	mutations
}
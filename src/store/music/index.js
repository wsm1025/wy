const state = {
	songId :window.localStorage.getItem("songId") || '1297742167',
	songImg : window.localStorage.getItem("songImg")||'http://p4.music.126.net/7U5MdVq15v5wK3IA3IT8FQ==/109951165319863126.jpg',
    backSong :JSON.parse(window.localStorage.getItem("Backsong")) || [],
	MVID: window.localStorage.getItem('Mvid') || '',
	USERID: window.localStorage.getItem("userId") || '1311290730',
	TIME: window.localStorage.getItem("time"),
	totime:window.localStorage.getItem('totime'),
	duration: window.localStorage.getItem('duration')
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
	TIME_INFO(state,payload){
		state.TIME = payload.TIME;
	},
	TOTIME(state,payload){
		state.totime = payload.totime;
	},
	Duration(state,payload){
		state.duration = payload.duration;
	}
};
export default{
	namespaced : true,
	state,
	actions,
	mutations
}
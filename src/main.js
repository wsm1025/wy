import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

import Scroller from '@/components/Scoller'
Vue.component('Scroller',Scroller);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

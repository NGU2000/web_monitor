import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import '../public/reset.css'
import monitorErr from './utils/monitorErr.js';
import monitorPerf from "./utils/monitorPerf.js";
import monitorBeh from "./utils/monitorBeh.js";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(monitorErr, {
  ignoreErrMsgs: ['ResizeObserver loop limit exceeded'] // 需要忽略掉的错误消息
})
Vue.use(monitorPerf, {
});

Vue.use(monitorBeh, {
});

new Vue({
  router,
  render: (h) => h(App),
  methods: {
  }
}).$mount('#app');

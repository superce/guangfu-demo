// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/font/iconfont.css'
import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
import VueLazyload from 'vue-lazyload'

Vue.use(wcSwiper);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://guangfu.yiqi21.com/static/images/logo.png',
  // loading: 'http://guangfu.yiqi21.com/static/images/logo.png',
  attempt: 3
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

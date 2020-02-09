import Vue from 'vue'
import App from './App.vue'
// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
// Vue.use(ViewUI);
import Iview from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(Iview)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

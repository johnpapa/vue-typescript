import Vue from 'vue'
import App from './App.vue'

// const HeroDetail = {
//   template: '#herodetail'
// };

new Vue({
  el: '#app',
  template: '<App/>',
  // render: h => h(App),
  components: {
    App
    // heroDetail: HeroDetail
  }
})

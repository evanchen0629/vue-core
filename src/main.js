import '../public/index.html'
import Vue from './vue'

const vm = new Vue({
  el: '#app',
  data: {
    msg: 'miniVue'
  }
})
console.log(vm.$el);
console.log(vm.$data);

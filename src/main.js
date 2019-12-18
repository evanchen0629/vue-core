import '../public/index.html'
import Vue from './vue'

const vm = new Vue({
  el: '#app',
  data: {
    msg: 'miniVue'
  },
  methods: {
    fn(){
      console.log(this.$data.msg);
    }
  },
})

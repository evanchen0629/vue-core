import '../public/index.html'
import Vue from './vue'

const vm = new Vue({
  el: '#app',
  data: {
    msg: '<a href="#">dfaf</a>'
  },
  methods: {
    fn(){
      console.log(this.$data.msg);
    }
  },
})

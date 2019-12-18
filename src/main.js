import '../public/index.html'
import Vue from './vue'
import Observe from './observe'

const vm = new Vue({
  el: '#app',
  data: {
    msg: '<a href="#">dfaf</a>'
  },
  methods: {
    fn(){
      this.$data.msg = 'haha'
      console.log(this.$data.msg);
    }
  },
})
new Observe(vm.$data)

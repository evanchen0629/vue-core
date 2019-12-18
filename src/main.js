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
    }
  },
})
new Observe(vm.$data)
window.vm = vm

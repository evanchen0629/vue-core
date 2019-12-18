import '../public/index.html'
import Vue from './vue'

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

window.vm = vm
